'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import { splitWordsAndCapitalize } from "@/lib/utils";
import Socials from "@/components/Socials";
import Image from "next/image";
import { useHeaderContext } from "../contexts/HeaderContext";
import { useLandscapeMobile } from "@/hooks/useLandscapeMobile";
import MobileNav from "@/components/MobileNav";
import { motion } from "framer-motion";

const SOCIAL_LINKS = {
    facebook: `https://www.facebook.com/dmaconthesax`,
    instagram: `https://www.instagram.com/dmaconthesax`,
    youtube: `https://www.youtube.com/@dmcdaniel9`,
}
const LINKS = ["home", "about", "events", "gallery", "booking", "faq", "contact"]


export default function Header() {
    // const title = "DMAC on the Sax"
    const HeaderContext = useHeaderContext()
    const { isLandscapeMobile,  } = useLandscapeMobile()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const handleNavChange = (currentPath: string) => {
        HeaderContext.dispatch({ type: "SET_ACTIVE_LINK", payload: currentPath })
        if (currentPath === "/") {
            HeaderContext.dispatch({ type: "SET_ACTIVE_LINK", payload: 'home' })
        }
    }

    const handleClick = (link: string) => {
        HeaderContext.dispatch({ type: "SET_ACTIVE_LINK", payload: link })
    };

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

    // Dynamic header height based on landscape mobile state
    const getHeaderHeight = () => {
        if (isLandscapeMobile) {
            return HeaderContext.state.activeLink === "home" ? "h-[25vh]" : "h-[20vh]";
        }
        return HeaderContext.state.activeLink === "home" ? "h-[60vh] sm:h-[70vh] md:h-[85vh]" : "h-[40vh] sm:h-[45vh] md:h-[50vh]";
    };

    return (
        <>
            {/* Mobile/Tablet Header with Hamburger (hidden on desktop) */}
            <header className={`landscape-mobile-header flex flex-col items-center justify-start gap-4 sm:gap-6 md:gap-8 w-full ${getHeaderHeight()} mb-4 z-40 transition-all duration-300 ease-in-out px-4 sm:px-6 md:px-8 md:hidden pt-8 sm:pt-12 md:pt-16`}>
                {/* Top Bar with Social Icons and Hamburger */}
                <div className="w-full flex justify-between items-center mb-4">
                    {/* Social Media Icons */}
                    <div className="landscape-mobile-socials flex justify-center items-center">
                        <Socials socials={SOCIAL_LINKS} color="white" size={isLandscapeMobile ? "20" : "32"} gap={isLandscapeMobile ? 16 : 24} />
                    </div>
                    
                    {/* Animated Hamburger Icon */}
                    <motion.button
                        onClick={toggleMobileMenu}
                        className="relative z-50 w-8 h-8 flex flex-col justify-center items-center cursor-pointer"
                        aria-label="Toggle mobile menu"
                        aria-expanded={isMobileMenuOpen}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <motion.span
                            className="w-6 h-0.5 bg-white block absolute"
                            animate={isMobileMenuOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -8 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                        />
                        <motion.span
                            className="w-6 h-0.5 bg-white block absolute"
                            animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                        />
                        <motion.span
                            className="w-6 h-0.5 bg-white block absolute"
                            animate={isMobileMenuOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 8 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                        />
                    </motion.button>
                </div>

                {/* Centered Logo */}
                <div className="landscape-mobile-logo relative inline-block w-full max-w-md sm:max-w-lg md:max-w-2xl h-auto transition-all duration-200 ease-in-out hover:scale-101 cursor-pointer">
                    <Image priority className="my-4 sm:my-6 md:my-8 w-full" src="/logo_white.svg" width={100} height={100} alt="DMAC on the Sax Logo" />
                    <Image
                        priority
                        className="my-4 sm:my-6 md:my-8 absolute inset-0 w-full h-auto transition-all duration-1000 ease-in-out mask-animation"
                        src="/logo_colored.svg"
                        width={100}
                        height={100}
                        alt="DMAC on the Sax Logo"
                    />
                </div>
            </header>

            {/* Desktop Header (hidden on mobile/tablet) */}
            <header className={`landscape-mobile-header hidden md:flex flex-col items-center justify-center gap-4 sm:gap-6 md:gap-8 w-full ${getHeaderHeight()} mb-4 z-50 transition-all duration-300 ease-in-out px-4 sm:px-6 md:px-8`}>
                <div className="landscape-mobile-socials flex justify-center items-center w-full mb-2 sm:mb-4 md:mb-6">
                    <Socials socials={SOCIAL_LINKS} color="white" size={isLandscapeMobile ? "20" : "32"} gap={isLandscapeMobile ? 16 : 24} />
                </div>
                {/* {image !== undefined ? <Image className="my-4" src={image} width={100} height={100} alt="Logo" /> : <h1 className="text-6xl my-4 font-bold text-white">{title}</h1>} */}
                <div className="landscape-mobile-logo relative inline-block w-full max-w-md sm:max-w-lg md:max-w-2xl h-auto transition-all duration-200 ease-in-out hover:scale-101 cursor-pointer">
                    <Image priority className="my-4 sm:my-6 md:my-8 w-full" src="/logo_white.svg" width={100} height={100} alt="DMAC on the Sax Logo" />
                    <Image
                        priority
                        className="my-4 sm:my-6 md:my-8 absolute inset-0 w-full h-auto transition-all duration-1000 ease-in-out mask-animation"
                        src="/logo_colored.svg"
                        width={100}
                        height={100}
                        alt="DMAC on the Sax Logo"
                    />
                </div>
                {/* Navigation - visible on desktop */}
                <nav className="landscape-mobile-nav flex flex-wrap justify-center gap-2 sm:gap-4 md:gap-6 px-2 sm:px-4">
                                         {/* Clean modern navigation with brand colors */}
                     {LINKS.map((link) => (
                         <Link 
                             key={link} 
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
                     ))}
                </nav>
            </header>

            {/* Mobile Navigation Overlay */}
            <MobileNav isOpen={isMobileMenuOpen} onToggle={toggleMobileMenu} />
        </>
    )
}
