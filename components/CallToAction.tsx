'use client'
import { TypeAnimation } from "react-type-animation";

export default function CallToAction() {
    return (
        <div className="relative flex flex-col overflow-hidden bg-gradient-to-br from-gray-900/80 to-gray-800/50 p-6 text-white shadow-xl md:flex-row md:items-center md:justify-between px-32 py-48">

            {/* Content */}
            <div className="z-10 space-y-3 md:w-3/5">
                <div className="inline-block rounded-lg bg-gray-500 px-3 py-1 text-xs font-semibold tracking-wider text-white uppercase">
                    Booking for 2026
                </div>
                <h2 className="text-3xl leading-tight font-bold tracking-tight md:text-4xl lg:text-5xl">
                    Your Name <TypeAnimation className="text-gray-400" sequence={["Weddings", 1000, "Events", 1000, "Festivals", 1000]} repeat={Infinity} />
                </h2>
                <p className="max-w-xl text-sm text-gray-300 md:text-base">
                    Enter a description of your product or service here
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                    <button className="rounded-md bg-gray-500 px-6 py-2 font-medium transition-all hover:bg-gray-600 cursor-pointer">
                        Book Now
                    </button>
                    <button className="rounded-md border border-white/30 bg-transparent px-6 py-2 font-medium transition-all hover:bg-white/10 cursor-pointer">
                        View Details
                    </button>
                </div>
            </div>

            {/* Image */}
            <div className="relative z-10 mt-6 h-60 w-full md:mt-0 md:h-80 md:w-2/5">
                <div className="absolute -top-4 -right-4 h-60 w-60 rounded-full bg-blue-500/30 blur-xl"></div>
                <div className="relative h-full w-full">
                    <img
                        src="https://placehold.co/400x400/0077ff/ffffff?text=Your Image Here"
                        alt="Your Image Here"
                        className="drop-shadow-2xl"
                    />
                </div>
            </div>
        </div>
    );
}
