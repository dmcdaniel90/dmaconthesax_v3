

export default function CalendarIcon({ day, numberMonth = 1 }: { day: number, numberMonth: number }) {
    const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][numberMonth - 1];

    return (
        <div className="relative w-12 h-12 xs:w-16 xs:h-16 sm:w-20 sm:h-20 md:w-20 md:h-20 lg:w-20 lg:h-20 xl:w-24 xl:h-24 bg-gradient-to-br from-[#02ACAC] to-[#018a8a] rounded-lg shadow-lg border-2 border-white/20 overflow-hidden">
            {/* Calendar binding holes */}
            <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white/30 rounded-full"></div>
            <div className="absolute top-1 left-1/2 transform -translate-x-1/2 translate-x-2 w-1 h-1 bg-white/30 rounded-full"></div>
            <div className="absolute top-1 left-1/2 transform -translate-x-1/2 -translate-x-2 w-1 h-1 bg-white/30 rounded-full"></div>
            
            {/* Month header */}
            <div className="w-full h-4 xs:h-6 sm:h-7 md:h-6 lg:h-6 xl:h-7 bg-white/10 backdrop-blur-sm flex items-center justify-center">
                <span className="text-white text-xs font-semibold tracking-wide">{month}</span>
            </div>
            
            {/* Day number */}
            <div className="w-full h-full flex items-center justify-center">
                <span className="mb-4 xs:mb-6 sm:mb-6 md:mb-6 lg:mb-6 xl:mb-4 text-white text-lg xs:text-2xl sm:text-3xl md:text-3xl lg:text-3xl xl:text-4xl font-bold drop-shadow-lg">{day}</span>
            </div>
            
            {/* Subtle calendar lines */}
            <div className="absolute top-4 xs:top-6 sm:top-7 md:top-6 lg:top-6 xl:top-7 left-2 right-2 h-px bg-white/20"></div>
            <div className="absolute top-4 xs:top-6 sm:top-7 md:top-6 lg:top-6 xl:top-7 left-1/2 w-px h-full bg-white/10"></div>
        </div>
    )
}
