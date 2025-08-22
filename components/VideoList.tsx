'use client';
import { Pagination, PaginationContent, PaginationNext, PaginationPrevious, PaginationItem, PaginationLink } from "@/components/ui/pagination"
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import Video from "@/components/Video";



export default function VideoList({ itemsPerPage = 3, type = "grid", videos }: { itemsPerPage?: number, type?: "grid" | "list", videos: string[] }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [view, setView] = useState<"grid" | "list">(type);

    // Memoize the paginated data to prevent unnecessary recalculations
    const paginatedVideos = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return Array.prototype.slice.call(videos, startIndex, startIndex + itemsPerPage);
    }, [videos, currentPage, itemsPerPage]);

    const totalPages = Math.ceil(videos.length / itemsPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div className={`bg-gray-900/50 ${view === "grid" ? "px-24" : "px-128"} py-12`}>
            <h2 className="text-3xl text-white mb-4">Videos</h2>
            <Button className="mt-4 cursor-pointer hover:bg-background hover:text-foreground transition-colors mb-8" onClick={() => setView(view === "grid" ? "list" : "grid")}>{view === "grid" ? "Switch to List View" : "Switch to Grid View"}</Button>
            <div className={`grid ${view === "grid" ? "grid-cols-3" : "grid-cols-1"} gap-4`}>
                {paginatedVideos.map((video: any) => (
                    <Video key={video + Math.random()} src={video} width="100%" height={view === "grid" ? "300px" : "600px"} />
                ))}
            </div>

            {/* Shadcn Pagination Component */}
            <Pagination className="mt-8 text-white">
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                            className={`cursor-pointer ${currentPage === 1 ? 'pointer-events-none opacity-50' : ''}`}
                        />
                    </PaginationItem>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <PaginationItem key={page}>
                            <PaginationLink
                                onClick={() => handlePageChange(page)}
                                isActive={currentPage === page}
                                className={`cursor-pointer ${currentPage === page ? 'text-black' : ''}`}
                            >
                                {page}
                            </PaginationLink>
                        </PaginationItem>
                    ))}
                    <PaginationItem>
                        <PaginationNext
                            onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                            className={`cursor-pointer ${currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}`}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>

        </div>

    )
}


