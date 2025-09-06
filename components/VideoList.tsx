'use client';
import { Pagination, PaginationContent, PaginationNext, PaginationPrevious, PaginationItem, PaginationLink } from "@/components/ui/pagination"
import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import CloudinaryPlayer from "@/components/CloudinaryPlayer";
import { useCloudinaryVideoCollection } from "../hooks/useCloudinaryVideoCollection";
import { Skeleton } from "@/components/ui/loading";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from 'embla-carousel-react';

export default function VideoList({ 
    itemsPerPage = 3, 
    type = "grid", 
    videos, 
    useCloudinary = false, 
    cloudinaryTag = "video-gallery" 
}: { 
    itemsPerPage?: number, 
    type?: "grid" | "list", 
    videos?: string[],
    useCloudinary?: boolean,
    cloudinaryTag?: string
}) {
    const [currentPage, setCurrentPage] = useState(1);
    const [view, setView] = useState<"grid" | "list">(type);
    const [isSmallDevice, setIsSmallDevice] = useState(false);
    const [isPageLoading, setIsPageLoading] = useState(false);
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    // Embla carousel for tablet gesture support
    const [, emblaApi] = useEmblaCarousel({
        slidesToScroll: 1,
        containScroll: 'trimSnaps',
        dragFree: false,
        skipSnaps: false,
        watchDrag: true,
        watchResize: true,
        breakpoints: {
            '(min-width: 640px)': { slidesToScroll: 1 }, // Tablet: 1 slide at a time
            '(min-width: 1024px)': { slidesToScroll: 2 }, // Desktop: 2 slides at a time
        }
    });

    // Dynamic items per page based on device size
    const dynamicItemsPerPage = isSmallDevice ? 1 : itemsPerPage;

    // Use the Cloudinary video collection hook
    const { 
        videos: cloudinaryVideos, 
        isLoading: isCloudinaryLoading, 
        error: cloudinaryError 
    } = useCloudinaryVideoCollection({
        cloudName: 'dllh8yqz8',
        tag: cloudinaryTag,
        resourceType: 'video',
        maxResults: 100,
        enabled: useCloudinary
    });

    // Determine loading state
    const isLoading = useCloudinary ? isCloudinaryLoading : false;

    // Handle video play events
    const handleVideoPlay = () => {
        // Cloudinary Player handles fullscreen automatically
        console.log('Video started playing');
    };

    // Embla carousel navigation (for tablet)
    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    // Mobile video navigation functions
    const handlePrevVideo = () => {
        if (isSmallDevice) {
            const allVideos = useCloudinary ? cloudinaryVideos : (videos || []);
            setCurrentVideoIndex(prev => {
                const newIndex = prev === 0 ? allVideos.length - 1 : prev - 1;
                // Update currentPage to match the new video index
                const newPage = Math.floor(newIndex / dynamicItemsPerPage) + 1;
                setCurrentPage(newPage);
                return newIndex;
            });
        } else {
            scrollPrev();
        }
    };

    const handleNextVideo = () => {
        if (isSmallDevice) {
            const allVideos = useCloudinary ? cloudinaryVideos : (videos || []);
            setCurrentVideoIndex(prev => {
                const newIndex = prev === allVideos.length - 1 ? 0 : prev + 1;
                // Update currentPage to match the new video index
                const newPage = Math.floor(newIndex / dynamicItemsPerPage) + 1;
                setCurrentPage(newPage);
                return newIndex;
            });
        } else {
            scrollNext();
        }
    };

    // Touch gesture handling for mobile
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);

    const minSwipeDistance = 50;

    const onTouchStart = (e: React.TouchEvent) => {
        if (isSmallDevice) {
            setTouchEnd(null);
            setTouchStart(e.targetTouches[0].clientX);
        }
    };

    const onTouchMove = (e: React.TouchEvent) => {
        if (isSmallDevice) {
            setTouchEnd(e.targetTouches[0].clientX);
        }
    };

    const onTouchEnd = () => {
        if (!isSmallDevice || !touchStart || !touchEnd) return;
        
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe) {
            handleNextVideo();
        } else if (isRightSwipe) {
            handlePrevVideo();
        }
    };

    // Memoize the paginated data to prevent unnecessary recalculations
    const paginatedVideos = useMemo(() => {
        let videoList: any[] = useCloudinary ? cloudinaryVideos : (videos || []);
        
        if (useCloudinary && videoList.length > 0) {
            // Sort videos by their sequential number in publicId (video_XXX_...)
            videoList = [...videoList].sort((a: any, b: any) => {
                // Extract the number from publicId (e.g., "video_010_dpioe1" -> 10)
                const getVideoNumber = (publicId: string) => {
                    const match = publicId.match(/^video_(\d+)_/);
                    return match ? parseInt(match[1], 10) : 999; // Put invalid ones at the end
                };
                
                const numA = getVideoNumber(a.publicId || a.public_id);
                const numB = getVideoNumber(b.publicId || b.public_id);
                
                return numA - numB;
            });
        }
        
        const startIndex = (currentPage - 1) * dynamicItemsPerPage;
        return Array.prototype.slice.call(videoList, startIndex, startIndex + dynamicItemsPerPage);
    }, [useCloudinary, cloudinaryVideos, videos, currentPage, dynamicItemsPerPage]);

    const totalPages = Math.ceil((useCloudinary ? cloudinaryVideos.length : (videos?.length || 0)) / dynamicItemsPerPage);
    
    // Calculate current page based on currentVideoIndex for mobile navigation
    const calculatedCurrentPage = isSmallDevice 
        ? Math.floor(currentVideoIndex / dynamicItemsPerPage) + 1
        : currentPage;

    // Detect small devices and set view to list
    useEffect(() => {
        const checkDeviceSize = () => {
            const isSmall = window.innerWidth < 768; // md breakpoint
            setIsSmallDevice(isSmall);
            if (isSmall) {
                setView("list");
            }
        };

        checkDeviceSize();
        window.addEventListener('resize', checkDeviceSize);
        
        return () => window.removeEventListener('resize', checkDeviceSize);
    }, []);

    // Reset currentVideoIndex when the full collection changes
    useEffect(() => {
        setCurrentVideoIndex(0);
    }, [useCloudinary ? cloudinaryVideos : videos]);


    const handlePageChange = async (page: number) => {
        setIsPageLoading(true);
        setCurrentPage(page);
        setCurrentVideoIndex(0); // Reset to first video on page change
        
        // Smooth scroll to top of container
        if (containerRef.current) {
            containerRef.current.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
        }

        // Simulate loading delay for better UX
        setTimeout(() => {
            setIsPageLoading(false);
        }, 500);
    };

    // Skeleton loader for videos - matches video container sizes
    const VideoSkeleton = ({ containerHeight }: { containerHeight: string }) => (
        <div 
            className="bg-gray-800/50 rounded-lg overflow-hidden animate-pulse"
            style={{ height: containerHeight }}
        >
            <Skeleton className="w-full h-full" />
        </div>
    );

    if (isLoading) {
        return (
            <div className="bg-gray-900/50 px-2 sm:px-8 md:px-12 lg:px-16 py-8 sm:py-12 w-full">
                <div className="flex items-center gap-3 mb-6">
                    <Skeleton className="h-6 w-24" />
                    <Skeleton className="h-8 w-40" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Array.from({ length: dynamicItemsPerPage }).map((_, i) => (
                        <VideoSkeleton 
                            key={i} 
                            containerHeight={view === "grid" ? "250px" : "300px"} 
                        />
                    ))}
                </div>
            </div>
        );
    }

    // Show error state if Cloudinary fails
    if (useCloudinary && cloudinaryError) {
        return (
            <div className="bg-gray-900/50 px-2 sm:px-8 md:px-12 lg:px-16 py-8 sm:py-12 w-full">
                <div className="text-center py-12">
                    <h2 className="text-2xl sm:text-3xl text-white mb-4">Videos</h2>
                    <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-6">
                        <p className="text-red-300 mb-2">Failed to load videos from Cloudinary</p>
                        <p className="text-gray-400 text-sm">{cloudinaryError}</p>
                        <p className="text-gray-500 text-xs mt-2">
                            Make sure the tag &quot;{cloudinaryTag}&quot; exists and the Resource List is enabled in your Cloudinary settings.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div ref={containerRef} className={`bg-gray-900/50 px-2 sm:px-8 md:px-12 lg:px-16 py-8 sm:py-12 w-full`}>
            <h2 className="text-2xl sm:text-3xl text-white mb-4">Videos</h2>
            <Button 
                className="w-[200px] h-[48px] hidden md:block bg-[#02ACAC] mt-4 mb-8 cursor-pointer hover:bg-background hover:text-foreground transition-colors text-base px-8 py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
                onClick={() => {
                    // Don't allow view changes on small devices
                    if (isSmallDevice) return;
                    setView(view === "grid" ? "list" : "grid");
                }}
                aria-label={`Switch to ${view === "grid" ? "List" : "Grid"} View`}
                tabIndex={0}
            >
                {view === "grid" ? "Switch to List View" : "Switch to Grid View"}
            </Button>
            {/* Desktop Grid View */}
            <div className="hidden lg:grid lg:grid-cols-3 gap-4">
                {isPageLoading ? (
                    // Show loading skeletons during page change
                    Array.from({ length: dynamicItemsPerPage }).map((_, i) => (
                        <VideoSkeleton 
                            key={i} 
                            containerHeight={view === "grid" ? "250px" : "300px"} 
                        />
                    ))
                ) : (
                    paginatedVideos.map((video: any, index: number) => {
                        if (!useCloudinary) {
                            // Fallback for non-Cloudinary videos (if any)
                            return (
                                <div 
                                    key={video + Math.random()} 
                                    className={`${view === "grid" ? "h-[250px] sm:h-[250px] md:h-[300px]" : "h-[300px] sm:h-[500px] md:h-[600px]"}`}
                                >
                                    <div className="w-full h-full bg-gray-800 flex items-center justify-center text-white">
                                        Non-Cloudinary video: {video}
                                    </div>
                                </div>
                            );
                        }
                        
                        return (
                            <div 
                                key={video.assetId || index} 
                                className={`${view === "grid" ? "h-[250px] sm:h-[250px] md:h-[300px]" : "h-[300px] sm:h-[500px] md:h-[600px]"}`}
                            >
                                <CloudinaryPlayer
                                    publicId={video.publicId}
                                    videoUrl={video.secureUrl}
                                    cloudName="dllh8yqz8"
                                    profile="dmac-website-gallery"
                                    className="w-full h-full"
                                    onPlay={handleVideoPlay}
                                />
                            </div>
                        );
                    })
                )}
            </div>

            {/* Mobile Single Video Display */}
            <div className="lg:hidden">
                <div className="relative">
                    {(() => {
                        const allVideos = useCloudinary ? cloudinaryVideos : (videos || []);
                        return allVideos.length > 0 && (
                            <div 
                                className="relative h-[250px] sm:h-[300px] md:h-[400px] overflow-hidden rounded-lg bg-gray-800/50"
                                onTouchStart={onTouchStart}
                                onTouchMove={onTouchMove}
                                onTouchEnd={onTouchEnd}
                            >
                                {(() => {
                                    const currentVideo = allVideos[currentVideoIndex];
                                    if (!useCloudinary) {
                                        return (
                                            <div className="w-full h-full bg-gray-800 flex items-center justify-center text-white">
                                                Non-Cloudinary video: {currentVideo as string}
                                            </div>
                                        );
                                    }
                                    
                                    return (
                                        <CloudinaryPlayer
                                            publicId={(currentVideo as any).publicId}
                                            videoUrl={(currentVideo as any).secureUrl}
                                            cloudName="dllh8yqz8"
                                            profile="dmac-website-gallery"
                                            className="w-full h-full"
                                            onPlay={handleVideoPlay}
                                        />
                                    );
                                })()}
                                {/* Touch feedback overlay for mobile */}
                                <div className="absolute inset-0 bg-black/0 active:bg-black/20 transition-colors duration-150 pointer-events-none" />
                            </div>
                        );
                    })()}
                    
                    {/* Mobile Navigation Buttons - Always show when there are multiple videos */}
                    {(() => {
                        const allVideos = useCloudinary ? cloudinaryVideos : (videos || []);
                        return allVideos.length > 1 && (
                            <>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="absolute left-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-gray-900/90 border-gray-600 text-white hover:bg-gray-800/90 active:bg-gray-700/90 z-10 touch-manipulation shadow-lg"
                                    onClick={handlePrevVideo}
                                    aria-label="Previous video"
                                >
                                    <ChevronLeft className="h-5 w-5" />
                                </Button>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-gray-900/90 border-gray-600 text-white hover:bg-gray-800/90 active:bg-gray-700/90 z-10 touch-manipulation shadow-lg"
                                    onClick={handleNextVideo}
                                    aria-label="Next video"
                                >
                                    <ChevronRight className="h-5 w-5" />
                                </Button>
                            </>
                        );
                    })()}
                </div>
            </div>

            {/* Shadcn Pagination Component */}
            <Pagination className="mt-6 sm:mt-8 text-white">
                <PaginationContent className="flex flex-wrap justify-center gap-1 sm:gap-2 max-w-full overflow-hidden">
                    <PaginationItem className="!hidden md:!block">
                        <PaginationPrevious
                            onClick={() => handlePageChange(Math.max(1, calculatedCurrentPage - 1))}
                            className={`cursor-pointer text-sm sm:text-base ${calculatedCurrentPage === 1 ? 'pointer-events-none opacity-50' : ''}`}
                            aria-label="Go to previous page"
                        />
                    </PaginationItem>
                    
                    {/* Page numbers - limit visible pages to prevent overflow */}
                    {(() => {
                        const pages = [];
                        const maxVisiblePages = 7; // Show max 7 page numbers
                        
                        if (totalPages <= maxVisiblePages) {
                            // Show all pages if total is small
                            for (let i = 1; i <= totalPages; i++) {
                                pages.push(i);
                            }
                        } else {
                            // Show smart pagination for large numbers
                            if (calculatedCurrentPage <= 4) {
                                // Show first 5 pages + ellipsis + last page
                                for (let i = 1; i <= 5; i++) pages.push(i);
                                pages.push('...');
                                pages.push(totalPages);
                            } else if (calculatedCurrentPage >= totalPages - 3) {
                                // Show first page + ellipsis + last 5 pages
                                pages.push(1);
                                pages.push('...');
                                for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
                            } else {
                                // Show first + ellipsis + current ±1 + ellipsis + last
                                pages.push(1);
                                pages.push('...');
                                for (let i = calculatedCurrentPage - 1; i <= calculatedCurrentPage + 1; i++) pages.push(i);
                                pages.push('...');
                                pages.push(totalPages);
                            }
                        }
                        
                        return pages.map((page, index) => (
                            <PaginationItem key={`${page}-${index}`}>
                                {page === '...' ? (
                                    <span className="px-2 py-1 text-gray-400">...</span>
                                ) : (
                                                                    <PaginationLink
                                    onClick={() => handlePageChange(page as number)}
                                    isActive={calculatedCurrentPage === page}
                                    className={`cursor-pointer text-sm sm:text-base px-2 sm:px-3 py-1 ${calculatedCurrentPage === page ? 'text-black' : ''}`}
                                >
                                    {page}
                                </PaginationLink>
                                )}
                            </PaginationItem>
                        ));
                    })()}
                    
                    <PaginationItem className="!hidden md:!block">
                        <PaginationNext
                            onClick={() => handlePageChange(Math.min(totalPages, calculatedCurrentPage + 1))}
                            className={`cursor-pointer text-sm sm:text-base ${calculatedCurrentPage === totalPages ? 'pointer-events-none opacity-50' : ''}`}
                            aria-label="Go to next page"
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    )
}


