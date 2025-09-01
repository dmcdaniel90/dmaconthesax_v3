'use client';

import Link from "next/link";
import { useEffect } from "react";
import { splitWordsAndCapitalize } from "@/lib/utils";
import Socials from "@/components/Socials";
import Image from "next/image";
import { useHeaderContext } from "../contexts/HeaderContext";


const SOCIALS = {
    facebook: `https://www.facebook.com/dmaconthesax`,
    instagram: `https://www.instagram.com/dmaconthesax`,
    youtube: `https://www.youtube.com/@dmcdaniel9}`,
    spotify: ''
}

const LINKS = ["home", "about", "events", "gallery", "booking", "faq", "contact"]


export default function Header() {
    // const title = "DMAC on the Sax"
    const HeaderContext = useHeaderContext()

    const handleNavChange = (currentPath: string) => {
        HeaderContext.dispatch({ type: "SET_ACTIVE_LINK", payload: currentPath })
        if (currentPath === "/") {
            HeaderContext.dispatch({ type: "SET_ACTIVE_LINK", payload: 'home' })
        }
    }

    const handleClick = (link: string) => {
        HeaderContext.dispatch({ type: "SET_ACTIVE_LINK", payload: link })
    };

    useEffect(() => {
        const currentPath = window.location.pathname;
        handleNavChange(currentPath);

    }, []);


    return (
        <header className={`flex flex-col items-center justify-center gap-4 sm:gap-6 md:gap-8 w-full ${HeaderContext.state.activeLink === "home" ? "h-[60vh] sm:h-[70vh] md:h-[85vh]" : "h-[40vh] sm:h-[45vh] md:h-[50vh]"} mb-4 z-50 transition-all duration-300 ease-in-out px-4 sm:px-6 md:px-8`}>
            <div className="flex justify-center items-center w-full mb-2 sm:mb-4 md:mb-6">
                <Socials socials={SOCIALS} color="white" size="32" gap={24} />
            </div>
            {/* {image !== undefined ? <Image className="my-4" src={image} width={100} height={100} alt="Logo" /> : <h1 className="text-6xl my-4 font-bold text-white">{title}</h1>} */}
            <div className="relative inline-block w-full max-w-md sm:max-w-lg md:max-w-2xl h-auto transition-all duration-200 ease-in-out hover:scale-101">
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
            <nav className="flex flex-wrap justify-center gap-2 sm:gap-4 md:gap-6 px-2 sm:px-4">
                {/* Prefetched when the link is hovered or enters the viewport */}
                {LINKS.map((link) => (
                    <Link 
                        key={link} 
                        href={`/${link}`} 
                        onClick={() => handleClick(link)} 
                        className={`text-sm sm:text-lg md:text-xl text-white cursor-pointer hover:underline font-semibold px-2 py-1 rounded transition-colors ${HeaderContext.state.activeLink === link ? "underline bg-white/10" : ""}`}
                    >
                        {link !== "faq" ? splitWordsAndCapitalize(link) : "FAQ"}
                    </Link>
                ))}
            </nav>
        </header>
    )
}
