'use client'
import Link from "next/link";
import { TypeAnimation } from "react-type-animation";
import ResponsiveImage from "./ResponsiveImage";
import { FadeInLeft, FadeInRight, StaggerContainer, StaggerItem } from "@/components/ScrollReveal";


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
    imgName?: string;
    imgAltText?: string;
    imgClassnames?: string;
    imgWidth?: number
    imgHeight?: number
    imgFallbackSrc?: string;
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
    imgName,
    imgAltText,
    imgClassnames,
    imgFallbackSrc
}: CallToActionProps) {

    width = typeof width === "number" ? `${width}px` : width

    return (
        <div style={{ width: width || "auto" }}>
            <StaggerContainer staggerDelay={0.2} className="relative overflow-hidden bg-gradient-to-br from-gray-900/80 via-gray-800/70 to-gray-900/80 backdrop-blur-sm p-8 sm:p-10 lg:p-12 xl:p-16 border border-gray-700/30 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">
                {/* Content */}
                <FadeInLeft delay={0.1} duration={0.8} className="space-y-6 lg:space-y-8">
                    {subtitle && (
                        <StaggerItem direction="up" delay={0.2}>
                            <div className="text-black inline-block rounded-xl bg-[#F7B478] px-4 py-2 text-sm font-semibold tracking-wider text-[#02ACAC] uppercase border border-[#02ACAC]/30">
                                {subtitle}
                            </div>
                        </StaggerItem>
                    )}
                    <StaggerItem direction="up" delay={0.3}>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">
                            {title}
                            {" "}
                            {enableTypewriter && (
                                <TypeAnimation 
                                    className="text-[#02ACAC] inline-block whitespace-nowrap" 
                                    sequence={typewriterSequence} 
                                    repeat={Infinity}
                                    style={{ minWidth: '200px' }}
                                />
                            )}
                        </h2>
                    </StaggerItem>
                    {body && (
                        <StaggerItem direction="up" delay={0.4}>
                            <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 leading-relaxed max-w-xl">
                                {body}
                            </p>
                        </StaggerItem>
                    )}
                    <StaggerItem direction="up" delay={0.5}>
                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <Link 
                                href={`/${primaryRoute}`}
                                onClick={handlePrimaryBtnClick}
                                className="inline-flex items-center justify-center px-8 py-4 bg-[#02ACAC] hover:bg-[#02ACAC]/90 text-white font-semibold rounded-xl transition-all duration-300 transform focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
                                aria-label={primaryBtnText}
                                tabIndex={0}
                            >
                                {primaryBtnText}
                            </Link>
                            {enableSecondaryBtn && (
                                <Link 
                                    href={`/${secondaryRoute}`}
                                    onClick={handleSecondaryBtnClick}
                                    className="inline-flex items-center justify-center px-8 py-4 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-xl transition-all duration-300 border border-gray-600 hover:border-gray-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
                                    aria-label={secondaryBtnText}
                                    tabIndex={0}
                                >
                                    {secondaryBtnText}
                                </Link>
                            )}
                        </div>
                    </StaggerItem>
                </FadeInLeft>

                {/* Image */}
                {imgName && (
                    <FadeInRight delay={0.3} duration={0.8}>
                        <div className="relative">
                            <div className="aspect-video rounded-2xl overflow-hidden lg:scale-125">
                                <ResponsiveImage
                                    imageName={imgName}
                                    alt={imgAltText || ""}
                                    className={`${imgClassnames} w-full h-full object-cover`}
                                    fill={true}
                                    fallbackSrc={imgFallbackSrc}
                                />
                            </div>
                        </div>
                    </FadeInRight>
                )}
            </div>
            </StaggerContainer>
        </div>
    );
}
