import Image from "next/image"
import Link from "next/link"
import { FaClock, FaMapLocation } from "react-icons/fa6"
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
    location: string,
    ticketPrice: number
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
        ticketPrice,
    } = props

    const dateString = composeDateString(monthNumber, day, year);

    return (
        <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 py-4 sm:py-6 md:py-8 px-2 sm:px-4">
            {/* Calendar Icon - 1/3 width */}
            <div className="col-span-1 flex items-center justify-start">
                {imgSrc && <Image src={imgSrc} alt={imgAltText || eventName} width={100} height={100} className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 object-cover rounded-lg" />}
                {!imgSrc && <CalendarIcon day={day} numberMonth={monthNumber} />}
            </div>
            
            {/* Title/Date/Location - 2/3 width */}
            <div className="col-span-2 flex flex-col gap-1 sm:gap-2 text-white">
                <h3 className="font-semibold text-base sm:text-lg md:text-xl leading-tight truncate">{eventName}</h3>
                <span className="flex items-center gap-2 font-semibold text-sm sm:text-base"><FaClock className="flex-shrink-0" /> <span className="truncate">{dateString} @ {time}</span></span>
                <span className="flex items-center gap-2 text-sm sm:text-base"><FaMapLocation className="flex-shrink-0" /> <span className="truncate">{location}</span></span>
            </div>
            
            {/* Ticket Price and Google Maps Link - Full width with reduced spacing */}
            <div className="col-span-3 flex flex-col gap-1 sm:gap-2">
                {ticketPrice > 0 ? <p className="font-bold text-white text-sm sm:text-base">Ticket Price: £{ticketPrice}</p> : <p className="font-bold text-white text-sm sm:text-base">Free Entry</p>}
                <Link className="inline-block underline text-white text-sm sm:text-base hover:text-[#02ACAC] transition-colors" href={`https://google.com/maps/search/?api=1&query=${location}`} target="_blank">View on Google Maps</Link>
            </div>
        </div>
    )
}
