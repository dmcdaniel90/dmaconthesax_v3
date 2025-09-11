'use client';

import { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade, Thumbs, FreeMode } from 'swiper/modules';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Pagination as UIPagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationLink, PaginationNext, PaginationEllipsis } from '@/components/ui/pagination';
import { Grid3X3, LayoutGrid, ChevronLeft, ChevronRight } from 'lucide-react';
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
  cacheStatus?: { isFromCache: boolean; cacheAge: number };
  onCacheRefresh?: () => void;
  onCacheClear?: () => void;
}

export default function SwiperVideoPlayer({
  videos,
  cloudName = 'dllh8yqz8',
  className = '',
  autoplay = false,
  loop: _loop = true,
  showControls = true,
  isGridView = false,
  onGridViewToggle,
  cacheStatus,
  onCacheRefresh,
}: SwiperVideoPlayerProps) {
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement }>({});
  const [videoAspectRatios, setVideoAspectRatios] = useState<{ [key: string]: number }>({});
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [mainSwiper, setMainSwiper] = useState<any>(null);
  const [loadedVideos, setLoadedVideos] = useState<Set<string>>(new Set());
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);
  
  // Device detection
  const [isSmallDevice, setIsSmallDevice] = useState(false);
  const [isMediumDevice, setIsMediumDevice] = useState(false);

  // Device detection effect
  useEffect(() => {
    const checkDeviceSize = () => {
      const width = window.innerWidth;
      setIsSmallDevice(width < 768);
      setIsMediumDevice(width >= 768 && width < 1024);
    };

    checkDeviceSize();
    window.addEventListener('resize', checkDeviceSize);
    return () => window.removeEventListener('resize', checkDeviceSize);
  }, []);

  // Pagination logic
  const carouselItemsPerPage = isSmallDevice ? 4 : isMediumDevice ? 6 : 8; // Desktop: 8, Tablet: 6, Mobile: 4
  const effectiveItemsPerPage = isGridView ? itemsPerPage : carouselItemsPerPage;
  const totalPages = Math.ceil(videos.length / effectiveItemsPerPage);
  const startIndex = (currentPage - 1) * effectiveItemsPerPage;
  const endIndex = startIndex + effectiveItemsPerPage;
  const paginatedVideos = videos.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (page: number) => {
    // Pause all videos before changing pages
    Object.values(videoRefs.current).forEach((videoElement) => {
      if (videoElement && !videoElement.paused) {
        videoElement.pause();
      }
    });
    
    setCurrentPage(page);
    setCurrentSlideIndex(0); // Reset slide index when changing pages
    // Focus management
    setTimeout(() => {
      if (isGridView) {
        // For grid view, focus on the grid container
        const gridContainer = document.querySelector('.swiper-video-player .grid');
        if (gridContainer) {
          (gridContainer as HTMLElement).focus();
          gridContainer.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start', 
            inline: 'nearest' 
          });
        }
      } else {
        // For carousel view, focus on the swiper container and center it
        const swiperContainer = document.querySelector('.swiper-video-player .swiper');
        if (swiperContainer) {
          (swiperContainer as HTMLElement).focus();
          swiperContainer.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center', 
            inline: 'center' 
          });
        }
      }
    }, 100);
  };

  // Handle navigation with pagination integration
  const handleNext = () => {
    // Pause all videos before navigation
    Object.values(videoRefs.current).forEach((videoElement) => {
      if (videoElement && !videoElement.paused) {
        videoElement.pause();
      }
    });
    
    if (isGridView) {
      // In grid view, just go to next page
      if (currentPage < totalPages) {
        handlePageChange(currentPage + 1);
      }
    } else {
      // In carousel view, check if we're at the last slide of current page
      const maxSlideIndex = paginatedVideos.length - 1;
      if (currentSlideIndex < maxSlideIndex) {
        // Move to next slide within current page
        setCurrentSlideIndex(currentSlideIndex + 1);
        if (mainSwiper) {
          mainSwiper.slideNext();
        }
      } else if (currentPage < totalPages) {
        // Go to next page and reset to first slide
        const newPage = currentPage + 1;
        setCurrentPage(newPage);
        setCurrentSlideIndex(0);
        // Update swiper to show first slide of new page
        setTimeout(() => {
          if (mainSwiper) {
            mainSwiper.slideTo(0);
          }
        }, 100);
        // Focus management
        setTimeout(() => {
          const swiperContainer = document.querySelector('.swiper-video-player .swiper');
          if (swiperContainer) {
            (swiperContainer as HTMLElement).focus();
            swiperContainer.scrollIntoView({ 
              behavior: 'smooth', 
              block: 'center', 
              inline: 'center' 
            });
          }
        }, 200);
      }
    }
  };

  const handlePrevious = () => {
    // Pause all videos before navigation
    Object.values(videoRefs.current).forEach((videoElement) => {
      if (videoElement && !videoElement.paused) {
        videoElement.pause();
      }
    });
    
    if (isGridView) {
      // In grid view, just go to previous page
      if (currentPage > 1) {
        handlePageChange(currentPage - 1);
      }
    } else {
      // In carousel view, check if we're at the first slide of current page
      if (currentSlideIndex > 0) {
        // Move to previous slide within current page
        setCurrentSlideIndex(currentSlideIndex - 1);
        if (mainSwiper) {
          mainSwiper.slidePrev();
        }
      } else if (currentPage > 1) {
        // Go to previous page and set to last slide
        const newPage = currentPage - 1;
        setCurrentPage(newPage);
        // Set slide index to last slide of previous page
        setTimeout(() => {
          const prevPageItemsPerPage = isSmallDevice ? 4 : isMediumDevice ? 6 : 8;
          const prevPageVideoCount = Math.min(prevPageItemsPerPage, videos.length - (newPage - 1) * prevPageItemsPerPage);
          setCurrentSlideIndex(prevPageVideoCount - 1);
          if (mainSwiper) {
            mainSwiper.slideTo(prevPageVideoCount - 1);
          }
        }, 100);
        // Focus management
        setTimeout(() => {
          const swiperContainer = document.querySelector('.swiper-video-player .swiper');
          if (swiperContainer) {
            (swiperContainer as HTMLElement).focus();
            swiperContainer.scrollIntoView({ 
              behavior: 'smooth', 
              block: 'center', 
              inline: 'center' 
            });
          }
        }, 200);
      }
    }
  };

  // Reset to page 1 when videos change
  useEffect(() => {
    setCurrentPage(1);
    setCurrentSlideIndex(0);
    setLoadedVideos(new Set()); // Reset loaded videos when videos change
  }, [videos.length, effectiveItemsPerPage, isGridView]);

  // Update items per page based on device size and view
  useEffect(() => {
    if (isGridView) {
      setItemsPerPage(isSmallDevice ? 1 : isMediumDevice ? 4 : 9);
    }
  }, [isGridView, isSmallDevice, isMediumDevice]);

  // In grid view, mark all videos as loaded after a delay to prevent loading spinners
  useEffect(() => {
    if (isGridView && videos.length > 0) {
      const timer = setTimeout(() => {
        const allVideoIds = new Set(videos.map(video => video.id));
        setLoadedVideos(allVideoIds);
      }, 1500); // 1.5 second delay
      return () => clearTimeout(timer);
    }
  }, [isGridView, videos]);

  // Generate optimized Cloudinary URLs
  const getOptimizedVideoUrl = (video: any) => {
    if (video.videoUrl) return video.videoUrl;
    
    // Use simple transformations that are valid for Cloudinary videos
    const transformations = [
      'q_auto', // Auto quality
      'f_mp4' // MP4 format
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
    const isCurrentSlide = isGridView ? true : index === currentSlideIndex;
    const videoUrl = getOptimizedVideoUrl(video);
    const posterUrl = getPosterUrl(video);
    
    return (
      <div 
        key={video.id} 
        className={`relative w-full max-w-full bg-black rounded-lg overflow-hidden ${isGridView ? 'aspect-video' : ''}`}
        tabIndex={0}
        onFocus={(e) => {
          // Center the video when it receives focus
          e.currentTarget.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center', 
            inline: 'center' 
          });
        }}
      >
        {/* Video container with uniform aspect ratio for preview */}
        <div 
          className="relative w-full max-w-full flex items-center justify-center"
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
              className="object-cover max-w-full max-h-full"
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
                    
                    // Request fullscreen on mobile and tablet devices
                    if (isSmallDevice || isMediumDevice) {
                      if (videoElement.requestFullscreen) {
                        videoElement.requestFullscreen().catch((error) => {
                          console.log('Fullscreen request failed:', error);
                        });
                      } else if ((videoElement as any).webkitRequestFullscreen) {
                        (videoElement as any).webkitRequestFullscreen();
                      } else if ((videoElement as any).mozRequestFullScreen) {
                        (videoElement as any).mozRequestFullScreen();
                      } else if ((videoElement as any).msRequestFullscreen) {
                        (videoElement as any).msRequestFullscreen();
                      }
                    }
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
            className="w-full h-full max-w-full max-h-full"
            controls={showControls}
            preload="metadata"
            playsInline={!isSmallDevice && !isMediumDevice}
            onLoadedMetadata={(e) => {
              handleVideoLoadedMetadata(video.id, e);
              // Mark video as loaded
              setLoadedVideos(prev => new Set(prev).add(video.id));
            }}
            onCanPlay={() => {
              // Mark video as ready to play
              setLoadedVideos(prev => new Set(prev).add(video.id));
            }}
            onLoadStart={() => {
              // Remove from loaded videos when loading starts
              setLoadedVideos(prev => {
                const newSet = new Set(prev);
                newSet.delete(video.id);
                return newSet;
              });
            }}
            onPlay={(e) => {
              handleVideoPlay(video.id);
              // Hide poster when video starts playing
              const posterOverlay = document.querySelector(`#poster-${video.id}`);
              if (posterOverlay) {
                (posterOverlay as HTMLElement).style.display = 'none';
              }
              
              // Request fullscreen on mobile and tablet devices
              if (isSmallDevice || isMediumDevice) {
                const videoElement = e.currentTarget;
                if (videoElement.requestFullscreen) {
                  videoElement.requestFullscreen().catch((error) => {
                    console.log('Fullscreen request failed:', error);
                  });
                } else if ((videoElement as any).webkitRequestFullscreen) {
                  (videoElement as any).webkitRequestFullscreen();
                } else if ((videoElement as any).mozRequestFullScreen) {
                  (videoElement as any).mozRequestFullScreen();
                } else if ((videoElement as any).msRequestFullscreen) {
                  (videoElement as any).msRequestFullscreen();
                }
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
          {!isCurrentSlide && !loadedVideos.has(video.id) && (
            <div className="absolute inset-0 bg-gray-900/50 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#02ACAC]"></div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className={`swiper-video-player ${className} pb-8 sm:pb-12 w-full max-w-full overflow-hidden`}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="px-8 sm:px-0 text-xl sm:text-2xl md:text-3xl text-white mb-2 font-bold">Videos</h2>
          <p className="px-8 sm:px-0 text-gray-400">Watch live performances and behind-the-scenes content</p>
          {/* Cache Status Indicator */}
                   <p className="px-8 sm:px-0 text-sm text-gray-400 mt-2">
                     {cacheStatus?.isFromCache ? `📦 Videos last updated (${cacheStatus.cacheAge} min ago)` : '📦 Videos are up to date'} •
                     <button
                       onClick={onCacheRefresh}
                       className="text-gray-400 hover:text-gray-300 ml-1 underline cursor-pointer"
                     >
                       Refresh
                     </button>
                   </p>
        </div>
        <div className="flex items-center gap-2">
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
      </div>
      
      {isGridView ? (
          // Grid View
          <>
            <div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-full overflow-hidden min-h-[400px]" 
            tabIndex={0}
            onFocus={(e) => {
              // Center the grid when it receives focus
              e.currentTarget.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center', 
                inline: 'center' 
              });
            }}
          >
            {paginatedVideos.map((video, index) => {
              const globalIndex = startIndex + index;
              return renderVideo(video, globalIndex);
            })}
          </div>
          
          {/* Grid View Pagination */}
          {totalPages > 1 && (
            <UIPagination className="mt-6 sm:mt-8 text-white">
              <PaginationContent className="flex flex-wrap justify-center gap-1 sm:gap-2 max-w-full overflow-hidden">
                <PaginationItem className="!hidden md:!block">
                  <PaginationPrevious
                    onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                    className={`cursor-pointer text-sm sm:text-base ${currentPage === 1 ? 'pointer-events-none opacity-50' : ''}`}
                    aria-label="Go to previous page"
                  />
                </PaginationItem>

                {(() => {
                  const pages = [];
                  const maxVisiblePages = 7;

                  if (totalPages <= maxVisiblePages) {
                    for (let i = 1; i <= totalPages; i++) {
                      pages.push(i);
                    }
                  } else {
                    if (currentPage <= 4) {
                      for (let i = 1; i <= 5; i++) pages.push(i);
                      pages.push('...');
                      pages.push(totalPages);
                    } else if (currentPage >= totalPages - 3) {
                      pages.push(1);
                      pages.push('...');
                      for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
                    } else {
                      pages.push(1);
                      pages.push('...');
                      for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
                      pages.push('...');
                      pages.push(totalPages);
                    }
                  }

                  return pages.map((page, index) => (
                    <PaginationItem key={`${page}-${index}`}>
                      {page === '...' ? (
                        <PaginationEllipsis className="px-2 py-1 text-gray-400" />
                      ) : (
                        <PaginationLink
                          onClick={() => handlePageChange(page as number)}
                          isActive={currentPage === page}
                          className={`cursor-pointer text-sm sm:text-base px-2 sm:px-3 py-1 ${currentPage === page ? 'text-black' : ''}`}
                        >
                          {page}
                        </PaginationLink>
                      )}
                    </PaginationItem>
                  ));
                })()}

                <PaginationItem className="!hidden md:!block">
                  <PaginationNext
                    onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                    className={`cursor-pointer text-sm sm:text-base ${currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}`}
                    aria-label="Go to next page"
                  />
                </PaginationItem>
              </PaginationContent>
            </UIPagination>
          )}
        </>
      ) : (
        // Carousel View
        <>
          {/* Main Video Swiper */}
          <div 
            className="relative overflow-hidden min-h-[400px]"
            tabIndex={0}
            onFocus={(e) => {
              // Center the swiper when it receives focus
              e.currentTarget.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center', 
                inline: 'center' 
              });
            }}
          >
            <Swiper
              modules={[Navigation, Pagination, Autoplay, EffectFade, Thumbs]}
              spaceBetween={0}
              slidesPerView={1}
              navigation={false}
              pagination={false}
              autoplay={autoplay ? {
                delay: 5000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true
              } : false}
              loop={false}
              effect="fade"
              fadeEffect={{
                crossFade: true
              }}
              thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
              onSwiper={setMainSwiper}
              onSlideChange={(swiper) => {
                setCurrentSlideIndex(swiper.activeIndex);
                // Pause all videos when sliding
                Object.values(videoRefs.current).forEach((videoElement) => {
                  if (videoElement && !videoElement.paused) {
                    videoElement.pause();
                  }
                });
              }}
              className="swiper-video-container"
              style={{
                '--swiper-navigation-color': '#02ACAC',
                '--swiper-pagination-color': '#02ACAC',
                '--swiper-pagination-bullet-inactive-color': 'rgba(255, 255, 255, 0.3)',
                '--swiper-pagination-bullet-inactive-opacity': '0.3'
              } as React.CSSProperties}
            >
              {paginatedVideos.map((video, index) => {
                const globalIndex = startIndex + index;
                return (
                  <SwiperSlide key={video.id} className="swiper-video-slide">
                    {renderVideo(video, globalIndex)}
                  </SwiperSlide>
                );
              })}
            </Swiper>

            {/* Custom Navigation Buttons */}
            <Button
              variant="outline"
              size="icon"
              onClick={handlePrevious}
              disabled={currentPage === 1 && currentSlideIndex === 0}
              className="absolute left-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-gray-900/90 border-gray-600 text-white hover:bg-gray-800/90 active:bg-gray-700/90 z-10 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              aria-label="Previous video"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleNext}
              disabled={currentPage === totalPages && currentSlideIndex === paginatedVideos.length - 1}
              className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-gray-900/90 border-gray-600 text-white hover:bg-gray-800/90 active:bg-gray-700/90 z-10 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              aria-label="Next video"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          {/* Thumbnail Swiper */}
          {paginatedVideos.length > 1 && (
            <div className="mt-4 overflow-hidden">
              <Swiper
                modules={[FreeMode, Thumbs]}
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={isSmallDevice ? 4 : isMediumDevice ? 6 : 8}
                freeMode={true}
                watchSlidesProgress={true}
                className="thumbs-swiper"
                style={{
                  '--swiper-navigation-color': '#02ACAC',
                  '--swiper-pagination-color': '#02ACAC',
                } as React.CSSProperties}
              >
                {paginatedVideos.map((video, _index) => {
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

          {/* Carousel View Pagination */}
          {totalPages > 1 && (
            <UIPagination className="mt-6 sm:mt-8 text-white">
              <PaginationContent className="flex flex-wrap justify-center gap-1 sm:gap-2 max-w-full overflow-hidden">
                <PaginationItem className="!hidden md:!block">
                  <PaginationPrevious
                    onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                    className={`cursor-pointer text-sm sm:text-base ${currentPage === 1 ? 'pointer-events-none opacity-50' : ''}`}
                    aria-label="Go to previous page"
                  />
                </PaginationItem>

                {(() => {
                  const pages = [];
                  const maxVisiblePages = 7;

                  if (totalPages <= maxVisiblePages) {
                    for (let i = 1; i <= totalPages; i++) {
                      pages.push(i);
                    }
                  } else {
                    if (currentPage <= 4) {
                      for (let i = 1; i <= 5; i++) pages.push(i);
                      pages.push('...');
                      pages.push(totalPages);
                    } else if (currentPage >= totalPages - 3) {
                      pages.push(1);
                      pages.push('...');
                      for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
                    } else {
                      pages.push(1);
                      pages.push('...');
                      for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
                      pages.push('...');
                      pages.push(totalPages);
                    }
                  }

                  return pages.map((page, index) => (
                    <PaginationItem key={`${page}-${index}`}>
                      {page === '...' ? (
                        <PaginationEllipsis className="px-2 py-1 text-gray-400" />
                      ) : (
                        <PaginationLink
                          onClick={() => handlePageChange(page as number)}
                          isActive={currentPage === page}
                          className={`cursor-pointer text-sm sm:text-base px-2 sm:px-3 py-1 ${currentPage === page ? 'text-black' : ''}`}
                        >
                          {page}
                        </PaginationLink>
                      )}
                    </PaginationItem>
                  ));
                })()}

                <PaginationItem className="!hidden md:!block">
                  <PaginationNext
                    onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                    className={`cursor-pointer text-sm sm:text-base ${currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}`}
                    aria-label="Go to next page"
                  />
                </PaginationItem>
              </PaginationContent>
            </UIPagination>
          )}
        </>
      )}
    </div>
  );
}