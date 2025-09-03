'use client';

import { useState, useEffect } from 'react';
import { getResponsiveImageUrls } from '@/lib/cloudinary';
import Image from 'next/image';

interface ResponsiveImageProps {
  imageName: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  fallbackSrc?: string;
  style?: React.CSSProperties;
  onLoad?: () => void;
  onError?: () => void;
}

export default function ResponsiveImage({
  imageName,
  alt,
  className = '',
  width,
  height,
  fallbackSrc,
  style,
  onLoad,
  onError
}: ResponsiveImageProps) {
  const [currentSrc, setCurrentSrc] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [, setError] = useState(false);
  const [cacheBuster, setCacheBuster] = useState(Date.now());
  const [hasTriedFallback, setHasTriedFallback] = useState(false);

  const getOptimalImageUrl = () => {
    const responsiveUrls = getResponsiveImageUrls(imageName);
    const screenWidth = window.innerWidth;
    
    if (screenWidth <= 640) {
      return responsiveUrls.mobile;
    } else if (screenWidth <= 1024) {
      return responsiveUrls.tablet;
    } else if (screenWidth <= 1920) {
      return responsiveUrls.desktop;
    } else {
      return responsiveUrls.large;
    }
  };

  useEffect(() => {
    const initialUrl = getOptimalImageUrl();
    setCurrentSrc(initialUrl);
    setError(false);
    setHasTriedFallback(false);
    setIsLoading(true);

    const handleResize = () => {
      const newUrl = getOptimalImageUrl();
      if (newUrl !== currentSrc && !hasTriedFallback) {
        setCurrentSrc(newUrl);
        setIsLoading(true);
      }
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [imageName, currentSrc, hasTriedFallback]);

  // Force refresh when imageName changes (for cache busting)
  useEffect(() => {
    if (imageName) {
      setIsLoading(true);
      setError(false);
      setHasTriedFallback(false);
      setCacheBuster(Date.now());
      
      const timer = setTimeout(() => {
        const newUrl = getOptimalImageUrl();
        setCurrentSrc(newUrl);
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [imageName]);

  const handleImageLoad = () => {
    setIsLoading(false);
    setError(false);
    onLoad?.();
  };

  const handleImageError = () => {
    setIsLoading(false);
    
    // Only try fallback once to prevent infinite loops
    if (fallbackSrc && !hasTriedFallback) {
      setHasTriedFallback(true);
      setCurrentSrc(fallbackSrc);
      setError(false);
      setIsLoading(true);
    } else {
      setError(true);
    }
    onError?.();
  };

  // Don't render anything until we have a valid URL
  if (!currentSrc) {
    return (
      <div className={`${className} bg-gray-200 animate-pulse flex items-center justify-center`}>
        <div className="text-gray-500 text-sm">Initializing...</div>
      </div>
    );
  }

  // If using fallback, don't add cache buster to prevent flickering
  const finalImageSrc = hasTriedFallback ? currentSrc : `${currentSrc}?v=${cacheBuster}`;

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="text-gray-500 text-sm">Loading...</div>
        </div>
      )}
      
      <Image
        src={finalImageSrc}
        alt={alt}
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        width={width}
        height={height}
        style={style}
        onLoad={handleImageLoad}
        onError={handleImageError}
      />
      
      {/* Development indicator */}
      {process.env.NODE_ENV === 'development' && (
        <div className="absolute top-2 left-2 bg-black/60 text-white px-2 py-1 rounded text-xs">
          {hasTriedFallback ? 'Fallback' :
           currentSrc.includes('w_400') ? 'Mobile' :
           currentSrc.includes('w_800') ? 'Tablet' :
           currentSrc.includes('w_1200') ? 'Desktop' :
           currentSrc.includes('w_1600') ? 'Large' : 'Custom'} Quality
        </div>
      )}
    </div>
  );
}
