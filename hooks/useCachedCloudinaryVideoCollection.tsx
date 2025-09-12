'use client';

import { useState, useEffect, useCallback } from 'react';

interface CloudinaryVideo {
    publicId: string; // Primary field name
    public_id: string; // Keep for compatibility
    format: string;
    width: number;
    height: number;
    bytes: number;
    url: string;
    secureUrl: string; // Primary field name
    secure_url: string; // Keep for compatibility
    version?: number;
    created_at?: string;
    tags?: string[];
    context?: Record<string, any>;
    assetId?: string;
    assetFolder?: string;
    asset_folder?: string; // Keep for compatibility
    displayName?: string; // Primary field name
    display_name?: string; // Keep for compatibility
    duration?: number;
}

interface UseCachedCloudinaryVideoCollectionOptions {
    cloudName: string;
    tag: string;
    resourceType?: 'video' | 'image' | 'raw' | 'any';
    maxResults?: number;
    enabled?: boolean;
    cacheDuration?: number; // in milliseconds, default 2 hours (videos change less frequently)
}

interface CachedVideoCollectionData {
    videos: CloudinaryVideo[];
    timestamp: number;
    etag?: string;
}

interface UseCachedCloudinaryVideoCollectionReturn {
    videos: CloudinaryVideo[];
    isLoading: boolean;
    error: string | null;
    refetch: () => void;
    isFromCache: boolean;
    cacheAge: number; // in minutes
    clearCache: () => void;
}

// Default cache duration for videos (longer than images since they change less frequently)
const DEFAULT_VIDEO_CACHE_DURATION = 2 * 60 * 60 * 1000; // 2 hours
const MAX_CACHE_AGE = 24 * 60 * 60 * 1000; // 24 hours maximum cache age

export function useCachedCloudinaryVideoCollection({
    cloudName,
    tag,
    resourceType = 'video',
    maxResults = 100,
    enabled = true,
    cacheDuration = DEFAULT_VIDEO_CACHE_DURATION
}: UseCachedCloudinaryVideoCollectionOptions): UseCachedCloudinaryVideoCollectionReturn {
    const [videos, setVideos] = useState<CloudinaryVideo[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isFromCache, setIsFromCache] = useState(false);
    const [cacheAge, setCacheAge] = useState(0);

    // Generate cache key
    const cacheKey = `cloudinary_videos_${tag}_${cloudName}_${maxResults}`;

    // Transform API response to consistent format
    const transformVideos = useCallback((items: any[]): CloudinaryVideo[] => {
        return items.map((item: any) => {
            // Extract public_id from URL if not present in the item
            let publicId = item.public_id;
            if (!publicId && item.url) {
                // Extract public_id from URL like: http://res.cloudinary.com/dllh8yqz8/video/upload/v1756999626/video_001_endgro.mp4
                const urlParts = item.url.split('/');
                const filename = urlParts[urlParts.length - 1];
                publicId = filename.replace(/\.[^/.]+$/, ''); // Remove file extension
            }
            
            return {
                publicId: publicId,
                public_id: publicId,
                format: item.format,
            width: item.width,
            height: item.height,
            bytes: item.bytes,
            url: item.url,
            secureUrl: item.secure_url,
            secure_url: item.secure_url,
            version: item.version,
            created_at: item.created_at,
            tags: item.tags,
            context: item.context,
            assetId: item.asset_id,
            assetFolder: item.asset_folder,
            asset_folder: item.asset_folder,
            displayName: item.display_name || (publicId ? publicId.split('/').pop()?.split('.')[0] : 'video'),
            display_name: item.display_name || (publicId ? publicId.split('/').pop()?.split('.')[0] : 'video'),
            duration: item.duration,
            };
        });
    }, []);

    // Fetch videos from API
    const fetchVideos = useCallback(async (forceRefresh = false) => {
        if (!enabled) return;

        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(`/api/cloudinary/search?tag=${tag}&resourceType=${resourceType}&maxResults=${maxResults}&cloudName=${cloudName}${forceRefresh ? '&forceRefresh=true' : ''}`);
            
            if (!response.ok) {
                throw new Error(`Failed to fetch videos: ${response.statusText}`);
            }

            const data = await response.json();
            const transformedVideos = transformVideos(data.resources || []);
            
            setVideos(transformedVideos);
            setIsFromCache(false);

            // Cache the data
            const cachedData: CachedVideoCollectionData = {
                videos: transformedVideos,
                timestamp: Date.now(),
                etag: response.headers.get('etag') || undefined
            };
            localStorage.setItem(cacheKey, JSON.stringify(cachedData));

            if (process.env.NODE_ENV === 'development') {
              console.log(`✅ Loaded ${transformedVideos.length} Cloudinary videos from API (tag: ${tag})`);
            }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to fetch videos';
            setError(errorMessage);
            console.error(`❌ Error fetching videos:`, err);
        } finally {
            setIsLoading(false);
        }
    }, [cloudName, tag, resourceType, maxResults, enabled, transformVideos, cacheKey]);

    // Load from cache or fetch fresh data
    const loadData = useCallback(async () => {
        if (!enabled) return;

        try {
            const cachedDataString = localStorage.getItem(cacheKey);
            
            if (cachedDataString) {
                const cachedData: CachedVideoCollectionData = JSON.parse(cachedDataString);
                const now = Date.now();
                const age = now - cachedData.timestamp;

                // Check if cache is still valid
                if (age < cacheDuration) {
                    setVideos(cachedData.videos);
                    setIsFromCache(true);
                    setCacheAge(Math.floor(age / (60 * 1000))); // Convert to minutes
                    if (process.env.NODE_ENV === 'development') {
                      console.log(`📦 Loading ${cachedData.videos.length} Cloudinary videos from cache (tag: ${tag})`);
                    }
                    return;
                }

                // Check if cache is too old (stale)
                if (age > MAX_CACHE_AGE) {
                    localStorage.removeItem(cacheKey);
                    if (process.env.NODE_ENV === 'development') {
                      console.log(`🗑️ Removed stale cache for videos (tag: ${tag})`);
                    }
                }
            }

            // Fetch fresh data
            await fetchVideos();
        } catch (err) {
            console.error(`❌ Error loading videos:`, err);
            await fetchVideos();
        }
    }, [enabled, cacheKey, cacheDuration, fetchVideos, tag]);

    // Refetch function
    const refetch = useCallback(() => {
        fetchVideos(true);
    }, [fetchVideos]);

    // Clear cache function
    const clearCache = useCallback(() => {
        localStorage.removeItem(cacheKey);
        setVideos([]);
        setIsFromCache(false);
        setCacheAge(0);
        if (process.env.NODE_ENV === 'development') {
          console.log(`🗑️ Cleared cache for videos (tag: ${tag})`);
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
                const cachedData: CachedVideoCollectionData = JSON.parse(cachedDataString);
                const age = Date.now() - cachedData.timestamp;
                setCacheAge(Math.floor(age / (60 * 1000))); // Convert to minutes
            }
        }, 60000); // Update every minute

        return () => clearInterval(interval);
    }, [isFromCache, cacheKey]);

    return {
        videos,
        isLoading,
        error,
        refetch,
        isFromCache,
        cacheAge,
        clearCache
    };
}
