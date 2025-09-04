import VideoList from "../../components/VideoList"
import PhotoGallery from "../../components/PhotoGallery"
import Footer from "../layout/Footer"
import AnimatedPageTitle from "@/components/AnimatedPageTitle"
import { FadeInUp } from "@/components/ScrollReveal"

const videoUrls = [
    "https://www.youtube.com/embed/MYuQiALRgg4?si=oybKsG8RzUXBYmcz",
    "https://www.youtube.com/embed/MYuQiALRgg4?si=oybKsG8RzUXBYmcz",
    "https://www.youtube.com/embed/MYuQiALRgg4?si=oybKsG8RzUXBYmcz",
    "https://www.youtube.com/embed/MYuQiALRgg4?si=oybKsG8RzUXBYmcz",
    "https://www.youtube.com/embed/MYuQiALRgg4?si=oybKsG8RzUXBYmcz",
    "https://www.youtube.com/embed/MYuQiALRgg4?si=oybKsG8RzUXBYmcz",
    "https://www.youtube.com/embed/MYuQiALRgg4?si=oybKsG8RzUXBYmcz",
]
export default function Gallery() {
    return (
        <>
            <main className="mt-16 min-h-screen bg-gradient-to-br from-gray-900/80 via-gray-800/60 via-[#02ACAC]/10 to-gray-900/90">
            {/* Hero Section */}
            <section className="relative overflow-hidden py-20 sm:py-24 lg:py-32 xl:py-40">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-40">
                    <div className="w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMkFDQUMiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')]"></div>
                </div>

                <div className="relative z-10 container mx-auto px-6 sm:px-8 md:px-12 lg:px-16">
                    <AnimatedPageTitle
                        title="Gallery & Media"
                        subtitle="Explore our visual and video content"
                        delay={0}
                    />
                </div>
            </section>

            {/* Videos Section */}
            <section className="relative z-10 pb-20 sm:pb-24 lg:pb-32 xl:pb-40">
                <div className="container mx-auto px-6 sm:px-8 md:px-12 lg:px-16">
                    <div className="max-w-7xl mx-auto">
                        <FadeInUp delay={0.2}>
                            <div className="bg-gradient-to-br from-gray-900/90 via-gray-800/80 to-gray-900/95 backdrop-blur-xl rounded-3xl p-8 sm:p-10 lg:p-12 border border-gray-700/20 hover:border-[#02ACAC]/30 transition-all duration-500 hover:shadow-[#02ACAC]/10 shadow-2xl">
                                <VideoList type="grid" itemsPerPage={3} videos={videoUrls} />
                            </div>
                        </FadeInUp>
                    </div>
                </div>
            </section>

            {/* Photos Section */}
            <section className="relative z-10 pb-20 sm:pb-24 lg:pb-32 xl:pb-40">
                <div className="container mx-auto px-6 sm:px-8 md:px-12 lg:px-16">
                    <div className="max-w-7xl mx-auto">
                        <FadeInUp delay={0.4}>
                            <div className="bg-gradient-to-br from-gray-900/90 via-gray-800/80 to-gray-900/95 backdrop-blur-xl rounded-3xl p-8 sm:p-10 lg:p-12 border border-gray-700/20 hover:border-[#02ACAC]/30 transition-all duration-500 hover:shadow-[#02ACAC]/10 shadow-2xl">
                                                                       <PhotoGallery
                                           useCloudinary={true}
                                           cloudinaryTag="production"
                                           type="grid"
                                       />
                            </div>
                        </FadeInUp>
                    </div>
                </div>
            </section>

            <FadeInUp delay={0.6}>
                <Footer />
            </FadeInUp>
            </main>
        </>
    )
}
