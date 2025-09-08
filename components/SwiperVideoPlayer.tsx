'use client';

import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade, Thumbs, FreeMode } from 'swiper/modules';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Grid3X3, LayoutGrid } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import 'swiper/css/thumbs';
import 'swiper/css/free-mode';

interface SwiperVideoPlayerProps {
  videos: Array<{
    id: string;
    publicId: string;
    videoUrl?: string;
    title?: string;
    description?: string;
  }>;
  cloudName?: string;
  className?: string;
  autoplay?: boolean;
  loop?: boolean;
  showControls?: boolean;
  isGridView?: boolean;
  onGridViewToggle?: () => void;
}

export default function SwiperVideoPlayer({
  videos,
  cloudName = 'dllh8yqz8',
  className = '',
  autoplay = false,
  loop = true,
  showControls = true,
  isGridView = false,
  onGridViewToggle
}: SwiperVideoPlayerProps) {
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement }>({});
  const [videoAspectRatios, setVideoAspectRatios] = useState<{ [key: string]: number }>({});
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);


  // Generate optimized Cloudinary URLs
  const getOptimizedVideoUrl = (video: any) => {
    if (video.videoUrl) return video.videoUrl;
    
    // Use Cloudinary transformations for optimal video delivery
    const transformations = [
      'w_auto', // Auto width
      'h_auto', // Auto height
      'c_fill', // Crop to fill
      'q_auto', // Auto quality
      'f_mp4', // MP4 format
      'vc_h264', // H.264 codec for better compatibility
      'ac_none', // No audio codec optimization
      'so_0' // Start at 0 seconds
    ].join(',');
    
    return `https://res.cloudinary.com/${cloudName}/video/upload/${transformations}/${video.publicId}.mp4`;
  };

  // Generate poster image URL using Cloudinary video thumbnail generation
  const getPosterUrl = (video: any) => {
    // Try the simplest approach first - just convert video to JPG
    // This should work for most videos according to Cloudinary docs
    return `https://res.cloudinary.com/${cloudName}/video/upload/${video.publicId}.jpg`;
  };

  // Handle video loaded metadata to get aspect ratio
  const handleVideoLoadedMetadata = (videoId: string, event: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = event.currentTarget;
    const aspectRatio = video.videoWidth / video.videoHeight;
    setVideoAspectRatios(prev => ({
      ...prev,
      [videoId]: aspectRatio
    }));
  };

  // Handle video play/pause
  const handleVideoPlay = (videoId: string) => {
    // Pause all other videos
    Object.entries(videoRefs.current).forEach(([id, videoElement]) => {
      if (id !== videoId && videoElement && !videoElement.paused) {
        videoElement.pause();
      }
    });
  };

  // Handle swiper slide change
  const handleSlideChange = (swiper: any) => {
    setCurrentSlideIndex(swiper.activeIndex);
    
    // Pause all videos
    Object.values(videoRefs.current).forEach((videoElement) => {
      if (videoElement && !videoElement.paused) {
        videoElement.pause();
      }
    });

    // Play current video if autoplay is enabled
    if (autoplay && swiper.activeIndex < videos.length) {
      const currentVideo = videos[swiper.activeIndex];
      const currentVideoElement = videoRefs.current[currentVideo.id];
      if (currentVideoElement) {
        currentVideoElement.play().catch((error: any) => {
          console.log('Autoplay prevented on slide change:', error);
        });
      }
    }
  };

  // Get video container style based on aspect ratio
  const getVideoContainerStyle = (videoId: string) => {
    const aspectRatio = videoAspectRatios[videoId];
    if (!aspectRatio) {
      // Default uniform container (16:9 aspect ratio)
      return {
        aspectRatio: '16/9',
        objectFit: 'cover' as const
      };
    }
    
    return {
      aspectRatio: `${aspectRatio}`,
      objectFit: 'contain' as const
    };
  };

  // Render individual video component
  const renderVideo = (video: any, index: number) => {
    const isCurrentSlide = index === currentSlideIndex;
    const videoUrl = getOptimizedVideoUrl(video);
    const posterUrl = getPosterUrl(video);
    
    return (
      <div key={video.id} className="relative w-full bg-black rounded-lg overflow-hidden">
        {/* Video container with uniform aspect ratio for preview */}
        <div 
          className="relative w-full flex items-center justify-center"
          style={{
            aspectRatio: '16/9' // Uniform container for all videos
          }}
        >
          {/* Custom poster image overlay */}
          <div id={`poster-${video.id}`} className="absolute inset-0 z-10">
            <Image
              src={posterUrl}
              alt={`${video.title} preview`}
              fill
              className="object-cover"
              onError={(e) => {
                // If Cloudinary thumbnail fails, try different approaches
                const target = e.target as HTMLImageElement;
                const currentSrc = target.src;
                
                // Try with start offset at 0 seconds
                if (!currentSrc.includes('so_')) {
                  const withOffset = currentSrc.replace('.jpg', '/so_0.jpg');
                  target.src = withOffset;
                  return;
                }
                
                // Try with different start offset (5 seconds)
                if (currentSrc.includes('so_0')) {
                  const withOffset5 = currentSrc.replace('so_0', 'so_5');
                  target.src = withOffset5;
                  return;
                }
                
                // If all attempts fail, show a placeholder background
                target.style.display = 'none';
                const posterOverlay = document.getElementById(`poster-${video.id}`);
                if (posterOverlay) {
                  posterOverlay.style.background = 'linear-gradient(135deg, #1f2937 0%, #374151 100%)';
                  posterOverlay.style.display = 'flex';
                  posterOverlay.style.alignItems = 'center';
                  posterOverlay.style.justifyContent = 'center';
                  
                  // Add a play icon to the placeholder
                  const playIcon = document.createElement('div');
                  playIcon.innerHTML = `
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="white" style="opacity: 0.7;">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  `;
                  playIcon.style.display = 'flex';
                  playIcon.style.alignItems = 'center';
                  playIcon.style.justifyContent = 'center';
                  playIcon.style.width = '100%';
                  playIcon.style.height = '100%';
                  posterOverlay.appendChild(playIcon);
                }
              }}
            />
            
            {/* Play button overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div 
                className="bg-black/50 rounded-full p-4 hover:bg-black/70 transition-colors cursor-pointer"
                onClick={() => {
                  const videoElement = videoRefs.current[video.id];
                  if (videoElement) {
                    videoElement.play().catch(error => {
                      console.log('Play failed:', error);
                    });
                  }
                }}
              >
                <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            </div>
          </div>
          
          <video
            ref={(el) => {
              if (el) {
                videoRefs.current[video.id] = el;
              }
            }}
            id={`video-${video.id}`}
            className="w-full h-full"
            controls={showControls}
            preload="metadata"
            playsInline
            onLoadedMetadata={(e) => handleVideoLoadedMetadata(video.id, e)}
            onPlay={() => {
              handleVideoPlay(video.id);
              // Hide poster when video starts playing
              const posterOverlay = document.querySelector(`#poster-${video.id}`);
              if (posterOverlay) {
                (posterOverlay as HTMLElement).style.display = 'none';
              }
            }}
            onPause={() => {
              // Show poster when video is paused
              const posterOverlay = document.querySelector(`#poster-${video.id}`);
              if (posterOverlay) {
                (posterOverlay as HTMLElement).style.display = 'block';
              }
            }}
            style={{
              ...getVideoContainerStyle(video.id),
              maxWidth: '100%',
              maxHeight: '100%'
            }}
          >
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          {/* Loading indicator */}
          {!isCurrentSlide && (
            <div className="absolute inset-0 bg-gray-900/50 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#02ACAC]"></div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className={`swiper-video-player ${className}`}>
      {/* Grid View Toggle Button */}
      {onGridViewToggle && (
        <div className="flex items-center justify-end mb-6">
          <Button
            className="w-[200px] h-[48px] hidden md:block bg-[#02ACAC] cursor-pointer hover:bg-background hover:text-foreground transition-colors text-base px-8 py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
            onClick={() => {
              if (onGridViewToggle) {
                onGridViewToggle();
              }
            }}
            aria-label={`Switch to ${isGridView ? "Carousel" : "Grid"} View`}
            tabIndex={0}
          >
            {isGridView ? (
              <div className="flex items-center justify-center">
                <LayoutGrid className="w-4 mr-2" />
                Carousel View
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <Grid3X3 className="w-4 mr-2" />
                Grid View
              </div>
            )}
          </Button>
        </div>
      )}
      
      {isGridView ? (
        // Grid View
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video, index) => renderVideo(video, index))}
        </div>
      ) : (
        // Carousel View
        <>
          {/* Main Video Swiper */}
          <Swiper
            modules={[Navigation, Pagination, Autoplay, EffectFade, Thumbs]}
            spaceBetween={0}
            slidesPerView={1}
            navigation={true}
            pagination={{ 
              clickable: true,
              dynamicBullets: true,
              renderBullet: (index: number, className: string) => {
                return `<span class="${className}">${index + 1}</span>`;
              }
            }}
            autoplay={autoplay ? {
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true
            } : false}
            loop={loop && videos.length > 1}
            effect="fade"
            fadeEffect={{
              crossFade: true
            }}
            thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
            onSlideChange={handleSlideChange}
            className="swiper-video-container"
            style={{
              '--swiper-navigation-color': '#02ACAC',
              '--swiper-pagination-color': '#02ACAC',
              '--swiper-pagination-bullet-inactive-color': 'rgba(255, 255, 255, 0.3)',
              '--swiper-pagination-bullet-inactive-opacity': '0.3'
            } as React.CSSProperties}
          >
            {videos.map((video, index) => (
              <SwiperSlide key={video.id} className="swiper-video-slide">
                {renderVideo(video, index)}
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Thumbnail Swiper */}
          {videos.length > 1 && (
            <div className="mt-4">
              <Swiper
                modules={[FreeMode, Thumbs]}
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                className="thumbs-swiper"
                style={{
                  '--swiper-navigation-color': '#02ACAC',
                  '--swiper-pagination-color': '#02ACAC',
                } as React.CSSProperties}
              >
                {videos.map((video, _index) => {
                  const posterUrl = getPosterUrl(video);
                  
                  return (
                    <SwiperSlide key={video.id} className="swiper-slide">
                      <div className="relative aspect-video overflow-hidden rounded-lg bg-gray-800/50 cursor-pointer">
                        <Image
                          src={posterUrl}
                          alt={`${video.title} thumbnail`}
                          fill
                          style={{ objectFit: "cover" }}
                          className="w-full h-full transition-all duration-200 hover:scale-105"
                          loading="lazy"
                          draggable={false}
                          onError={(e) => {
                            // Fallback for failed thumbnails
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            const container = target.parentElement;
                            if (container) {
                              container.style.background = 'linear-gradient(135deg, #1f2937 0%, #374151 100%)';
                              container.style.display = 'flex';
                              container.style.alignItems = 'center';
                              container.style.justifyContent = 'center';
                              
                              const playIcon = document.createElement('div');
                              playIcon.innerHTML = `
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="white" style="opacity: 0.7;">
                                  <path d="M8 5v14l11-7z"/>
                                </svg>
                              `;
                              container.appendChild(playIcon);
                            }
                          }}
                        />
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          )}
        </>
      )}
    </div>
  );
}