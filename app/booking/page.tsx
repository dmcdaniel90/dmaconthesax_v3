'use client'

import { forwardRef } from "react"
import BookingForm from "@/app/booking/BookingForm"
import Link from "next/link"
import { useHeaderContext } from "../contexts/HeaderContext"
import Image from "next/image"

export default function Booking() {
    const HeaderContext = useHeaderContext()

    const handleNavChange = () => {
        HeaderContext.dispatch({ type: "SET_ACTIVE_LINK", payload: "faq" })
    }

    const FAQLink = () => {
        return (
            <div className="h-[10.333%] bg-[#02ACAC] py-4 px-8 rounded-bl-lg text-white cursor-pointer hover:bg-[#005C5C] transition-colors duration-300" onClick={handleNavChange}>
                <h3 className="text-2xl font-semibold">Have questions about booking?</h3>
                <p>View frequently asked questions here</p>
            </div>
        )
    }

    const ForwardedDiv = forwardRef(FAQLink)


    return (
        <main className="h-auto px-32 pt-8 pb-32 grid grid-cols-12 gap-0 grow shrink-0 basis-auto">
            <section className="col-span-6 max-h-[1100px]">
                <Image src="/sax_portrait_1.jpg" alt="Sax" width={700} height={1000} className="rounded-tl-lg h-[90%]" />
                <Link href="/faq" passHref onClick={handleNavChange}>
                    <ForwardedDiv />
                </Link>
            </section>
            <section className="col-span-6 col-start-7">
                <BookingForm />
            </section>
        </main>
    )
}
