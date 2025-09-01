import TextBlock from "@/components/TextBlock"
export default function About() {
    return (
        <main className="flex flex-col gap-8 sm:gap-12 md:gap-16 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24 mt-8 sm:mt-12 md:mt-16">
            <div className="mt-24 bg-gradient-to-br from-gray-900/80 to-gray-800/60 backdrop-blur-sm px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-8 sm:py-12 md:py-16 lg:py-20 rounded-2xl shadow-2xl border border-gray-700/30">
                <TextBlock 
                    heading="About" 
                    subheading="UK's Own Texas Tenor" 
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
                            Devin graduated from the famous University of Texas Jazz Studies program, which has produced artists like Norah Jones and Tom 'Bones' Malone. While studying, he played with various ensembles, including the UNT Lab Bands, the UNT Symphonic Band, and the Latin Jazz Ensemble, recording albums with both. Outside of school, Devin hit the clubs and festivals, even jamming with musicians from Earth, Wind & Fire and on the Las Vegas Strip.
                        </p>
                        <br />
                        <p className="leading-relaxed">
                            After graduation, he toured the globe with Carnival, Holland America, and Royal Caribbean Cruise Lines. He took on different roles, from pit orchestra to jazz and rock gigs, for about 10 years before moving to the UK and making a name for himself in clubs and private events. In the UK Southwest, DMAC has rocked festivals like My Dad Is Bigger Than Your Dad, WRDE UP, and Radfest. He's also played at private and corporate events for Greene King Pubs, The Royal International Air Tattoo, and several entertainment agencies.
                        </p>
                </article>
            </div>
        </main>
    )
}
