// Cloudinary configuration and utility functions
export const CLOUDINARY_CONFIG = {
  cloudName: 'dllh8yqz8',
  videoDirectory: 'dmaconthesax_website_bg',
  defaultVersion: 'v1755861559'
};

// Video quality presets for different use cases
export const VIDEO_QUALITY_PRESETS = {
  mobile: {
    width: 640,
    height: 360,
    quality: 'low' as const,
    format: 'mp4' as const,
    bitrate: '500k'
  },
  tablet: {
    width: 1024,
    height: 576,
    quality: 'medium' as const,
    format: 'mp4' as const,
    bitrate: '1000k'
  },
  desktop: {
    width: 1920,
    height: 1080,
    quality: 'high' as const,
    format: 'mp4' as const,
    bitrate: '2000k'
  },
  large: {
    width: 2560,
    height: 1440,
    quality: 'high' as const,
    format: 'mp4' as const,
    bitrate: '3000k'
  }
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
  bitrate?: string;
  fps?: number;
  audioCodec?: 'aac' | 'mp3' | 'vorbis';
  videoCodec?: 'h264' | 'h265' | 'vp8' | 'vp9';
} = {}) {
  const {
    width,
    height,
    quality = 'auto',
    format = 'mp4',
    crop = 'fill',
    gravity = 'auto',
    bitrate,
    fps,
    audioCodec,
    videoCodec
  } = options;

  // Base Cloudinary URL
  let url = `https://res.cloudinary.com/${CLOUDINARY_CONFIG.cloudName}/video/upload`;
  
  // Add transformations
  const transformations: string[] = [];
  
  // Size transformations
  if (width && height) {
    transformations.push(`w_${width}`, `h_${height}`);
  }
  
  // Crop and gravity
  if (crop !== 'fill') {
    transformations.push(`c_${crop}`);
  }
  
  if (gravity !== 'auto') {
    transformations.push(`g_${gravity}`);
  }
  
  // Quality optimization
  if (quality === 'auto') {
    transformations.push('q_auto');
  } else {
    transformations.push(`q_${quality}`);
  }
  
  // Format optimization
  if (format === 'hls') {
    transformations.push('f_hls');
  } else if (format === 'webm') {
    transformations.push('f_webm');
  }
  
  // Bitrate control for bandwidth optimization
  if (bitrate) {
    transformations.push(`br_${bitrate}`);
  }
  
  // Frame rate control
  if (fps) {
    transformations.push(`fps_${fps}`);
  }
  
  // Audio codec optimization
  if (audioCodec) {
    transformations.push(`ac_${audioCodec}`);
  }
  
  // Video codec optimization
  if (videoCodec) {
    transformations.push(`vc_${videoCodec}`);
  }
  
  // Add version for cache busting
  transformations.push(CLOUDINARY_CONFIG.defaultVersion);
  
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
 * Get adaptive video URLs based on network conditions
 */
export function getAdaptiveVideoUrls() {
  return {
    slow: getOptimizedVideoUrl({
      width: 640,
      height: 360,
      quality: 'low',
      bitrate: '500k',
      fps: 24
    }),
    medium: getOptimizedVideoUrl({
      width: 1024,
      height: 576,
      quality: 'medium',
      bitrate: '1000k',
      fps: 30
    }),
    fast: getOptimizedVideoUrl({
      width: 1920,
      height: 1080,
      quality: 'high',
      bitrate: '2000k',
      fps: 30
    })
  };
}

/**
 * Get video URLs optimized for different devices and orientations
 */
export function getDeviceOptimizedUrls() {
  return {
    mobilePortrait: getOptimizedVideoUrl({
      width: 375,
      height: 667,
      quality: 'low',
      crop: 'fill',
      gravity: 'center'
    }),
    mobileLandscape: getOptimizedVideoUrl({
      width: 667,
      height: 375,
      quality: 'low',
      crop: 'fill',
      gravity: 'center'
    }),
    tabletPortrait: getOptimizedVideoUrl({
      width: 768,
      height: 1024,
      quality: 'medium',
      crop: 'fill',
      gravity: 'center'
    }),
    tabletLandscape: getOptimizedVideoUrl({
      width: 1024,
      height: 768,
      quality: 'medium',
      crop: 'fill',
      gravity: 'center'
    }),
    desktop: getOptimizedVideoUrl({
      width: 1920,
      height: 1080,
      quality: 'high',
      crop: 'fill',
      gravity: 'center'
    })
  };
}

/**
 * Generate a video URL with custom transformations
 */
export function createCustomVideoUrl(transformations: string[]) {
  let url = `https://res.cloudinary.com/${CLOUDINARY_CONFIG.cloudName}/video/upload`;
  
  if (transformations.length > 0) {
    url += `/${transformations.join(',')}`;
  }
  
  url += `/${CLOUDINARY_CONFIG.defaultVersion}/${CLOUDINARY_CONFIG.videoDirectory}.mp4`;
  
  return url;
}

/**
 * Get video analytics and performance data
 */
export function getVideoAnalyticsUrl() {
  return `https://res.cloudinary.com/${CLOUDINARY_CONFIG.cloudName}/video/upload/fl_attachment:json/${CLOUDINARY_CONFIG.defaultVersion}/${CLOUDINARY_CONFIG.videoDirectory}.mp4`;
}

/**
 * Generate a Cloudinary video URL from a video name (public ID)
 * @param videoName - The public ID of the video in Cloudinary
 * @param options - Optional transformation options
 * @returns Cloudinary video URL
 */
export function getVideoUrl(videoName: string, options: {
  width?: number;
  height?: number;
  quality?: 'auto' | 'low' | 'medium' | 'high';
  format?: 'mp4' | 'webm' | 'hls';
  crop?: 'fill' | 'scale' | 'fit';
  gravity?: 'auto' | 'center' | 'north' | 'south' | 'east' | 'west';
  bitrate?: string;
  fps?: number;
  audioCodec?: 'aac' | 'mp3' | 'vorbis';
  videoCodec?: 'h264' | 'h265' | 'vp8' | 'vp9';
} = {}) {
  const {
    width,
    height,
    quality = 'auto',
    format = 'mp4',
    crop = 'fill',
    gravity = 'auto',
    bitrate,
    fps,
    audioCodec,
    videoCodec
  } = options;

  // Base Cloudinary URL
  let url = `https://res.cloudinary.com/${CLOUDINARY_CONFIG.cloudName}/video/upload`;
  
  // Add transformations
  const transformations: string[] = [];
  
  // Size transformations
  if (width && height) {
    transformations.push(`w_${width}`, `h_${height}`);
  }
  
  // Crop and gravity
  if (crop !== 'fill') {
    transformations.push(`c_${crop}`);
  }
  
  if (gravity !== 'auto') {
    transformations.push(`g_${gravity}`);
  }
  
  // Quality optimization
  if (quality === 'auto') {
    transformations.push('q_auto');
  } else {
    transformations.push(`q_${quality}`);
  }
  
  // Format optimization
  if (format === 'hls') {
    transformations.push('f_hls');
  } else if (format === 'webm') {
    transformations.push('f_webm');
  }
  
  // Bitrate control for bandwidth optimization
  if (bitrate) {
    transformations.push(`br_${bitrate}`);
  }
  
  // Frame rate control
  if (fps) {
    transformations.push(`fps_${fps}`);
  }
  
  // Audio codec optimization
  if (audioCodec) {
    transformations.push(`ac_${audioCodec}`);
  }
  
  // Video codec optimization
  if (videoCodec) {
    transformations.push(`vc_${videoCodec}`);
  }
  
  // Build final URL
  if (transformations.length > 0) {
    url += `/${transformations.join(',')}`;
  }
  
  url += `/${videoName}`;
  
  return url;
}

/**
 * Get responsive video URLs for a specific video name
 */
export function getResponsiveVideoUrls(videoName: string) {
  return {
    mobile: getVideoUrl(videoName, {
      ...VIDEO_QUALITY_PRESETS.mobile,
      crop: 'fill',
      gravity: 'center'
    }),
    tablet: getVideoUrl(videoName, {
      ...VIDEO_QUALITY_PRESETS.tablet,
      crop: 'fill',
      gravity: 'center'
    }),
    desktop: getVideoUrl(videoName, {
      ...VIDEO_QUALITY_PRESETS.desktop,
      crop: 'fill',
      gravity: 'center'
    }),
    large: getVideoUrl(videoName, {
      ...VIDEO_QUALITY_PRESETS.large,
      crop: 'fill',
      gravity: 'center'
    })
  };
}

/**
 * Check if a video URL is valid Cloudinary URL
 */
export function isValidCloudinaryUrl(url: string): boolean {
  return url.includes('res.cloudinary.com') && 
         url.includes(CLOUDINARY_CONFIG.cloudName);
}

/**
 * Extract transformation parameters from a Cloudinary URL
 */
export function extractTransformations(url: string): Record<string, string> {
  const transformations: Record<string, string> = {};
  
  if (!isValidCloudinaryUrl(url)) {
    return transformations;
  }
  
  // Extract transformations from URL path
  const urlParts = url.split('/');
  const transformationIndex = urlParts.findIndex(part => part === 'upload') + 1;
  
  if (transformationIndex < urlParts.length) {
    const transformationString = urlParts[transformationIndex];
    const transformationPairs = transformationString.split(',');
    
    transformationPairs.forEach(pair => {
      const [key, value] = pair.split('_');
      if (key && value) {
        transformations[key] = value;
      }
    });
  }
  
  return transformations;
}

export const IMAGE_QUALITY_PRESETS = {
  mobile: { width: 400, height: 300, quality: 'auto' as const, format: 'auto' as const },
  tablet: { width: 800, height: 600, quality: 'auto' as const, format: 'auto' as const },
  desktop: { width: 1200, height: 900, quality: 'auto' as const, format: 'auto' as const },
  large: { width: 1600, height: 1200, quality: 'auto' as const, format: 'auto' as const }
};

/**
 * Get optimized image URL with transformations
 */
export function getOptimizedImageUrl(options: {
  width: number;
  height: number;
  quality: 'auto' | 'low' | 'medium' | 'high';
  format: 'auto' | 'webm' | 'jpg' | 'png';
  imageName: string;
  crop?: 'fill' | 'scale' | 'fit';
  gravity?: 'auto' | 'center' | 'north' | 'south' | 'east' | 'west';
}) {
  // Base Cloudinary URL
  let url = `https://res.cloudinary.com/${CLOUDINARY_CONFIG.cloudName}/image/upload`;
  
  // Add transformations
  const transformations: string[] = [];
  
  // Size transformations
  transformations.push(`w_${options.width}`, `h_${options.height}`);
  
  // Crop and gravity - only add if they have valid values
  if (options.crop && options.crop !== 'fill') {
    transformations.push(`c_${options.crop}`);
  }
  
  if (options.gravity && options.gravity !== 'auto') {
    transformations.push(`g_${options.gravity}`);
  }
  
  // Quality optimization
  if (options.quality === 'auto') {
    transformations.push('q_auto');
  } else {
    transformations.push(`q_${options.quality}`);
  }
  
  // Format optimization
  if (options.format === 'auto') {
    transformations.push('f_auto');
  } else {
    transformations.push(`f_${options.format}`);
  }
  
  // Build final URL
  if (transformations.length > 0) {
    url += `/${transformations.join(',')}`;
  }
  
  url += `/${options.imageName}`;
  
  return url;
}

/**
 * Get responsive image URLs for different screen sizes
 */
export function getResponsiveImageUrls(imageName: string) {
  return {
    mobile: getOptimizedImageUrl({
      ...IMAGE_QUALITY_PRESETS.mobile,
      imageName
    }),
    tablet: getOptimizedImageUrl({
      ...IMAGE_QUALITY_PRESETS.tablet,
      imageName
    }),
    desktop: getOptimizedImageUrl({
      ...IMAGE_QUALITY_PRESETS.desktop,
      imageName
    }),
    large: getOptimizedImageUrl({
      ...IMAGE_QUALITY_PRESETS.large,
      imageName
    })
  };
}

/**
 * Get a specific responsive image URL
 */
export function getResponsiveImageUrl(imageName: string, preset: keyof typeof IMAGE_QUALITY_PRESETS = 'desktop') {
  const presets = getResponsiveImageUrls(imageName);
  return presets[preset];
}
