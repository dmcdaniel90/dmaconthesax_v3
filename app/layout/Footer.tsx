import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Socials from "@/components/Socials"

export default function Footer() {
    return (
        <div className="flex flex-col justify-center items-center py-32 gap-8 bg-gray-900/90 text-white">
            <h3 className="text-2xl font-semibold">Join our newsletter to be the first to know about our events</h3>
            <span className="flex">
                <Input placeholder="Enter your email" className="w-96 h-12" />
                <Button className="ml-4 border border-white w-24 h-12 cursor-pointer hover:bg-white hover:text-gray-900">Subscribe</Button>
            </span>
            <Socials socials={{ facebook: "https://www.facebook.com/", instagram: "https://www.instagram.com/", youtube: "https://www.youtube.com/", spotify: "https://www.spotify.com/" }} size="40" gap={28} color="#fff" />
        </div>
    )
}
