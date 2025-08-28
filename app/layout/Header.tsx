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
        <header className={`flex flex-col items-center justify-center gap-4 w-full ${HeaderContext.state.activeLink === "home" ? "h-[85vh]" : "h-[50vh]"} mb-4 z-50 transition-all duration-300 ease-in-out`}>
            <Socials socials={SOCIALS} color="white" size="40" gap={28} />
            {/* {image !== undefined ? <Image className="my-4" src={image} width={100} height={100} alt="Logo" /> : <h1 className="text-6xl my-4 font-bold text-white">{title}</h1>} */}
            <div className="relative inline-block w-2xl h-auto transition-all duration-200 ease-in-out hover:scale-101">
                <Image priority className="my-8 w-full" src="/logo_white.svg" width={100} height={100} alt="DMAC on the Sax Logo" />
                <Image
                    priority
                    className="my-8 absolute inset-0 w-full h-2xl transition-all duration-1000 ease-in-out mask-animation"
                    src="/logo_colored.svg"
                    width={100}
                    height={100}
                    alt="DMAC on the Sax Logo"
                />
            </div>
            <nav className="flex flex-row space-x-6">
                {/* Prefetched when the link is hovered or enters the viewport */}
                {LINKS.map((link) => (
                    <Link key={link} href={`/${link}`} onClick={() => handleClick(link)} className={`text-xl text-white cursor-pointer hover:underline font-semibold ${HeaderContext.state.activeLink === link ? "underline" : ""} `}>{link !== "faq" ? splitWordsAndCapitalize(link) : "FAQ"}</Link>
                ))}
            </nav>
        </header>
    )
}
