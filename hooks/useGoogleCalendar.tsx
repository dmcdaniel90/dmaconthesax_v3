'use client';

import { useState, useEffect, useCallback } from 'react';

export interface MusicEvents {
  eventName: string;
  monthNumber: number;
  day: number;
  year: number;
  time?: string;
  location?: string;
  ticketPrice?: number;
  imgSrc?: string;
  imgAltText?: string;
}

interface UseGoogleCalendarReturn {
  events: MusicEvents[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useGoogleCalendar(): UseGoogleCalendarReturn {
  const [events, setEvents] = useState<MusicEvents[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch('/api/calendar', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch events: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      // Validate that we received an array
      if (!Array.isArray(data)) {
        throw new Error('Invalid response format: expected array of events');
      }


      setEvents(data);
      console.log(`✅ Loaded ${data.length} calendar events`);

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      console.error('❌ Error fetching calendar events:', errorMessage);
      setError(errorMessage);
      
      // Set empty array on error to prevent crashes
      setEvents([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refetch = useCallback(() => {
    fetchEvents();
  }, [fetchEvents]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  return {
    events,
    isLoading,
    error,
    refetch,
  };
}
