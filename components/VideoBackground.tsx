
const VideoBackground = () => {
    return (
        <div className="fixed inset-0 w-full h-full overflow-hidden -z-50">
            {/* Video element */}
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover object-center"
                style={{
                    objectPosition: 'center 30%' // Position video to keep performer visible
                }}
            >
                <source src="/background.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            
            {/* Dark overlay to ensure text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/20"></div>
            
            {/* Subtle top gradient for better header visibility */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent"></div>
        </div>
    );
};

export default VideoBackground;