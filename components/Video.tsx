export default function Video({ src, width = "100%", height = "700px", title = "YouTube video player" }: { src: string, width?: string, height?: string, title?: string }): React.ReactElement {
    return (
        <iframe className="bg-transparent" loading="lazy" src={src} width={width} height={height} title={title} allow="accelerometer; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
    )
}
