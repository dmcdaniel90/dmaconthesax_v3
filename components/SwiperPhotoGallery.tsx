'use client';

import { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Thumbs, FreeMode, EffectCoverflow, Autoplay } from 'swiper/modules';
import Image from 'next/image';
import { useCachedCloudinaryCollection, getCloudinaryUrl, getImageAlt } from '../hooks/useCachedCloudinaryCollection';
import { getPhotoSwipeImageUrl } from '@/lib/cloudinary';
import PhotoSwipe from 'photoswipe';
import 'photoswipe/style.css';
import { Loading, Skeleton } from '@/components/ui/loading';
import { Button } from '@/components/ui/button';
import { Pagination as UIPagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationLink, PaginationNext, PaginationEllipsis } from '@/components/ui/pagination';
import { ChevronLeft, ChevronRight, Grid3X3, LayoutGrid } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';
import 'swiper/css/free-mode';
import 'swiper/css/effect-coverflow';

interface SwiperPhotoGalleryProps {
  images?: string[];
  useCloudinary?: boolean;
  cloudinaryTag?: string;
  cloudName?: string;
  itemsPerView?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
  showThumbs?: boolean;
  isGridView?: boolean;
  autoplay?: boolean;
  effect?: 'slide' | 'coverflow' | 'fade';
  className?: string;
  onGridViewToggle?: () => void;
}

export default function SwiperPhotoGallery({
  images = [],
  useCloudinary = false,
  cloudinaryTag = 'photo-gallery',
  cloudName = 'dllh8yqz8',
  showThumbs = true,
  isGridView = false,
  autoplay = false,
  effect = 'slide',
  className = '',
  onGridViewToggle
}: SwiperPhotoGalleryProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const [isSmallDevice, setIsSmallDevice] = useState(false);
  const [isMediumDevice, setIsMediumDevice] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [mainSwiper, setMainSwiper] = useState<any>(null);
  const photoSwipeRef = useRef<PhotoSwipe | null>(null);

  // Use the cached Cloudinary collection hook
  const { 
    images: cloudinaryImages, 
    isLoading: isCloudinaryLoading, 
    error: cloudinaryError,
    isFromCache,
    cacheAge,
    refetch: refetchImages,
  } = useCachedCloudinaryCollection({
    cloudName,
    tag: cloudinaryTag,
    resourceType: 'image',
    maxResults: 100,
    enabled: useCloudinary
  });


  // Determine the actual images to use
  const actualImages = useCloudinary ? cloudinaryImages : images;
  const isLoadingState = useCloudinary ? isCloudinaryLoading : false;
  

  // Detect device sizes and set items per page
  useEffect(() => {
    const checkDeviceSize = () => {
      const width = window.innerWidth;
      setIsSmallDevice(width < 768);
      setIsMediumDevice(width >= 768 && width < 1024);
      
      // Set items per page based on device size
      if (width < 768) {
        setItemsPerPage(1); // Mobile: 1 item per page
      } else if (width < 1024) {
        setItemsPerPage(4); // Tablet: 4 items per page
      } else {
        setItemsPerPage(9); // Desktop: 9 items per page
      }
    };

    checkDeviceSize();
    window.addEventListener('resize', checkDeviceSize);
    
    return () => window.removeEventListener('resize', checkDeviceSize);
  }, []);

  // Pagination logic - apply limits in both views, but with different items per page
  const carouselItemsPerPage = isSmallDevice ? 4 : isMediumDevice ? 6 : 8; // Desktop: 8, Tablet: 6, Mobile: 4
  const effectiveItemsPerPage = isGridView ? itemsPerPage : carouselItemsPerPage;
  const totalPages = Math.ceil(actualImages.length / effectiveItemsPerPage);
  const startIndex = (currentPage - 1) * effectiveItemsPerPage;
  const endIndex = startIndex + effectiveItemsPerPage;
  const paginatedImages = actualImages.slice(startIndex, endIndex);

  // Handle page change - works in both views
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setCurrentSlideIndex(0); // Reset slide index when changing pages
    // Focus management for both views
    setTimeout(() => {
      if (isGridView) {
        // For grid view, focus on the grid container
        const gridContainer = document.querySelector('.swiper-photo-gallery .grid');
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
        const swiperContainer = document.querySelector('.swiper-photo-gallery .swiper');
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
    if (isGridView) {
      // In grid view, just go to next page
      if (currentPage < totalPages) {
        handlePageChange(currentPage + 1);
      }
    } else {
      // In carousel view, check if we're at the last slide of current page
      const maxSlideIndex = paginatedImages.length - 1;
      if (currentSlideIndex < maxSlideIndex) {
        // Move to next slide within current page
        setCurrentSlideIndex(currentSlideIndex + 1);
        if (mainSwiper) {
          mainSwiper.slideNext();
        }
      } else if (currentPage < totalPages) {
        // Go to next page and reset to first slide
        const newPage = currentPage + 1;
        handlePageChange(newPage);
        setCurrentSlideIndex(0);
        // Update swiper to show first slide of new page
        setTimeout(() => {
          if (mainSwiper) {
            mainSwiper.slideTo(0);
          }
        }, 100);
      }
    }
  };

  const handlePrevious = () => {
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
        handlePageChange(newPage);
        // Set slide index to last slide of previous page
        setTimeout(() => {
          const prevPageItemsPerPage = isSmallDevice ? 4 : isMediumDevice ? 6 : 8;
          const prevPageImageCount = Math.min(prevPageItemsPerPage, actualImages.length - (newPage - 1) * prevPageItemsPerPage);
          setCurrentSlideIndex(prevPageImageCount - 1);
          if (mainSwiper) {
            mainSwiper.slideTo(prevPageImageCount - 1);
          }
        }, 100);
      }
    }
  };

  // Reset to page 1 when images change
  useEffect(() => {
    setCurrentPage(1);
    setCurrentSlideIndex(0);
  }, [actualImages.length, effectiveItemsPerPage, isGridView]);

  // Cleanup PhotoSwipe on unmount
  useEffect(() => {
    return () => {
      if (photoSwipeRef.current) {
        photoSwipeRef.current.close();
        photoSwipeRef.current = null;
      }
    };
  }, []);

  // PhotoSwipe lightbox functionality
  const openPhotoSwipe = (localIndex: number) => {
    if (actualImages.length === 0) return;

    // Convert local index to global index
    const globalIndex = startIndex + localIndex;

    const items = actualImages.map((image) => {
      if (useCloudinary && (image as any).width && (image as any).height) {
        // Use the new PhotoSwipe-optimized URL that preserves aspect ratio
        const imageUrl = getPhotoSwipeImageUrl(image as any);
        const originalWidth = (image as any).width;
        const originalHeight = (image as any).height;
        
        return {
          src: imageUrl,
          width: originalWidth,
          height: originalHeight,
          alt: getImageAlt(image as any)
        };
      } else {
        // Fallback for non-Cloudinary images
        const imageUrl = image as string;
        return {
          src: imageUrl,
          width: 1920,
          height: 1080,
          alt: `Gallery image`
        };
      }
    });

    const options = {
      dataSource: items,
      index: globalIndex,
      bgOpacity: 0.8,
      showHideOpacity: true,
      closeOnVerticalDrag: true,
      closeOnScroll: true,
      history: false,
      focus: true,
      showAnimationDuration: 400,
      hideAnimationDuration: 400,
      // Enhanced transition settings for smoother image changes
      transitionDuration: 300,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      // Hide default navigation buttons
      arrowPrev: false,
      arrowNext: false
    };

    if (photoSwipeRef.current) {
      photoSwipeRef.current.close();
    }

    photoSwipeRef.current = new PhotoSwipe(options);
    
    // Add custom navigation buttons after PhotoSwipe is initialized
    const addCustomButtons = () => {
      // Hide default navigation buttons
      const defaultPrevButton = document.querySelector('.pswp__button--arrow--prev');
      const defaultNextButton = document.querySelector('.pswp__button--arrow--next');
      if (defaultPrevButton) {
        (defaultPrevButton as HTMLElement).style.display = 'none';
      }
      if (defaultNextButton) {
        (defaultNextButton as HTMLElement).style.display = 'none';
      }

      // Remove existing custom buttons if they exist
      const existingPrev = document.querySelector('.pswp__button--custom-prev');
      const existingNext = document.querySelector('.pswp__button--custom-next');
      if (existingPrev) existingPrev.remove();
      if (existingNext) existingNext.remove();

      // Create custom previous button
      const prevButton = document.createElement('button');
      prevButton.className = 'pswp__button pswp__button--custom-prev';
      prevButton.setAttribute('aria-label', 'Previous image');
      prevButton.setAttribute('title', 'Previous image');
      prevButton.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="m15 18-6-6 6-6"/>
        </svg>
      `;
      prevButton.style.cssText = `
        position: absolute;
        left: 20px;
        top: 50%;
        transform: translateY(-50%);
        width: 48px;
        height: 48px;
        background: rgba(0, 0, 0, 0.5);
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        z-index: 1000;
        opacity: 0.8;
      `;
      
      // Create custom next button
      const nextButton = document.createElement('button');
      nextButton.className = 'pswp__button pswp__button--custom-next';
      nextButton.setAttribute('aria-label', 'Next image');
      nextButton.setAttribute('title', 'Next image');
      nextButton.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="m9 18 6-6-6-6"/>
        </svg>
      `;
      nextButton.style.cssText = `
        position: absolute;
        right: 20px;
        top: 50%;
        transform: translateY(-50%);
        width: 48px;
        height: 48px;
        background: rgba(0, 0, 0, 0.5);
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        z-index: 1000;
        opacity: 0.8;
      `;
      
      // Add hover effects
      const addHoverEffects = (button: HTMLElement) => {
        button.addEventListener('mouseenter', () => {
          button.style.background = 'rgba(0, 0, 0, 0.8)';
          button.style.transform = 'translateY(-50%) scale(1.1)';
          button.style.opacity = '1';
        });
        button.addEventListener('mouseleave', () => {
          button.style.background = 'rgba(0, 0, 0, 0.5)';
          button.style.transform = 'translateY(-50%) scale(1)';
          button.style.opacity = '0.8';
        });
      };
      
      addHoverEffects(prevButton);
      addHoverEffects(nextButton);
      
      // Add click handlers
      prevButton.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        photoSwipeRef.current?.prev();
      });
      
      nextButton.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        photoSwipeRef.current?.next();
      });
      
      // Add buttons to the PhotoSwipe container (fallback if UI container doesn't exist)
      const pswpUI = document.querySelector('.pswp__ui');
      const pswpContainer = document.querySelector('.pswp');
      
      if (pswpUI) {
        pswpUI.appendChild(prevButton);
        pswpUI.appendChild(nextButton);
      } else if (pswpContainer) {
        // Fallback: add directly to PhotoSwipe container
        pswpContainer.appendChild(prevButton);
        pswpContainer.appendChild(nextButton);
      }
    };

    // Add buttons after PhotoSwipe is ready
    photoSwipeRef.current.on('uiRegister', addCustomButtons);
    
    // Also add buttons after a short delay to ensure DOM is ready
    setTimeout(addCustomButtons, 100);
    
    // Add buttons directly to PhotoSwipe container as fallback
    photoSwipeRef.current.on('init', () => {
      setTimeout(() => {
        const pswpContainer = document.querySelector('.pswp');
        if (pswpContainer && !document.querySelector('.pswp__button--custom-prev')) {
          addCustomButtons();
        }
      }, 200);
    });
    
    photoSwipeRef.current.init();
  };

  // Simulate loading
  useEffect(() => {
    if (!isLoadingState && actualImages.length > 0) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isLoadingState, actualImages.length]);

  const handleImageLoad = (index: number) => {
    setLoadedImages(prev => new Set(prev).add(index));
  };

  // Skeleton loader
  const PhotoSkeleton = () => (
    <div className="bg-gray-800/50 rounded-lg overflow-hidden animate-pulse">
      <Skeleton className="w-full aspect-square" />
    </div>
  );

  if (isLoading || isLoadingState) {
    return (
      <div className={`swiper-photo-gallery ${className}`}>
        <div className="flex items-center gap-3 mb-6">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-8 w-40" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <PhotoSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  // Show error state if Cloudinary fails
  if (useCloudinary && cloudinaryError) {
    return (
      <div className={`swiper-photo-gallery ${className}`}>
        <div className="text-center py-12">
          <h2 className="text-xl sm:text-2xl md:text-3xl text-white mb-4">Photos</h2>
          <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-6">
            <p className="text-red-300 mb-2">Failed to load images from Cloudinary</p>
            <p className="text-gray-400 text-sm">{cloudinaryError}</p>
            <p className="text-gray-500 text-xs mt-2">
              Make sure the tag &quot;{cloudinaryTag}&quot; exists and the Resource List is enabled in your Cloudinary settings.
            </p>
          </div>
        </div>
      </div>
    );
  }

  
      if (actualImages.length === 0) {
    return (
      <div className={`swiper-photo-gallery ${className}`}>
        <div className="text-center py-12">
          <h2 className="text-xl sm:text-2xl md:text-3xl text-white mb-4">Photos</h2>
          <p className="text-gray-400">No photos available</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`swiper-photo-gallery ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="px-8 sm:px-0 text-xl sm:text-2xl md:text-3xl text-white mb-2 font-bold">Photos</h2>
          <p className="px-8 sm:px-0 text-gray-400">View photos from our performances and events</p>
          {/* Cache Status Indicator */}
                   <p className="px-8 sm:px-0 text-sm text-gray-400 mt-2">
                     {isFromCache ? `📦 Photos last updated (${cacheAge} min ago)` : '📦 Photos are up to date'} • 
                     <button 
                       onClick={refetchImages}
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
                <LayoutGrid className="h-full w-4 mr-2" />
                <p>Carousel View</p>
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <Grid3X3 className="h-4 w-4 mr-2" />
                <p>Grid View</p>
              </div>
            )}
          </Button>
        </div>
      </div>

      <div className="relative">
        {/* Loading overlay */}
        {isLoadingState && (
          <div className="absolute inset-0 bg-gray-900/80 backdrop-blur-sm z-50 flex items-center justify-center min-h-[400px]">
            <div className="flex flex-col items-center space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#02ACAC]"></div>
              <p className="text-white text-lg">Loading photos...</p>
            </div>
          </div>
        )}

        {isGridView ? (
          // Grid View
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[400px]">
            {paginatedImages.map((image, index) => {
              const imageSrc = useCloudinary 
                ? getCloudinaryUrl((image as any).public_id || (image as any).publicId || '', cloudName, { width: 800, height: 800 })
                : image as string;
              const imageAlt = useCloudinary 
                ? getImageAlt(image as any)
                : `Photo ${startIndex + index + 1}`;
              
              
              // Skip rendering if imageSrc is empty or invalid
          if (!imageSrc || imageSrc === '' || imageSrc.includes('undefined')) {
            return null;
          }
              
              return (
                <div 
                  key={startIndex + index} 
                  className="relative aspect-square overflow-hidden rounded-lg bg-gray-800/50 cursor-pointer"
                  onClick={() => openPhotoSwipe(index)}
                >
                  <Image
                    src={imageSrc}
                    alt={imageAlt}
                    fill
                    style={{ objectFit: "cover" }}
                    className="w-full h-full max-w-[750px] max-h-[500px] transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#02ACAC] focus:ring-offset-2 focus:ring-offset-gray-900"
                    loading="lazy"
                    draggable={false}
                    tabIndex={0}
                    onFocus={(e) => {
                      // Center the focused image in the viewport
                      e.currentTarget.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'center', 
                        inline: 'center' 
                      });
                    }}
                  />
                </div>
              );
            })}
          </div>
          
          {/* Pagination for Grid View */}
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
        <>
          {/* Main Swiper */}
          <div className="relative min-h-[400px]">
        <Swiper
          modules={[Navigation, Pagination, Thumbs, FreeMode, EffectCoverflow, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          centeredSlides={true}
          navigation={false}
          pagination={false}
          autoplay={autoplay ? {
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
          } : false}
          effect={effect}
          coverflowEffect={
            effect === 'coverflow' ? {
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            } : undefined
          }
          thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
          onSwiper={setMainSwiper}
          onSlideChange={(swiper) => setCurrentSlideIndex(swiper.activeIndex)}
          className="main-swiper"
          style={{
            '--swiper-navigation-color': '#02ACAC',
            '--swiper-pagination-color': '#02ACAC',
            '--swiper-pagination-bullet-inactive-color': 'rgba(255, 255, 255, 0.3)',
            '--swiper-pagination-bullet-inactive-opacity': '0.3'
          } as React.CSSProperties}
        >
          {paginatedImages.map((image, index) => {
            const globalIndex = startIndex + index;
            const imageSrc = useCloudinary 
              ? getCloudinaryUrl((image as any).public_id || (image as any).publicId || '', cloudName, { width: 800, height: 800 })
              : image as string;
            const imageAlt = useCloudinary 
              ? getImageAlt(image as any)
              : `Photo ${globalIndex + 1}`;
            
            
            // Skip rendering if imageSrc is empty or invalid
          if (!imageSrc || imageSrc === '' || imageSrc.includes('undefined')) {
            return null;
          }
            
            return (
              <SwiperSlide key={globalIndex} className="swiper-slide">
                <div className="relative group aspect-square overflow-hidden rounded-xl bg-gray-800/50">
                  {!loadedImages.has(globalIndex) && (
                    <div className="absolute inset-0 bg-gray-800/50 rounded-lg flex items-center justify-center z-10">
                      <Loading variant="spinner" size="sm" />
                    </div>
                  )}
                  <Image
                    src={imageSrc}
                    alt={imageAlt}
                    width={800}
                    height={800}
                    style={{ objectFit: "cover" }}
                    className={`w-full h-full cursor-pointer transition-all duration-300 group-hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#02ACAC] focus:ring-offset-2 focus:ring-offset-gray-900 ${
                      !loadedImages.has(globalIndex) ? 'opacity-0' : 'opacity-100'
                    }`}
                    onClick={() => openPhotoSwipe(index)}
                    onLoad={() => handleImageLoad(globalIndex)}
                    loading="lazy"
                    draggable={false}
                    tabIndex={0}
                    onFocus={(e) => {
                      // Center the focused image in the viewport
                      e.currentTarget.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'center', 
                        inline: 'center' 
                      });
                    }}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-150 pointer-events-none" />
                </div>
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
          aria-label="Previous photo"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={handleNext}
          disabled={currentPage === totalPages && currentSlideIndex === paginatedImages.length - 1}
          className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-gray-900/90 border-gray-600 text-white hover:bg-gray-800/90 active:bg-gray-700/90 z-10 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          aria-label="Next photo"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      {/* Thumbnail Swiper */}
      {showThumbs && paginatedImages.length > 1 && (
        <div className="mt-4">
          <Swiper
            modules={[FreeMode, Thumbs]}
            onSwiper={setThumbsSwiper}
            spaceBetween={10}
            slidesPerView={isSmallDevice ? 4 : isMediumDevice ? 6 : 8}
            freeMode={true}
            watchSlidesProgress={true}
            className="thumbs-swiper"
          >
            {paginatedImages.map((image, index) => {
              const globalIndex = startIndex + index;
              const imageSrc = useCloudinary 
                ? getCloudinaryUrl((image as any).public_id || (image as any).publicId || '', cloudName, { width: 200, height: 200 })
                : image as string;
              const imageAlt = useCloudinary 
                ? getImageAlt(image as any)
                : `Thumbnail ${globalIndex + 1}`;
              
              // Skip rendering if imageSrc is empty or invalid
              if (!imageSrc || imageSrc === '' || imageSrc.includes('undefined')) {
                return null;
              }
              
              return (
                <SwiperSlide key={globalIndex} className="swiper-slide">
                  <div 
                    className="relative aspect-square overflow-hidden rounded-lg bg-gray-800/50 cursor-pointer"
                    onClick={() => openPhotoSwipe(index)}
                  >
                    <Image
                      src={imageSrc}
                      alt={imageAlt}
                      width={200}
                      height={200}
                      style={{ objectFit: "cover" }}
                      className="w-full h-full transition-all duration-200 hover:scale-105"
                      loading="lazy"
                      draggable={false}
                    />
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      )}

      {/* Pagination */}
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
    </div>
  );
}
