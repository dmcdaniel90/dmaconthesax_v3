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
        <div className="relative grid grid-cols-1 overflow-hidden bg-gradient-to-br from-gray-900/80 to-gray-800/50 p-6 text-white shadow-xl md:grid md:grid-cols-3 px-32 py-48" style={{ width: width || "auto" }}>

            {/* Content */}
            <div className={`z-10 space-y-3 md:col-span-2`}>
                {
                    subtitle ?
                        <div className="inline-block rounded-lg bg-[#F7B478] px-3 py-1 text-xs font-semibold tracking-wider text-black uppercase">{subtitle}</div>
                        :
                        null
                }
                <h2 className={`mb-4 text-3xl leading-tight font-bold tracking-tight md:text-4xl lg:text-5xl ${playfairDisplay.className}`}>
                    {title}
                    {" "}
                    {
                        enableTypewriter ?
                            <TypeAnimation className="text-gray-400" sequence={typewriterSequence} repeat={Infinity} />
                            :
                            null
                    }
                </h2>
                <p className="max-w-xl text-sm text-gray-300 md:text-base">
                    {body}
                </p>
                <div className="flex flex-wrap gap-3 pt-2 mt-6">
                    <button className="rounded-md bg-[#02ACAC] px-6 py-2 font-medium transition-all duration-300 hover:bg-[#005C5C] cursor-pointer">
                        <Link href={`/${primaryRoute}`} onClick={handlePrimaryBtnClick}>{primaryBtnText}</Link>
                    </button>
                    {
                        enableSecondaryBtn ?
                            <button className="rounded-md border border-white/30 bg-transparent px-6 py-2 font-medium transition-all hover:bg-white/10 cursor-pointer">
                                <Link href={`/${secondaryRoute}`} onClick={handleSecondaryBtnClick}>{secondaryBtnText}</Link>
                            </button>
                            :
                            null
                    }
                </div>
            </div>

            <Image
                src={imgSrc || ""}
                alt={imgAltText || ""}
                className={`${imgClassnames} col-span-1`}
                width={imgWidth || 200}
                height={imgHeight || 200}
            />
        </div>
    );
}
