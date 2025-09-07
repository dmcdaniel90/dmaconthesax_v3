'use client';

import { useState, useEffect } from 'react';
import { getResponsiveVideoUrls } from '@/lib/cloudinary';

const VideoBackground = () => {
  const [currentVideoUrl, setCurrentVideoUrl] = useState<string>('');

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

    // Update video quality on resize with debouncing
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const newQuality = getOptimalVideoUrl();
        if (newQuality && newQuality !== currentVideoUrl) {
          setCurrentVideoUrl(newQuality);
        }
      }, 250); // Debounce resize events
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    };
  }, []); // Remove currentVideoUrl from dependencies to prevent infinite loops

  // Use the working Cloudinary URL directly as fallback
  const fallbackUrl = "https://res.cloudinary.com/dllh8yqz8/video/upload/v1755861559/dmaconthesax_website_bg.mp4";

  // Always ensure we have a video URL - use fallback if responsive URL is empty
  const videoUrl = currentVideoUrl || fallbackUrl;

  // Don't render video until we have a valid URL
  if (!videoUrl) {
    return null;
  }

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden -z-50 max-w-full">
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
        }}
        onLoadedData={() => {
          console.log('Video data loaded:', videoUrl);
        }}
        onCanPlay={() => {
          console.log('Video can play:', videoUrl);
        }}
        onCanPlayThrough={() => {
          console.log('Video can play through:', videoUrl);
        }}
        onError={(e) => {
          console.error('Video error:', e, 'URL:', videoUrl);
          // Fallback to basic URL if responsive URL fails
          if (videoUrl !== fallbackUrl) {
            console.log('Falling back to:', fallbackUrl);
            setCurrentVideoUrl(fallbackUrl);
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