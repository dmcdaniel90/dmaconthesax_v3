'use client'
import Link from "next/link";
import { FaFacebook, FaInstagram, FaYoutube, FaSpotify } from "react-icons/fa6";


export default function Socials({ socials, color, size, gap }: { socials: { facebook: string, instagram: string, youtube: string, spotify: string }, color?: string, size?: string, gap?: string | number }) {


    return (
        <span className="flex flex-row" style={{ gap: gap }}>
            {
                Object.entries(socials).map(([key, value]) => (
                    <Link key={key} className={`transition-all duration-200 ease-in-out hover:scale-110 `} style={{ color: color }} href={value} target="_blank">
                        {key === "facebook" && <FaFacebook size={size} className="hover:text-[#02ACAC]" />}
                        {key === "instagram" && <FaInstagram size={size} className="hover:text-[#02ACAC]" />}
                        {key === "youtube" && <FaYoutube size={size} className="hover:text-[#02ACAC]" />}
                        {/* {key === "spotify" && <FaSpotify size={size} />} */}
                    </Link>
                ))
            }
        </span >
    )
}
