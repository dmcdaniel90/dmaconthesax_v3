'use client';
import Event from "@/components/Event"
import { Pagination, PaginationContent, PaginationNext, PaginationPrevious, PaginationItem, PaginationLink } from "@/components/ui/pagination"
// import events from '@/lib/sample-events.json' // Replaced with Google Calendar API
import { useState, useMemo, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Loading, Skeleton } from "@/components/ui/loading";
import { useCachedEvents } from "@/hooks/useCachedEvents";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/ScrollReveal";

type MusicEvents = {
    eventName: string;
    monthNumber: number;
    day: number;
    year: number;
    time?: string;
    location?: string;
    imgSrc?: string;
    imgAltText?: string;
}

export default function EventList({ itemsPerPage = 4, type = "grid" }: { itemsPerPage?: number, type?: "grid" | "list" }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [view, setView] = useState<"grid" | "list">(type);
    const [isViewChanging, setIsViewChanging] = useState(false);
    const [isSmallDevice, setIsSmallDevice] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    
    // Use the cached events hook
    const { events, isLoading, error, refetch, isFromCache, cacheAge, clearCache } = useCachedEvents();

    // Detect small devices and set view to list
    useEffect(() => {
        const checkDeviceSize = () => {
            const isSmall = window.innerWidth < 1024; // lg breakpoint (remove grid for tablets)
            setIsSmallDevice(isSmall);
            if (isSmall) {
                setView("list");
            }
        };

        checkDeviceSize();
        window.addEventListener('resize', checkDeviceSize);
        
        return () => window.removeEventListener('resize', checkDeviceSize);
    }, []);

    // Memoize the paginated data to prevent unnecessary recalculations
    const paginatedEvents = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return events.slice(startIndex, startIndex + itemsPerPage);
    }, [currentPage, itemsPerPage, events]);

    const totalPages = Math.ceil(events.length / itemsPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        // Scroll to top of container when page changes
        if (containerRef.current) {
            containerRef.current.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
        }
    };

    const handleViewChange = () => {
        // Don't allow view changes on small devices
        if (isSmallDevice) return;
        
        setIsViewChanging(true);
        setTimeout(() => {
            setView(view === "grid" ? "list" : "grid");
            setIsViewChanging(false);
        }, 300);
    };

    // Skeleton loader for events
    const EventSkeleton = () => (
        <div className="bg-gray-800/50 rounded-lg p-4 animate-pulse">
            <div className="flex items-start gap-4">
                <Skeleton className="w-20 h-20 rounded-lg" />
                <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                    <Skeleton className="h-3 w-2/3" />
                    <Skeleton className="h-3 w-1/3" />
                </div>
            </div>
        </div>
    );

    if (isLoading) {
        return (
            <div className="bg-gray-900/50 px-4 sm:px-8 md:px-12 lg:px-16 py-8 sm:py-12">
                <div className="flex items-center gap-3 mb-6">
                    <Skeleton className="h-8 w-48" />
                    <Skeleton className="h-8 w-32" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    {Array.from({ length: itemsPerPage }).map((_, i) => (
                        <EventSkeleton key={i} />
                    ))}
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-gray-900/50 px-4 sm:px-8 md:px-12 lg:px-16 py-8 sm:py-12">
                <div className="text-center">
                    <h2 className="text-2xl sm:text-3xl text-white mb-4">Upcoming Events</h2>
                    <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-4 mb-6">
                        <p className="text-red-300 mb-2">⚠️ Unable to load events from API</p>
                        <p className="text-gray-300 text-sm">{error}</p>
                        {isFromCache && (
                            <p className="text-yellow-300 text-xs mt-2">📦 Showing cached data (cache age: {cacheAge} minutes)</p>
                        )}
                        <div className="flex gap-2 justify-center mt-4">
                            <Button 
                                onClick={refetch}
                                className="bg-[#02ACAC] hover:bg-[#02ACAC]/80 text-white"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Retrying...' : 'Retry'}
                            </Button>
                            <Button 
                                onClick={clearCache}
                                className="bg-gray-600 hover:bg-gray-700 text-white"
                                disabled={isLoading}
                            >
                                Refresh Events
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <StaggerContainer staggerDelay={0.15} className={`bg-gray-900/50 px-4 sm:px-8 md:px-12 lg:px-16 py-8 sm:py-12`}>
            <div ref={containerRef} className="flex items-center justify-between mb-6">
                <FadeInUp delay={0.1} duration={0.6}>
                    <div>
                        <h2 className="text-2xl sm:text-3xl text-white">Upcoming Events</h2>
                        {isFromCache && (
                            <p className="text-sm text-gray-400 mt-1">
                                📦 Last updated ({cacheAge} min ago) • 
                                <button 
                                    onClick={refetch}
                                    className="text-gray-400 hover:text-gray-300 ml-1 underline cursor-pointer"
                                >
                                    Refresh
                                </button>
                            </p>
                        )}
                    </div>
                </FadeInUp>
                <FadeInUp delay={0.2} duration={0.6}>
                    <Button 
                        className="w-[200px] h-[48px] hidden lg:block bg-[#02ACAC] cursor-pointer hover:bg-background hover:text-foreground transition-colors text-base px-8 py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
                        onClick={handleViewChange}
                        disabled={isViewChanging}
                        aria-label={`Switch to ${view === "grid" ? "List" : "Grid"} View`}
                        tabIndex={0}
                    >
                        {isViewChanging ? (
                            <Loading variant="dots" size="sm" className="text-white" />
                        ) : (
                            view === "grid" ? "Switch to List View" : "Switch to Grid View"
                        )}
                    </Button>
                </FadeInUp>
            </div>
            
            <div className={`grid ${view === "grid" ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1"} gap-4 sm:gap-6 transition-all duration-300`}>
                {isViewChanging ? (
                    // Show skeleton loaders during view change
                    Array.from({ length: itemsPerPage }).map((_, i) => (
                        <EventSkeleton key={i} />
                    ))
                ) : (
                    paginatedEvents.map((event: MusicEvents, index: number) => (
                        <StaggerItem key={event.eventName + Math.random()} direction="up" delay={index * 0.1}>
                            <Event 
                                eventName={event.eventName} 
                                monthNumber={event.monthNumber} 
                                day={event.day} 
                                year={event.year} 
                                time={event.time || "TBA"} 
                                location={event.location || "TBA"} 
                                imgSrc={event.imgSrc || ""} 
                                imgAltText={event.imgAltText || ""} 
                            />
                        </StaggerItem>
                    ))
                )}
            </div>

            {/* Shadcn Pagination Component */}
            <Pagination className="mt-6 sm:mt-8 text-white">
                <PaginationContent className="flex flex-wrap justify-center gap-1 sm:gap-2">
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                            className={`cursor-pointer text-sm sm:text-base ${currentPage === 1 ? 'pointer-events-none opacity-50' : ''} hover:bg-[#02ACAC]`}
                        />
                    </PaginationItem>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <PaginationItem key={page}>
                            <PaginationLink
                                onClick={() => handlePageChange(page)}
                                isActive={currentPage === page}
                                className={`cursor-pointer text-sm sm:text-base px-2 sm:px-3 py-1 sm:py-2 ${currentPage === page ? 'text-black' : ''} hover:bg-[#02ACAC]`}
                            >
                                {page}
                            </PaginationLink>
                        </PaginationItem>
                    ))}
                    <PaginationItem>
                        <PaginationNext
                            onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                            className={`cursor-pointer text-sm sm:text-base ${currentPage === totalPages ? 'pointer-events-none opacity-50' : ''} hover:bg-[#02ACAC]`}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </StaggerContainer>
    )
}


