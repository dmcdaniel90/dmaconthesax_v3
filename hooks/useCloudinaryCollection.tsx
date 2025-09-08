'use client';
import { useState, useEffect, useCallback } from 'react';

interface CloudinaryImage {
    public_id: string;
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

interface UseCloudinaryCollectionOptions {
    cloudName: string;
    tag: string;
    resourceType?: 'image' | 'video' | 'raw' | 'any';
    maxResults?: number;
    enabled?: boolean;
}

interface UseCloudinaryCollectionReturn {
    images: CloudinaryImage[];
    isLoading: boolean;
    error: string | null;
    refetch: () => void;
}

export function useCloudinaryCollection({
    tag,
    maxResults = 100,
    enabled = true
}: UseCloudinaryCollectionOptions): UseCloudinaryCollectionReturn {
    const [images, setImages] = useState<CloudinaryImage[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchImages = useCallback(async () => {
        if (!enabled) return;

        setIsLoading(true);
        setError(null);

        try {
            // Use the Cloudinary MCP tools to fetch images
            const response = await fetch('/api/cloudinary/search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    expression: `tags:${tag}`,
                    maxResults,
                    fields: 'public_id,format,width,height,bytes,url,secure_url,tags,asset_folder,display_name,assetId'
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Cloudinary MCP API response:', data);
            
            // Transform the response to match our interface
            const transformedImages = data.resources?.map((resource: any) => ({
                public_id: resource.public_id || resource.publicId,
                format: resource.format,
                width: resource.width,
                height: resource.height,
                bytes: resource.bytes,
                url: resource.url,
                secure_url: resource.secure_url || resource.secureUrl,
                tags: resource.tags,
                asset_folder: resource.asset_folder || resource.assetFolder,
                display_name: resource.display_name || resource.displayName,
                assetId: resource.assetId
            })) || [];
            
            setImages(transformedImages);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to fetch images';
            console.error('Error fetching Cloudinary images:', err);
            setError(errorMessage);
            setImages([]);
        } finally {
            setIsLoading(false);
        }
    }, [tag, maxResults, enabled]);

    useEffect(() => {
        fetchImages();
    }, [fetchImages]);

    return {
        images,
        isLoading,
        error,
        refetch: fetchImages
    };
}

// Helper function to generate Cloudinary URLs
export const getCloudinaryUrl = (
    image: CloudinaryImage, 
    width: number = 400, 
    height: number = 400,
    cloudName: string = 'dllh8yqz8'
): string => {
    return `https://res.cloudinary.com/${cloudName}/image/upload/w_${width},h_${height},c_fill,q_auto,f_auto/${image.public_id}.${image.format}`;
};

// Helper function to get image alt text
export const getImageAlt = (image: CloudinaryImage, fallback: string = 'Image'): string => {
    return image.public_id.split('/').pop() || fallback;
};
