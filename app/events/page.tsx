import EventList from "@/components/EventList"

export default function Events() {
    return (
        <main className="grow shrink-0 basis-auto">
            <EventList itemsPerPage={9} type="grid" />
        </main>
    )
}
