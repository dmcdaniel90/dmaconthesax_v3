import { NextResponse } from 'next/server';

export async function GET() {
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

    // Fetch events from N8N webhook
    const response = await fetch(webhookUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // Add timeout to prevent hanging requests
      signal: AbortSignal.timeout(20000), // 20 second timeout
    });

    if (!response.ok) {
      throw new Error(`Webhook request failed: ${response.status} ${response.statusText}`);
    }

    const events = await response.json();
    
    // Validate that we received an array
    if (!Array.isArray(events)) {
      throw new Error('Invalid response format: expected array of events');
    }

    console.log(`✅ Successfully fetched ${events.length} events from webhook`);
    return NextResponse.json(events);

  } catch (error) {
    console.error('❌ Error fetching calendar events from webhook:', error);
    return NextResponse.json(
      { error: 'Failed to fetch calendar events' },
      { status: 500 }
    );
  }
}