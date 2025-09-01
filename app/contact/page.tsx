import TextBlock from "@/components/TextBlock"
import Link from "next/link"
import ContactForm from "./ContactForm"

export default function Contact() {
    return (
        <main className="flex flex-col items-center justify-center gap-6 sm:gap-8 md:gap-12 grow shrink-0 basis-auto px-4 sm:px-6 md:px-8 lg:px-12 mt-8 sm:mt-12 md:mt-16">
            <div className="mt-24 flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 py-4 sm:py-6 md:py-8 bg-gray-900/70 rounded-2xl mb-6 sm:mb-8 md:mb-12 w-full max-w-4xl">
                <TextBlock 
                    heading="Contact Us" 
                    width="100%" 
                    textWidth="100%" 
                    bodySize={16} 
                    headingSize={32} 
                    image="/sax_portrait_2.webp" 
                    imageAltText="Contact Us" 
                    imagePosition="right" 
                    size="300"
                    imgStyles={{ position: "relative", top: "40%" }}
                >
                    <article>
                        <p>
                            Not looking for a <Link href="/booking">booking?</Link> Get in touch with us using this contact form.
                        </p>
                        <br />
                        <div className="text-base sm:text-lg mb-4 sm:mb-6 md:mb-8">
                            <p className="mb-2">
                                <span className="font-semibold">Email: </span><a href="mailto:hello@example.com" className="underline hover:text-red-400">hello@example.com</a>
                            </p>
                            <p><span className="font-semibold">Phone: </span><a href="tel:0123456789" className="hover:text-red-400">0123456789</a></p>
                        </div>
                        <ContactForm />
                    </article>
                </TextBlock>
            </div>
        </main>
    )
}
