'use client';

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Socials from "@/components/Socials";
import Image from "next/image";
import { useHeaderContext } from "../contexts/HeaderContext";
import { useLandscapeMobile } from "@/hooks/useLandscapeMobile";
import MobileNav from "@/components/MobileNav";
import AnimatedNavigation from "@/components/AnimatedNavigation";
import HomeScrollTrigger from "@/components/HomeScrollTrigger";
import { motion } from "framer-motion";

const SOCIAL_LINKS = {
    facebook: `https://www.facebook.com/dmaconthesax`,
    instagram: `https://www.instagram.com/dmaconthesax`,
    youtube: `https://www.youtube.com/@dmcdaniel9`,
}


export default function Header() {
    // const title = "DMAC on the Sax"
    const HeaderContext = useHeaderContext()
    const { isLandscapeMobile,  } = useLandscapeMobile()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const pathname = usePathname()

    const handleNavChange = (currentPath: string) => {
        HeaderContext.dispatch({ type: "SET_ACTIVE_LINK", payload: currentPath })
        if (currentPath === "/") {
            HeaderContext.dispatch({ type: "SET_ACTIVE_LINK", payload: 'home' })
        }
    }

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen)
    }

    useEffect(() => {
        const currentPath = window.location.pathname;
        if (currentPath === "/") {
            HeaderContext.dispatch({ type: "SET_ACTIVE_LINK", payload: 'home' })
        } else {
            handleNavChange(currentPath);
        }
    }, []);
    
    // Determine if this is the home page
    const isHomePage = pathname === '/';

    // Dynamic header height based on landscape mobile state
    const getHeaderHeight = () => {
        if (isLandscapeMobile) {
            return HeaderContext.state.activeLink === "home" ? "h-[25vh]" : "h-[20vh]";
        }
        // For non-home pages on desktop, reduce header height since we have sticky nav
        return HeaderContext.state.activeLink === "home" ? "h-[60vh] sm:h-[70vh] md:h-[85vh]" : "h-[40vh] sm:h-[45vh] md:h-[50vh]";
    };

    return (
        <>
            {/* Home Scroll Trigger - Scroll to top when on home page */}
            <HomeScrollTrigger 
                isActive={HeaderContext.state.activeLink === "home"} 
                scrollBehavior="smooth" 
            />
            
            {/* Animated Navigation - Smooth transition between home and sticky nav */}
            <div className="hidden md:block">
                <AnimatedNavigation />
            </div>

            {/* Simple Navigation Bar for Internal Pages - REMOVED: Using AnimatedNavigation instead */}
            
            {/* Mobile/Tablet Header with Hamburger (hidden on desktop, only for home page) */}
            {isHomePage && (
                <motion.header 
                    className={`landscape-mobile-header flex flex-col items-center justify-start gap-4 sm:gap-6 md:gap-8 w-full ${getHeaderHeight()} mb-4 z-40 transition-all duration-300 ease-in-out px-6 sm:px-8 md:px-12 lg:px-16 md:hidden pt-8 sm:pt-12 md:pt-16`}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                {/* Top Bar with Social Icons and Hamburger */}
                <motion.div 
                    className="w-full flex justify-between items-center mb-4"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                >
                    {/* Social Media Icons - Hidden when sticky nav is active */}
                    {HeaderContext.state.activeLink === "home" && (
                        <motion.div 
                            className="landscape-mobile-socials flex justify-center items-center"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: 0.2 }}
                        >
                            <Socials socials={SOCIAL_LINKS} color="white" size={isLandscapeMobile ? "20" : "32"} gap={isLandscapeMobile ? 16 : 24} />
                        </motion.div>
                    )}
                    
                    {/* Spacer div to push hamburger to the right when socials are hidden */}
                    {HeaderContext.state.activeLink !== "home" && <div></div>}
                    
                    {/* Animated Hamburger Icon - Always on the right */}
                    <motion.button
                        onClick={toggleMobileMenu}
                        className="relative right-[3%] top-[-3%] z-50 w-8 h-8 flex flex-col justify-center items-center cursor-pointer"
                        aria-label="Toggle mobile menu"
                        aria-expanded={isMobileMenuOpen}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                    >
                        <motion.span
                            className="w-6 h-0.5 bg-white block absolute"
                            animate={isMobileMenuOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -6 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                        />
                        <motion.span
                            className="w-6 h-0.5 bg-white block absolute"
                            animate={isMobileMenuOpen ? { opacity: 0, y: 0 } : { opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                        />
                        <motion.span
                            className="w-6 h-0.5 bg-white block absolute"
                            animate={isMobileMenuOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 6 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                        />
                    </motion.button>
                </motion.div>

                {/* Centered Logo */}
                <motion.div 
                    className="landscape-mobile-logo flex justify-center items-center w-full pt-40"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                >
                    <div className="relative w-full max-w-[280px] sm:max-w-md md:max-w-lg lg:max-w-2xl h-auto transition-all duration-200 ease-in-out hover:scale-105 cursor-pointer">
                        <Image priority className="my-2 sm:my-4 md:my-6 lg:my-8 w-full" src="/logo_white.svg" width={100} height={100} alt="DMAC on the Sax Logo" />
                        <Image
                            priority
                            className="my-2 sm:my-4 md:my-6 lg:my-8 absolute inset-0 w-full h-auto transition-all duration-1000 ease-in-out mask-animation"
                            src="/logo_colored.svg"
                            width={100}
                            height={100}
                            alt="DMAC on the Sax Logo"
                        />
                    </div>
                </motion.div>
            </motion.header>
            )}

            {/* Mobile Navigation Bar for Internal Pages */}
            {!isHomePage && (
                <motion.header 
                    className="md:hidden fixed top-0 left-0 right-0 bg-gray-900/90 backdrop-blur-sm border-b border-gray-700/50 px-6 py-4 z-40"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <div className="flex items-center">
                            <Image
                                src="/logo_colored.svg"
                                alt="DMAC on the Sax"
                                width={120}
                                height={40}
                                className="h-8 w-auto"
                                priority
                            />
                        </div>
                        
                        {/* Hamburger Menu */}
                        <motion.button
                            onClick={toggleMobileMenu}
                            className="w-8 h-8 flex flex-col justify-center items-center cursor-pointer"
                            aria-label="Toggle mobile menu"
                            aria-expanded={isMobileMenuOpen}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <motion.span
                                className="w-6 h-0.5 bg-white block absolute"
                                animate={isMobileMenuOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -6 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                            />
                            <motion.span
                                className="w-6 h-0.5 bg-white block absolute"
                                animate={isMobileMenuOpen ? { opacity: 0, y: 0 } : { opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                            />
                            <motion.span
                                className="w-6 h-0.5 bg-white block absolute"
                                animate={isMobileMenuOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 6 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                            />
                        </motion.button>
                    </div>
                </motion.header>
            )}

            {/* Mobile Navigation Overlay */}
            <MobileNav isOpen={isMobileMenuOpen} onToggle={toggleMobileMenu} />
        </>
    )
}
