import TextBlock from "@/components/TextBlock"
import Link from "next/link"
import ContactForm from "./ContactForm"

export default function Contact() {
    return (
        <main className="flex flex-col items-center justify-center gap-12 grow shrink-0 basis-auto">
            <div className="flex flex-col items-center justify-center px-12 py-8 bg-gray-900/70 rounded-2xl mb-12">
                <TextBlock heading="Contact Us" width={1000} textWidth={450} bodySize={16} headingSize={32} image="https://images.unsplash.com/photo-1508186736123-44a5fcb36f9f?ixid=M3w2NjY5MzN8MHwxfHNlYXJjaHwxNXx8Z3VpdGFyfGVufDB8MXx8fDE3NTUyODA4NTV8MA&ixlib=rb-4.1.0" imageAltText="Contact Us" imagePosition="right" size={1000}>
                    <article>
                        <p>
                            Not looking for a <Link href="/booking">booking?</Link> Get in touch with us using this contact form.
                        </p>
                        <br />
                        <div className="text-lg mb-8">
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
