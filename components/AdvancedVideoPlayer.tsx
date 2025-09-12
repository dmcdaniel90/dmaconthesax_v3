'use client';

import { useState, useEffect, useRef } from 'react';
import { 
  createCustomVideoUrl,
  getVideoUrl,
  getResponsiveVideoUrls,
} from '@/lib/cloudinary';

interface VideoQuality {
  label: string;
  url: string;
  width: number;
  height: number;
  quality: string;
}

interface AdvancedVideoPlayerProps {
  videoName: string; // Cloudinary public ID for the video
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  showControls?: boolean;
  showQualitySelector?: boolean;
  showPerformanceMetrics?: boolean;
  className?: string;
}

export default function AdvancedVideoPlayer({
  videoName,
  autoPlay = true,
  loop = true,
  muted = true,
  showControls = false,
  showQualitySelector = false,
  showPerformanceMetrics = false,
  className = ''
}: AdvancedVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentQuality, setCurrentQuality] = useState<VideoQuality | null>(null);
  const [availableQualities, setAvailableQualities] = useState<VideoQuality[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [performanceMetrics, setPerformanceMetrics] = useState({
    loadTime: 0,
    bufferingEvents: 0,
    currentBitrate: 0,
    networkActivity: 0
  });

  // Generate fallback URL using the videoName prop
  const fallbackUrl = getVideoUrl(videoName);

  useEffect(() => {
    // Generate responsive video URLs for the specific video
    const responsiveUrls = getResponsiveVideoUrls(videoName);
    
    const qualities: VideoQuality[] = [
      {
        label: 'Mobile (Low)',
        url: responsiveUrls.mobile,
        width: 640,
        height: 360,
        quality: 'low'
      },
      {
        label: 'Tablet (Medium)',
        url: responsiveUrls.tablet,
        width: 1024,
        height: 576,
        quality: 'medium'
      },
      {
        label: 'Desktop (High)',
        url: responsiveUrls.desktop,
        width: 1920,
        height: 1080,
        quality: 'high'
      },
      {
        label: 'Large (Ultra)',
        url: responsiveUrls.large,
        width: 2560,
        height: 1440,
        quality: 'ultra'
      },
      {
        label: 'Slow Network',
        url: responsiveUrls.mobile, // Use mobile quality for slow networks
        width: 640,
        height: 360,
        quality: 'low'
      },
      {
        label: 'Fast Network',
        url: responsiveUrls.desktop, // Use desktop quality for fast networks
        width: 1920,
        height: 1080,
        quality: 'high'
      },
      {
        label: 'Fallback',
        url: fallbackUrl,
        width: 1920,
        height: 1080,
        quality: 'high'
      }
    ];

    setAvailableQualities(qualities);
    
    // Auto-select best quality based on screen size, with fallback
    const selectOptimalQuality = () => {
      const width = window.innerWidth;
      
      let optimalQuality: VideoQuality;
      
      if (width <= 640) {
        optimalQuality = qualities.find(q => q.label.includes('Mobile')) || qualities[0];
      } else if (width <= 1024) {
        optimalQuality = qualities.find(q => q.label.includes('Tablet')) || qualities[1];
      } else if (width <= 1920) {
        optimalQuality = qualities.find(q => q.label.includes('Desktop')) || qualities[2];
      } else {
        optimalQuality = qualities.find(q => q.label.includes('Large')) || qualities[3];
      }
      
      // Ensure we have a working URL
      if (!optimalQuality || !optimalQuality.url) {
        optimalQuality = qualities.find(q => q.label.includes('Fallback')) || qualities[qualities.length - 1];
      }
      
      setCurrentQuality(optimalQuality);
      return optimalQuality;
    };

    const initialQuality = selectOptimalQuality();
    setCurrentQuality(initialQuality);

    // Handle resize events with debouncing
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        try {
          const newQuality = selectOptimalQuality();
          if (newQuality && newQuality.url !== currentQuality?.url) {
            setCurrentQuality(newQuality);
            if (videoRef.current) {
              videoRef.current.src = newQuality.url;
              videoRef.current.load();
            }
          }
        } catch (error) {
          // Silently handle resize errors to prevent console spam
          console.warn('Resize handler error (handled gracefully):', error);
        }
      }, 250); // Debounce resize events
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  useEffect(() => {
    if (!videoRef.current || !currentQuality) return;

    const video = videoRef.current;
    let loadStartTime = Date.now();

    const handleLoadStart = () => {
      setIsLoading(true);
      setError(null);
      loadStartTime = Date.now();
    };

    const handleCanPlay = () => {
      setIsLoading(false);
      const loadTime = Date.now() - loadStartTime;
      setPerformanceMetrics(prev => ({ ...prev, loadTime }));
    };

    const handleError = (e: Event) => {
      setIsLoading(false);
      
      // Only log error if we're not already using fallback
      if (currentQuality && !currentQuality.label.includes('Fallback')) {
        console.warn('Video quality failed, falling back to default:', currentQuality.label);
      }

      // Fallback to working URL if current quality fails
      if (currentQuality && currentQuality.url !== fallbackUrl) {
        const fallbackQuality = availableQualities.find(q => q.label.includes('Fallback'));
        if (fallbackQuality) {
          setCurrentQuality(fallbackQuality);
          setError(null); // Clear any previous errors when falling back
          if (videoRef.current) {
            videoRef.current.src = fallbackQuality.url;
            videoRef.current.load();
          }
        } else {
          setError('Failed to load video');
          console.error('Video error - no fallback available:', e);
        }
      } else {
        setError('Failed to load video');
        console.error('Video error:', e);
      }
    };

    const handleProgress = () => {
      if (video.buffered.length > 0) {
        const buffered = video.buffered.end(video.buffered.length - 1);
        const current = video.currentTime;
        const bufferingEvents = performanceMetrics.bufferingEvents;
        
        if (buffered < current + 1) {
          setPerformanceMetrics(prev => ({ 
            ...prev, 
            bufferingEvents: bufferingEvents + 1 
          }));
        }
      }
    };

    video.addEventListener('loadstart', handleLoadStart);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('error', handleError);
    video.addEventListener('progress', handleProgress);

    return () => {
      video.removeEventListener('loadstart', handleLoadStart);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('error', handleError);
      video.removeEventListener('progress', handleProgress);
    };
  }, [currentQuality, performanceMetrics.bufferingEvents, availableQualities]);

  const handleQualityChange = (quality: VideoQuality) => {
    setCurrentQuality(quality);
    if (videoRef.current) {
      videoRef.current.src = quality.url;
      videoRef.current.load();
    }
  };

  const handleCustomTransformation = () => {
    if (!currentQuality) return;
    
    // Example: Create a custom transformation with different effects
    const customTransformations = [
      'w_1280',
      'h_720',
      'q_auto',
      'c_fill',
      'g_center'
    ];
    
    const customUrl = createCustomVideoUrl(customTransformations);
    
    // You could apply this URL to the video
    if (videoRef.current) {
      videoRef.current.src = customUrl;
      videoRef.current.load();
    }
  };

  // Don't render until we have a quality selected
  if (!currentQuality) {
    return (
      <div className={`${className} bg-gray-800 flex items-center justify-center`}>
        <div className="text-white">Initializing video player...</div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`} style={{ 
      overflow: 'hidden',
      position: 'relative',
      zIndex: 'auto'
    }}>
      {/* Video Element */}
      <video
        ref={videoRef}
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
        controls={showControls}
        playsInline
        webkit-playsinline="true"
        x5-playsinline="true"
        x5-video-player-type="h5"
        x5-video-player-fullscreen="false"
        className="w-full h-full object-cover"
        style={{
          objectPosition: 'center 30%',
          maxWidth: '100%',
          maxHeight: '100%',
          position: 'relative',
          zIndex: 'auto'
        }}
      >
        <source src={currentQuality.url} type="video/mp4" />
        {/* Fallback source */}
        <source src={fallbackUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-10">
          <div className="text-white text-lg">Loading {currentQuality.label}...</div>
        </div>
      )}

      {/* Error Overlay */}
      {error && (
        <div className="absolute inset-0 bg-red-900/80 flex items-center justify-center z-10">
          <div className="text-white text-center">
            <div className="text-lg font-bold">Error</div>
            <div className="text-sm">{error}</div>
            <button 
              onClick={() => window.location.reload()}
              className="mt-2 px-4 py-2 bg-white text-red-900 rounded hover:bg-gray-100"
            >
              Retry
            </button>
          </div>
        </div>
      )}

      {/* Quality Selector */}
      {showQualitySelector && (
        <div className="absolute top-4 right-4 bg-black/80 text-white p-3 rounded-lg z-20">
          <div className="text-sm font-bold mb-2">Video Quality</div>
          <select
            value={currentQuality.label}
            onChange={(e) => {
              const quality = availableQualities.find(q => q.label === e.target.value);
              if (quality) handleQualityChange(quality);
            }}
            className="bg-white text-black text-sm px-2 py-1 rounded w-full"
          >
            {availableQualities.map((quality) => (
              <option key={quality.label} value={quality.label}>
                {quality.label} ({quality.width}x{quality.height})
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Performance Metrics */}
      {showPerformanceMetrics && (
        <div className="absolute bottom-4 left-4 bg-black/80 text-white p-3 rounded-lg text-xs z-20">
          <div className="font-bold mb-1">Performance</div>
          <div>Load Time: {performanceMetrics.loadTime}ms</div>
          <div>Buffering: {performanceMetrics.bufferingEvents}</div>
          <div>Quality: {currentQuality.label}</div>
          <div>Resolution: {currentQuality.width}x{currentQuality.height}</div>
        </div>
      )}

      {/* Custom Transformation Button */}
      <button
        onClick={handleCustomTransformation}
        className="absolute bottom-4 right-4 bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 z-20"
      >
        Custom Transform
      </button>

      {/* Current Quality Indicator (development only) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="absolute top-4 left-4 bg-black/60 text-white px-2 py-1 rounded text-xs z-20">
          {currentQuality.label}
        </div>
      )}
    </div>
  );
}
