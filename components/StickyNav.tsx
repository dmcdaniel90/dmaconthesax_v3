'use client';

import Link from "next/link";
import Image from "next/image";
import { splitWordsAndCapitalize } from "@/lib/utils";
import Socials from "@/components/Socials";
import { useHeaderContext } from "@/app/contexts/HeaderContext";

const SOCIAL_LINKS = {
    facebook: `https://www.facebook.com/dmaconthesax`,
    instagram: `https://www.instagram.com/dmaconthesax`,
    youtube: `https://www.youtube.com/@dmcdaniel9`,
}

const LINKS = ["home", "about", "events", "gallery", "booking", "faq", "contact"]

export default function StickyNav() {
    const HeaderContext = useHeaderContext();

    const handleClick = (link: string) => {
        HeaderContext.dispatch({ type: "SET_ACTIVE_LINK", payload: link })
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-gray-900/95 via-gray-800/95 to-gray-900/95 backdrop-blur-xl border-b border-gray-700/20 shadow-lg">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 lg:h-20">
                    {/* Logo on the left */}
                    <div className="flex-shrink-0">
                        <Link href="/" onClick={() => handleClick('home')} className="flex items-center">
                            <div className="relative w-12 h-12 lg:w-16 lg:h-16">
                                <Image 
                                    priority 
                                    className="w-full h-full object-contain" 
                                    src="/logo_white.svg" 
                                    width={100} 
                                    height={100} 
                                    alt="DMAC on the Sax Logo" 
                                />
                                <Image
                                    priority
                                    className="absolute inset-0 w-full h-full object-contain transition-all duration-1000 ease-in-out mask-animation"
                                    src="/logo_colored.svg"
                                    width={100}
                                    height={100}
                                    alt="DMAC on the Sax Logo"
                                />
                            </div>
                        </Link>
                    </div>

                    {/* Navigation links in the middle */}
                    <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
                        {LINKS.map((link) => (
                            <Link 
                                key={link} 
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
                        ))}
                    </div>

                    {/* Social links on the right */}
                    <div className="flex-shrink-0">
                        <Socials 
                            socials={SOCIAL_LINKS} 
                            color="white" 
                            size="20" 
                            gap={16} 
                        />
                    </div>
                </div>
            </div>
        </nav>
    );
}
