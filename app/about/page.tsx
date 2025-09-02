import TextBlock from "@/components/TextBlock"
export default function About() {
    return (
        <main className="flex flex-col gap-8 sm:gap-12 md:gap-16 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24 mt-8 sm:mt-12 md:mt-16">
            {/* Hero Section */}
            <section className="relative overflow-hidden py-16 sm:py-20 lg:py-24 xl:py-32">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-40">
                    <div className="w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMkFDQUMiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')]"></div>
                </div>

                <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="max-w-4xl mx-auto">
                        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#02ACAC] to-transparent mx-auto mb-8"></div>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold bg-gradient-to-r from-white via-gray-200 to-[#02ACAC] bg-clip-text text-transparent">
                            About
                        </h1>
                    </div>
                </div>
            </section>
            <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/60 backdrop-blur-sm px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-8 sm:py-12 md:py-16 lg:py-20 rounded-2xl shadow-2xl border border-gray-700/30">
                <TextBlock
                    subheading="UK's Own 'Texas Tenor'"
                    imagePosition="left"
                    image="/sax_landscape_1.jpg"
                    imageAltText="About Us"
                    size="100%"
                    textWidth="100%"
                    width="100%"
                    bodySize={16}
                    headingSize={36}
                    subheadingSize={24}
                >
                    <article className="space-y-6 sm:space-y-8">
                        <p className="leading-relaxed">
                            Texas native Devin McDaniel brings over 20 years of experience in performing and cruise ships to the dance floor as DMAC On The Sax. He delivers live Ibiza, rock, pop, and jazz saxophone for any occasion.
                        </p>
                    </article>
                </TextBlock>
            </div>
            <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/60 backdrop-blur-sm px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-8 sm:py-12 md:py-16 lg:py-20 rounded-2xl shadow-2xl border border-gray-700/30">
                <article className="text-white">
                    <p className="leading-relaxed">
                        Devin graduated from the famous University of Texas Jazz Studies program, which has produced artists like Norah Jones and Tom &apos;Bones&apos; Malone. While studying, he played with various ensembles, including the UNT Lab Bands, the UNT Symphonic Band, and the Latin Jazz Ensemble, recording albums with both. Outside of school, Devin hit the clubs and festivals, even jamming with musicians from Earth, Wind &amp; Fire and on the Las Vegas Strip.
                    </p>
                    <br />
                    <p className="leading-relaxed">
                        After graduation, he toured the globe with Carnival, Holland America, and Royal Caribbean Cruise Lines. He took on different roles, from pit orchestra to jazz and rock gigs, for about 10 years before moving to the UK and making a name for himself in clubs and private events. In the UK Southwest, DMAC has rocked festivals like My Dad Is Bigger Than Your Dad, WRDE UP, and Radfest. He&apos;s also played at private and corporate events for Greene King Pubs, The Royal International Air Tattoo, and several entertainment agencies.
                    </p>
                </article>
            </div>
        </main>
    )
}
