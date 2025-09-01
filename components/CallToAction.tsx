'use client'
import Image from "next/image";
import Link from "next/link";
import { TypeAnimation } from "react-type-animation";
import { playfairDisplay } from "@/lib/fonts";

type CallToActionProps = {
    width?: string | number | undefined
    title: string,
    subtitle?: string,
    body?: string,
    handlePrimaryBtnClick: () => void;
    handleSecondaryBtnClick?: () => void;
    enableSecondaryBtn?: boolean;
    primaryRoute: string;
    secondaryRoute?: string;
    primaryBtnText: string;
    secondaryBtnText?: string;
    enableTypewriter?: boolean;
    typewriterSequence?: (string | number)[];
    imgSrc?: string;
    imgAltText?: string;
    imgClassnames?: string;
    imgWidth?: number
    imgHeight?: number
}
export default function CallToAction({
    width,
    title,
    subtitle,
    body,
    handlePrimaryBtnClick,
    handleSecondaryBtnClick,
    enableSecondaryBtn,
    primaryRoute = "",
    secondaryRoute = "",
    primaryBtnText = "Primary",
    secondaryBtnText = "Secondary",
    enableTypewriter = false,
    typewriterSequence = [],
    imgSrc,
    imgAltText,
    imgClassnames,
    imgWidth,
    imgHeight
}: CallToActionProps) {

    width = typeof width === "number" ? `${width}px` : width

    return (
        <div className="relative grid grid-cols-1 overflow-hidden bg-gradient-to-br from-gray-900/80 to-gray-800/50 p-4 sm:p-6 text-white shadow-xl md:grid-cols-9 px-4 sm:px-8 md:px-16 lg:px-32 py-12 sm:py-16 md:py-24 lg:py-32 xl:py-48" style={{ width: width || "auto" }}>

            {/* Content */}
            <div className={`z-10 space-y-3 sm:space-y-4 col-span-1 md:col-span-4`}>
                {
                    subtitle ?
                        <div className="inline-block rounded-lg bg-[#F7B478] px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm font-semibold tracking-wider text-black uppercase">{subtitle}</div>
                        :
                        null
                }
                <h2 className={`mb-3 sm:mb-4 text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-tight font-bold tracking-tight ${playfairDisplay.className}`}>
                    {title}
                    {" "}
                    {
                        enableTypewriter ?
                            <TypeAnimation 
                                className="text-gray-400 inline-block whitespace-nowrap" 
                                sequence={typewriterSequence} 
                                repeat={Infinity}
                                style={{ minWidth: '200px' }} // Ensure minimum width for longest word
                            />
                            :
                            null
                    }
                </h2>
                <p className="max-w-xl text-sm sm:text-base text-gray-300 leading-relaxed">
                    {body}
                </p>
                <div className="flex flex-col sm:flex-row flex-wrap gap-3 pt-2 mt-4 sm:mt-6">
                    <button className="rounded-md bg-[#02ACAC] px-4 sm:px-6 py-2 sm:py-3 font-medium transition-all duration-300 hover:bg-[#005C5C] cursor-pointer text-sm sm:text-base">
                        <Link href={`/${primaryRoute}`} onClick={handlePrimaryBtnClick}>{primaryBtnText}</Link>
                    </button>
                    {
                        enableSecondaryBtn ?
                            <button className="rounded-md border border-white/30 bg-transparent px-4 sm:px-6 py-2 sm:py-3 font-medium transition-all hover:bg-white/10 cursor-pointer text-sm sm:text-base">
                                <Link href={`/${secondaryRoute}`} onClick={handleSecondaryBtnClick}>{secondaryBtnText}</Link>
                            </button>
                            :
                            null
                    }
                </div>
            </div>

            {/* Image - Fixed styling issues */}
            <div className="relative col-span-1 md:col-span-5 h-48 sm:h-64 md:h-80 lg:h-96 xl:h-[500px] mt-6 md:mt-0 flex items-center justify-center scale-x-[-1]">
                <Image
                    src={imgSrc || ""}
                    alt={imgAltText || ""}
                    className={`${imgClassnames} w-full h-full object-cover`}
                    width={imgWidth || 1152}
                    height={imgHeight || 768}
                    style={{
                        maxWidth: '100%',
                        maxHeight: '100%',
                    }}
                />
            </div>
        </div>
    );
}
