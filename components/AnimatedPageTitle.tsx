'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface AnimatedPageTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  delay?: number;
}

export default function AnimatedPageTitle({
  title,
  subtitle,
  className = '',
  titleClassName = '',
  subtitleClassName = '',
  delay = 0
}: AnimatedPageTitleProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // Split title into words for individual animation
  const titleWords = title.split(' ');

  return (
    <div className={`text-center ${className}`}>
      <div className="max-w-4xl mx-auto">
        {/* Decorative line */}
        <motion.div
          className="w-24 h-1 bg-gradient-to-r from-transparent via-[#02ACAC] to-transparent mx-auto mb-8"
          initial={prefersReducedMotion ? { opacity: 0 } : { scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ 
            duration: prefersReducedMotion ? 0 : 0.8, 
            delay: prefersReducedMotion ? 0 : delay + 0.2,
            ease: [0.4, 0.0, 0.2, 1]
          }}
        />

        {/* Animated Title */}
        <motion.h1 
          className={`text-4xl sm:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-black tracking-tight leading-tight mb-6 text-white ${titleClassName}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.3, delay: prefersReducedMotion ? 0 : delay + 0.4 }}
        >
          <span className="drop-shadow-lg">
            {titleWords.map((word, index) => (
              <motion.span
                key={index}
                className="inline-block mr-4 last:mr-0"
                style={{
                  background: 'linear-gradient(to right, #ffffff, #02ACAC)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  color: 'transparent'
                }}
                initial={prefersReducedMotion ? { opacity: 0 } : { 
                  opacity: 0,
                  x: -100,
                  clipPath: 'inset(0 100% 0 0)'
                }}
                animate={{ 
                  opacity: 1,
                  x: 0,
                  clipPath: 'inset(0 0% 0 0)'
                }}
                transition={{ 
                  duration: prefersReducedMotion ? 0 : 0.8,
                  delay: prefersReducedMotion ? 0 : delay + 0.5 + (index * 0.1),
                  ease: [0.4, 0.0, 0.2, 1]
                }}
              >
                {word}
              </motion.span>
            ))}
          </span>
        </motion.h1>

        {/* Animated Subtitle */}
        {subtitle && (
          <motion.p 
            className={`text-xl sm:text-2xl lg:text-3xl xl:text-4xl text-gray-300 max-w-3xl mx-auto leading-relaxed ${subtitleClassName}`}
            initial={prefersReducedMotion ? { opacity: 0 } : { 
              x: -50, 
              opacity: 0 
            }}
            animate={{ 
              x: 0, 
              opacity: 1 
            }}
            transition={{ 
              duration: prefersReducedMotion ? 0 : 0.6,
              delay: prefersReducedMotion ? 0 : delay + 0.8 + (titleWords.length * 0.1),
              ease: [0.4, 0.0, 0.2, 1]
            }}
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </div>
  );
}
