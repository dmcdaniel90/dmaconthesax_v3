'use client';

import { useLayoutEffect } from 'react';
import { usePathname } from 'next/navigation';

interface HomeScrollTriggerProps {
  isActive: boolean;
  scrollBehavior?: 'smooth' | 'instant' | 'auto';
}

export default function HomeScrollTrigger({
  isActive,
  scrollBehavior = 'smooth'
}: HomeScrollTriggerProps) {
  const pathname = usePathname();
  
  useLayoutEffect(() => {
    // Only scroll to top if this is actually the home page (pathname is "/")
    // Don't scroll when navigating from home to other pages
    if (isActive && pathname === '/') {
      window.scrollTo({
        top: 0,
        behavior: scrollBehavior
      });
    }
  }, [isActive, scrollBehavior, pathname]);

  // This component doesn't render anything visible
  return null;
}
