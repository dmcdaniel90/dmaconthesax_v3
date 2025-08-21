'use client'

import { forwardRef, useState } from "react"
import { Separator } from "@/components/ui/separator"
import BookingForm from "@/app/booking/BookingForm"
import CustomCalendar from "@/components/Calendar"
import Link from "next/link"
import FAQ from "@/app/faq/FAQ"
import { useHeaderContext } from "../contexts/HeaderContext"

export default function Booking() {

    const [dateString, setDateString] = useState<string>(new Date().toLocaleDateString("en-GB"))
    const HeaderContext = useHeaderContext()

    const handleSetDate = (dateString: string) => {
        setDateString(dateString)
    }

    const handleNavChange = () => {
        HeaderContext.dispatch({ type: "SET_ACTIVE_LINK", payload: "faq" })
    }

    const FAQLink = () => {
        return (
            <div className="bg-[#02ACAC] py-4 px-8 rounded-lg text-white cursor-pointer hover:border-white hover:border-2" onClick={handleNavChange}>
                <h3 className="text-2xl font-semibold">Have questions about booking?</h3>
                <p>View frequently asked questions here</p>
            </div>
        )
    }

    const ForwardedDiv = forwardRef(FAQLink)


    return (
        <main className="h-auto px-32 pt-8 pb-32 grid grid-cols-12 gap-8 grow shrink-0 basis-auto">
            <section className="col-span-6">
                <CustomCalendar setDate={handleSetDate} />
                <Separator className="my-8" />
                <Link href="/faq" passHref onClick={handleNavChange}>
                    <ForwardedDiv />
                </Link>
            </section>
            <section className="col-span-5 col-start-8">
                <BookingForm dateString={dateString} />
            </section>
        </main>
    )
}
