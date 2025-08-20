type AnnouncementProps = {
    text?: string,
    styles?: string,
    children?: React.ReactNode
}
export default function Announcement({
    text = "Announcement - Check out our new website!",
    styles = "bg-gray-900 text-white px-32 py-12 h-auto min-h-[150px] flex justify-center",
    children
}: AnnouncementProps) {
    return (
        <div className={"flex flex-col gap-6" + " " + styles}>
            <h2 className="text-3xl">{text}</h2>
            {children}
        </div >
    )
}
