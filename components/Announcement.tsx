'use client'
import { Playfair_Display } from "next/font/google"
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/ScrollReveal";

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
        <StaggerContainer staggerDelay={0.2} className={`flex flex-col gap-4 sm:gap-6 px-4 sm:px-8 md:px-16 lg:px-32 py-8 sm:py-10 md:py-12 h-auto min-h-[120px] sm:min-h-[150px] justify-center ${textColor} ${bgColor} ${rounded ? 'rounded-2xl' : null} shadow-xl`}>
            <StaggerItem direction="up" delay={0.1}>
                <h2 className={`${playfairDisplay.className} text-2xl sm:text-3xl md:text-4xl leading-tight`}>{text}</h2>
            </StaggerItem>
            {children && (
                <StaggerItem direction="up" delay={0.2}>
                    {children}
                </StaggerItem>
            )}
        </StaggerContainer>
    )
}
