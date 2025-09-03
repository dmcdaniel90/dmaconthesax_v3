'use client'

import { forwardRef } from "react"
import BookingForm from "@/app/booking/BookingForm/BookingForm"
import Link from "next/link"
import { useHeaderContext } from "../contexts/HeaderContext"
import ResponsiveImage from "@/components/ResponsiveImage"
import { CalendarIcon, Clock, MapPin, Music } from "lucide-react"

export default function Booking() {
    const HeaderContext = useHeaderContext()

    const handleNavChange = () => {
        HeaderContext.dispatch({ type: "SET_ACTIVE_LINK", payload: "faq" })
    }

    const FAQLink = () => {
        return (
            <div className="bg-gradient-to-r from-[#02ACAC] to-[#005C5C] py-4 sm:py-6 px-4 sm:px-8 rounded-lg text-white cursor-pointer hover:from-[#005C5C] hover:to-[#02ACAC] transition-all duration-300 shadow-lg" onClick={handleNavChange}>
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
                            Let&apos;s make your event unforgettable with live saxophone music
                        </p>
                    </div>
                </div>
            </section>

            {/* Main Content Section */}
            <section className="relative z-10 py-20 sm:py-24 lg:py-32 xl:py-40">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        {/* Two Column Layout */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16">
                            {/* Left Column - Booking Form */}
                            <div className="order-2 lg:order-1">
                                <BookingForm />
                            </div>

                            {/* Right Column - Image and Info */}
                            <div className="order-1 lg:order-2">
                                <div className="bg-gradient-to-br from-gray-900/90 via-gray-800/80 to-gray-900/90 backdrop-blur-xl rounded-3xl p-8 sm:p-10 lg:p-12 xl:p-16 border border-gray-700/20 hover:border-[#02ACAC]/30 transition-all duration-500 hover:shadow-[#02ACAC]/10 shadow-2xl">
                                    <div className="text-center mb-10">
                                        <div className="w-16 h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 bg-[#02ACAC]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                            <Music className="w-8 h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12 text-[#02ACAC]" />
                                        </div>
                                        <h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-white mb-4">
                                            Professional Saxophone Performance
                                        </h2>
                                        <p className="text-gray-400 text-lg">
                                            Over 20 years of experience delivering unforgettable musical experiences
                                        </p>
                                    </div>

                                    {/* Image */}
                                    <div className="relative mb-8">
                                        <ResponsiveImage
                                            imageName="festival_001_j2rxjw"
                                            fallbackSrc="/sax_portrait_1.jpg"
                                            alt="Professional Saxophonist"
                                            className="w-full h-64 sm:h-80 lg:h-96 rounded-2xl object-cover"
                                            fill={true}
                                        />
                                    </div>

                                    {/* Features */}
                                    <div className="space-y-6">
                                        <div className="flex items-center space-x-4 p-4 bg-gray-800/50 rounded-xl border border-gray-700/30 hover:border-[#02ACAC]/30 transition-all duration-300">
                                            <div className="flex-shrink-0 w-12 h-12 bg-[#02ACAC]/20 rounded-full flex items-center justify-center">
                                                <CalendarIcon className="w-6 h-6 text-[#02ACAC]" />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <p className="text-sm text-gray-400 mb-1">Flexible Scheduling</p>
                                                <p className="text-lg lg:text-xl text-white">Available for events any day of the week</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-4 p-4 bg-gray-800/50 rounded-xl border border-gray-700/30 hover:border-[#02ACAC]/30 transition-all duration-300">
                                            <div className="flex-shrink-0 w-12 h-12 bg-[#02ACAC]/20 rounded-full flex items-center justify-center">
                                                <Clock className="w-6 h-6 text-[#02ACAC]" />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <p className="text-sm text-gray-400 mb-1">Custom Duration</p>
                                                <p className="text-lg lg:text-xl text-white">From 1 hour to full day events</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-4 p-4 bg-gray-800/50 rounded-xl border border-gray-700/30 hover:border-[#02ACAC]/30 transition-all duration-300">
                                            <div className="flex-shrink-0 w-12 h-12 bg-[#02ACAC]/20 rounded-full flex items-center justify-center">
                                                <MapPin className="w-6 h-6 text-[#02ACAC]" />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <p className="text-sm text-gray-400 mb-1">Wide Coverage</p>
                                                <p className="text-lg lg:text-xl text-white">Serving Wiltshire and surrounding areas and beyond</p>
                                            </div>
                                        </div>
                                        <Link href="/faq" passHref onClick={handleNavChange}>
                                            <ForwardedDiv />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
