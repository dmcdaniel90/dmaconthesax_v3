'use client';

import { useEffect, useRef } from 'react';

interface CloudinaryPlayerProps {
  publicId: string;
  videoUrl?: string; // Add optional direct video URL
  cloudName?: string;
  profile?: string;
  className?: string;
  onPlay?: () => void;
}

export default function CloudinaryPlayer({
  publicId,
  videoUrl,
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
      // Detect if we're on iPhone/iOS - declare early to avoid hoisting issues
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
      
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
          
          // iPhone/iOS Safari specific attributes
          videoElement.setAttribute('webkit-playsinline', 'true');
          videoElement.setAttribute('playsinline', 'true');
          videoElement.setAttribute('x-webkit-airplay', 'allow');
          videoElement.setAttribute('x-webkit-airplay', 'allow');
          videoElement.autoplay = false; // Explicitly disable autoplay
          
          // Additional mobile compatibility attributes
          videoElement.setAttribute('crossorigin', 'anonymous');
          videoElement.setAttribute('allowfullscreen', 'true');
          videoElement.setAttribute('webkitallowfullscreen', 'true');
          videoElement.setAttribute('mozallowfullscreen', 'true');
          
          // iPhone specific: Ensure proper video loading
          videoElement.setAttribute('preload', 'metadata');
          videoElement.setAttribute('webkit-playsinline', 'true');
          
          // iPhone specific: Add user interaction event listener
          const handleUserInteraction = () => {
            console.log('User interaction detected, enabling video playback');
            videoElement.removeAttribute('muted');
            // Remove the event listener after first interaction
            document.removeEventListener('touchstart', handleUserInteraction);
            document.removeEventListener('click', handleUserInteraction);
          };
          
          // Listen for user interactions to enable video playback on iPhone
          document.addEventListener('touchstart', handleUserInteraction, { once: true });
          document.addEventListener('click', handleUserInteraction, { once: true });
          
          // iPhone specific: Add a tap-to-play overlay if needed
          if (isIOS && containerRef.current) {
            const overlay = document.createElement('div');
            overlay.style.cssText = `
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background: rgba(0, 0, 0, 0.3);
              display: flex;
              align-items: center;
              justify-content: center;
              color: white;
              font-size: 16px;
              z-index: 10;
              pointer-events: none;
              opacity: 0;
              transition: opacity 0.3s ease;
            `;
            overlay.innerHTML = 'Tap to play video';
            containerRef.current.appendChild(overlay);
            
            // Show overlay briefly on iPhone
            setTimeout(() => {
              overlay.style.opacity = '1';
              setTimeout(() => {
                overlay.style.opacity = '0';
                setTimeout(() => {
                  if (overlay.parentNode) {
                    overlay.parentNode.removeChild(overlay);
                  }
                }, 300);
              }, 2000);
            }, 1000);
          }
          
          // Styling
          videoElement.style.width = '100%';
          videoElement.style.height = '100%';
          videoElement.style.objectFit = 'cover';
          containerRef.current.appendChild(videoElement);
          
          // Store reference for cleanup
          videoElementRef.current = videoElement;

          // Initialize player and set source with proper configuration
          console.log('Initializing CloudinaryPlayer with:', { cloudName, publicId });
          
          const player = window.cloudinary.videoPlayer(videoElement, {
            cloudName,
            controls: true,
            muted: false,
            autoplay: false,
            playsinline: true,
            preload: 'metadata',
            // Mobile-specific optimizations
            fluid: true,
            responsive: true,
            // iPhone/iOS specific optimizations
            ...(isIOS && {
              // iOS Safari specific settings
              bigPlayButton: true,
              showJumpControls: false,
              pictureInPictureToggle: false,
              // Ensure proper video format for iOS
              sourceTypes: ['mp4'],
              // iOS Safari works better with specific transformations
              transformation: {
                quality: 'auto',
                format: 'mp4',
                codec: 'h264'
              }
            }),
            // Add mobile-friendly poster options
            posterOptions: {
              publicId: publicId,
              transformation: {
                width: 'auto',
                height: 'auto',
                crop: 'fill',
                quality: 'auto',
                format: 'auto'
              }
            }
          });
          
          // Set the source - use direct URL if provided, otherwise use publicId
          if (videoUrl) {
            // Use the direct video URL with version number
            player.source(videoUrl);
          } else {
            // Fallback to publicId method with iPhone-specific optimizations
            const sourceConfig = {
              publicId: publicId,
              sourceTypes: isIOS ? ['mp4'] : ['mp4', 'webm'],
              // iPhone-specific transformations
              ...(isIOS && {
                transformation: {
                  quality: 'auto',
                  format: 'mp4',
                  codec: 'h264',
                  // Ensure proper sizing for mobile
                  width: 'auto',
                  height: 'auto',
                  crop: 'fill'
                }
              })
            };
            player.source(sourceConfig);
          }

          playerRef.current = player;

          // Add event listeners safely
          if (onPlay && typeof player.on === 'function') {
            player.on('play', onPlay);
          }

          // iPhone-specific event handling
          if (isIOS && typeof player.on === 'function') {
            // Handle iPhone-specific video events
            player.on('loadstart', () => {
              console.log('iPhone: Video load started');
            });
            
            player.on('canplay', () => {
              console.log('iPhone: Video can play');
            });
            
            player.on('error', (error: any) => {
              console.error('iPhone: Video error:', error);
            });
            
            // Handle user interaction for iPhone
            player.on('play', () => {
              console.log('iPhone: Video started playing');
            });
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
                    if (isIOS) {
                      // iPhone/iOS specific fullscreen handling
                      if ((videoElement as any).webkitEnterFullscreen) {
                        (videoElement as any).webkitEnterFullscreen();
                      }
                    } else {
                      // Standard fullscreen for other devices
                      if (videoElement.requestFullscreen) {
                        videoElement.requestFullscreen();
                      } else if ((videoElement as any).webkitRequestFullscreen) {
                        (videoElement as any).webkitRequestFullscreen();
                      }
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
        
        // iPhone fallback: Create a simple HTML5 video element
        if (isIOS && containerRef.current) {
          console.log('Creating iPhone fallback video element');
          const fallbackVideo = document.createElement('video');
          fallbackVideo.controls = true;
          fallbackVideo.playsInline = true;
          fallbackVideo.setAttribute('webkit-playsinline', 'true');
          fallbackVideo.setAttribute('playsinline', 'true');
          fallbackVideo.style.width = '100%';
          fallbackVideo.style.height = '100%';
          fallbackVideo.style.objectFit = 'cover';
          
          // Set video source
          if (videoUrl) {
            fallbackVideo.src = videoUrl;
          } else {
            // Generate iPhone-optimized video URL
            const fallbackUrl = `https://res.cloudinary.com/${cloudName}/video/upload/w_auto,h_auto,c_fill,q_auto,f_mp4,vc_h264/${publicId}.mp4`;
            fallbackVideo.src = fallbackUrl;
          }
          
          containerRef.current.innerHTML = '';
          containerRef.current.appendChild(fallbackVideo);
          
          // Store reference for cleanup
          videoElementRef.current = fallbackVideo;
        }
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
