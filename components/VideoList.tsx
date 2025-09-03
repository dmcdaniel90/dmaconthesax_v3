'use client';
import { Pagination, PaginationContent, PaginationNext, PaginationPrevious, PaginationItem, PaginationLink } from "@/components/ui/pagination"
import { useState, useMemo, useRef } from "react";
import { Button } from "@/components/ui/button";
import Video from "@/components/Video";

export default function VideoList({ itemsPerPage = 3, type = "grid", videos }: { itemsPerPage?: number, type?: "grid" | "list", videos: string[] }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [view, setView] = useState<"grid" | "list">(type);
    const containerRef = useRef<HTMLDivElement>(null);

    // Memoize the paginated data to prevent unnecessary recalculations
    const paginatedVideos = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return Array.prototype.slice.call(videos, startIndex, startIndex + itemsPerPage);
    }, [videos, currentPage, itemsPerPage]);

    const totalPages = Math.ceil(videos.length / itemsPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        
        // Smooth scroll to top of container
        if (containerRef.current) {
            containerRef.current.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
        }
    };

    return (
        <div ref={containerRef} className={`bg-gray-900/50 px-4 sm:px-8 md:px-16 lg:px-24 py-8 sm:py-12 w-full`}>
            <h2 className="text-2xl sm:text-3xl text-white mb-4">Videos</h2>
            <Button 
                className="bg-[#02ACAC] mt-4 mb-6 sm:mb-8 cursor-pointer hover:bg-background hover:text-foreground transition-colors text-sm sm:text-base px-3 sm:px-4 py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900" 
                onClick={() => setView(view === "grid" ? "list" : "grid")}
                aria-label={`Switch to ${view === "grid" ? "List" : "Grid"} View`}
                tabIndex={0}
            >
                {view === "grid" ? "Switch to List View" : "Switch to Grid View"}
            </Button>
            <div className={`grid ${view === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"} gap-4`}>
                {paginatedVideos.map((video: any) => (
                    <div key={video + Math.random()} className={`${view === "grid" ? "h-[200px] sm:h-[250px] md:h-[300px]" : "h-[400px] sm:h-[500px] md:h-[600px]"}`}>
                        <Video src={video} width="100%" height="100%" />
                    </div>
                ))}
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


