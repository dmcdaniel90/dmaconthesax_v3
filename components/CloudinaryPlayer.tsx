'use client';

import { useEffect, useRef } from 'react';

interface CloudinaryPlayerProps {
  publicId: string;
  cloudName?: string;
  profile?: string;
  className?: string;
  onPlay?: () => void;
}

export default function CloudinaryPlayer({
  publicId,
  cloudName = 'dllh8yqz8',
  profile = 'dmac-website-gallery',
  className = '',
  onPlay
}: CloudinaryPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);
  const videoElementRef = useRef<HTMLVideoElement | null>(null);
  const clickHandlerRef = useRef<((event: Event) => void) | null>(null);

  useEffect(() => {
    // Load Cloudinary Video Player script if not already loaded
    const loadCloudinaryScript = () => {
      return new Promise((resolve, reject) => {
        if (window.cloudinary) {
          resolve(window.cloudinary);
          return;
        }

        const script = document.createElement('script');
        script.src = 'https://unpkg.com/cloudinary-video-player@2.0.0/dist/cld-video-player.min.js';
        script.onload = () => resolve(window.cloudinary);
        script.onerror = reject;
        document.head.appendChild(script);

        // Load CSS
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://unpkg.com/cloudinary-video-player@2.0.0/dist/cld-video-player.min.css';
        document.head.appendChild(link);
      });
    };

    const initializePlayer = async () => {
      try {
        await loadCloudinaryScript();
        
        if (containerRef.current && window.cloudinary && publicId) {
          // Dispose existing player if it exists
          if (playerRef.current) {
            try {
              playerRef.current.dispose();
            } catch {
              // Ignore disposal errors
            }
            playerRef.current = null;
          }

          // Clear the container first
          containerRef.current.innerHTML = '';

          // Create a video element with proper sizing and mobile optimizations
          const videoElement = document.createElement('video');
          videoElement.controls = true;
          videoElement.playsInline = true;
          videoElement.muted = false;
          videoElement.preload = 'metadata';
          
          // Mobile-specific attributes to prevent autoplay on scroll
          videoElement.setAttribute('webkit-playsinline', 'true');
          videoElement.setAttribute('playsinline', 'true');
          videoElement.autoplay = false; // Explicitly disable autoplay
          
          // Styling
          videoElement.style.width = '100%';
          videoElement.style.height = '100%';
          videoElement.style.objectFit = 'cover';
          containerRef.current.appendChild(videoElement);
          
          // Store reference for cleanup
          videoElementRef.current = videoElement;

          // Initialize Cloudinary Player with fullscreen and mobile optimizations
          const player = window.cloudinary.videoPlayer(videoElement, {
            cloudName,
            publicId,
            controls: true,
            muted: false,
            autoplay: false,
            preload: 'metadata',
            sourceTypes: ['mp4'],
            posterOptions: {
              transformation: {
                startOffset: 'auto'
              }
            },
            // Ensure controls are always visible
            controlBar: {
              playToggle: true,
              volumePanel: true,
              currentTimeDisplay: true,
              timeDivider: true,
              durationDisplay: true,
              progressControl: true,
              fullscreenToggle: true
            },
            // Mobile-specific settings
            playsinline: true,
            // Fullscreen settings
            fullscreen: {
              iosNative: true // Use native fullscreen on iOS
            }
          });

          playerRef.current = player;

          // Add event listeners safely
          if (onPlay && typeof player.on === 'function') {
            player.on('play', onPlay);
          }

          // Add fullscreen behavior when video starts playing (all devices)
          if (typeof player.on === 'function') {
            player.on('play', () => {
              // Only go fullscreen if not already in fullscreen
              const isAlreadyFullscreen = !!(
                document.fullscreenElement || 
                (document as any).webkitFullscreenElement ||
                (document as any).mozFullScreenElement ||
                (document as any).msFullscreenElement
              );
              
              if (!isAlreadyFullscreen) {
                // Go fullscreen on all devices when playing
                setTimeout(() => {
                  try {
                    if (videoElement.requestFullscreen) {
                      videoElement.requestFullscreen();
                    } else if ((videoElement as any).webkitRequestFullscreen) {
                      (videoElement as any).webkitRequestFullscreen();
                    } else if ((videoElement as any).webkitEnterFullscreen) {
                      // iOS Safari
                      (videoElement as any).webkitEnterFullscreen();
                    }
                  } catch (error) {
                    console.log('Fullscreen request failed:', error);
                  }
                }, 100); // Small delay to ensure video is playing
              }
            });
          }

          // Add click handler to pause/play when video is clicked
          const handleVideoClick = (event: Event) => {
            const isFullscreen = !!(
              document.fullscreenElement || 
              (document as any).webkitFullscreenElement ||
              (document as any).mozFullScreenElement ||
              (document as any).msFullscreenElement
            );
            
            if (isFullscreen) {
              event.stopPropagation();
              // Toggle play/pause when in fullscreen
              if (videoElement.paused) {
                videoElement.play();
              } else {
                videoElement.pause();
              }
            }
          };

          // Store reference and add click listener to video element
          clickHandlerRef.current = handleVideoClick;
          videoElement.addEventListener('click', handleVideoClick);
        }
      } catch (error) {
        console.error('Failed to initialize Cloudinary Video Player:', error);
      }
    };

    initializePlayer();

    // Cleanup function
    return () => {
      // Clean up click event listener
      if (videoElementRef.current && clickHandlerRef.current) {
        videoElementRef.current.removeEventListener('click', clickHandlerRef.current);
        clickHandlerRef.current = null;
        videoElementRef.current = null;
      }
      
      if (playerRef.current) {
        try {
          playerRef.current.dispose();
        } catch {
          // Ignore disposal errors
        }
        playerRef.current = null;
      }
    };
  }, [publicId, cloudName, profile, onPlay]);

  return (
    <div 
      ref={containerRef}
      className={`cloudinary-player-container ${className}`}
      style={{
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        position: 'relative',
        borderRadius: '0.5rem'
      }}
    />
  );
}

// Extend Window interface to include cloudinary
declare global {
  interface Window {
    cloudinary: any;
  }
}
