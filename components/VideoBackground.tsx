'use client';

import { useState, useEffect } from 'react';
import { getResponsiveVideoUrls } from '@/lib/cloudinary';

const VideoBackground = () => {
  const [currentVideoUrl, setCurrentVideoUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Get responsive video URLs for different screen sizes
    const responsiveUrls = getResponsiveVideoUrls('dmaconthesax_website_bg');
    
    // Function to determine the best video quality based on screen size
    const getOptimalVideoUrl = () => {
      const width = window.innerWidth;
      
      if (width <= 640) {
        return responsiveUrls.mobile; // Lower quality for mobile
      } else if (width <= 1024) {
        return responsiveUrls.tablet; // Medium quality for tablets
      } else if (width <= 1920) {
        return responsiveUrls.desktop; // High quality for desktop
      } else {
        return responsiveUrls.large; // Ultra quality for large screens
      }
    };

    // Set initial video URL immediately
    const initialUrl = getOptimalVideoUrl();
    setCurrentVideoUrl(initialUrl);
    setIsLoading(true); // Start with loading true, let video events control it
    setHasError(false);

    // Add timeout to prevent infinite loading
    const loadingTimeout = setTimeout(() => {
      console.warn('Video loading timeout, falling back to fallback URL');
      if (initialUrl !== fallbackUrl) {
        setCurrentVideoUrl(fallbackUrl);
      } else {
        setIsLoading(false);
        setHasError(true);
      }
    }, 10000); // 10 second timeout

    // Update video quality on resize with debouncing
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const newQuality = getOptimalVideoUrl();
        if (newQuality && newQuality !== currentVideoUrl) {
          setCurrentVideoUrl(newQuality);
          setIsLoading(true);
        }
      }, 250); // Debounce resize events
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
      clearTimeout(loadingTimeout);
    };
  }, []); // Remove currentVideoUrl from dependencies to prevent infinite loops

  // Use the working Cloudinary URL directly as fallback
  const fallbackUrl = "https://res.cloudinary.com/dllh8yqz8/video/upload/v1755861559/dmaconthesax_website_bg.mp4";

  // Always ensure we have a video URL - use fallback if responsive URL is empty
  const videoUrl = currentVideoUrl || fallbackUrl;

  // Don't render video until we have a valid URL
  if (!videoUrl) {
    return (
      <div className="fixed inset-0 w-full h-full overflow-hidden -z-50 max-w-full">
        {/* Loading state while determining video URL */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/40 flex items-center justify-center">
          <div className="text-white text-lg">Initializing video...</div>
        </div>
        
        {/* Dark overlay to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/20"></div>
        
        {/* Subtle top gradient for better header visibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent"></div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden -z-50 max-w-full">
      {/* Loading state */}
      {isLoading && !hasError && (
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-10">
          <div className="text-white text-lg">Loading video...</div>
        </div>
      )}

      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-10">
          <div className="text-white text-center">
            <div className="text-lg mb-2">Video unavailable</div>
            <div className="text-sm opacity-75">Using fallback background</div>
          </div>
        </div>
      )}

      {/* Video element with responsive Cloudinary URLs */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover object-center max-w-full max-h-full"
        style={{
          objectPosition: 'center 30%', // Position video to keep performer visible
          maxWidth: '100vw',
          maxHeight: '100vh'
        }}
        onLoadStart={() => {
          console.log('Video load started:', videoUrl);
          setIsLoading(true);
        }}
        onLoadedData={() => {
          console.log('Video data loaded:', videoUrl);
          setIsLoading(false);
          setHasError(false);
        }}
        onCanPlay={() => {
          console.log('Video can play:', videoUrl);
          setIsLoading(false);
          setHasError(false);
        }}
        onCanPlayThrough={() => {
          console.log('Video can play through:', videoUrl);
          setIsLoading(false);
          setHasError(false);
        }}
        onError={(e) => {
          console.error('Video error:', e, 'URL:', videoUrl);
          // Fallback to basic URL if responsive URL fails
          if (videoUrl !== fallbackUrl) {
            console.log('Falling back to:', fallbackUrl);
            setCurrentVideoUrl(fallbackUrl);
          } else {
            setIsLoading(false);
          }
        }}
        onStalled={() => {
          console.log('Video stalled, retrying...');
        }}
      >
        <source src={videoUrl} type="video/mp4" />
        {/* Fallback source */}
        <source src={fallbackUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dark overlay to ensure text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/20"></div>

      {/* Subtle top gradient for better header visibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent"></div>

      {/* Performance indicator (development only) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="absolute top-4 left-4 bg-black/60 text-white px-2 py-1 rounded text-xs">
          Video: {videoUrl.includes('640') ? 'Mobile' : 
                  videoUrl.includes('1024') ? 'Tablet' : 
                  videoUrl.includes('1920') ? 'Desktop' : 
                  videoUrl.includes('2560') ? 'Large' : 'Fallback'} Quality
        </div>
      )}
    </div>
  );
};

export default VideoBackground;