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
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function PhotoGallery({ images, itemsPerPage = 12, type = "carousel" }: { images: string[], itemsPerPage?: number, type?: "grid" | "carousel" }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [view, setView] = useState<"grid" | "carousel">(type);

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

    // Memoize the paginated data to prevent unnecessary recalculations
    const paginatedPhotos = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return Array.prototype.slice.call(images, startIndex, startIndex + itemsPerPage);
    }, [images, currentPage, itemsPerPage]);

    const totalPages = Math.ceil(images.length / itemsPerPage);

    const { isOpen,
        setImages,
        handleOpen,
        LightboxComponent
    } = useLightbox();

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    // Embla carousel navigation
    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    useEffect(() => {
        setImages(paginatedPhotos);
    }, [paginatedPhotos, setImages]);

    return (
        <div className={`bg-gray-900/50 px-2 sm:px-4 md:px-8 lg:px-16 xl:px-24 py-6 sm:py-8 md:py-12`}>
            <h2 className="text-xl sm:text-2xl md:text-3xl text-white mb-3 sm:mb-4 px-2 sm:px-4 md:px-8 lg:px-12">Photos</h2>
            <Button className="bg-[#02ACAC] mt-3 sm:mt-4 px-3 sm:px-4 md:px-8 lg:px-12 cursor-pointer hover:bg-background hover:text-foreground transition-colors mb-4 sm:mb-6 md:mb-8 text-sm sm:text-base" onClick={() => setView(view === "grid" ? "carousel" : "grid")}>{view === "grid" ? "Switch to Carousel View" : "Switch to Grid View"}</Button>

            {isOpen && (
                <LightboxComponent />
            )}

            {
                view === "carousel" &&
                <Carousel>
                    <CarouselContent className="px-2 sm:px-4 md:px-8 lg:px-12">
                        {paginatedPhotos.map((image, index) => (
                            <CarouselItem key={index} className="basis-full sm:basis-1/2 lg:basis-1/3 cursor-pointer">
                                <Image
                                    src={image}
                                    alt={`Image ${index}`}
                                    width={400}
                                    height={400}
                                    style={{ objectFit: "cover", width: "100%", height: "100%" }}
                                    className="cursor-pointer hover:scale-105 transition-transform duration-200"
                                    onClick={() => handleOpen(index)}
                                />
                            </CarouselItem>
                        ))}
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
                        {paginatedPhotos.map((image, index) => (
                            <div 
                                key={index}
                                className="relative group aspect-square overflow-hidden rounded-xl bg-gray-800/50"
                            >
                                <Image
                                    src={image}
                                    alt={`Photo ${index + 1}`}
                                    width={400}
                                    height={400}
                                    style={{ objectFit: "cover" }}
                                    className="w-full h-full cursor-pointer transition-all duration-300 group-hover:scale-105 active:scale-95"
                                    onClick={() => handleOpen(index)}
                                    draggable={false}
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-150 pointer-events-none" />
                            </div>
                        ))}
                    </div>

                    {/* Mobile Gesture Slider */}
                    <div className="md:hidden">
                        <div className="relative">
                            <div className="overflow-hidden" ref={emblaRef}>
                                <div className="flex gap-2">
                                    {paginatedPhotos.map((image, index) => (
                                        <div 
                                            key={index}
                                            className="relative flex-[0_0_calc(50%-4px)] sm:flex-[0_0_calc(33.333%-8px)] aspect-square overflow-hidden rounded-lg bg-gray-800/50"
                                        >
                                            <Image
                                                src={image}
                                                alt={`Photo ${index + 1}`}
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
                                    ))}
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