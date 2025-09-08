'use client';
import { Button } from "@/components/ui/button"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { useState, useMemo, useEffect } from "react";
import Image from "next/image"
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationLink, PaginationNext, PaginationEllipsis } from "@/components/ui/pagination";
// import { useLightbox } from "../hooks/useLightbox"; // Removed - hook was deleted
import { useCloudinaryCollection, getCloudinaryUrl, getImageAlt } from "../hooks/useCloudinaryCollection";
// Removed unused imports: useEmblaCarousel, ChevronLeft, ChevronRight
import { Loading, Skeleton } from "@/components/ui/loading";

export default function PhotoGallery({ images, itemsPerPage, type = "carousel", useCloudinary = false, cloudinaryTag = "photo-gallery" }: { 
    images?: string[], 
    itemsPerPage?: number, 
    type?: "grid" | "carousel",
    useCloudinary?: boolean,
    cloudinaryTag?: string
}) {
    const [currentPage, setCurrentPage] = useState(1);
    const [view, setView] = useState<"grid" | "carousel">(type);
    const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
    const [isPageLoading, setIsPageLoading] = useState(false);
    const [isSmallDevice, setIsSmallDevice] = useState(false);
    
    // Dynamic items per page based on device size and view type
    const baseItemsPerPage = itemsPerPage || (view === "grid" ? 18 : 5);
    const dynamicItemsPerPage = isSmallDevice ? 1 : baseItemsPerPage;

    // Use the Cloudinary collection hook
    const { 
        images: cloudinaryImages, 
        isLoading: isCloudinaryLoading, 
        error: cloudinaryError 
    } = useCloudinaryCollection({
        cloudName: 'dllh8yqz8',
        tag: cloudinaryTag,
        resourceType: 'image',
        maxResults: 100,
        enabled: useCloudinary
    });

    // Removed Embla carousel - not needed for simplified grid view

    // State for mobile image navigation
    // Removed currentImageIndex - not needed for simplified grid view

    // Determine loading state
    const isLoading = useCloudinary ? isCloudinaryLoading : false;

    // Memoize the paginated data to prevent unnecessary recalculations
    const paginatedPhotos = useMemo(() => {
        const imageList = useCloudinary ? cloudinaryImages : (images || []);
        const startIndex = (currentPage - 1) * dynamicItemsPerPage;
        return Array.prototype.slice.call(imageList, startIndex, startIndex + dynamicItemsPerPage);
    }, [useCloudinary, cloudinaryImages, images, currentPage, dynamicItemsPerPage]);

    const totalPages = Math.ceil((useCloudinary ? cloudinaryImages.length : (images?.length || 0)) / dynamicItemsPerPage);
    
    // Use currentPage directly since we removed mobile navigation
    const calculatedCurrentPage = currentPage;

    // Detect small devices and tablets
    useEffect(() => {
        const checkDeviceSize = () => {
            const isSmall = window.innerWidth < 768; // md breakpoint
            setIsSmallDevice(isSmall);
        };

        checkDeviceSize();
        window.addEventListener('resize', checkDeviceSize);
        
        return () => window.removeEventListener('resize', checkDeviceSize);
    }, []);

    // Removed currentImageIndex reset - not needed for simplified grid view

    // Lightbox functionality removed - useLightbox hook was deleted
    const isOpen = false;
    const setImages = () => {};
    const handleOpen = () => {};
    const LightboxComponent = () => null;

    const handlePageChange = async (page: number) => {
        setIsPageLoading(true);
        setCurrentPage(page);
        setLoadedImages(new Set()); // Reset loaded images on page change
        
        // Simulate loading delay for better UX
        setTimeout(() => {
            setIsPageLoading(false);
            // Focus on the first image of the new page after loading
            const firstImageElement = document.querySelector('.photo-gallery-grid img');
            if (firstImageElement) {
                (firstImageElement as HTMLElement).focus();
                // Center the focused image in the viewport
                firstImageElement.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center', 
                    inline: 'center' 
                });
            }
        }, 500);
    };

    // Removed handleViewChange - now using inline onClick handler

    // Removed Embla carousel navigation functions

    // Removed mobile navigation functions - grid view is only for tablet and larger

    const handleImageLoad = (index: number) => {
        setLoadedImages(prev => new Set(prev).add(index));
    };

    useEffect(() => {
        if (useCloudinary) {
            // Convert ALL Cloudinary images to URLs for the lightbox, not just paginated ones
            const allImages = useCloudinary ? cloudinaryImages : (images || []);
            const imageUrls = allImages.map((image) => 
                getCloudinaryUrl(image as any, 1200, 1200)
            );
            setImages(imageUrls);
        } else {
            setImages(images || []);
        }
    }, [useCloudinary, cloudinaryImages, images, setImages]);

    // Skeleton loader for photos
    const PhotoSkeleton = () => (
        <div className="bg-gray-800/50 rounded-lg overflow-hidden animate-pulse">
            <Skeleton className="w-full aspect-square" />
        </div>
    );

    if (isLoading) {
        return (
            <div className="bg-gray-900/50 px-1 sm:px-4 md:px-8 lg:px-16 xl:px-24 py-6 sm:py-8 md:px-12">
                <div className="flex items-center gap-3 mb-6">
                    <Skeleton className="h-6 w-24" />
                    <Skeleton className="h-8 w-40" />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-4">
                    {Array.from({ length: dynamicItemsPerPage }).map((_, i) => (
                        <PhotoSkeleton key={i} />
                    ))}
                </div>
            </div>
        );
    }

    // Show error state if Cloudinary fails
    if (useCloudinary && cloudinaryError) {
        return (
            <div className="bg-gray-900/50 px-1 sm:px-4 md:px-8 lg:px-16 xl:px-24 py-6 sm:py-8 md:px-12">
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

    return (
        <div className={`bg-gray-900/50 px-1 sm:px-4 md:px-8 lg:px-16 xl:px-24 py-6 sm:py-8 md:py-12`}>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl sm:text-2xl md:text-3xl text-white px-2 sm:px-4 md:px-8 lg:px-12">Photos</h2>
                <Button 
                    className="w-[200px] h-[48px] hidden md:block bg-[#02ACAC] cursor-pointer hover:bg-background hover:text-foreground transition-colors text-base px-8 py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
                    onClick={() => {
                        // Don't allow view changes on small devices
                        if (isSmallDevice) return;
                        setView(view === "grid" ? "carousel" : "grid");
                    }}
                    aria-label={`Switch to ${view === "grid" ? "Carousel" : "Grid"} View`}
                    tabIndex={0}
                >
                    {view === "grid" ? "Switch to Carousel View" : "Switch to Grid View"}
                </Button>
            </div>

            {isOpen && (
                <LightboxComponent />
            )}

            {
                view === "carousel" &&
                <Carousel>
                    <CarouselContent className="px-1 sm:px-4 md:px-8 lg:px-12">
                        {(useCloudinary ? cloudinaryImages : (images || [])).map((image, index) => {
                                const imageSrc = useCloudinary 
                                    ? getCloudinaryUrl(image as any)
                                    : image as string;
                                const imageAlt = useCloudinary 
                                    ? getImageAlt(image as any, `Image ${index + 1}`)
                                    : `Image ${index + 1}`;
                                
                                return (
                                    <CarouselItem key={index} className="basis-full sm:basis-1/2 lg:basis-1/3 cursor-pointer">
                                        <div className="relative">
                                            {!loadedImages.has(index) && (
                                                <div className="absolute inset-0 bg-gray-800/50 rounded-lg flex items-center justify-center">
                                                    <Loading variant="spinner" size="sm" />
                                                </div>
                                            )}
                                            <Image
                                                src={imageSrc}
                                                alt={imageAlt}
                                                width={400}
                                                height={400}
                                                style={{ objectFit: "cover", width: "100%", height: "100%" }}
                                                className={`cursor-pointer hover:scale-105 transition-all duration-300 ${!loadedImages.has(index) ? 'opacity-0' : 'opacity-100'}`}
                                                onClick={() => handleOpen(index)}
                                                onLoad={() => handleImageLoad(index)}
                                                loading="lazy"
                                            />
                                        </div>
                                    </CarouselItem>
                                );
                            })
                        }
                    </CarouselContent>
                    <CarouselNext className="cursor-pointer hover:opacity-80 w-[40px] h-[40px] sm:w-[50px] sm:h-[50px]" />
                    <CarouselPrevious className="cursor-pointer hover:opacity-80 w-[40px] h-[50px] sm:w-[50px] sm:h-[50px]" />
                </Carousel>
            }

            {/* Desktop Grid View - Only for tablet sizes and larger */}
            {view === "grid" && (
                <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 photo-gallery-grid">
                        {isPageLoading ? (
                            // Show loading skeletons during page change
                            Array.from({ length: dynamicItemsPerPage }).map((_, i) => (
                                <PhotoSkeleton key={i} />
                            ))
                        ) : (
                            paginatedPhotos.map((image, index) => {
                                const imageSrc = useCloudinary 
                                ? getCloudinaryUrl(image as any, 800, 800)
                                    : image as string;
                                const imageAlt = useCloudinary 
                                    ? getImageAlt(image as any, `Photo ${index + 1}`)
                                    : `Photo ${index + 1}`;
                                
                            // Skip rendering if imageSrc is empty or invalid
                            if (!imageSrc || imageSrc === '') {
                                return null;
                            }
                                
                                return (
                                    <div 
                                        key={index}
                                    className="relative aspect-square overflow-hidden rounded-lg bg-gray-800/50 cursor-pointer"
                                    onClick={() => handleOpen(index)}
                                    >
                                        <Image
                                            src={imageSrc}
                                            alt={imageAlt}
                                        fill
                                            style={{ objectFit: "cover" }}
                                        className="w-full h-full transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#02ACAC] focus:ring-offset-2 focus:ring-offset-gray-900"
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
                            })
                        )}
                    </div>
            )}

            {/* Pagination - Only show for grid view */}
            {view === "grid" && totalPages > 1 && (
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
                                            <PaginationEllipsis />
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
            )}
        </div>
    )
}