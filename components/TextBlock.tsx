import ResponsiveImage from "./ResponsiveImage"
export type TextBlockProps = {
    heading?: string
    subheading?: string
    children: React.ReactNode
    size?: number | string
    textWidth?: number | string
    width?: number | string
    bodySize?: number
    headingSize?: number
    subheadingSize?: number
    imageName: string
    imageAltText?: string
    imagePosition?: "left" | "right"
    imgStyles?: React.CSSProperties
    imgFallbackSrc?: string
}

export default function TextBlock(props: TextBlockProps) {
    const { heading, subheading, children, imageName, imageAltText, imagePosition, textWidth, width, headingSize, subheadingSize, bodySize, imgStyles, imgFallbackSrc } = props
    return (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white items-center w-full" style={{ width: width }}>
            <div className={`flex flex-col gap-4`} style={{ width: textWidth || width, order: imagePosition === "left" ? 2 : 1 }}>
                {heading && <h2 className="font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl" style={{ fontSize: headingSize }}>{heading}</h2>}
                {subheading && <h3 className="text-lg sm:text-xl md:text-2xl" style={{ fontSize: subheadingSize }}>{subheading}</h3>}
                <div className="text-sm sm:text-base md:text-lg" style={{ fontSize: bodySize }}>{children}</div>
            </div>
            {imageName && (
                <div className="w-full h-32 sm:h-48 md:h-64 lg:h-80" style={{ order: imagePosition === "left" ? 1 : 2 }}>
                    <ResponsiveImage
                        imageName={imageName}
                        alt={imageAltText || "Image"}
                        className={`${imgStyles} w-full h-full rounded-lg object-cover`}
                        fallbackSrc={imgFallbackSrc}
                        fill={true}
                    />
                </div>
            )}
        </section>
    )
}
