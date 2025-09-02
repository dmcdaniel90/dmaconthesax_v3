'use client'
import Link from "next/link";
import { useHeaderContext } from "@/app/contexts/HeaderContext";

export default function CallToActionAlt() {
    const { dispatch } = useHeaderContext()

    const handleNavChange = (route: string) => {
        dispatch({ type: "SET_ACTIVE_LINK", payload: route })
    }

    return (
<section className="relative z-10 py-16 sm:py-20 lg:py-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#02ACAC] to-transparent mx-auto mb-8"></div>
                        <h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-white mb-6">
                            Ready to Get Started?
                        </h2>
                        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                            We typically respond within 48-72 hours. For urgent bookings, please call us directly.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link 
                                href="/booking" 
                                className="inline-flex items-center justify-center px-8 py-4 bg-[#02ACAC] hover:bg-[#02ACAC]/90 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105"
                                onClick={() => handleNavChange('booking')}
                            >
                                Book Now
                            </Link>
                            <a 
                                href="tel:+447359142634" 
                                className="inline-flex items-center justify-center px-8 py-4 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-xl transition-all duration-300 border border-gray-600 hover:border-gray-500"
                            >
                                Call Us
                            </a>
                        </div>
                    </div>
                </div>
            </section>
    )
}