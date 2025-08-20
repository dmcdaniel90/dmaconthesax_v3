'use client';

import Link from "next/link";
import { useState, useEffect } from "react";
import { splitWordsAndCapitalize } from "@/lib/utils";
import Socials from "@/components/Socials";
export default function Header({
    title = "Your Name Here",
    links = ["home", "about", "music", "events", "gallery", "booking", "contact"]
}: {
    title?: string, links?: string[],
}) {
    const [activeLink, setActiveLink] = useState('');
    let currentPath

    const handleClick = (link: string) => {
        setActiveLink(link);
    };

    useEffect(() => {
        currentPath = window.location.pathname;
        setActiveLink(currentPath);

        if (currentPath === "/") {
            setActiveLink("home");
        }

    }, []);

    const socials = {
        facebook: "https://www.facebook.com/",
        instagram: "https://www.instagram.com/",
        youtube: "https://www.youtube.com/",
        spotify: "https://open.spotify.com/"
    }

    return (
        <header className={`flex flex-col items-center justify-center gap-4 p-4 ${activeLink === "home" ? "h-[85vh]" : "h-[40vh]"} mb-4 z-50 transition-all duration-300 ease-in-out`}>
            <Socials socials={socials} color="white" size="40" gap={28} />
            <h1 className="text-6xl text-white my-4">{title}</h1>
            <nav className="flex flex-row space-x-6">
                {/* Prefetched when the link is hovered or enters the viewport */}
                {links.map((link) => (
                    <Link key={link} href={`/${link}`} onClick={() => handleClick(link)} className={`text-lg text-white cursor-pointer hover:underline font-semibold ${activeLink === link ? "underline" : ""}`}>{splitWordsAndCapitalize(link)}</Link>
                ))}
            </nav>
            {/* <Overlay height={"85vh"} opacity={50} colorWeight={400} /> */}
        </header>
    )
}
