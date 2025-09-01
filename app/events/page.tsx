import EventList from "@/components/EventList"

export default function Events() {
    return (
        <main className="mt-24 grow shrink-0 basis-auto">
            <EventList itemsPerPage={9} type="grid" />
        </main>
    )
}
