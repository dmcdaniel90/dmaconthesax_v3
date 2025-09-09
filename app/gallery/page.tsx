'use client';

import SwiperVideoPlayer from "../../components/SwiperVideoPlayer"
import SwiperPhotoGallery from "../../components/SwiperPhotoGallery"
import Footer from "../layout/Footer"
import AnimatedPageTitle from "@/components/AnimatedPageTitle"
import { FadeInUp } from "@/components/ScrollReveal"
import { useCloudinaryVideoCollection } from "../../hooks/useCloudinaryVideoCollection"
import { useState, useEffect } from "react"

export default function Gallery() {
    // Grid view state management for both videos and photos
    const [isVideoGridView, setIsVideoGridView] = useState(false);
    const [isPhotoGridView, setIsPhotoGridView] = useState(false);

    // Get videos from Cloudinary
    const { videos: cloudinaryVideos, isLoading: videosLoading } = useCloudinaryVideoCollection({
        cloudName: 'dllh8yqz8',
        tag: 'video-gallery',
        maxResults: 10
    });

    // Transform Cloudinary videos for SwiperVideoPlayer
    const [videos, setVideos] = useState<Array<{
        id: string;
        publicId: string;
        videoUrl?: string;
        title?: string;
        description?: string;
    }>>([]);

    useEffect(() => {
        if (cloudinaryVideos.length > 0) {
            const transformedVideos = cloudinaryVideos.map((video, index) => ({
                id: video.public_id || `video-${index}`,
                publicId: video.public_id || '',
                videoUrl: video.secure_url,
                title: `Performance ${index + 1}`,
                description: `Live performance video ${index + 1}`
            }));
            setVideos(transformedVideos);
        }
    }, [cloudinaryVideos]);
    return (
        <>
            <main className="pt-20 sm:pt-24 md:pt-32 min-h-screen bg-gradient-to-br from-gray-900/80 via-gray-800/60 via-[#02ACAC]/10 to-gray-900/90">
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
            <section className="relative z-10 pb-8 sm:pb-24 lg:pb-32">
                <div className="container mx-auto px-0">
                    <div className="max-w-7xl mx-auto">
                        <FadeInUp delay={0.2}>
                            <div className="h-auto bg-gradient-to-br from-gray-900/90 via-gray-800/80 to-gray-900/95 backdrop-blur-xl rounded-3xl py-8 sm:p-10 lg:p-12 border border-gray-700/20 hover:border-[#02ACAC]/30 transition-all duration-500 hover:shadow-[#02ACAC]/10 shadow-2xl">
                                {videosLoading ? (
                                    <div className="flex items-center justify-center py-12">
                                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#02ACAC]"></div>
                                    </div>
                                ) : videos.length > 0 ? (
                                    <SwiperVideoPlayer
                                        videos={videos}
                                        cloudName="dllh8yqz8"
                                        autoplay={false}
                                        loop={true}
                                        showControls={true}
                                        className="z-10 min-h-[400px] sm:min-h-[500px] lg:min-h-[600px] h-auto"
                                        isGridView={isVideoGridView}
                                        onGridViewToggle={() => setIsVideoGridView(!isVideoGridView)}
                                    />
                                ) : (
                                    <div className="text-center py-12">
                                        <h2 className="text-2xl sm:text-3xl text-white mb-2">Videos</h2>
                                        <p className="text-gray-300 mb-4">Watch live performances and behind-the-scenes content</p>
                                        <p className="text-gray-400">No videos available at the moment</p>
                                    </div>
                                )}
                            </div>
                        </FadeInUp>
                    </div>
                </div>
            </section>

            {/* Photos Section */}
            <section className="relative h-auto z-10 pb-20 sm:pb-24 lg:pb-32">
                <div className="container mx-auto px-0">
                    <div className="max-w-7xl mx-auto">
                        <FadeInUp delay={0.4}>
                            <div className="bg-gradient-to-br from-gray-900/90 via-gray-800/80 to-gray-900/95 backdrop-blur-xl rounded-3xl py-8 sm:p-10 lg:p-12 border border-gray-700/20 hover:border-[#02ACAC]/30 transition-all duration-500 hover:shadow-[#02ACAC]/10 shadow-2xl">
                                <SwiperPhotoGallery
                                    useCloudinary={true}
                                    cloudinaryTag="production"
                                    cloudName="dllh8yqz8"
                                    itemsPerView={{
                                        mobile: 1,
                                        tablet: 2,
                                        desktop: 3
                                    }}
                                    showThumbs={true}
                                    autoplay={false}
                                    effect="slide"
                                    isGridView={isPhotoGridView}
                                    onGridViewToggle={() => setIsPhotoGridView(!isPhotoGridView)}
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
