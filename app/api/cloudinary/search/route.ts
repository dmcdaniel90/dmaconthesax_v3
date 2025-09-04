import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
    cloud_name: 'dllh8yqz8',
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { expression, maxResults = 50, nextCursor } = body;

        console.log('Cloudinary search request:', { expression, maxResults, nextCursor });

        // Use Cloudinary SDK to search for resources
        const result = await cloudinary.search
            .expression(expression || 'tags:production')
            .max_results(maxResults)
            .next_cursor(nextCursor)
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
            tags: resource.tags
        })) || [];

        return NextResponse.json({
            totalCount: result.total_count || transformedResources.length,
            time: result.time || 0,
            resources: transformedResources,
            nextCursor: result.next_cursor || null
        });

    } catch (error) {
        console.error('Error in Cloudinary search API:', error);
        return NextResponse.json(
            { error: 'Failed to fetch images' },
            { status: 500 }
        );
    }
}