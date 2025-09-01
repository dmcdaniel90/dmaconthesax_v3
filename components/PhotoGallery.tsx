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
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationLink, PaginationNext } from "@/components/ui/pagination";
import { useLightbox } from "../hooks/useLightbox";

export default function PhotoGallery({ images, itemsPerPage = 12, type = "carousel" }: { images: string[], itemsPerPage?: number, type?: "grid" | "carousel" }) {
    const [currentPage, setCurrentPage] = useState(1);
    // const [isOpen, setIsOpen] = useState(false);
    // const [currentIndex, setCurrentIndex] = useState(0);
    const [view, setView] = useState<"grid" | "carousel">(type);

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

    useEffect(() => {
        setImages(paginatedPhotos);
    }, [paginatedPhotos, setImages]);

    return (
        <div className={`bg-gray-900/50 px-4 sm:px-8 md:px-16 lg:px-24 py-8 sm:py-12`}>
            <h2 className="text-2xl sm:text-3xl text-white mb-4 px-4 sm:px-8 md:px-12">Photos</h2>
            <Button className="mt-4 px-4 sm:px-8 md:px-12 cursor-pointer hover:bg-background hover:text-foreground transition-colors mb-6 sm:mb-8 text-sm sm:text-base" onClick={() => setView(view === "grid" ? "carousel" : "grid")}>{view === "grid" ? "Switch to Carousel View" : "Switch to Grid View"}</Button>

            {isOpen && (
                <LightboxComponent />
            )}

            {
                view === "carousel" &&
                <Carousel>
                    <CarouselContent className="px-4 sm:px-8 md:px-12">
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
                    <CarouselPrevious className="cursor-pointer hover:opacity-80 w-[40px] h-[40px] sm:w-[50px] sm:h-[50px]" />
                </Carousel>
            }

            {/* Shadcn Pagination Component */}
            {
                view === "grid" &&
                <>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4">
                        {paginatedPhotos.map((image, index) => (
                            <Image
                                key={index}
                                src={image}
                                alt={`Image ${index}`}
                                width={400}
                                height={400}
                                style={{ objectFit: "cover", width: "100%", height: "100%" }}
                                className="cursor-pointer hover:scale-105"
                                onClick={() => handleOpen(index)} />
                        ))}
                    </div>
                    <Pagination className="mt-6 sm:mt-8 text-white">
                        <PaginationContent className="flex flex-wrap justify-center gap-1 sm:gap-2">
                            <PaginationItem>
                                <PaginationPrevious 
                                    onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                                    className={`cursor-pointer text-sm sm:text-base ${currentPage === 1 ? 'pointer-events-none opacity-50' : ''}`}
                                />
                            </PaginationItem>
                            {[...Array(totalPages)].map((_, index) => (
                                <PaginationItem key={index}>
                                    <PaginationLink 
                                        onClick={() => handlePageChange(index + 1)}
                                        isActive={currentPage === index + 1}
                                        className={`cursor-pointer text-sm sm:text-base px-2 sm:px-3 py-1 ${currentPage === index + 1 ? 'text-black' : ''}`}
                                    >
                                        {index + 1}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}
                            <PaginationItem>
                                <PaginationNext 
                                    onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                                    className={`cursor-pointer text-sm sm:text-base ${currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}`}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </>
            }
        </div>
    )
}