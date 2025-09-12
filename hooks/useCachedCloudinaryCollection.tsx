'use client';

import { useState, useEffect, useCallback } from 'react';

interface CloudinaryImage {
    public_id: string;
    publicId?: string; // Alias for public_id for compatibility
    format: string;
    width: number;
    height: number;
    bytes: number;
    url: string;
    secure_url: string;
    version?: number;
    created_at?: string;
    tags?: string[];
    context?: Record<string, any>;
    assetId?: string;
    assetFolder?: string;
    displayName?: string;
}

interface UseCachedCloudinaryCollectionOptions {
    cloudName: string;
    tag: string;
    resourceType?: 'image' | 'video' | 'raw' | 'any';
    maxResults?: number;
    enabled?: boolean;
    cacheDuration?: number; // in milliseconds, default 1 hour
}

interface CachedCollectionData {
    images: CloudinaryImage[];
    timestamp: number;
    etag?: string;
}

interface UseCachedCloudinaryCollectionReturn {
    images: CloudinaryImage[];
    isLoading: boolean;
    error: string | null;
    refetch: () => void;
    isFromCache: boolean;
    cacheAge: number; // in minutes
    clearCache: () => void;
}

// Cache configuration
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds
const MAX_CACHE_AGE = 24 * 60 * 60 * 1000; // 24 hours maximum cache age

export function useCachedCloudinaryCollection({
    cloudName,
    tag,
    resourceType = 'image',
    maxResults = 100,
    enabled = true,
    cacheDuration = CACHE_DURATION
}: UseCachedCloudinaryCollectionOptions): UseCachedCloudinaryCollectionReturn {
    const [images, setImages] = useState<CloudinaryImage[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isFromCache, setIsFromCache] = useState(false);
    const [cacheAge, setCacheAge] = useState(0);

    // Generate cache key
    const cacheKey = `cloudinary_${resourceType}_${tag}_${cloudName}_${maxResults}`;

    // Transform API response to consistent format
    const transformImages = useCallback((items: any[]): CloudinaryImage[] => {
        return items.map((item: any) => {
            // Extract public_id from URL if not present in the item
            let publicId = item.public_id;
            if (!publicId && item.url) {
                // Extract public_id from URL like: http://res.cloudinary.com/dllh8yqz8/image/upload/v1756999626/image_001.jpg
                const urlParts = item.url.split('/');
                const filename = urlParts[urlParts.length - 1];
                publicId = filename.replace(/\.[^/.]+$/, ''); // Remove file extension
            }
            
            return {
                public_id: publicId,
                publicId: publicId, // Alias for compatibility
                format: item.format,
                width: item.width,
                height: item.height,
                bytes: item.bytes,
                url: item.url,
                secure_url: item.secure_url,
                version: item.version,
                created_at: item.created_at,
                tags: item.tags,
                context: item.context,
                assetId: item.asset_id,
                assetFolder: item.asset_folder,
                displayName: item.display_name || (publicId ? publicId.split('/').pop()?.split('.')[0] : 'image'),
            };
        });
    }, []);

    // Fetch images from API
    const fetchImages = useCallback(async (forceRefresh = false) => {
        if (!enabled) return;

        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(`/api/cloudinary/search?tag=${tag}&resourceType=${resourceType}&maxResults=${maxResults}&cloudName=${cloudName}${forceRefresh ? '&forceRefresh=true' : ''}`);
            
            if (!response.ok) {
                throw new Error(`Failed to fetch images: ${response.statusText}`);
            }

            const data = await response.json();
            const transformedImages = transformImages(data.resources || []);
            
            setImages(transformedImages);
            setIsFromCache(false);

            // Cache the data
            const cachedData: CachedCollectionData = {
                images: transformedImages,
                timestamp: Date.now(),
                etag: response.headers.get('etag') || undefined
            };
            localStorage.setItem(cacheKey, JSON.stringify(cachedData));

        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to fetch images';
            setError(errorMessage);
            console.error(`Error fetching images:`, err);
        } finally {
            setIsLoading(false);
        }
    }, [cloudName, tag, resourceType, maxResults, enabled, transformImages, cacheKey]);

    // Load from cache or fetch fresh data
    const loadData = useCallback(async () => {
        if (!enabled) return;

        try {
            const cachedDataString = localStorage.getItem(cacheKey);
            
            if (cachedDataString) {
                const cachedData: CachedCollectionData = JSON.parse(cachedDataString);
                const now = Date.now();
                const age = now - cachedData.timestamp;

                // Check if cache is still valid
            if (age < cacheDuration) {
                // Check if cached data needs transformation
                const firstImage = cachedData.images[0];
                const needsTransformation = !firstImage.public_id && !firstImage.publicId;
                
                const finalImages = needsTransformation 
                    ? transformImages(cachedData.images)
                    : cachedData.images;
                
                setImages(finalImages);
                setIsFromCache(true);
                setCacheAge(Math.floor(age / (60 * 1000))); // Convert to minutes
                return;
            }

                // Check if cache is too old (stale)
                if (age > MAX_CACHE_AGE) {
                    localStorage.removeItem(cacheKey);
                }
            }

            // Fetch fresh data
            await fetchImages();
        } catch (err) {
            console.error(`Error loading images:`, err);
            await fetchImages();
        }
    }, [enabled, cacheKey, cacheDuration, fetchImages, tag, transformImages]);

    // Refetch function
    const refetch = useCallback(() => {
        fetchImages(true);
    }, [fetchImages]);

    // Clear cache function
    const clearCache = useCallback(() => {
        localStorage.removeItem(cacheKey);
        setImages([]);
        setIsFromCache(false);
        setCacheAge(0);
        if (process.env.NODE_ENV === 'development') {
          console.log(`🗑️ Cleared cache for images (tag: ${tag})`);
        }
    }, [cacheKey, tag]);

    // Load data on mount and when dependencies change
    useEffect(() => {
        loadData();
    }, [loadData]);

    // Update cache age periodically
    useEffect(() => {
        if (!isFromCache) return;

        const interval = setInterval(() => {
            const cachedDataString = localStorage.getItem(cacheKey);
            if (cachedDataString) {
                const cachedData: CachedCollectionData = JSON.parse(cachedDataString);
                const age = Date.now() - cachedData.timestamp;
                setCacheAge(Math.floor(age / (60 * 1000))); // Convert to minutes
            }
        }, 60000); // Update every minute

        return () => clearInterval(interval);
    }, [isFromCache, cacheKey]);

    return {
        images,
        isLoading,
        error,
        refetch,
        isFromCache,
        cacheAge,
        clearCache
    };
}

// Utility functions for URL generation
export function getCloudinaryUrl(publicId: string, cloudName: string, options: {
    width?: number;
    height?: number;
    quality?: string | number;
    format?: string;
    crop?: string;
    gravity?: string;
} = {}): string {
    // Return empty string if publicId is invalid
    if (!publicId || publicId === 'undefined' || publicId.trim() === '') {
        return '';
    }
    const {
        width,
        height,
        quality = 'auto',
        format,
        crop = 'fill',
        gravity = 'auto'
    } = options;

    const transformations = [];
    
    if (width) transformations.push(`w_${width}`);
    if (height) transformations.push(`h_${height}`);
    if (quality) transformations.push(`q_${quality}`);
    if (crop) transformations.push(`c_${crop}`);
    if (gravity) transformations.push(`g_${gravity}`);
    if (format) transformations.push(`f_${format}`);

    const transformationString = transformations.length > 0 ? `${transformations.join(',')}/` : '';
    
    return `https://res.cloudinary.com/${cloudName}/image/upload/${transformationString}${publicId}`;
}

export function getImageAlt(publicId: string | undefined, context?: Record<string, any>): string {
    // Try to get alt text from context
    if (context?.alt) return context.alt;
    if (context?.caption) return context.caption;
    
    // Generate a readable alt text from public ID
    if (publicId && typeof publicId === 'string') {
        return publicId
            .split('/')
            .pop() // Get the last part (filename)
            ?.replace(/[_-]/g, ' ') // Replace underscores and hyphens with spaces
            ?.replace(/\.[^/.]+$/, '') // Remove file extension
            || 'Cloudinary image';
    }
    
    return 'Cloudinary image';
}
