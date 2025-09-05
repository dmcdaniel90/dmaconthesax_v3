'use client';
import { Pagination, PaginationContent, PaginationNext, PaginationPrevious, PaginationItem, PaginationLink } from "@/components/ui/pagination"
import { useState, useMemo, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import CloudinaryPlayer from "@/components/CloudinaryPlayer";
import { useCloudinaryVideoCollection } from "../hooks/useCloudinaryVideoCollection";
import { Skeleton } from "@/components/ui/loading";

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
    const containerRef = useRef<HTMLDivElement>(null);

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
        
        const startIndex = (currentPage - 1) * itemsPerPage;
        return Array.prototype.slice.call(videoList, startIndex, startIndex + itemsPerPage);
    }, [useCloudinary, cloudinaryVideos, videos, currentPage, itemsPerPage]);

    const totalPages = Math.ceil((useCloudinary ? cloudinaryVideos.length : (videos?.length || 0)) / itemsPerPage);

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


    const handlePageChange = async (page: number) => {
        setIsPageLoading(true);
        setCurrentPage(page);
        
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
            <div className="bg-gray-900/50 px-4 sm:px-8 md:px-12 lg:px-16 py-8 sm:py-12 w-full">
                <div className="flex items-center gap-3 mb-6">
                    <Skeleton className="h-6 w-24" />
                    <Skeleton className="h-8 w-40" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Array.from({ length: itemsPerPage }).map((_, i) => (
                        <VideoSkeleton 
                            key={i} 
                            containerHeight={view === "grid" ? "200px" : "400px"} 
                        />
                    ))}
                </div>
            </div>
        );
    }

    // Show error state if Cloudinary fails
    if (useCloudinary && cloudinaryError) {
        return (
            <div className="bg-gray-900/50 px-4 sm:px-8 md:px-12 lg:px-16 py-8 sm:py-12 w-full">
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
        <div ref={containerRef} className={`bg-gray-900/50 px-4 sm:px-8 md:px-12 lg:px-16 py-8 sm:py-12 w-full`}>
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
            <div className={`grid ${view === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"} gap-4`}>
                {isPageLoading ? (
                    // Show loading skeletons during page change
                    Array.from({ length: itemsPerPage }).map((_, i) => (
                        <VideoSkeleton 
                            key={i} 
                            containerHeight={view === "grid" ? "200px" : "400px"} 
                        />
                    ))
                ) : (
                    paginatedVideos.map((video: any, index: number) => {
                        if (!useCloudinary) {
                            // Fallback for non-Cloudinary videos (if any)
                            return (
                                <div 
                                    key={video + Math.random()} 
                                    className={`${view === "grid" ? "h-[200px] sm:h-[250px] md:h-[300px]" : "h-[400px] sm:h-[500px] md:h-[600px]"}`}
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
                                className={`${view === "grid" ? "h-[200px] sm:h-[250px] md:h-[300px]" : "h-[400px] sm:h-[500px] md:h-[600px]"}`}
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

            {/* Shadcn Pagination Component */}
            <Pagination className="mt-6 sm:mt-8 text-white">
                <PaginationContent className="flex flex-wrap justify-center gap-1 sm:gap-2 max-w-full overflow-hidden">
                    <PaginationItem className="!hidden md:!block">
                        <PaginationPrevious
                            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                            className={`cursor-pointer text-sm sm:text-base ${currentPage === 1 ? 'pointer-events-none opacity-50' : ''}`}
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
                            if (currentPage <= 4) {
                                // Show first 5 pages + ellipsis + last page
                                for (let i = 1; i <= 5; i++) pages.push(i);
                                pages.push('...');
                                pages.push(totalPages);
                            } else if (currentPage >= totalPages - 3) {
                                // Show first page + ellipsis + last 5 pages
                                pages.push(1);
                                pages.push('...');
                                for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
                            } else {
                                // Show first + ellipsis + current ±1 + ellipsis + last
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
                                    <span className="px-2 py-1 text-gray-400">...</span>
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
            </Pagination>
        </div>
    )
}


