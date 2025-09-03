'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useHeaderContext } from '@/app/contexts/HeaderContext'
import { Phone } from 'lucide-react'

interface MobileNavProps {
    isOpen: boolean
    onToggle: () => void
}

const navItems = [
    { href: '/', label: 'Home', id: 'home' },
    { href: '/about', label: 'About', id: 'about' },
    { href: '/events', label: 'Events', id: 'events' },
    { href: '/gallery', label: 'Gallery', id: 'gallery' },
    { href: '/faq', label: 'FAQ', id: 'faq' },
    { href: '/contact', label: 'Contact', id: 'contact' }
]

export default function MobileNav({ isOpen, onToggle }: MobileNavProps) {
    const { state, dispatch } = useHeaderContext()

    const handleNavClick = (link: string) => {
        dispatch({ type: 'SET_ACTIVE_LINK', payload: link })
        onToggle()
    }

    return (
        <>
            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="lg:hidden fixed inset-0 bg-gray-900/95 backdrop-blur-xl z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        {/* Close Button */}
                        <motion.button
                            onClick={onToggle}
                            className="absolute top-6 right-6 z-50 w-10 h-10 flex items-center justify-center text-white hover:text-[#02ACAC] transition-colors duration-300 cursor-pointer"
                            aria-label="Close mobile menu"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </motion.button>

                        {/* Navigation Items */}
                        <motion.nav
                            className="container mx-auto px-4 sm:px-6 lg:px-8 pt-32"
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
                        >
                            <div className="max-w-md mx-auto">
                                {/* Logo/Brand */}
                                <motion.div
                                    className="text-center mb-12"
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 }}
                                >
                                    <h2 className="text-2xl font-bold text-white mb-2">DMAC on the Sax</h2>
                                    <p className="text-gray-400">Professional Saxophone Performances</p>
                                </motion.div>

                                {/* Navigation Links */}
                                <div className="space-y-2">
                                    {navItems.map((item, index) => (
                                        <motion.div
                                            key={item.id}
                                            initial={{ x: -20, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            transition={{ 
                                                duration: 0.4, 
                                                ease: "easeOut", 
                                                delay: 0.3 + (index * 0.1) 
                                            }}
                                        >
                                            <Link
                                                href={item.href}
                                                onClick={() => handleNavClick(item.id)}
                                                className={`block w-full text-center py-4 px-6 rounded-xl text-xl font-semibold transition-all duration-300 cursor-pointer ${
                                                    state.activeLink === item.id
                                                        ? 'bg-[#02ACAC] text-white shadow-lg'
                                                        : 'text-white hover:bg-white/10 hover:text-[#02ACAC]'
                                                }`}
                                            >
                                                {item.label}
                                            </Link>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* CTA Buttons */}
                                <motion.div
                                    className="mt-12 space-y-4"
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ duration: 0.4, ease: "easeOut", delay: 0.6 }}
                                >
                                    <Link href="/booking">
                                        <button className="w-full bg-[#02ACAC] hover:bg-[#02ACAC]/90 text-white py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 cursor-pointer">
                                            Book Now
                                        </button>
                                    </Link>
                                    
                                    <Link href="tel:+447359142634" className="flex items-center justify-center space-x-3 text-white hover:text-[#02ACAC] transition-colors duration-300 py-4 cursor-pointer">
                                        <Phone className="w-5 h-5" />
                                        <span className="text-lg">+44 7359 142634</span>
                                    </Link>
                                </motion.div>

                                {/* Social Links */}
                                <motion.div
                                    className="mt-8 text-center"
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ duration: 0.4, ease: "easeOut", delay: 0.7 }}
                                >
                                    <p className="text-gray-400 text-sm mb-4">Follow us</p>
                                    <div className="flex justify-center space-x-6">
                                        <a href="https://www.facebook.com/dmaconthesax" className="text-gray-400 hover:text-[#02ACAC] transition-colors duration-300 cursor-pointer">
                                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                            </svg>
                                        </a>
                                        <a href="https://www.instagram.com/dmaconthesax" className="text-gray-400 hover:text-[#02ACAC] transition-colors duration-300 cursor-pointer">
                                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.718-1.297c-.875.807-2.026 1.297-3.323 1.297s-2.448-.49-3.323-1.297c-.807-.875-1.297-2.026-1.297-3.323s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323z"/>
                                            </svg>
                                        </a>
                                        <a href="https://www.youtube.com/@dmcdaniel9" className="text-gray-400 hover:text-[#02ACAC] transition-colors duration-300 cursor-pointer">
                                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                                            </svg>
                                        </a>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
