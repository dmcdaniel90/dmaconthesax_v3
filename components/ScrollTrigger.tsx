'use client';

import { useLayoutEffect, useRef } from 'react';

interface ScrollTriggerProps {
  children: React.ReactNode;
  className?: string;
  scrollBehavior?: 'smooth' | 'instant' | 'auto';
  scrollBlock?: 'start' | 'center' | 'end' | 'nearest';
  scrollInline?: 'start' | 'center' | 'end' | 'nearest';
}

export default function ScrollTrigger({
  children,
  className = '',
  scrollBehavior = 'smooth',
  scrollBlock = 'start',
  scrollInline = 'nearest'
}: ScrollTriggerProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    // Check if scrollRef is not null and scroll into view
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ 
        behavior: scrollBehavior,
        block: scrollBlock,
        inline: scrollInline
      });
    }
  }, []); // Dependency array is empty to run only once on component mount

  return (
    <div ref={scrollRef} className={className}>
      {children}
    </div>
  );
}
