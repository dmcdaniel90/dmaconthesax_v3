'use client';
import Event from "@/components/Event"
import { Pagination, PaginationContent, PaginationNext, PaginationPrevious, PaginationItem, PaginationLink } from "@/components/ui/pagination"
import * as events from '@/lib/sample-events.json'
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";

type MusicEvents = {
    eventName: string;
    monthNumber: number;
    day: number;
    year: number;
    time?: string;
    location?: string;
    ticketPrice?: number;
    imgSrc?: string;
    imgAltText?: string;
}

export default function EventList({ itemsPerPage = 3, type = "grid" }: { itemsPerPage?: number, type?: "grid" | "list" }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [view, setView] = useState<"grid" | "list">(type);

    // Memoize the paginated data to prevent unnecessary recalculations
    const paginatedEvents = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return Array.prototype.slice.call(events, startIndex, startIndex + itemsPerPage);
    }, [events, currentPage, itemsPerPage]);

    const totalPages = Math.ceil(events.length / itemsPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div className={`bg-gray-900/50 ${view === "grid" ? "px-32" : "px-128"} py-12`}>
            <h2 className="text-3xl text-white">Upcoming Events</h2>
            <Button className="mt-4 cursor-pointer font-bold bg-[#02ACAC] hover:bg-[#005C5C] hover:text-white  transition-colors" onClick={() => setView(view === "grid" ? "list" : "grid")}>{view === "grid" ? "Switch to List View" : "Switch to Grid View"}</Button>
            <div className={`grid ${view === "grid" ? "grid-cols-3" : "grid-cols-1"} gap-4`}>
                {paginatedEvents.map((event: MusicEvents) => (
                    <Event key={event.eventName + Math.random()} eventName={event.eventName} monthNumber={event.monthNumber} day={event.day} year={event.year} time={event.time || "TBA"} location={event.location || "TBA"} ticketPrice={event.ticketPrice || 0} imgSrc={event.imgSrc || ""} imgAltText={event.imgAltText || ""} />
                ))}
            </div>

            {/* Shadcn Pagination Component */}
            <Pagination className="mt-8 text-white">
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                            className={`cursor-pointer ${currentPage === 1 ? 'pointer-events-none opacity-50' : ''} hover:bg-[#02ACAC]`}
                        />
                    </PaginationItem>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <PaginationItem key={page}>
                            <PaginationLink
                                onClick={() => handlePageChange(page)}
                                isActive={currentPage === page}
                                className={`cursor-pointer ${currentPage === page ? 'text-black' : ''} hover:bg-[#02ACAC]`}
                            >
                                {page}
                            </PaginationLink>
                        </PaginationItem>
                    ))}
                    <PaginationItem>
                        <PaginationNext
                            onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                            className={`cursor-pointer ${currentPage === totalPages ? 'pointer-events-none opacity-50' : ''} hover:bg-[#02ACAC]`}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>

        </div>

    )
}


