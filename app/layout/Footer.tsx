import Socials from "@/components/Socials"

export default function Footer() {
    return (
        <footer className="relative bg-gradient-to-t from-gray-900/95 to-gray-800/80 backdrop-blur-sm border-t border-gray-700/30">
            <div className="flex flex-col justify-center items-center py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28 gap-6 sm:gap-8 md:gap-10 px-4 sm:px-6 md:px-8 lg:px-12 text-center">
                {/* Subtle decorative element */}
                <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#02ACAC]/60 to-transparent mb-2"></div>
                
                <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-center leading-relaxed max-w-3xl mx-auto bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    Follow me on social media
                </h3>
                
                <p className="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto leading-relaxed">
                    Stay connected for the latest updates, performances, and behind-the-scenes content
                </p>
                
                {/* Social media icons with enhanced styling */}
                <div className="flex justify-center items-center w-full pt-2">
                    <Socials 
                        socials={{ 
                            facebook: "https://www.facebook.com/", 
                            instagram: "https://www.instagram.com/", 
                            youtube: "https://www.youtube.com/", 
                            spotify: "https://www.spotify.com/" 
                        }} 
                        size="32" 
                        gap={24} 
                        color="#02ACAC" 
                    />
                </div>
                
                {/* Copyright with subtle styling */}
                <div className="pt-4 border-t border-gray-700/20 w-full max-w-md">
                    <p className="text-xs sm:text-sm text-gray-500 font-medium">
                        Devin McDaniel Music - 2025 - Website by Devin McDaniel
                    </p>
                </div>
            </div>
        </footer>
    )
}
