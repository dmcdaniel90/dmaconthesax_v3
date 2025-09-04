import AnimatedPageTitle from "@/components/AnimatedPageTitle"
import ResponsiveImage from "@/components/ResponsiveImage"
import { FadeInUp, FadeInLeft, FadeInRight, ScaleIn, StaggerContainer, StaggerItem } from "@/components/ScrollReveal"
export default function About() {
    return (
        <>
            <main className="mt-16 min-h-screen bg-gradient-to-br from-gray-900/80 via-gray-800/60 via-[#02ACAC]/10 to-gray-900/90">
                {/* Hero Section */}
                <section className="relative overflow-hidden py-20 sm:py-24 lg:py-32 xl:py-40 min-h-[200px]">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-40">
                        <div className="w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMkFDQUMiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')]"></div>
                    </div>
                    <div className="relative z-10 container mx-auto px-6 sm:px-8 md:px-12 lg:px-16">
                        <AnimatedPageTitle
                            title="About"
                            delay={0}
                        />
                    </div>
                </section>

                <section className="relative z-10 pb-20 sm:pb-24 lg:pb-32 xl:pb-40 min-h-[1200px]">
                    <div className="container mx-auto px-6 sm:px-8 md:px-12 lg:px-16">
                        <div className="max-w-7xl mx-auto space-y-16 lg:space-y-20">
                            {/* Hero Section with Image and Introduction */}
                            <ScaleIn delay={0.2}>
                                <div className="bg-gradient-to-br from-gray-900/90 via-gray-800/80 to-gray-900/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-700/20 hover:border-[#02ACAC]/30 transition-all duration-500 hover:shadow-[#02ACAC]/10 overflow-hidden">
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 h-[500px] lg:h-[600px]">
                                        {/* Image Section */}
                                        <FadeInLeft delay={0.4}>
                                            <div className="relative order-2 lg:order-1">
                                                <div className="absolute inset-0 bg-gradient-to-br from-[#02ACAC]/10 via-transparent to-gray-900/20 z-10"></div>
                                                <div className="w-full h-full aspect-[4/5] relative">
                                                    <ResponsiveImage
                                                        imageName="cruises_001_x335rh"
                                                        fallbackSrc="/sax_portrait_3.jpg"
                                                        alt="DMAC on the Sax - Professional Saxophonist"
                                                        className="w-full h-full object-cover"
                                                        fill={true}
                                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                                                    />
                                                </div>
                                            </div>
                                        </FadeInLeft>
 
                                        {/* Content Section */}
                                        <FadeInRight delay={0.6}>
                                            <div className="order-1 lg:order-2 flex flex-col justify-center p-8 sm:p-12 lg:p-16">
                                                <StaggerContainer staggerDelay={0.1}>
                                                    <StaggerItem direction="up" delay={0}>
                                                        <div className="mb-4 text-black inline-block rounded-xl bg-[#F7B478] px-4 py-2 text-sm font-semibold tracking-wider text-[#02ACAC] uppercase border border-[#02ACAC]/30">About DMAC</div>
                                                    </StaggerItem>
                                                    <StaggerItem direction="up" delay={0.1}>
                                                        <h2 className="mb-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                                                            UK&apos;s Own
                                                            <span className="block text-[#02ACAC]">&apos;Texas Tenor&apos;</span>
                                                        </h2>
                                                    </StaggerItem>
                                                    <StaggerItem direction="up" delay={0.2}>
                                                        <p className="text-lg sm:text-xl text-gray-300 leading-relaxed">
                                                            Texas native Devin McDaniel brings over 20 years of experience in performing and cruise ships to the dance floor as DMAC On The Sax. He delivers live Ibiza, rock, pop, and jazz saxophone for any occasion.
                                                        </p>
                                                    </StaggerItem>
                                                    <StaggerItem direction="up" delay={0.3}>
                                                        <div className="flex flex-wrap gap-4 pt-4">
                                                            <div className="flex items-center space-x-2 text-[#02ACAC]">
                                                                <div className="w-2 h-2 bg-[#02ACAC] rounded-full"></div>
                                                                <span className="text-sm font-medium">20+ Years Experience</span>
                                                            </div>
                                                            <div className="flex items-center space-x-2 text-[#02ACAC]">
                                                                <div className="w-2 h-2 bg-[#02ACAC] rounded-full"></div>
                                                                <span className="text-sm font-medium">Global Performer</span>
                                                            </div>
                                                            <div className="flex items-center space-x-2 text-[#02ACAC]">
                                                                <div className="w-2 h-2 bg-[#02ACAC] rounded-full"></div>
                                                                <span className="text-sm font-medium">Multiple Genres</span>
                                                            </div>
                                                        </div>
                                                    </StaggerItem>
                                                </StaggerContainer>
                                            </div>
                                        </FadeInRight>
                                    </div>
                                </div>
                            </ScaleIn>

                            {/* Journey Section */}
                            <FadeInUp delay={0.8}>
                                <div className="bg-gradient-to-br from-gray-900/90 via-gray-800/80 to-gray-900/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-700/20 hover:border-[#02ACAC]/30 transition-all duration-500 hover:shadow-[#02ACAC]/10 p-8 sm:p-12 lg:p-16 min-h-[600px]">
                                    <div className="max-w-4xl mx-auto">
                                        <FadeInUp delay={0.2}>
                                            <div className="text-center mb-12">
                                                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
                                                    A Musical Journey
                                                </h3>
                                                <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#02ACAC] to-transparent mx-auto"></div>
                                            </div>
                                        </FadeInUp>
 
                                        <StaggerContainer staggerDelay={0.2}>
                                            <StaggerItem direction="up" delay={0}>
                                                <div className="relative min-h-[120px]">
                                                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#02ACAC] via-[#02ACAC]/50 to-transparent"></div>

                                                    <div className="relative pl-12">
                                                        <div className="absolute left-0 top-2 w-8 h-8 bg-[#02ACAC] rounded-full flex items-center justify-center">
                                                            <span className="text-white font-bold text-sm">1</span>
                                                        </div>
                                                        <h4 className="text-xl font-semibold text-white mb-3">University of Texas Jazz Studies</h4>
                                                        <p className="text-gray-300 leading-relaxed">
                                                            Devin graduated from the famous University of Texas Jazz Studies program, which has produced artists like Norah Jones and Tom &apos;Bones&apos; Malone. While studying, he played with various ensembles, including the UNT Lab Bands, the UNT Symphonic Band, and the Latin Jazz Ensemble, recording albums with both.
                                                        </p>
                                                    </div>
                                                </div>
                                            </StaggerItem>
 
                                            <StaggerItem direction="up" delay={0.1}>
                                                <div className="relative min-h-[120px]">
                                                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#02ACAC]/50 via-[#02ACAC]/30 to-transparent"></div>

                                                    <div className="relative pl-12">
                                                        <div className="absolute left-0 top-2 w-8 h-8 bg-[#02ACAC] rounded-full flex items-center justify-center">
                                                            <span className="text-white font-bold text-sm">2</span>
                                                        </div>
                                                        <h4 className="text-xl font-semibold text-white mb-3">Global Cruise Ship Tours</h4>
                                                        <p className="text-gray-300 leading-relaxed">
                                                            After graduation, he toured the globe with Carnival, Holland America, and Royal Caribbean Cruise Lines. He took on different roles, from pit orchestra to jazz and rock gigs, for about 10 years before moving to the UK.
                                                        </p>
                                                    </div>
                                                </div>
                                            </StaggerItem>

                                            <StaggerItem direction="up" delay={0.2}>
                                                <div className="relative min-h-[120px]">
                                                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#02ACAC]/30 via-[#02ACAC]/20 to-transparent"></div>

                                                    <div className="relative pl-12">
                                                        <div className="absolute left-0 top-2 w-8 h-8 bg-[#02ACAC] rounded-full flex items-center justify-center">
                                                            <span className="text-white font-bold text-sm">3</span>
                                                        </div>
                                                        <h4 className="text-xl font-semibold text-white mb-3">UK Festival & Event Scene</h4>
                                                        <p className="text-gray-300 leading-relaxed">
                                                            In the UK Southwest, DMAC has rocked festivals like My Dad Is Bigger Than Your Dad, WRDE UP, and Radfest. He&apos;s also played at private and corporate events for Greene King Pubs, The Royal International Air Tattoo, and several entertainment agencies.
                                                        </p>
                                                    </div>
                                                </div>
                                            </StaggerItem>
                                        </StaggerContainer>
                                    </div>
                                </div>
                            </FadeInUp>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}
