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
    assetFolder?: string; // Primary field name
    asset_folder?: string; // Keep for compatibility
    displayName?: string; // Primary field name
    display_name?: string; // Keep for compatibility
    duration?: number;
}

interface UseCloudinaryVideoCollectionOptions {
    cloudName: string;
    tag: string;
    resourceType?: 'video' | 'image' | 'raw' | 'any';
    maxResults?: number;
    enabled?: boolean;
}

interface UseCloudinaryVideoCollectionReturn {
    videos: CloudinaryVideo[];
    isLoading: boolean;
    error: string | null;
    refetch: () => void;
}

export function useCloudinaryVideoCollection({
    tag,
    maxResults = 100,
    enabled = true
}: UseCloudinaryVideoCollectionOptions): UseCloudinaryVideoCollectionReturn {
    const [videos, setVideos] = useState<CloudinaryVideo[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchVideos = useCallback(async () => {
        if (!enabled) return;

        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/cloudinary/search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    expression: `resource_type:video AND tags:${tag}`,
                    maxResults,
                    fields: 'public_id,format,width,height,bytes,url,secure_url,tags,asset_folder,display_name,assetId,duration'
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Cloudinary Video API response:', data);

            const transformedVideos = data.resources?.map((resource: any) => ({
                publicId: resource.public_id || resource.publicId,
                public_id: resource.public_id || resource.publicId, // Keep both for compatibility
                format: resource.format,
                width: resource.width,
                height: resource.height,
                bytes: resource.bytes,
                url: resource.url,
                secure_url: resource.secure_url || resource.secureUrl,
                secureUrl: resource.secure_url || resource.secureUrl, // Keep both for compatibility
                tags: resource.tags,
                asset_folder: resource.asset_folder || resource.assetFolder,
                assetFolder: resource.asset_folder || resource.assetFolder, // Keep both for compatibility
                display_name: resource.display_name || resource.displayName,
                displayName: resource.display_name || resource.displayName, // Keep both for compatibility
                assetId: resource.assetId,
                duration: resource.duration
            })) || [];

            setVideos(transformedVideos);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to fetch videos';
            console.error('Error fetching Cloudinary videos:', err);
            setError(errorMessage);
            setVideos([]);
        } finally {
            setIsLoading(false);
        }
    }, [tag, maxResults, enabled]);

    useEffect(() => {
        fetchVideos();
    }, [fetchVideos]);

    return {
        videos,
        isLoading,
        error,
        refetch: fetchVideos
    };
}

export const getCloudinaryVideoUrl = (
    video: CloudinaryVideo,
    width: number = 800,
    height: number = 450,
    cloudName: string = 'dllh8yqz8'
): string => {
    // Detect if we're on iPhone/iOS
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    
    if (isIOS) {
        // iPhone-specific video URL with H.264 codec and optimized settings
        return `https://res.cloudinary.com/${cloudName}/video/upload/w_${width},h_${height},c_fill,q_auto,f_mp4,vc_h264/${video.public_id}.${video.format}`;
    } else {
        // Standard video URL for other devices
        return `https://res.cloudinary.com/${cloudName}/video/upload/w_${width},h_${height},c_fill,q_auto,f_auto/${video.public_id}.${video.format}`;
    }
};

export const getCloudinaryVideoPoster = (
    video: CloudinaryVideo,
    width: number = 800,
    height: number = 450,
    cloudName: string = 'dllh8yqz8'
): string => {
    // Generate a poster image from the video (scaled down for better performance)
    const posterWidth = Math.min(width, 400); // Cap at 400px for better performance
    const posterHeight = Math.min(height, 225); // Maintain aspect ratio
    return `https://res.cloudinary.com/${cloudName}/video/upload/w_${posterWidth},h_${posterHeight},c_fill,q_auto,f_auto,so_0/${video.public_id}.jpg`;
};

export const getVideoAlt = (video: CloudinaryVideo, fallback: string = 'Video'): string => {
    return video.public_id.split('/').pop() || fallback;
};
