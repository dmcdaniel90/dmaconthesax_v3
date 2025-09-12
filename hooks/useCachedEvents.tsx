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

interface CachedEventsData {
  events: MusicEvents[];
  timestamp: number;
  etag?: string; // For future HTTP cache validation
}

interface UseCachedEventsReturn {
  events: MusicEvents[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
  isFromCache: boolean;
  cacheAge: number; // in minutes
  clearCache: () => void;
}

// Cache configuration
const CACHE_KEY = 'dmac-events-cache';
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes in milliseconds
const MAX_CACHE_AGE = 24 * 60 * 60 * 1000; // 24 hours maximum cache age

// Utility functions for localStorage
const isLocalStorageAvailable = (): boolean => {
  try {
    if (typeof window === 'undefined') return false;
    const test = '__localStorage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch {
    return false;
  }
};

const getCachedEvents = (): CachedEventsData | null => {
  if (!isLocalStorageAvailable()) return null;
  
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) return null;
    
    const parsed: CachedEventsData = JSON.parse(cached);
    
    // Validate cache structure
    if (!parsed.events || !Array.isArray(parsed.events) || !parsed.timestamp) {
      console.warn('Invalid cache structure, clearing cache');
      localStorage.removeItem(CACHE_KEY);
      return null;
    }
    
    // Check if cache is too old (beyond max age)
    const now = Date.now();
    if (now - parsed.timestamp > MAX_CACHE_AGE) {
      console.log('Cache expired (beyond max age), clearing');
      localStorage.removeItem(CACHE_KEY);
      return null;
    }
    
    return parsed;
  } catch (error) {
    console.error('Error reading cache:', error);
    localStorage.removeItem(CACHE_KEY);
    return null;
  }
};

const setCachedEvents = (events: MusicEvents[], etag?: string): void => {
  if (!isLocalStorageAvailable()) return;
  
  try {
    const cacheData: CachedEventsData = {
      events,
      timestamp: Date.now(),
      etag,
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
    if (process.env.NODE_ENV === 'development') {
      console.log(`✅ Cached ${events.length} events to localStorage`);
    }
  } catch (error) {
    console.error('Error writing to cache:', error);
  }
};

const clearCachedEvents = (): void => {
  if (!isLocalStorageAvailable()) return;
  try {
  localStorage.removeItem(CACHE_KEY);
  if (process.env.NODE_ENV === 'development') {
    console.log('🗑️ Cleared events cache');
  }
  } catch (error) {
    console.error('Error clearing cache:', error);
  }
};

const isCacheValid = (cacheData: CachedEventsData): boolean => {
  const now = Date.now();
  return (now - cacheData.timestamp) < CACHE_DURATION;
};

const getCacheAge = (cacheData: CachedEventsData): number => {
  return Math.round((Date.now() - cacheData.timestamp) / (60 * 1000)); // minutes
};

export function useCachedEvents(): UseCachedEventsReturn {
  const [events, setEvents] = useState<MusicEvents[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFromCache, setIsFromCache] = useState(false);
  const [cacheAge, setCacheAge] = useState(0);

  const fetchEvents = useCallback(async (forceRefresh = false) => {
    try {
      setIsLoading(true);
      setError(null);

      // Check cache first (unless force refresh)
      if (!forceRefresh) {
        const cachedData = getCachedEvents();
        if (cachedData && isCacheValid(cachedData)) {
          if (process.env.NODE_ENV === 'development') {
            console.log(`📦 Loading ${cachedData.events.length} events from cache`);
          }
          setEvents(cachedData.events);
          setIsFromCache(true);
          setCacheAge(getCacheAge(cachedData));
          setIsLoading(false);
          return;
        }
      }

      // Fetch from API
      if (process.env.NODE_ENV === 'development') {
        console.log('🌐 Fetching events from API...');
      }
      setIsFromCache(false);
      
      const response = await fetch('/api/calendar', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        // Add cache headers for future HTTP caching
        cache: 'no-cache',
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch events: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      // Validate response
      if (!Array.isArray(data)) {
        throw new Error('Invalid response format: expected array of events');
      }

      // Update state
      setEvents(data);
      setCacheAge(0);
      
      // Cache the results
      const etag = response.headers.get('etag') || undefined;
      setCachedEvents(data, etag);
      
      if (process.env.NODE_ENV === 'development') {
        console.log(`✅ Loaded ${data.length} events from API`);
      }

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      console.error('❌ Error fetching events:', errorMessage);
      setError(errorMessage);
      
      // Try to fallback to stale cache if available
      const cachedData = getCachedEvents();
      if (cachedData && cachedData.events.length > 0) {
        if (process.env.NODE_ENV === 'development') {
          console.log('🔄 Falling back to stale cache due to API error');
        }
        setEvents(cachedData.events);
        setIsFromCache(true);
        setCacheAge(getCacheAge(cachedData));
        setError(`Using cached data (${errorMessage})`);
      } else {
        setEvents([]);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refetch = useCallback(() => {
    fetchEvents(true); // Force refresh
  }, [fetchEvents]);

  const clearCache = useCallback(() => {
    clearCachedEvents();
    // Optionally refetch immediately
    fetchEvents(true);
  }, [fetchEvents]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  return {
    events,
    isLoading,
    error,
    refetch,
    isFromCache,
    cacheAge,
    clearCache,
  };
}
