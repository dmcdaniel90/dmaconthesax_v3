import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
    cloud_name: 'dllh8yqz8',
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function handleCloudinarySearch(request: NextRequest, searchParams: any) {
    try {
        console.log('Cloudinary search request:', searchParams);

        // Use Cloudinary SDK to search for resources
        const result = await cloudinary.search
            .expression(searchParams.expression || `tags:${searchParams.tag}`)
            .max_results(searchParams.maxResults || 50)
            .next_cursor(searchParams.nextCursor)
            .execute();

        console.log('Cloudinary search result:', {
            totalCount: result.total_count,
            resourcesCount: result.resources?.length,
            nextCursor: result.next_cursor
        });

        // Transform the response to match our expected format
        const transformedResources = result.resources?.map((resource: any) => ({
            assetId: resource.asset_id,
            publicId: resource.public_id,
            assetFolder: resource.asset_folder,
            displayName: resource.display_name || resource.public_id.split('/').pop()?.split('.')[0],
            format: resource.format,
            resourceType: resource.resource_type,
            type: resource.type,
            createdAt: resource.created_at,
            bytes: resource.bytes,
            width: resource.width,
            height: resource.height,
            url: resource.url,
            secureUrl: resource.secure_url,
            status: resource.status,
            tags: resource.tags,
            duration: resource.duration
        })) || [];

        // Create response with appropriate cache headers
        const nextResponse = NextResponse.json({
            totalCount: result.total_count || transformedResources.length,
            time: result.time || 0,
            resources: transformedResources,
            nextCursor: result.next_cursor || null
        });

        // Set cache headers based on resource type
        const isVideoSearch = searchParams.resourceType === 'video' || searchParams.expression?.includes('resource_type:video');
        const cacheMaxAge = isVideoSearch ? 7200 : 3600; // 2 hours for videos, 1 hour for images
        const staleWhileRevalidate = isVideoSearch ? 14400 : 7200; // 4 hours for videos, 2 hours for images

        nextResponse.headers.set('Cache-Control', `public, max-age=${cacheMaxAge}, stale-while-revalidate=${staleWhileRevalidate}`);
        nextResponse.headers.set('Vary', 'Accept-Encoding');
        
        // Generate ETag based on content hash for cache validation
        const contentHash = Buffer.from(JSON.stringify(transformedResources)).toString('base64').slice(0, 16);
        nextResponse.headers.set('ETag', `"${contentHash}"`);
        
        // Set Last-Modified header
        nextResponse.headers.set('Last-Modified', new Date().toUTCString());

        return nextResponse;

    } catch (error) {
        console.error('Error in Cloudinary search API:', error);
        return NextResponse.json(
            { error: 'Failed to fetch resources' },
            { status: 500 }
        );
    }
}

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const params = {
        tag: searchParams.get('tag') || 'production',
        resourceType: searchParams.get('resourceType') || 'image',
        maxResults: parseInt(searchParams.get('maxResults') || '50'),
        cloudName: searchParams.get('cloudName') || 'dllh8yqz8',
        expression: searchParams.get('expression'),
        nextCursor: searchParams.get('nextCursor'),
        forceRefresh: searchParams.get('forceRefresh') === 'true'
    };
    
    return handleCloudinarySearch(request, params);
}

export async function POST(request: NextRequest) {
    const body = await request.json();
    const { expression, maxResults = 50, nextCursor } = body;
    
    return handleCloudinarySearch(request, { expression, maxResults, nextCursor });
}