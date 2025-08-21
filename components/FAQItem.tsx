import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
export default function FAQItem({ title, text, value }: { title: string, text: string, value: string }) {
    return (
        <AccordionItem value={value} className="rounded-2xl cursor-pointer text-xl hover:bg-gradient-to-r from-[#02ACAC]/40 to-[#005C5C] pl-4 pr-4 " >
            <AccordionTrigger className="cursor-pointer text-2xl ">{title}</AccordionTrigger>
            <AccordionContent>
                <blockquote className="mt-2 border-l-2 pl-6 italic text-lg">{text}</blockquote>
            </AccordionContent>
        </AccordionItem>
    )
}
