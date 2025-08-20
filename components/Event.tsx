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
        <div className="flex flex-col py-8">
            <div className="flex gap-8">
                {imgSrc && <Image src={imgSrc} alt={imgAltText || eventName} width={100} height={100} className="h-auto max-h-[175px]" />}
                {!imgSrc && <CalendarIcon day={day} numberMonth={monthNumber} />}
                <div className="flex flex-col gap-1 text-white">
                    <h3 className="font-semibold text-2xl">{eventName}</h3>
                    <span className="flex items-center gap-2 font-semibold"><FaClock /> {dateString} @ {time}</span>
                    <span className="flex items-center gap-2"><FaMapLocation /> {location}</span>
                </div>
            </div>
            {ticketPrice > 0 ? <p className="font-bold mx-33 mb-4 text-white">Ticket Price: £{ticketPrice}</p> : <p className="font-bold mx-33 mb-4 text-white">Free Entry</p>}
            <Link className="underline mx-33 text-white w-48" href={`https://google.com/maps/search/?api=1&query=${location}`} target="_blank">View on Google Maps</Link>
        </div>

    )
}
