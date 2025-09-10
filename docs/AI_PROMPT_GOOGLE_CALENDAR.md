# AI Prompt for Google Calendar Data Integration

## Purpose
This prompt is designed to request Google Calendar data and transform it into the required schema for the DMAC on the Sax website's event display system.

## Required Output Schema

The AI must output data in the following TypeScript interface format:

```typescript
interface MusicEvents {
    eventName: string;        // Required: Event title/summary
    monthNumber: number;      // Required: Month (1-12)
    day: number;             // Required: Day of month (1-31)
    year: number;            // Required: Full year (e.g., 2025)
    time?: string;           // Optional: Time in "HH:MM AM/PM" format or "All Day"
    location?: string;       // Optional: Event location or "TBA" if not provided
    ticketPrice?: number;    // Optional: Ticket price (default 0 for free events)
    imgSrc?: string;         // Optional: Image URL (empty string if no image)
    imgAltText?: string;     // Optional: Alt text for image (defaults to eventName)
}
```

## AI Prompt Template

```
You are a Google Calendar API integration assistant. Your task is to fetch events from a Google Calendar and transform them into a specific JSON schema for a music events website.

**Calendar Details:**
- Calendar Name: "DMAC on the Sax" (or any calendar containing "dmac" or "sax" in the name)
- Time Range: Next 6 months from current date
- Access: Read-only access to calendar events

**Required Actions:**
1. Authenticate with Google Calendar API using OAuth 2.0
2. Find the "DMAC on the Sax" calendar (or similar named calendar)
3. Fetch all upcoming events for the next 6 months
4. Transform each event into the required MusicEvents schema
5. Return a JSON array of transformed events

**Data Transformation Rules:**

For each Google Calendar event, extract and transform:

- **eventName**: Use `event.summary` (required field)
- **monthNumber**: Extract month from `event.start.dateTime` or `event.start.date` (1-12)
- **day**: Extract day from `event.start.dateTime` or `event.start.date` (1-31)
- **year**: Extract year from `event.start.dateTime` or `event.start.date` (full year)
- **time**: 
  - If `event.start.dateTime` exists: Format as "HH:MM AM/PM" (e.g., "8:00 PM")
  - If only `event.start.date` exists: Set to "All Day"
  - If time is missing: Set to "TBA"
- **location**: 
  - Use `event.location` if provided
  - If empty or null: Set to "TBA"
- **ticketPrice**: 
  - Default to 0 (free event)
  - If price info is in description, extract and convert to number
- **imgSrc**: Always set to empty string "" (no images from Calendar API)
- **imgAltText**: Use `event.summary` (same as eventName)

**Error Handling:**
- If calendar not found: Return empty array []
- If no events found: Return empty array []
- If API authentication fails: Return error message
- If individual event transformation fails: Skip that event and continue

**Output Format:**
Return a JSON array of MusicEvents objects:

```json
[
  {
    "eventName": "Jazz Night at The Blue Note",
    "monthNumber": 8,
    "day": 15,
    "year": 2025,
    "time": "8:00 PM",
    "location": "The Blue Note, New York",
    "ticketPrice": 25,
    "imgSrc": "",
    "imgAltText": "Jazz Night at The Blue Note"
  },
  {
    "eventName": "Saxophone Workshop",
    "monthNumber": 9,
    "day": 8,
    "year": 2025,
    "time": "2:00 PM",
    "location": "Music Academy, London",
    "ticketPrice": 0,
    "imgSrc": "",
    "imgAltText": "Saxophone Workshop"
  }
]
```

**Authentication Requirements:**
- Use OAuth 2.0 with refresh token
- Required scopes: `https://www.googleapis.com/auth/calendar.readonly`
- Environment variables needed:
  - GOOGLE_CLIENT_ID
  - GOOGLE_CLIENT_SECRET
  - GOOGLE_REFRESH_TOKEN
  - GOOGLE_REDIRECT_URI

**Additional Notes:**
- Only include events with valid start dates
- Filter out past events (only future events)
- Handle both all-day events and timed events
- Ensure all required fields are present
- Validate date ranges (monthNumber: 1-12, day: 1-31)
- Sort events chronologically by date

Please fetch the calendar events and return the transformed data in the exact schema specified above.
```

## Usage Instructions

1. **For AI Integration**: Use this prompt when requesting an AI to fetch and transform Google Calendar data
2. **For Manual Implementation**: Use this as a specification for implementing the Google Calendar integration
3. **For Testing**: Use this schema to validate that your calendar API returns the correct format

## Example Implementation Context

This prompt is designed to work with:
- Next.js API routes (`/api/calendar`)
- React hooks (`useGoogleCalendar`)
- EventList component that displays the transformed data
- Pagination and responsive design features

## Validation Checklist

Before using the transformed data, ensure:
- [ ] All events have valid `eventName`, `monthNumber`, `day`, `year`
- [ ] Time format is consistent ("HH:MM AM/PM" or "All Day" or "TBA")
- [ ] Location is either a valid string or "TBA"
- [ ] `ticketPrice` is a number (0 or positive)
- [ ] `imgSrc` is always an empty string
- [ ] `imgAltText` matches `eventName`
- [ ] Events are sorted chronologically
- [ ] Only future events are included
- [ ] JSON is valid and parseable

## Error Scenarios

The AI should handle these scenarios gracefully:
1. **Calendar not found**: Return empty array with log message
2. **No events**: Return empty array
3. **Authentication failure**: Return error response
4. **Invalid event data**: Skip problematic events, continue processing
5. **API rate limiting**: Implement retry logic with exponential backoff
6. **Network errors**: Return appropriate error message

This prompt ensures consistent, reliable data transformation from Google Calendar to your website's event display system.
