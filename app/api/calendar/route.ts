import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    console.log('📅 Fetching calendar events from N8N webhook...');
    
    // Get the N8N webhook URL from environment variables
    const webhookUrl = process.env.N8N_GOOGLE_CALENDAR_URL;
    
    if (!webhookUrl) {
      console.error('❌ N8N_GOOGLE_CALENDAR_URL environment variable not set');
      return NextResponse.json(
        { error: 'Calendar webhook URL not configured' },
        { status: 500 }
      );
    }

    // Prepare headers for the webhook request
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    // Add conditional request headers if available
    const ifNoneMatch = request.headers.get('if-none-match');
    const ifModifiedSince = request.headers.get('if-modified-since');
    
    if (ifNoneMatch) {
      headers['if-none-match'] = ifNoneMatch;
    }
    if (ifModifiedSince) {
      headers['if-modified-since'] = ifModifiedSince;
    }

    // Fetch events from N8N webhook
    const response = await fetch(webhookUrl, {
      method: 'GET',
      headers,
      // Add timeout to prevent hanging requests
      signal: AbortSignal.timeout(20000), // 20 second timeout
    });

    if (!response.ok) {
      throw new Error(`Webhook request failed: ${response.status} ${response.statusText}`);
    }

    // Handle 304 Not Modified response
    if (response.status === 304) {
      return new NextResponse(null, { status: 304 });
    }

    const events = await response.json();
    
    // Validate that we received an array
    if (!Array.isArray(events)) {
      throw new Error('Invalid response format: expected array of events');
    }

    // Create response with appropriate cache headers
    const nextResponse = NextResponse.json(events);
    
    // Set cache headers to help with HTTP caching
    nextResponse.headers.set('Cache-Control', 'public, max-age=1800, stale-while-revalidate=3600'); // 30 min cache, 1 hour stale
    nextResponse.headers.set('Vary', 'Accept-Encoding');
    
    // Forward ETag if available
    const etag = response.headers.get('etag');
    if (etag) {
      nextResponse.headers.set('ETag', etag);
    }
    
    // Forward Last-Modified if available
    const lastModified = response.headers.get('last-modified');
    if (lastModified) {
      nextResponse.headers.set('Last-Modified', lastModified);
    }

    console.log(`✅ Successfully fetched ${events.length} events from webhook`);
    return nextResponse;

  } catch (error) {
    console.error('❌ Error fetching calendar events from webhook:', error);
    return NextResponse.json(
      { error: 'Failed to fetch calendar events' },
      { status: 500 }
    );
  }
}