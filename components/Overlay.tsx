type OverlayProps = {
    height: string,
    opacity?: 0 | 5 | 10 | 15 | 20 | 25 | 30 | 35 | 40 | 45 | 50 | 55 | 60 | 65 | 70 | 75 | 80 | 85 | 90 | 95 | 100,
    colorWeight?: 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950
}

export default function Overlay({ height, opacity = 50, colorWeight = 500 }: OverlayProps) {
    return (
        <div className={`h-[${height}] w-full absolute top-0 left-0 bg-gray-${colorWeight} opacity-${opacity} -z-50`}></div>
    )
}
