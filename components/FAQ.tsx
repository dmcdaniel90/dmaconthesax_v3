import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
export default function FAQ() {
    return (
        <>
            <h3 className="text-3xl font-semibold mb-4 text-white px-8">Frequently Asked Questions</h3>
            <Accordion type="single" collapsible className="text-white px-8 py-8 rounded-2xl">
                <AccordionItem value="item-1" className="cursor-pointer text-xl hover:bg-gradient-to-r from-gray-900/40 to-gray-800 pl-4 pr-4">
                    <AccordionTrigger className="cursor-pointer text-xl ">Question 1</AccordionTrigger>
                    <AccordionContent>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, ratione.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2" className="cursor-pointer text-xl hover:bg-gradient-to-r from-gray-900/40 to-gray-800 pl-4 pr-4">
                    <AccordionTrigger className="cursor-pointer text-xl">Question 2</AccordionTrigger>
                    <AccordionContent>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, ratione.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3" className="cursor-pointer text-xl hover:bg-gradient-to-r from-gray-900/40 to-gray-800 pl-4 pr-4">
                    <AccordionTrigger className="cursor-pointer text-xl">Question 3</AccordionTrigger>
                    <AccordionContent>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, ratione.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </>
    )
}
