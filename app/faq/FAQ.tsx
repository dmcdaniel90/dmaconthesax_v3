'use client'

import { Accordion } from "@/components/ui/accordion"
import FAQItem from "@/components/FAQItem"
import { useHeaderContext } from "../contexts/HeaderContext"
import Announcement from "@/components/Announcement"
import { Button } from "@/components/ui/button"
import Link from "next/link"
export default function FAQ() {
    const { dispatch } = useHeaderContext()

    const handleNavChange = () => {
        dispatch({ type: "SET_NAV_LINK", payload: 'booking' })
    }

    return (
        <>
            <section className="mb-28">
                <h3 className="text-3xl font-semibold mb-4 text-white px-8 text-center">Frequently Asked Questions</h3>
                <Accordion type="single" collapsible className="text-white px-8 py-8 rounded-2xl w-3xl">
                    <FAQItem
                        title="What kind of music do you perform?"
                        text="These days, I perform lots of club classics and party anthems. However, I've performed and recorded with Classical symphonies, Latin ensembles, rock bands, jazz groups, and more!"
                        value="faq-1"
                    />
                    <FAQItem
                        title="Do you have a song list?"
                        text="In general, I playalong to any playlist you or your DJ has prepared. Otherwise, I have a variety of playlists for lots of different genres."
                        value="faq-2"
                    />
                    <FAQItem
                        title="Where are you based and do you travel?"
                        text="I am based in Swindon, UK but will travel anywhere worldwide (extra fees may apply)"
                        value="faq-3"
                    />
                    <FAQItem
                        title="Why should I book you?"
                        text="With almost 25 years of experience touring stages and venues around the world, I specialise in providing top-quality performances with minimal-fuss event planning. You can trust you are getting a professional service with DMAC on the Sax"
                        value="faq-4"
                    />
                    <FAQItem
                        title="Great I'm interested! How do I book you?"
                        text="Click the 'Get a quote' button at the bottom of this page to fill out a short form letting me know about your event and I'll be glad to send you personalised quote."
                        value="faq-5"
                    />
                    <FAQItem
                        title="How much do you charge?"
                        text="I charge a flat fee for my services. Please contact for more details"
                        value="faq-6"
                    />
                    <FAQItem
                        title="How do you handle payment?"
                        text="Payment can be made by card, bank transfer, or cash any time before or on the event date. Arrangements can be made for payments after the event."
                        value="faq-7"
                    />
                    <FAQItem
                        title="Are you insured?"
                        text="I hold £10,000,000 in Public Liability Insurance"
                        value="faq-8"
                    />
                </Accordion>
            </section>
            <section className="w-full text-center mb-0">
                <Announcement textColor="text-white" text="Ready to book?" bgColor="bg-[#005C5C]/80" rounded={false}>
                    <Button className="mx-auto w-[500px] h-[50px] rounded-md bg-white text-black text-lg px-6 py-2 font-medium transition-all duration-300 hover:bg-[#F7B478] cursor-pointer">
                        <Link href={`/booking`} onClick={handleNavChange}>Get a quote</Link>
                    </Button>
                </Announcement>
            </section>
        </>
    )
}
