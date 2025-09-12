'use client'

import { Accordion } from "@/components/ui/accordion"
import FAQItem from "@/components/FAQItem"
import { useHeaderContext } from "../contexts/HeaderContext"
import Announcement from "@/components/Announcement"
import Link from "next/link"
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
export default function FAQ({showTitle = true}) {
    const { dispatch } = useHeaderContext()

    const handleNavChange = () => {
        dispatch({ type: "SET_ACTIVE_LINK", payload: 'booking' })
    }

    return (
        <>
            <StaggerContainer staggerDelay={0.15} className="sm:mt-12 md:mt-16 mb-16 sm:mb-20 md:mb-28 px-4 sm:px-6 md:px-8 w-full max-w-[1000px]">
                {showTitle && (
                    <FadeInUp delay={0.1} duration={0.6}>
                        <h3 className="text-2xl sm:text-3xl font-semibold mb-4 text-white text-center">Frequently Asked Questions</h3>
                    </FadeInUp>
                )}
                <FadeInUp delay={0.2} duration={0.8}>
                    <Accordion type="single" collapsible className="text-white py-4 sm:py-6 md:py-8 rounded-2xl w-full">
                        <StaggerItem direction="up" delay={0.1}>
                            <FAQItem
                                title="What kind of music do you perform?"
                                text="These days, I perform lots of club classics and party anthems. However, I've performed and recorded with Classical symphonies, Latin ensembles, rock bands, jazz groups, and more!"
                                value="faq-1"
                            />
                        </StaggerItem>
                        <StaggerItem direction="up" delay={0.2}>
                            <FAQItem
                                title="Do you have a song list?"
                                text="In general, I can play along to any song! I can learn songs for you if you have a specific playlist or song in mind, jam along with your DJ, or I can play a variety of songs from my repertoire."
                                value="faq-2"
                            />
                        </StaggerItem>
                        <StaggerItem direction="up" delay={0.3}>
                            <FAQItem
                                title="Where are you based and do you travel?"
                                text="I am based in Swindon, UK but will travel anywhere worldwide (extra fees may apply)"
                                value="faq-3"
                            />
                        </StaggerItem>
                        <StaggerItem direction="up" delay={0.4}>
                            <FAQItem
                                title="Why should I book you?"
                                text="With almost 25 years of experience touring stages and venues around the world, I specialise in providing top-quality performances with minimal-fuss event planning. You can trust you are getting a professional service with DMAC on the Sax"
                                value="faq-4"
                            />
                        </StaggerItem>
                        <StaggerItem direction="up" delay={0.5}>
                            <FAQItem
                                title="Great I'm interested! How do I book you?"
                                text="Click the 'Get a quote' button at the bottom of this page to fill out a short form letting me know about your event and I'll be glad to send you personalised quote."
                                value="faq-5"
                            />
                        </StaggerItem>
                        <StaggerItem direction="up" delay={0.6}>
                            <FAQItem
                                title="How much do you charge?"
                                text="I charge a flat fee per set for my services, starting from £150. Prices vary depending on the event and the location, so please get in touch for a personalised quote."
                                value="faq-6"
                            />
                        </StaggerItem>
                        <StaggerItem direction="up" delay={0.7}>
                            <FAQItem
                                title="How long do you play for?"
                                text="Sets are typically 45 to 60 minutes long, but I am flexible on timing depending on the event and the location."
                                value="faq-7"
                            />
                        </StaggerItem>
                        <StaggerItem direction="up" delay={0.8}>
                            <FAQItem
                                title="How do you handle payment?"
                                text="Payment can be made by card, bank transfer, or cash any time before or on the event date. Arrangements can be made for payments after the event."
                                value="faq-8"
                            />
                        </StaggerItem>
                        <StaggerItem direction="up" delay={0.9}>
                            <FAQItem
                                title="Are you insured?"
                                text="I hold £10,000,000 in Public Liability Insurance"
                                value="faq-9"
                            />
                        </StaggerItem>
                    </Accordion>
                </FadeInUp>
            </StaggerContainer>
            <section className="w-full text-center mb-0 px-4 sm:px-6 md:px-8">
                <Announcement textColor="text-white" text="Ready to book?" bgColor="bg-[#005C5C]/80" rounded={false}>
                    <Link 
                        onClick={handleNavChange} 
                        href="/booking"
                        className="mx-auto w-full max-w-[300px] sm:max-w-[400px] md:max-w-[500px] h-[40px] sm:h-[45px] md:h-[50px] bg-[#02ACAC] hover:bg-[#02ACAC]/90 text-white text-base sm:text-lg px-4 sm:px-6 py-2 font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 inline-flex items-center justify-center"
                        aria-label="Get a quote for booking"
                        tabIndex={0}
                    >
                        Get a quote
                    </Link>
                </Announcement>
            </section>
        </>
    )
}
