'use client'

import { forwardRef } from "react"
import BookingForm from "@/app/booking/BookingForm/BookingForm"
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
            <div className="bg-gradient-to-r from-[#02ACAC] to-[#005C5C] py-4 sm:py-6 px-4 sm:px-8 rounded-bl-lg text-white cursor-pointer hover:from-[#005C5C] hover:to-[#02ACAC] transition-all duration-300 shadow-lg" onClick={handleNavChange}>
                <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2">Have questions about booking?</h3>
                <p className="text-sm sm:text-base opacity-90">View frequently asked questions here</p>
            </div>
        )
    }

    const ForwardedDiv = forwardRef(FAQLink)

    return (
        <main className="flex flex-col gap-8 sm:gap-12 md:gap-16 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24 mt-8 sm:mt-12 md:mt-16">
            <div className="mt-24 bg-gradient-to-br from-gray-900/80 to-gray-800/60 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-700/30 overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 lg:gap-0">
                    <section className="relative order-2 lg:order-1">
                        <div className="h-48 sm:h-64 md:h-80 lg:h-full">
                            <Image 
                                src="/sax_portrait_1.jpg" 
                                alt="Sax" 
                                width={700} 
                                height={1000} 
                                className="w-full h-full object-cover object-center" 
                                style={{ objectPosition: 'center 30%' }}
                            />
                        </div>
                        <Link href="/faq" passHref onClick={handleNavChange}>
                            <ForwardedDiv />
                        </Link>
                    </section>
                    <section className="order-1 lg:order-2 bg-gradient-to-br from-gray-900/90 to-gray-800/70 backdrop-blur-sm">
                        <BookingForm />
                    </section>
                </div>
            </div>
        </main>
    )
}
