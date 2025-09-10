import Image from "next/image"
import Link from "next/link"
import { FaClock, FaMapLocation, FaCalendar } from "react-icons/fa6"
import CalendarIcon from "./ui/CalendarIcon"
import { composeDateString } from "@/lib/utils"

type EventProps = {
    imgSrc: string,
    imgAltText: string,
    eventName: string,
    monthNumber: number,
    day: number,
    year: number,
    time: string,
    location: string
}

export default function Event(props: EventProps) {

    const {
        imgSrc,
        imgAltText,
        eventName,
        monthNumber,
        day,
        year,
        time,
        location,
    } = props

    const dateString = composeDateString(monthNumber, day, year);

    return (
        <div className="group relative py-4 sm:py-6 md:py-8 px-2 sm:px-4 min-h-[200px] sm:min-h-[220px] md:min-h-[240px] bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-500 hover:shadow-2xl hover:shadow-[#02ACAC]/20 hover:scale-[1.02] hover:bg-gradient-to-br hover:from-white/10 hover:to-white/15 before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-r before:from-[#02ACAC]/10 before:via-transparent before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500">
            {/* Very small mobile layout (<640px) */}
            <div className="block sm:hidden flex flex-col h-full">
                {/* Calendar Icon and Title on one line - Fixed height */}
                <div className="flex items-center gap-3 mb-3 h-12">
                    <div className="flex-shrink-0 relative">
                        {imgSrc && <Image src={imgSrc} alt={imgAltText || eventName} width={100} height={100} className="h-12 w-12 object-cover rounded-lg ring-2 ring-white/20 group-hover:ring-[#02ACAC]/50 transition-all duration-300" />}
                        {!imgSrc && <div className="group-hover:scale-110 transition-transform duration-300"><CalendarIcon day={day} numberMonth={monthNumber} /></div>}
                        <div className="absolute -inset-1 bg-gradient-to-r from-[#02ACAC]/20 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <h3 className="font-semibold text-base leading-tight text-white flex-1 line-clamp-2 group-hover:text-white transition-colors duration-300">{eventName}</h3>
                </div>
                
                {/* Date/Time on its own line - Fixed height */}
                <div className="flex items-center gap-1 text-sm text-white mb-3 h-5">
                    <FaCalendar className="flex-shrink-0 text-[#02ACAC] group-hover:scale-110 transition-transform duration-300" />
                    <span className="group-hover:text-white/90 transition-colors duration-300">{dateString}</span>
                    <span className="text-[#02ACAC] group-hover:scale-125 transition-transform duration-300">@</span>
                    <span className="group-hover:text-white/90 transition-colors duration-300">{time}</span>
                </div>
                
                {/* Location and other details - Fixed height */}
                <div className="flex flex-col gap-2 text-white flex-1">
                    <div className="h-12 flex items-start gap-2 text-sm">
                        <FaMapLocation className="flex-shrink-0 mt-0.5 text-[#02ACAC] group-hover:scale-110 transition-transform duration-300" />
                        <span className="break-words line-clamp-3 group-hover:text-white/90 transition-colors duration-300">{location}</span>
                    </div>
                    
                    <div className="h-5">
                        <Link className="inline-block underline text-sm sm:text-base font-bold hover:text-[#02ACAC] transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#02ACAC]/20 cursor-pointer" href={`https://google.com/maps/search/?api=1&query=${location}`} target="_blank">View on Google Maps</Link>
                    </div>
                </div>
            </div>

            {/* Standard layout for larger screens (≥640px) */}
            <div className="hidden sm:grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 h-full">
                {/* Calendar Icon - 1/3 width - Fixed height */}
                <div className="col-span-1 flex items-center justify-start h-20 sm:h-24 md:h-28">
                    <div className="relative">
                        {imgSrc && <Image src={imgSrc} alt={imgAltText || eventName} width={100} height={100} className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 object-cover rounded-lg ring-2 ring-white/20 group-hover:ring-[#02ACAC]/50 transition-all duration-300" />}
                        {!imgSrc && <div className="group-hover:scale-110 transition-transform duration-300"><CalendarIcon day={day} numberMonth={monthNumber} /></div>}
                        <div className="absolute -inset-2 bg-gradient-to-r from-[#02ACAC]/20 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                </div>
                
                {/* Title/Date/Location - 2/3 width - Fixed heights */}
                <div className="col-span-2 flex flex-col gap-2 sm:gap-3 md:gap-4 text-white h-full">
                    {/* Event Title - Fixed height */}
                    <div className="h-12 sm:h-14 md:h-16">
                        <h3 className="font-bold text-base sm:text-xl md:text-2xl leading-tight text-white/95 tracking-tight line-clamp-2 group-hover:text-white transition-colors duration-300">{eventName}</h3>
                    </div>
                    
                    {/* Date and Time - Fixed height */}
                    <div className="h-12 sm:h-14 md:h-16 flex flex-col gap-1.5 sm:gap-2">
                        <div className="h-5 sm:h-6 flex items-center gap-2.5 font-semibold text-sm sm:text-base text-white/90">
                            <FaCalendar className="flex-shrink-0 text-[#02ACAC] group-hover:scale-110 transition-transform duration-300" />
                            <span className="truncate font-medium group-hover:text-white/95 transition-colors duration-300">{dateString}</span>
                        </div>
                        <div className="h-5 sm:h-6 flex items-center gap-2.5 font-semibold text-sm sm:text-base text-white/90">
                            <FaClock className="flex-shrink-0 text-[#02ACAC] group-hover:scale-110 transition-transform duration-300" />
                            <span className="truncate font-medium group-hover:text-white/95 transition-colors duration-300">{time}</span>
                        </div>
                    </div>
                    
                    {/* Location - Fixed height */}
                    <div className="h-12 sm:h-14 md:h-16 flex items-start gap-2.5 text-sm sm:text-base text-white/85">
                        <FaMapLocation className="flex-shrink-0 mt-0.5 text-[#02ACAC] group-hover:scale-110 transition-transform duration-300" />
                        <span className="break-words leading-relaxed line-clamp-3 group-hover:text-white/90 transition-colors duration-300">{location}</span>
                    </div>
                </div>
                
                {/* Google Maps Link - Full width with enhanced spacing - Fixed height */}
                <div className="col-span-3 flex flex-col gap-2 sm:gap-3 md:gap-4 pt-2 sm:pt-3 md:pt-4 border-t border-white/10 h-8 sm:h-10 md:h-12">
                    <Link className="inline text-[#02ACAC] hover:text-[#02ACAC]/80 text-sm sm:text-base md:text-lg font-bold transition-all duration-300 hover:underline hover:scale-105 hover:shadow-lg hover:shadow-[#02ACAC]/20 cursor-pointer" href={`https://google.com/maps/search/?api=1&query=${location}`} target="_blank">View on Google Maps →</Link>
                </div>
            </div>
        </div>
    )
}
