import { useState, useEffect } from 'react';

interface LandscapeMobileState {
  isLandscapeMobile: boolean;
  orientation: 'portrait' | 'landscape';
  screenHeight: number;
  screenWidth: number;
}

export const useLandscapeMobile = (): LandscapeMobileState => {
  const [state, setState] = useState<LandscapeMobileState>({
    isLandscapeMobile: false,
    orientation: 'portrait',
    screenHeight: 0,
    screenWidth: 0,
  });

  useEffect(() => {
    const checkOrientation = () => {
      const height = window.innerHeight;
      const width = window.innerWidth;
      const isLandscape = width > height;
      const isLandscapeMobile = isLandscape && height <= 500;

      setState({
        isLandscapeMobile,
        orientation: isLandscape ? 'landscape' : 'portrait',
        screenHeight: height,
        screenWidth: width,
      });
    };

    // Check on mount
    checkOrientation();

    // Check on resize and orientation change
    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);

    return () => {
      window.removeEventListener('resize', checkOrientation);
      window.removeEventListener('orientationchange', checkOrientation);
    };
  }, []);

  return state;
};
