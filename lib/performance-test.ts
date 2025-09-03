// Performance testing utility for comparing Cloudinary vs local video hosting

export interface PerformanceMetrics {
  // Page Load Metrics
  domContentLoaded: number;
  loadComplete: number;
  totalLoadTime: number;
  
  // Paint Metrics
  firstPaint: number;
  firstContentfulPaint: number;
  
  // Resource Metrics
  totalResources: number;
  totalTransferSize: number;
  
  // Video Metrics
  videoLoadTime: number;
  videoSize: number;
  videoStartTime: number;
  
  // Network Metrics
  videoRequests: number;
  videoStatusCodes: number[];
  
  // Timestamp
  timestamp: number;
}

export interface PerformanceComparison {
  cloudinary: PerformanceMetrics;
  local: PerformanceMetrics;
  improvements: {
    totalLoadTime: number;
    videoLoadTime: number;
    totalTransferSize: number;
    firstPaint: number;
    firstContentfulPaint: number;
  };
}

/**
 * Measure current page performance metrics
 */
export function measurePerformance(): PerformanceMetrics {
  const performance = window.performance;
  const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
  const paint = performance.getEntriesByType('paint');
  const resources = performance.getEntriesByType('resource');
  
  // Find video-related resources
  const videoResources = resources.filter((entry: any) => 
    entry.name.includes('cloudinary') && entry.name.includes('mp4')
  );
  
  // Calculate video metrics
  const videoSize = videoResources.reduce((sum, entry: any) => sum + (entry.transferSize || 0), 0);
  const videoRequests = videoResources.length;
  const videoStatusCodes = videoResources.map((entry: any) => entry.responseStatus || 0);
  
  return {
    domContentLoaded: navigation ? navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart : 0,
    loadComplete: navigation ? navigation.loadEventEnd - navigation.loadEventStart : 0,
    totalLoadTime: navigation ? navigation.loadEventEnd - navigation.startTime : 0,
    firstPaint: paint.find(p => p.name === 'first-paint')?.startTime || 0,
    firstContentfulPaint: paint.find(p => p.name === 'first-contentful-paint')?.startTime || 0,
    totalResources: resources.length,
    totalTransferSize: resources.reduce((sum, entry: any) => sum + (entry.transferSize || 0), 0),
    videoLoadTime: videoResources.length > 0 ? videoResources[0].duration || 0 : 0,
    videoSize,
    videoStartTime: videoResources.length > 0 ? videoResources[0].startTime || 0 : 0,
    videoRequests,
    videoStatusCodes,
    timestamp: Date.now()
  };
}

/**
 * Calculate performance improvements
 */
export function calculateImprovements(cloudinary: PerformanceMetrics, local: PerformanceMetrics): PerformanceComparison['improvements'] {
  return {
    totalLoadTime: local.totalLoadTime - cloudinary.totalLoadTime,
    videoLoadTime: local.videoLoadTime - cloudinary.videoLoadTime,
    totalTransferSize: local.totalTransferSize - cloudinary.totalTransferSize,
    firstPaint: local.firstPaint - cloudinary.firstPaint,
    firstContentfulPaint: local.firstContentfulPaint - cloudinary.firstContentfulPaint
  };
}

/**
 * Format performance metrics for display
 */
export function formatMetrics(metrics: PerformanceMetrics): Record<string, string> {
  return {
    'Total Load Time': `${metrics.totalLoadTime?.toFixed(2) || 'N/A'}ms`,
    'DOM Content Loaded': `${metrics.domContentLoaded?.toFixed(2) || 'N/A'}ms`,
    'First Paint': `${metrics.firstPaint?.toFixed(2) || 'N/A'}ms`,
    'First Contentful Paint': `${metrics.firstContentfulPaint?.toFixed(2) || 'N/A'}ms`,
    'Total Resources': `${metrics.totalResources}`,
    'Total Transfer Size': `${(metrics.totalTransferSize / 1024).toFixed(2)}KB`,
    'Video Load Time': `${metrics.videoLoadTime?.toFixed(2) || 'N/A'}ms`,
    'Video Size': `${(metrics.videoSize / 1024).toFixed(2)}KB`,
    'Video Requests': `${metrics.videoRequests}`,
    'Timestamp': new Date(metrics.timestamp).toLocaleTimeString()
  };
}

/**
 * Generate performance report
 */
export function generatePerformanceReport(comparison: PerformanceComparison): string {
  const { cloudinary, local, improvements } = comparison;
  
  let report = `# Performance Comparison Report\n\n`;
  report += `## Cloudinary Implementation\n`;
  report += `- Total Load Time: ${cloudinary.totalLoadTime?.toFixed(2) || 'N/A'}ms\n`;
  report += `- Video Load Time: ${cloudinary.videoLoadTime?.toFixed(2) || 'N/A'}ms\n`;
  report += `- Total Transfer Size: ${(cloudinary.totalTransferSize / 1024).toFixed(2)}KB\n`;
  report += `- First Paint: ${cloudinary.firstPaint?.toFixed(2) || 'N/A'}ms\n\n`;
  
  report += `## Local File Implementation (Estimated)\n`;
  report += `- Total Load Time: ${local.totalLoadTime?.toFixed(2) || 'N/A'}ms\n`;
  report += `- Video Load Time: ${local.videoLoadTime?.toFixed(2) || 'N/A'}ms\n`;
  report += `- Total Transfer Size: ${(local.totalTransferSize / 1024).toFixed(2)}KB\n`;
  report += `- First Paint: ${local.firstPaint?.toFixed(2) || 'N/A'}ms\n\n`;
  
  report += `## Performance Improvements\n`;
  report += `- Load Time Improvement: ${improvements.totalLoadTime?.toFixed(2) || 'N/A'}ms (${((improvements.totalLoadTime / local.totalLoadTime) * 100)?.toFixed(1) || 'N/A'}%)\n`;
  report += `- Video Load Improvement: ${improvements.videoLoadTime?.toFixed(2) || 'N/A'}ms (${((improvements.videoLoadTime / local.videoLoadTime) * 100)?.toFixed(1) || 'N/A'}%)\n`;
  report += `- Transfer Size Reduction: ${(improvements.totalTransferSize / 1024).toFixed(2)}KB (${((improvements.totalTransferSize / local.totalTransferSize) * 100)?.toFixed(1) || 'N/A'}%)\n`;
  report += `- Paint Improvement: ${improvements.firstPaint?.toFixed(2) || 'N/A'}ms (${((improvements.firstPaint / local.firstPaint) * 100)?.toFixed(1) || 'N/A'}%)\n`;
  
  return report;
}
