import Image from "next/image"
export type TextBlockProps = {
    heading?: string
    subheading?: string
    children: React.ReactNode
    image?: string
    imageAltText?: string
    imagePosition?: "left" | "right"
    size?: number
    textWidth?: number
    width?: number
    bodySize?: number
    headingSize?: number
    subheadingSize?: number
}

export default function TextBlock(props: TextBlockProps) {
    const { heading, subheading, children, image, imageAltText, imagePosition, size, textWidth, width, headingSize, subheadingSize, bodySize } = props

    return (
        <section className="grid grid-cols-2 gap-4 text-white items-center" style={{ width: width }}>
            <div className={`flex flex-col gap-4`} style={{ width: textWidth || width, order: imagePosition === "left" ? 2 : 1 }}>
                {heading && <h2 className="font-bold" style={{ fontSize: headingSize }}>{heading}</h2>}
                {subheading && <h3 style={{ fontSize: subheadingSize }}>{subheading}</h3>}
                <div style={{ fontSize: bodySize }}>{children}</div>
            </div>
            {image && <Image src={image} alt={imageAltText || "Image"} style={{ objectFit: "cover", order: imagePosition === "left" ? 1 : 2 }} width={size} height={size} />}
        </section>
    )
}
