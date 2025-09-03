import { Textarea } from "@/components/ui/textarea";
import { FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Field } from "react-hook-form";

const defaultLabelStyles = "text-sm sm:text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 mt-4"

type DescriptionTextareaProps = {
    label?: string,
    labelClasses?: string,
    field: Field;
    placeholder?: string;
    required?: boolean;
}
export default function DescriptionTextarea({
    label = "Message",
    labelClasses = defaultLabelStyles,
    field,
    placeholder = "Enter your message",
    required = false
}: DescriptionTextareaProps) {
    return (
        <FormItem>
            <FormLabel className={labelClasses} htmlFor="message">{label}</FormLabel>
            <FormControl>
                <Textarea 
                    id="message" 
                    name="message" 
                    maxLength={400} 
                    placeholder={placeholder} 
                    className="h-24 sm:h-28 md:h-32 text-sm sm:text-base" 
                    aria-required={required}
                    autoComplete="off"
                    aria-describedby="message-help"
                    {...field} 
                />
            </FormControl>
            <div id="message-help" className="text-xs text-gray-500 mt-1">
                Maximum 400 characters
            </div>
            <FormMessage />
        </FormItem>
    )
}
