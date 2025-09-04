'use client';

import Link from "next/link";
import Image from "next/image";
import { splitWordsAndCapitalize } from "@/lib/utils";
import Socials from "@/components/Socials";
import { useHeaderContext } from "@/app/contexts/HeaderContext";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const SOCIAL_LINKS = {
    facebook: `https://www.facebook.com/dmaconthesax`,
    instagram: `https://www.instagram.com/dmaconthesax`,
    youtube: `https://www.youtube.com/@dmcdaniel9`,
}

const LINKS = ["home", "about", "events", "gallery", "booking", "faq", "contact"]

export default function AnimatedNavigation() {
    const HeaderContext = useHeaderContext();
    const isHomePage = HeaderContext.state.activeLink === "home";
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
    const [isClient, setIsClient] = useState(false);

    // Prevent hydration mismatch by only setting motion preference after client mount
    useEffect(() => {
        setIsClient(true);
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
        setPrefersReducedMotion(mediaQuery.matches)

        const handleChange = (e: MediaQueryListEvent) => {
            setPrefersReducedMotion(e.matches)
        }

        mediaQuery.addEventListener('change', handleChange)
        return () => mediaQuery.removeEventListener('change', handleChange)
    }, [])

    const handleClick = (link: string) => {
        HeaderContext.dispatch({ type: "SET_ACTIVE_LINK", payload: link })
    };

    return (
        <>
            {/* Sticky Navigation - Animated transition */}
            <AnimatePresence mode="wait">
                {!isHomePage && (
                    <motion.nav
                        key="sticky-nav"
                        initial={!isClient || prefersReducedMotion ? { opacity: 0 } : { y: -100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={!isClient || prefersReducedMotion ? { opacity: 0 } : { y: -100, opacity: 0 }}
                        transition={{ 
                            duration: !isClient || prefersReducedMotion ? 0 : 0.5, 
                            ease: [0.4, 0.0, 0.2, 1],
                            opacity: { duration: !isClient || prefersReducedMotion ? 0 : 0.3 }
                        }}
                        className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-gray-900/95 via-gray-800/95 to-gray-900/95 backdrop-blur-xl border-b border-gray-700/20 shadow-lg"
                    >
                        <div className="container mx-auto px-6 sm:px-8 md:px-12 lg:px-16">
                            <motion.div 
                                className="flex items-center justify-between h-16 lg:h-20"
                                initial={!isClient || prefersReducedMotion ? {} : { scale: 0.95 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: !isClient || prefersReducedMotion ? 0 : 0.4, delay: !isClient || prefersReducedMotion ? 0 : 0.1 }}
                            >
                                {/* Logo on the left */}
                                <motion.div 
                                    className="flex-shrink-0"
                                    initial={!isClient || prefersReducedMotion ? { opacity: 0 } : { x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ duration: !isClient || prefersReducedMotion ? 0 : 0.4, delay: !isClient || prefersReducedMotion ? 0 : 0.2 }}
                                >
                                    <Link href="/" onClick={() => handleClick('home')} className="flex items-center">
                                        <div className="relative w-12 h-12 lg:w-16 lg:h-16">
                                            <Image 
                                                priority 
                                                className="w-full h-full object-contain" 
                                                src="/logo_white.svg" 
                                                width={64} 
                                                height={64} 
                                                alt="DMAC on the Sax Logo" 
                                            />
                                            <Image
                                                priority
                                                className="absolute inset-0 w-full h-full object-contain transition-all duration-1000 ease-in-out mask-animation"
                                                src="/logo_colored.svg"
                                                width={64}
                                                height={64}
                                                alt="DMAC on the Sax Logo"
                                            />
                                        </div>
                                    </Link>
                                </motion.div>

                                {/* Navigation links in the middle */}
                                <motion.div 
                                    className="hidden md:flex items-center space-x-1 lg:space-x-2"
                                    initial={!isClient || prefersReducedMotion ? { opacity: 0 } : { y: -10, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ duration: !isClient || prefersReducedMotion ? 0 : 0.4, delay: !isClient || prefersReducedMotion ? 0 : 0.3 }}
                                >
                                    {LINKS.map((link, index) => (
                                        <motion.div
                                            key={link}
                                            initial={!isClient || prefersReducedMotion ? { opacity: 0 } : { y: -10, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ 
                                                duration: !isClient || prefersReducedMotion ? 0 : 0.3, 
                                                delay: !isClient || prefersReducedMotion ? 0 : 0.4 + (index * 0.05),
                                                ease: "easeOut"
                                            }}
                                        >
                                            <Link 
                                                href={`/${link}`} 
                                                onClick={() => handleClick(link)} 
                                                className={`relative text-sm lg:text-base font-semibold px-3 py-2 lg:px-4 lg:py-3 rounded-lg transition-all duration-300 cursor-pointer ${
                                                    HeaderContext.state.activeLink === link 
                                                        ? "text-[#02ACAC] bg-[#02ACAC]/10" 
                                                        : "text-white hover:text-[#02ACAC]/80 hover:bg-[#02ACAC]/5"
                                                }`}
                                            >
                                                {link !== "faq" ? splitWordsAndCapitalize(link) : "FAQ"}
                                            </Link>
                                        </motion.div>
                                    ))}
                                </motion.div>

                                {/* Social links on the right */}
                                <motion.div 
                                    className="flex-shrink-0"
                                    initial={!isClient || prefersReducedMotion ? { opacity: 0 } : { x: 20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ duration: !isClient || prefersReducedMotion ? 0 : 0.4, delay: !isClient || prefersReducedMotion ? 0 : 0.2 }}
                                >
                                    <Socials 
                                        socials={SOCIAL_LINKS} 
                                        color="white" 
                                        size="20" 
                                        gap={16} 
                                    />
                                </motion.div>
                            </motion.div>
                        </div>
                    </motion.nav>
                )}
            </AnimatePresence>

            {/* Home Page Navigation - Animated transition */}
            <AnimatePresence mode="wait">
                {isHomePage && (
                    <motion.div
                        key="home-nav"
                        initial={{ y: 0, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={!isClient || prefersReducedMotion ? { opacity: 0 } : { y: -50, opacity: 0 }}
                        transition={{ 
                            duration: !isClient || prefersReducedMotion ? 0 : 0.4, 
                            ease: [0.4, 0.0, 0.2, 1]
                        }}
                        className="hidden md:flex flex-col items-center justify-center gap-4 sm:gap-6 md:gap-8 w-full h-[60vh] sm:h-[70vh] md:h-[85vh] mb-4 z-50 transition-all duration-300 ease-in-out px-6 sm:px-8 md:px-12 lg:px-16"
                    >
                        {/* Social Icons */}
                        <motion.div 
                            className="flex justify-center items-center w-full mb-2 sm:mb-4 md:mb-6"
                            initial={!isClient || prefersReducedMotion ? { opacity: 0 } : { y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: !isClient || prefersReducedMotion ? 0 : 0.5, delay: !isClient || prefersReducedMotion ? 0 : 0.1 }}
                        >
                            <Socials 
                                socials={SOCIAL_LINKS} 
                                color="white" 
                                size="32" 
                                gap={24} 
                            />
                        </motion.div>

                        {/* Logo */}
                        <motion.div 
                            className="relative inline-block w-full max-w-md sm:max-w-lg md:max-w-2xl h-auto transition-all duration-200 ease-in-out"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: !isClient || prefersReducedMotion ? 0 : 1.2, delay: !isClient || prefersReducedMotion ? 0 : 0.1, ease: "easeOut" }}
                        >
                            <Image 
                                priority 
                                className="my-4 sm:my-6 md:my-8 w-full" 
                                src="/logo_white.svg" 
                                width={100} 
                                height={100} 
                                alt="DMAC on the Sax Logo" 
                            />
                            <Image
                                priority
                                className="my-4 sm:my-6 md:my-8 absolute inset-0 w-full h-auto transition-all duration-1000 ease-in-out mask-animation"
                                src="/logo_colored.svg"
                                width={100}
                                height={100}
                                alt="DMAC on the Sax Logo"
                            />
                        </motion.div>

                        {/* Navigation */}
                        <motion.nav 
                            className="flex flex-wrap justify-center gap-2 sm:gap-4 md:gap-6 px-2 sm:px-4"
                            initial={!isClient || prefersReducedMotion ? { opacity: 0 } : { y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: !isClient || prefersReducedMotion ? 0 : 0.5, delay: !isClient || prefersReducedMotion ? 0 : 0.3 }}
                        >
                            {LINKS.map((link, index) => (
                                <motion.div
                                    key={link}
                                    initial={!isClient || prefersReducedMotion ? { opacity: 0 } : { y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ 
                                        duration: !isClient || prefersReducedMotion ? 0 : 0.3, 
                                        delay: !isClient || prefersReducedMotion ? 0 : 0.4 + (index * 0.05),
                                        ease: "easeOut"
                                    }}
                                >
                                    <Link 
                                        href={`/${link}`} 
                                        onClick={() => handleClick(link)} 
                                        className={`relative text-sm sm:text-lg md:text-xl font-semibold px-4 py-3 rounded-xl transition-all duration-300 cursor-pointer ${
                                            HeaderContext.state.activeLink === link 
                                                ? "text-[#02ACAC] bg-[#02ACAC]/10" 
                                                : "text-white hover:text-[#02ACAC]/80 hover:bg-[#02ACAC]/5"
                                        }`}
                                    >
                                        {link !== "faq" ? splitWordsAndCapitalize(link) : "FAQ"}
                                    </Link>
                                </motion.div>
                            ))}
                        </motion.nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
