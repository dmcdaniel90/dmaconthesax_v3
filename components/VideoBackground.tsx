'use client';

import { useState, useEffect } from 'react';
import { getResponsiveVideoUrls, getBackgroundVideoUrl } from '@/lib/cloudinary';

const VideoBackground = () => {
  const [currentVideoUrl, setCurrentVideoUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get responsive video URLs for different screen sizes
    const responsiveUrls = getResponsiveVideoUrls();
    
    // Function to determine the best video quality based on screen size
    const getOptimalVideoUrl = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
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
    setIsLoading(false);

    // Update video quality on resize
    const handleResize = () => {
      const newQuality = getOptimalVideoUrl();
      if (newQuality && newQuality !== currentVideoUrl) {
        setCurrentVideoUrl(newQuality);
        setIsLoading(true);
        // Reset loading state after a short delay
        setTimeout(() => setIsLoading(false), 100);
      }
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Use the working Cloudinary URL directly as fallback
  const fallbackUrl = "https://res.cloudinary.com/dllh8yqz8/video/upload/v1755861559/dmaconthesax_website_bg.mp4";

  // Always ensure we have a video URL - use fallback if responsive URL is empty
  const videoUrl = currentVideoUrl || fallbackUrl;

  // Don't render video until we have a valid URL
  if (!videoUrl) {
    return (
      <div className="fixed inset-0 w-full h-full overflow-hidden -z-50">
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
    <div className="fixed inset-0 w-full h-full overflow-hidden -z-50">
      {/* Loading state */}
      {isLoading && (
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-10">
          <div className="text-white text-lg">Loading video...</div>
        </div>
      )}

      {/* Video element with responsive Cloudinary URLs */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover object-center"
        style={{
          objectPosition: 'center 30%' // Position video to keep performer visible
        }}
        onLoadStart={() => setIsLoading(true)}
        onCanPlay={() => setIsLoading(false)}
        onError={() => {
          // Fallback to basic URL if responsive URL fails
          console.log('Video failed to load, using fallback URL');
          setCurrentVideoUrl(fallbackUrl);
          setIsLoading(false);
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