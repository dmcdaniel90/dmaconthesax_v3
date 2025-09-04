import { useState, useEffect } from "react"

export function useLightbox() {
    const [isOpen, setIsOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [images, setImages] = useState<string[]>([]);
    const [isVisible, setIsVisible] = useState(false);

    const handleOpen = (index: number) => {
        setCurrentIndex(index);
        setIsOpen(true);
        // Trigger animation after DOM update
        setTimeout(() => setIsVisible(true), 10);
    };

    const handleClose = () => {
        setIsVisible(false);
        // Close after animation completes
        setTimeout(() => setIsOpen(false), 300);
    };

    // Handle escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                handleClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            // Prevent body scroll when lightbox is open
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : images.length - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex < images.length - 1 ? prevIndex + 1 : 0));
    };

    const handleClickOutside = (e: any) => {
        if (e.target.tagName === "IMG") return;
        if (e.target.tagName === "BUTTON") return;
        handleClose();
    };

    const LightboxComponent = () => (
        <div className={`fixed top-0 left-0 w-full h-full bg-black/80 backdrop-blur-md flex justify-center items-center z-[1000] cursor-alias transition-all duration-300 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`} onClick={handleClickOutside}>
            {/* Close button */}
            <button 
                onClick={handleClose} 
                className="absolute bg-gray-900/80 hover:bg-gray-800/90 border border-gray-600/50 text-white text-2xl sm:text-3xl cursor-pointer top-4 sm:top-6 right-4 sm:right-6 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 z-10"
                aria-label="Close lightbox"
            >
                ×
            </button>
            
            {/* Previous button */}
            <button 
                onClick={handlePrev} 
                className="absolute border-0 text-2xl cursor-pointer top-1/2 -translate-y-1/2 left-2 sm:left-4 md:left-8 lg:left-16 bg-white/90 hover:bg-white text-gray-900 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full flex justify-center items-center hover:scale-110 transition-all duration-200 shadow-lg z-10"
                aria-label="Previous image"
            >
                ‹
            </button>
            
            {/* Image container with original aspect ratio */}
            <div className="relative w-full h-full flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12">
                <img 
                    src={images[currentIndex]} 
                    alt={`Lightbox image ${currentIndex + 1} of ${images.length}`} 
                    className={`max-w-full max-h-full w-auto h-auto object-contain rounded-lg shadow-2xl transition-all duration-300 ease-in-out ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
                    style={{
                        maxWidth: '95vw',
                        maxHeight: '95vh',
                        width: 'auto',
                        height: 'auto'
                    }}
                />
            </div>
            
            {/* Next button */}
            <button 
                onClick={handleNext} 
                className="absolute border-0 text-2xl cursor-pointer top-1/2 -translate-y-1/2 right-2 sm:right-4 md:right-8 lg:right-16 bg-white/90 hover:bg-white text-gray-900 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full flex justify-center items-center hover:scale-110 transition-all duration-200 shadow-lg z-10"
                aria-label="Next image"
            >
                ›
            </button>
            
            {/* Image counter */}
            <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 bg-gray-900/80 text-white text-sm sm:text-base px-3 py-2 rounded-full border border-gray-600/50">
                {currentIndex + 1} / {images.length}
            </div>
        </div>
    )

    return {
        isOpen,
        setImages,
        handleOpen,
        LightboxComponent
    }
}


