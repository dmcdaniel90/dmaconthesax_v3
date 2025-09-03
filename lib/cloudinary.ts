// Cloudinary configuration and utility functions
export const CLOUDINARY_CONFIG = {
  cloudName: 'dllh8yqz8',
  videoDirectory: 'dmaconthesax_website_bg'
};

/**
 * Generate optimized Cloudinary video URL with transformations
 * @param options - Video transformation options
 * @returns Optimized Cloudinary video URL
 */
export function getOptimizedVideoUrl(options: {
  width?: number;
  height?: number;
  quality?: 'auto' | 'low' | 'medium' | 'high';
  format?: 'mp4' | 'webm' | 'hls';
  crop?: 'fill' | 'scale' | 'fit';
  gravity?: 'auto' | 'center' | 'north' | 'south' | 'east' | 'west';
} = {}) {
  const {
    width,
    height,
    quality = 'auto',
    format = 'mp4',
    crop = 'fill',
    gravity = 'auto'
  } = options;

  // Base Cloudinary URL
  let url = `https://res.cloudinary.com/${CLOUDINARY_CONFIG.cloudName}/video/upload`;
  
  // Add transformations
  const transformations: string[] = [];
  
  if (width && height) {
    transformations.push(`w_${width}`, `h_${height}`);
  }
  
  if (crop !== 'fill') {
    transformations.push(`c_${crop}`);
  }
  
  if (gravity !== 'auto') {
    transformations.push(`g_${gravity}`);
  }
  
  // Add quality optimization
  if (quality === 'auto') {
    transformations.push('q_auto');
  } else {
    transformations.push(`q_${quality}`);
  }
  
  // Add format optimization
  if (format === 'hls') {
    transformations.push('f_hls');
  } else if (format === 'webm') {
    transformations.push('f_webm');
  }
  
  // Add version for cache busting
  transformations.push('v1755861559');
  
  // Build final URL
  if (transformations.length > 0) {
    url += `/${transformations.join(',')}`;
  }
  
  url += `/${CLOUDINARY_CONFIG.videoDirectory}.mp4`;
  
  return url;
}

/**
 * Get the background video URL with optimal settings for website background
 */
export function getBackgroundVideoUrl() {
  return getOptimizedVideoUrl({
    quality: 'auto',
    format: 'mp4',
    crop: 'fill',
    gravity: 'auto'
  });
}

/**
 * Get responsive video URLs for different screen sizes
 */
export function getResponsiveVideoUrls() {
  return {
    mobile: getOptimizedVideoUrl({ width: 640, height: 360, quality: 'medium' }),
    tablet: getOptimizedVideoUrl({ width: 1024, height: 576, quality: 'auto' }),
    desktop: getOptimizedVideoUrl({ width: 1920, height: 1080, quality: 'auto' }),
    large: getOptimizedVideoUrl({ width: 2560, height: 1440, quality: 'auto' })
  };
}
