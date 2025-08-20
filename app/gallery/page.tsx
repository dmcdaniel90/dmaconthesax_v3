import VideoList from "../../components/VideoList"
import PhotoGallery from "../../components/PhotoGallery"

const videoUrls = [
    "https://www.youtube.com/embed/MYuQiALRgg4?si=oybKsG8RzUXBYmcz",
    "https://www.youtube.com/embed/MYuQiALRgg4?si=oybKsG8RzUXBYmcz",
    "https://www.youtube.com/embed/MYuQiALRgg4?si=oybKsG8RzUXBYmcz",
    "https://www.youtube.com/embed/MYuQiALRgg4?si=oybKsG8RzUXBYmcz",
    "https://www.youtube.com/embed/MYuQiALRgg4?si=oybKsG8RzUXBYmcz",
    "https://www.youtube.com/embed/MYuQiALRgg4?si=oybKsG8RzUXBYmcz",
    "https://www.youtube.com/embed/MYuQiALRgg4?si=oybKsG8RzUXBYmcz",
]

const photoUrls = [
    "https://images.unsplash.com/photo-1499364615650-ec38552f4f34?ixid=M3w2NjY5MzN8MHwxfHNlYXJjaHw4fHxiYW5kfGVufDB8MHx8fDE3NTUwOTYzMjd8MA&ixlib=rb-4.1.0",
    "https://images.unsplash.com/photo-1474692295473-66ba4d54e0d3?ixid=M3w2NjY5MzN8MHwxfHNlYXJjaHwxNXx8YmFuZHxlbnwwfDB8fHwxNzU1MDk2MzI3fDA&ixlib=rb-4.1.0",
    "https://images.unsplash.com/photo-1521547418549-6a31aad7c177?ixid=M3w2NjY5MzN8MHwxfHNlYXJjaHwxMXx8YmFuZHxlbnwwfDB8fHwxNzU1MDk2MzI3fDA&ixlib=rb-4.1.0",
    "https://images.unsplash.com/photo-1450044804117-534ccd6e6a3a?ixid=M3w2NjY5MzN8MHwxfHNlYXJjaHwxOXx8YmFuZHxlbnwwfDB8fHwxNzU1MDk2MzI3fDA&ixlib=rb-4.1.0",
    "https://images.unsplash.com/photo-1598387993441-a364f854c3e1?ixid=M3w2NjY5MzN8MHwxfHNlYXJjaHwyM3x8YmFuZHxlbnwwfDB8fHwxNzU1MDk2MzI3fDA&ixlib=rb-4.1.0",
    "https://images.unsplash.com/photo-1528489496900-d841974f5290?ixid=M3w2NjY5MzN8MHwxfHNlYXJjaHw2NHx8YmFuZHxlbnwwfDB8fHwxNzU1MDk2MzI5fDA&ixlib=rb-4.1.0",
    "https://images.unsplash.com/photo-1455997299803-0c4649ca02fa?ixid=M3w2NjY5MzN8MHwxfHNlYXJjaHw3OXx8YmFuZHxlbnwwfDB8fHwxNzU1MDk2MzI5fDA&ixlib=rb-4.1.0"
]

export default function Gallery() {
    return (
        <main className="grow shrink-0 basis-auto">
            <VideoList type="grid" itemsPerPage={3} videos={videoUrls} />
            <PhotoGallery images={photoUrls} />
        </main>
    )
}
