'use client'
import Link from "next/link";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa6";


export default function Socials({ socials, color, size, gap }: { socials: { facebook: string, instagram: string, youtube: string, spotify: string }, color?: string, size?: string, gap?: string | number }) {

    // Convert size to number for responsive calculations
    const baseSize = parseInt(size || "24");
    const mobileSize = Math.floor(baseSize * 0.75); // 75% of base size for mobile
    const tabletSize = Math.floor(baseSize * 0.9); // 90% of base size for tablet
    const desktopSize = baseSize; // Full size for desktop

    return (
        <span className="flex flex-row justify-center items-center w-full" style={{ gap: gap }}>
            {
                Object.entries(socials).map(([key, value]) => (
                    <Link key={key} className={`transition-all duration-200 ease-in-out hover:scale-110 flex items-center justify-center`} style={{ color: color }} href={value} target="_blank">
                        {key === "facebook" && <FaFacebook size={mobileSize} className="sm:hidden hover:text-[#02ACAC]" />}
                        {key === "facebook" && <FaFacebook size={tabletSize} className="hidden sm:block md:hidden hover:text-[#02ACAC]" />}
                        {key === "facebook" && <FaFacebook size={desktopSize} className="hidden md:block hover:text-[#02ACAC]" />}
                        
                        {key === "instagram" && <FaInstagram size={mobileSize} className="sm:hidden hover:text-[#02ACAC]" />}
                        {key === "instagram" && <FaInstagram size={tabletSize} className="hidden sm:block md:hidden hover:text-[#02ACAC]" />}
                        {key === "instagram" && <FaInstagram size={desktopSize} className="hidden md:block hover:text-[#02ACAC]" />}
                        
                        {key === "youtube" && <FaYoutube size={mobileSize} className="sm:hidden hover:text-[#02ACAC]" />}
                        {key === "youtube" && <FaYoutube size={tabletSize} className="hidden sm:block md:hidden hover:text-[#02ACAC]" />}
                        {key === "youtube" && <FaYoutube size={desktopSize} className="hidden md:block hover:text-[#02ACAC]" />}
                        {/* {key === "spotify" && <FaSpotify size={size} />} */}
                    </Link>
                ))
            }
        </span >
    )
}
