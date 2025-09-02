import Link from "next/link"
import ContactForm from "./ContactForm"
import CallToActionAlt from "@/components/CallToActionAlt"
import Image from "next/image"

export default function Contact() {
    return (
        <main className="mt-16 min-h-screen bg-gradient-to-br from-gray-900/80 via-gray-800/80 to-gray-900/80">
            {/* Hero Section */}
            <section className="relative overflow-hidden py-16 sm:py-20 lg:py-24 xl:py-32">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-40">
                    <div className="w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMkFDQUMiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')]"></div>
                </div>
                
                <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="max-w-4xl mx-auto">
                        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#02ACAC] to-transparent mx-auto mb-8"></div>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold bg-gradient-to-r from-white via-gray-200 to-[#02ACAC] bg-clip-text text-transparent mb-6">
                            Get In Touch
                        </h1>
                        <p className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                            Ready to make your event unforgettable? Let&apos;s start a conversation.
                        </p>
                    </div>
                </div>
            </section>

            {/* Main Content Section */}
            <section className="relative z-10 py-16 sm:py-20 lg:py-24 xl:py-32">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        {/* Contact Information Cards */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 mb-16 lg:mb-20">
                            {/* Contact Info Card */}
                            <div className="bg-gradient-to-br from-gray-900/90 via-gray-800/80 to-gray-900/90 backdrop-blur-sm rounded-3xl p-8 sm:p-10 lg:p-12 xl:p-16 border border-gray-700/30 shadow-2xl">
                                <div className="text-center mb-10">
                                    <div className="w-16 h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 bg-[#02ACAC]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <svg className="w-8 h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12 text-[#02ACAC]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-white mb-4">
                                        Contact Information
                                    </h2>
                                    <p className="text-gray-400 text-lg">
                                        Get in touch with us directly or use the contact form
                                    </p>
                                </div>

                                {/* Contact Details */}
                                <div className="space-y-6">
                                    {/* Email */}
                                    <div className="flex items-center space-x-4 p-4 bg-gray-800/50 rounded-xl border border-gray-700/30">
                                        <div className="flex-shrink-0 w-12 h-12 bg-[#02ACAC]/20 rounded-full flex items-center justify-center">
                                            <svg className="w-6 h-6 text-[#02ACAC]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="text-sm text-gray-400 mb-1">Email</p>
                                            <a 
                                                href="mailto:contact@devinmcdaniel.com" 
                                                className="text-lg lg:text-xl text-white hover:text-[#02ACAC] transition-colors duration-300 underline decoration-2 underline-offset-4 break-all"
                                            >
                                                contact@devinmcdaniel.com
                                            </a>
                                        </div>
                                    </div>

                                    {/* Phone */}
                                    <div className="flex items-center space-x-4 p-4 bg-gray-800/50 rounded-xl border border-gray-700/30">
                                        <div className="flex-shrink-0 w-12 h-12 bg-[#02ACAC]/20 rounded-full flex items-center justify-center">
                                            <svg className="w-6 h-6 text-[#02ACAC]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="text-sm text-gray-400 mb-1">Phone</p>
                                            <a 
                                                href="tel:+447359142634" 
                                                className="text-lg lg:text-xl text-white hover:text-[#02ACAC] transition-colors duration-300 break-all"
                                            >
                                                +447359142634
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                {/* Additional Info */}
                                <div className="mt-8 p-6 bg-gray-800/30 rounded-xl border border-gray-700/20">
                                    <p className="text-gray-300 text-center">
                                        Want to get pricing and availability? <Link href="/booking" className="text-[#02ACAC] hover:text-[#02ACAC]/80 underline decoration-2 underline-offset-4 transition-colors duration-300">Click here</Link> to get a quote.
                                    </p>
                                </div>
                            </div>

                            {/* Contact Form Card */}
                            <div className="bg-gradient-to-br from-gray-900/90 via-gray-800/80 to-gray-900/90 backdrop-blur-sm rounded-3xl p-8 sm:p-10 lg:p-12 xl:p-16 border border-gray-700/30 shadow-2xl">
                                <div className="text-center mb-10">
                                    <div className="w-16 h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 bg-[#02ACAC]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <svg className="w-8 h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12 text-[#02ACAC]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                        </svg>
                                    </div>
                                    <h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-white mb-4">
                                        Send Message
                                    </h2>
                                    <p className="text-gray-400 text-lg">
                                        Fill out the form below and we&apos;ll get back to you
                                    </p>
                                </div>
                                
                                <ContactForm />
                            </div>
                        </div>

                        {/* About Section with Image */}
                        <div className="bg-gradient-to-br from-gray-900/80 via-gray-800/70 to-gray-900/80 backdrop-blur-sm rounded-3xl p-8 sm:p-10 lg:p-12 xl:p-16 border border-gray-700/30 shadow-2xl">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">
                                <div>
                                    <h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-white mb-6">
                                        About Our Services
                                    </h2>
                                    <div className="prose prose-lg prose-invert max-w-none">
                                        <p className="text-gray-300 text-lg leading-relaxed mb-6">
                                            We specialize in creating unforgettable musical experiences for your events. 
                                            From intimate gatherings to large celebrations, our saxophone performances 
                                            add elegance and sophistication to any occasion.
                                        </p>
                                        <p className="text-gray-300 text-lg leading-relaxed">
                                            Whether you need background music for a corporate event, wedding ceremony, 
                                            or private party, we work closely with you to understand your vision and 
                                            deliver a performance that exceeds expectations.
                                        </p>
                                    </div>
                                </div>
                                
                                <div className="relative">
                                    <div className="aspect-square rounded-2xl overflow-hidden">
                                        <Image 
                                            src="/sax_portrait_2.webp" 
                                            alt="Saxophone Performance" 
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent rounded-2xl"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <CallToActionAlt />
            
        </main>
    )
}
