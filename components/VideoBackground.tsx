import Overlay from "./Overlay";
const VideoBackground = () => {
    return (
        <div className="inset-0 w-[100%] overflow-hidden -z-50 rounded-lg fixed">
            <div className="absolute inset-0 bg-gradient-to-b from-black dark:from-black via-gray-800/70 to-transparent opacity-90">
            </div>
            <video
                autoPlay
                loop
                muted
                playsInline
                className="object-cover w-full opacity-100"
            >
                <source src="/background.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div className="absolute inset-0 bg-gradient-to-b from-white dark:from-black to-transparent opacity-20"></div>
        </div>
    );
};

export default VideoBackground;