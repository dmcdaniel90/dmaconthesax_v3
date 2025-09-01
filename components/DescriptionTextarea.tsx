import { Textarea } from "@/components/ui/textarea";
import { FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Field } from "react-hook-form";

const defaultLabelStyles = "text-sm sm:text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 mt-4"

type DescriptionTextareaProps = {
    label?: string,
    labelClasses?: string,
    field: Field;
    placeholder?: string
}
export default function DescriptionTextarea({
    label = "Description",
    labelClasses = defaultLabelStyles,
    field,
    placeholder = "Enter a description"
}: DescriptionTextareaProps) {
    return (
        <FormItem>
            <FormLabel className={labelClasses} htmlFor="description">{label}</FormLabel>
            <FormControl>
                <Textarea id="description" maxLength={400} placeholder={placeholder} className="h-24 sm:h-28 md:h-32 text-sm sm:text-base" {...field} />
            </FormControl>
            <FormMessage />
        </FormItem>
    )
}
