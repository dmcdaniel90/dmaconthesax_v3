'use client';
import { Button } from "@/components/ui/button"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { useState, useMemo, useEffect, useCallback } from "react";
import Image from "next/image"
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationLink, PaginationNext } from "@/components/ui/pagination";
import { useLightbox } from "../hooks/useLightbox";
import { useCloudinaryCollection, getCloudinaryUrl, getImageAlt } from "../hooks/useCloudinaryCollection";
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
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
    const [isViewChanging, setIsViewChanging] = useState(false);
    const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
    const [isPageLoading, setIsPageLoading] = useState(false);
    
    // Dynamic items per page based on view type
    const dynamicItemsPerPage = itemsPerPage || (view === "grid" ? 15 : 5);

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

    // Embla carousel for mobile gesture support
    const [emblaRef, emblaApi] = useEmblaCarousel({
        slidesToScroll: 1,
        containScroll: 'trimSnaps',
        dragFree: false,
        breakpoints: {
            '(min-width: 768px)': { slidesToScroll: 2 },
            '(min-width: 1024px)': { slidesToScroll: 3 },
        }
    });

    // Determine loading state
    const isLoading = useCloudinary ? isCloudinaryLoading : false;

    // Memoize the paginated data to prevent unnecessary recalculations
    const paginatedPhotos = useMemo(() => {
        const imageList = useCloudinary ? cloudinaryImages : (images || []);
        const startIndex = (currentPage - 1) * dynamicItemsPerPage;
        return Array.prototype.slice.call(imageList, startIndex, startIndex + dynamicItemsPerPage);
    }, [useCloudinary, cloudinaryImages, images, currentPage, dynamicItemsPerPage]);

    const totalPages = Math.ceil((useCloudinary ? cloudinaryImages.length : (images?.length || 0)) / dynamicItemsPerPage);

    const { isOpen,
        setImages,
        handleOpen,
        LightboxComponent
    } = useLightbox();

    const handlePageChange = async (page: number) => {
        setIsPageLoading(true);
        setCurrentPage(page);
        setLoadedImages(new Set()); // Reset loaded images on page change
        
        // Simulate loading delay for better UX
        setTimeout(() => {
            setIsPageLoading(false);
        }, 500);
    };

    const handleViewChange = () => {
        setIsViewChanging(true);
        setTimeout(() => {
            setView(view === "grid" ? "carousel" : "grid");
            setIsViewChanging(false);
        }, 300);
    };

    // Embla carousel navigation
    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    const handleImageLoad = (index: number) => {
        setLoadedImages(prev => new Set(prev).add(index));
    };

    useEffect(() => {
        if (useCloudinary) {
            // Convert Cloudinary images to URLs for the lightbox
            const imageUrls = paginatedPhotos.map((image) => 
                getCloudinaryUrl(image as any, 1200, 1200)
            );
            setImages(imageUrls);
        } else {
            setImages(paginatedPhotos as string[]);
        }
    }, [paginatedPhotos, setImages, useCloudinary]);

    // Skeleton loader for photos
    const PhotoSkeleton = () => (
        <div className="bg-gray-800/50 rounded-lg overflow-hidden animate-pulse">
            <Skeleton className="w-full aspect-square" />
        </div>
    );

    if (isLoading) {
        return (
            <div className="bg-gray-900/50 px-2 sm:px-4 md:px-8 lg:px-16 xl:px-24 py-6 sm:py-8 md:px-12">
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
            <div className="bg-gray-900/50 px-2 sm:px-4 md:px-8 lg:px-16 xl:px-24 py-6 sm:py-8 md:px-12">
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
        <div className={`bg-gray-900/50 px-2 sm:px-4 md:px-8 lg:px-16 xl:px-24 py-6 sm:py-8 md:py-12`}>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl sm:text-2xl md:text-3xl text-white px-2 sm:px-4 md:px-8 lg:px-12">Photos</h2>
                <Button 
                    className="bg-[#02ACAC] px-3 sm:px-4 md:px-8 lg:px-12 cursor-pointer hover:bg-background hover:text-foreground transition-all duration-300 mb-4 sm:mb-6 md:mb-8 text-sm sm:text-base focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 disabled:opacity-50" 
                    onClick={handleViewChange}
                    disabled={isViewChanging}
                    aria-label={`Switch to ${view === "grid" ? "Carousel" : "Grid"} View`}
                    tabIndex={0}
                >
                    {isViewChanging ? (
                        <Loading variant="dots" size="sm" className="text-white" />
                    ) : (
                        view === "grid" ? "Switch to Carousel View" : "Switch to Grid View"
                    )}
                </Button>
            </div>

            {isOpen && (
                <LightboxComponent />
            )}

            {
                view === "carousel" &&
                <Carousel>
                    <CarouselContent className="px-2 sm:px-4 md:px-8 lg:px-12">
                        {isViewChanging ? (
                            // Show skeleton loaders during view change
                            Array.from({ length: Math.min(6, paginatedPhotos.length) }).map((_, i) => (
                                <CarouselItem key={i} className="basis-full sm:basis-1/2 lg:basis-1/3">
                                    <PhotoSkeleton />
                                </CarouselItem>
                            ))
                        ) : (
                            paginatedPhotos.map((image, index) => {
                                const imageSrc = useCloudinary 
                                    ? getCloudinaryUrl(image as any)
                                    : image as string;
                                const imageAlt = useCloudinary 
                                    ? getImageAlt(image as any, `Image ${index}`)
                                    : `Image ${index}`;
                                
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
                        )}
                    </CarouselContent>
                    <CarouselNext className="cursor-pointer hover:opacity-80 w-[40px] h-[40px] sm:w-[50px] sm:h-[50px]" />
                    <CarouselPrevious className="cursor-pointer hover:opacity-80 w-[40px] h-[50px] sm:w-[50px] sm:h-[50px]" />
                </Carousel>
            }

            {/* Mobile-optimized Grid View with Gesture Support */}
            {
                view === "grid" &&
                <>
                    {/* Desktop Grid View */}
                    <div className="hidden md:grid md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 lg:gap-4">
                        {isPageLoading ? (
                            // Show loading skeletons during page change
                            Array.from({ length: dynamicItemsPerPage }).map((_, i) => (
                                <PhotoSkeleton key={i} />
                            ))
                        ) : (
                            paginatedPhotos.map((image, index) => {
                                const imageSrc = useCloudinary 
                                    ? getCloudinaryUrl(image as any)
                                    : image as string;
                                const imageAlt = useCloudinary 
                                    ? getImageAlt(image as any, `Photo ${index + 1}`)
                                    : `Photo ${index + 1}`;
                                
                                return (
                                    <div 
                                        key={index}
                                        className="relative group aspect-square overflow-hidden rounded-xl bg-gray-800/50"
                                    >
                                        <Image
                                            src={imageSrc}
                                            alt={imageAlt}
                                            width={400}
                                            height={400}
                                            style={{ objectFit: "cover" }}
                                            className="w-full h-full cursor-pointer transition-all duration-300 group-hover:scale-105 active:scale-95"
                                            onClick={() => handleOpen(index)}
                                            draggable={false}
                                        />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-150 pointer-events-none" />
                                    </div>
                                );
                            })
                        )}
                    </div>

                    {/* Mobile Gesture Slider */}
                    <div className="md:hidden">
                        <div className="relative">
                            <div className="overflow-hidden" ref={emblaRef}>
                                <div className="flex gap-2">
                                    {paginatedPhotos.map((image, index) => {
                                        const imageSrc = useCloudinary 
                                            ? getCloudinaryUrl(image as any)
                                            : image as string;
                                        const imageAlt = useCloudinary 
                                            ? getImageAlt(image as any, `Photo ${index + 1}`)
                                            : `Photo ${index + 1}`;
                                        
                                        return (
                                            <div 
                                                key={index}
                                                className="relative flex-[0_0_calc(50%-4px)] sm:flex-[0_0_calc(33.333%-8px)] aspect-square overflow-hidden rounded-lg bg-gray-800/50"
                                            >
                                                <Image
                                                    src={imageSrc}
                                                    alt={imageAlt}
                                                    width={400}
                                                    height={400}
                                                    style={{ objectFit: "cover" }}
                                                    className="w-full h-full cursor-pointer transition-all duration-300 active:scale-95 touch-manipulation"
                                                    onClick={() => handleOpen(index)}
                                                    draggable={false}
                                                />
                                                {/* Touch feedback overlay for mobile */}
                                                <div className="absolute inset-0 bg-black/0 active:bg-black/20 transition-colors duration-150 pointer-events-none" />
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                            
                            {/* Mobile Navigation Buttons - Only show when needed */}
                            {paginatedPhotos.length > 2 && (
                                <>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-gray-900/80 border-gray-700 text-white hover:bg-gray-800/90 z-10"
                                        onClick={scrollPrev}
                                    >
                                        <ChevronLeft className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-gray-900/80 border-gray-700 text-white hover:bg-gray-800/90 z-10"
                                        onClick={scrollNext}
                                    >
                                        <ChevronRight className="h-4 w-4" />
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>
                    
                    {/* Mobile-optimized Pagination - Hide navigation buttons on small screens */}
                    <Pagination className="mt-4 sm:mt-6 md:mt-8 text-white">
                        <PaginationContent className="flex flex-wrap justify-center gap-1 sm:gap-2">
                            {/* Hide Previous button on small screens to prevent overflow */}
                            <PaginationItem className="hidden sm:block">
                                <PaginationPrevious 
                                    onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                                    className={`cursor-pointer text-sm sm:text-base p-2 sm:p-3 touch-manipulation ${currentPage === 1 ? 'pointer-events-none opacity-50' : 'hover:bg-gray-700/50 active:bg-gray-600/50'}`}
                                />
                            </PaginationItem>
                            
                            {/* Show page numbers with responsive hiding */}
                            {[...Array(totalPages)].map((_, index) => {
                                const pageNum = index + 1;
                                return (
                                    <PaginationItem key={index}>
                                        <PaginationLink 
                                            onClick={() => handlePageChange(pageNum)}
                                            isActive={currentPage === pageNum}
                                            className={`cursor-pointer text-sm sm:text-base px-2 sm:px-3 py-2 sm:py-3 touch-manipulation rounded-md transition-colors ${currentPage === pageNum ? 'text-black bg-[#02ACAC]' : 'hover:bg-gray-700/50 active:bg-gray-600/50'}`}
                                        >
                                            {pageNum}
                                        </PaginationLink>
                                    </PaginationItem>
                                );
                            })}
                            
                            {/* Hide Next button on small screens to prevent overflow */}
                            <PaginationItem className="hidden sm:block">
                                <PaginationNext 
                                    onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                                    className={`cursor-pointer text-sm sm:text-base p-2 sm:p-3 touch-manipulation ${currentPage === totalPages ? 'pointer-events-none opacity-50' : 'hover:bg-gray-700/50 active:bg-gray-600/50'}`}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </>
            }
        </div>
    )
}