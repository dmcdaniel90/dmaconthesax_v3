import { useState } from "react"

export function useLightbox() {
    const [isOpen, setIsOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [images, setImages] = useState<string[]>([]);

    const handleOpen = (index: number) => {
        setCurrentIndex(index);
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

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
        <div className={`fixed top-0 left-0 w-full h-full bg-gray-950/80 flex justify-center items-center z-[1000] cursor-alias`} onClick={handleClickOutside}>
            <button onClick={handleClose} className="absolute bg-transparent border-0 text-white text-3xl cursor-pointer top-[30px] right-[30px]">X</button>
            <button onClick={handlePrev} className="absolute border-0  text-2xl cursor-pointer top-[50%] left-[100px] bg-white text-gray-900 w-[50px] h-[50px] rounded-full flex justify-center items-center hover:opacity-80 transition-opacity duration-300">&lt;</button>
            <img src={images[currentIndex]} alt={`Lightbox ${currentIndex}`} className="w-[80%] h-[80%] opacity-100 cursor-default" />
            <button onClick={handleNext} className="absolute border-0  text-2xl cursor-pointer top-[50%] right-[100px] bg-white text-gray-900 w-[50px] h-[50px] rounded-full flex justify-center items-center hover:opacity-80 transition-opacity duration-300">&gt;</button>
        </div>
    )

    return {
        isOpen,
        setImages,
        handleOpen,
        LightboxComponent
    }
}


