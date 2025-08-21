type AnnouncementProps = {
    text?: string,
    textColor: string;
    bgColor: string;
    rounded?: boolean;
    children?: React.ReactNode
}

const baseStyles = "bg-gray-900 text-white "
export default function Announcement({
    text = "Announcement - Check out our new website!",
    textColor,
    bgColor,
    rounded = false,
    children
}: AnnouncementProps) {
    return (
        <div className={`flex flex-col gap-6 px-32 py-12 h-auto min-h-[150px] justify-center ${textColor} ${bgColor} ${rounded ? 'rounded-2xl' : null}`}>
            <h2 className="text-3xl">{text}</h2>
            {children}
        </div >
    )
}
