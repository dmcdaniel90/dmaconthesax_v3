import { useState, useRef } from 'react';
import { Play } from 'lucide-react';

interface VideoProps {
    src: string;
    width?: string;
    height?: string;
    title?: string;
    alt?: string;
    onPlay?: () => void;
    isCloudinary?: boolean;
    poster?: string;
}

export default function Video({ 
    src, 
    width = "100%", 
    height = "1000px", 
    title = "Video player",
    onPlay,
    isCloudinary = false,
    poster
}: VideoProps): React.ReactElement {
    const [isHovered, setIsHovered] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    // Check if it's a YouTube URL
    const isYouTube = src.includes('youtube.com') || src.includes('youtu.be');

    const handlePlayClick = () => {
        if (onPlay) {
            onPlay();
        } else if (isCloudinary && videoRef.current) {
            // For Cloudinary videos, play directly
            videoRef.current.play();
        }
    };

    if (isYouTube) {
        // YouTube embed
        return (
            <iframe 
                className="bg-transparent" 
                loading="lazy" 
                src={src} 
                width={width} 
                height={height} 
                title={title} 
                allow="accelerometer; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
            />
        );
    }

    // Direct video file (Cloudinary or other)
    return (
        <div 
            className="relative group cursor-pointer overflow-hidden rounded-lg"
            style={{ width, height }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handlePlayClick}
        >
            <video
                ref={videoRef}
                src={src}
                className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                poster={poster}
                preload="metadata"
                onLoadStart={() => setIsLoading(true)}
                onLoadedData={() => setIsLoading(false)}
                onError={() => setIsLoading(false)}
            />
            
            {/* Play button overlay */}
            <div className={`absolute inset-0 flex items-center justify-center bg-black/20 transition-all duration-300 ${isHovered ? 'bg-black/40' : ''}`}>
                <div className={`bg-white/90 hover:bg-white text-gray-900 rounded-full p-3 sm:p-4 transition-all duration-300 ${isHovered ? 'scale-110' : 'scale-100'}`}>
                    <Play className="w-6 h-6 sm:w-8 sm:h-8 fill-current" />
                </div>
            </div>

            {/* Loading indicator */}
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                </div>
            )}
        </div>
    );
}
