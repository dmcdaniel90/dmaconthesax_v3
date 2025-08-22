'use client'
import { Playfair_Display } from "next/font/google"
type AnnouncementProps = {
    text?: string,
    textColor: string;
    bgColor: string;
    rounded?: boolean;
    children?: React.ReactNode
}

const playfairDisplay = Playfair_Display({
    variable: "--font-heading",
    subsets: ["latin"],
    weight: ["400", "700"],
    style: "italic"
})
export default function Announcement({
    text = "Announcement - Check out our new website!",
    textColor,
    bgColor,
    rounded = false,
    children
}: AnnouncementProps) {
    return (
        <div className={`flex flex-col gap-6 px-32 py-12 h-auto min-h-[150px] justify-center ${textColor} ${bgColor} ${rounded ? 'rounded-2xl' : null}`}>
            <h2 className={`${playfairDisplay.className} text-4xl`}>{text}</h2>
            {children}
        </div >
    )
}
