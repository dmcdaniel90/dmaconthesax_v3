'use client';

import { useState, useEffect } from 'react';
import { measurePerformance, formatMetrics, PerformanceMetrics } from '@/lib/performance-test';

export default function PerformanceTest() {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Wait for page to fully load
    const timer = setTimeout(() => {
      const performanceMetrics = measurePerformance();
      setMetrics(performanceMetrics);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Only render in development mode
  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  if (!metrics) return null;

  const formattedMetrics = formatMetrics(metrics);

  return (
    <div className="fixed top-4 right-4 bg-black/80 text-white p-4 rounded-lg shadow-lg z-50 max-w-sm">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-bold">Performance Metrics</h3>
        <button
          onClick={() => setIsVisible(!isVisible)}
          className="text-xs bg-blue-600 px-2 py-1 rounded hover:bg-blue-700"
        >
          {isVisible ? 'Hide' : 'Show'}
        </button>
      </div>
      
      {isVisible && (
        <div className="text-xs space-y-1">
          {Object.entries(formattedMetrics).map(([key, value]) => (
            <div key={key} className="flex justify-between">
              <span className="text-gray-300">{key}:</span>
              <span className="font-mono">{value}</span>
            </div>
          ))}
        </div>
      )}
      
      <div className="text-xs text-green-400 mt-2">
        Cloudinary Video: Active ✅
      </div>
    </div>
  );
}
