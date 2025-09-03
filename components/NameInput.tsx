import { FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Field } from "react-hook-form";

type NameInputProps = {
    label?: string
    labelClasses?: string
    field: Field
    required?: boolean
}

const defaultLabelStyles = "text-sm sm:text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 mt-4"

export default function NameInput({ label = "Name", labelClasses = defaultLabelStyles, field, required = false }: NameInputProps) {
    return (
        <FormItem>
            <FormLabel className={labelClasses} htmlFor="name">{label}</FormLabel>
            <FormControl>
                <Input 
                    id="name" 
                    className="h-10 sm:h-11 md:h-12 text-sm sm:text-base" 
                    aria-required={required}
                    autoComplete="name"
                    placeholder="Enter your full name"
                    {...field} 
                />
            </FormControl>
            <FormMessage />
        </FormItem>
    )
}
