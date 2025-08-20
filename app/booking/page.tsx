'use client'

import { useState } from "react"
import { Separator } from "@/components/ui/separator"
import BookingForm from "@/app/booking/BookingForm"
import CustomCalendar from "@/components/Calendar"
import FAQ from "@/components/FAQ"

export default function Booking() {

    const [dateString, setDateString] = useState<string>(new Date().toLocaleDateString("en-GB"))

    const handleSetDate = (dateString: string) => {
        setDateString(dateString)
    }


    return (
        <main className="h-auto px-32 pt-8 pb-32 grid grid-cols-12 gap-8 grow shrink-0 basis-auto">
            <section className="col-span-6">
                <CustomCalendar setDate={handleSetDate} />
                <Separator className="my-8" />
                <FAQ />
            </section>
            <section className="col-span-5 col-start-8">
                <BookingForm dateString={dateString} />
            </section>
        </main>
    )
}
