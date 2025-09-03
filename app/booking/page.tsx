'use client'

import { forwardRef } from "react"
import BookingForm from "@/app/booking/BookingForm/BookingForm"
import Link from "next/link"
import { useHeaderContext } from "../contexts/HeaderContext"
import Image from "next/image"
import ResponsiveImage from "@/components/ResponsiveImage"

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
        <main className="mt-16 min-h-screen bg-gradient-to-br from-gray-900/80 via-gray-800/60 via-[#02ACAC]/10 to-gray-900/90">
            {/* Hero Section */}
            <section className="relative overflow-hidden py-20 sm:py-24 lg:py-32 xl:py-40">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-40">
                    <div className="w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMkFDQUMiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')]"></div>
                </div>
                
                <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="max-w-4xl mx-auto">
                        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#02ACAC] to-transparent mx-auto mb-8"></div>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-black tracking-tight leading-tight mb-6">
                            <span className="bg-gradient-to-r from-white via-gray-100 to-[#02ACAC] bg-clip-text text-transparent">
                                Book Your Event
                            </span>
                        </h1>
                        <p className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                            Secure your date and create an unforgettable musical experience
                        </p>
                    </div>
                </div>
            </section>

            {/* Main Booking Section */}
            <section className="relative z-10 pb-20 sm:pb-24 lg:pb-32 xl:pb-40">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="bg-gradient-to-br from-gray-900/90 via-gray-800/80 to-gray-900/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-700/20 hover:border-[#02ACAC]/30 transition-all duration-500 hover:shadow-[#02ACAC]/10 overflow-hidden">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                                <section className="relative order-2 lg:order-1 overflow-hidden">
                                    <div className="h-48 sm:h-64 md:h-80 lg:h-full relative group">
                                        <ResponsiveImage 
                                            imageName="festival_001_j2rxjw"
                                            fallbackSrc="/sax_portrait_1.jpg" 
                                            alt="Sax" 
                                            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105" 
                                            style={{ objectPosition: '45% 50%' }}
                                        />
                                        {/* Subtle overlay for better visual depth */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
                                    </div>
                                    <Link href="/faq" passHref onClick={handleNavChange}>
                                        <ForwardedDiv />
                                    </Link>
                                </section>
                                <section className="order-1 lg:order-2 bg-gradient-to-br from-gray-900/95 via-gray-800/85 to-gray-900/95 backdrop-blur-xl py-8 sm:py-10 lg:p-8 xl:p-12 min-h-[600px] lg:min-h-[700px] relative">
                                    {/* Subtle accent line */}
                                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-[#02ACAC] to-transparent" />
                                    
                                    <div className="text-center mb-8 lg:mb-10">
                                        <div className="w-16 h-1 bg-gradient-to-r from-transparent via-[#02ACAC] to-transparent mx-auto mb-4" />
                                        <h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-white mb-2 tracking-tight">
                                            Get Your Quote
                                        </h2>
                                        <p className="text-gray-300 text-lg leading-relaxed">
                                            Fill out the form below to get started
                                        </p>
                                    </div>
                                    <BookingForm />
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
