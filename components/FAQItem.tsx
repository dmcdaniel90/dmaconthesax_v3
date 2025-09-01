import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
export default function FAQItem({ title, text, value }: { title: string, text: string, value: string }) {
    return (
        <AccordionItem value={value} className="rounded-2xl cursor-pointer text-base sm:text-lg md:text-xl hover:bg-gradient-to-r from-[#02ACAC]/40 to-[#005C5C] px-3 sm:px-4" >
            <AccordionTrigger className="cursor-pointer text-lg sm:text-xl md:text-2xl text-left">{title}</AccordionTrigger>
            <AccordionContent>
                <blockquote className="mt-2 border-l-2 pl-4 sm:pl-6 italic text-sm sm:text-base md:text-lg">{text}</blockquote>
            </AccordionContent>
        </AccordionItem>
    )
}
