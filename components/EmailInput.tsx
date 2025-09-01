import { FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { Field } from "react-hook-form";

type EmailInputProps = {
    label?: string,
    labelClasses?: string,
    field: Field;
    required?: boolean
}

const defaultLabelStyles = "text-sm sm:text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 mt-4"

export default function EmailInput({ label = "Email", labelClasses = defaultLabelStyles, field, required = false }: EmailInputProps) {
    return (
        <FormItem>
            <FormLabel className={labelClasses} htmlFor="email">{label}</FormLabel>
            <FormControl>
                {
                    required ? <Input id="email" type="email" className="h-10 sm:h-11 md:h-12 text-sm sm:text-base" {...field} /> : <Input id="email" type="email" className="h-10 sm:h-11 md:h-12 text-sm sm:text-base" {...field} />
                }
            </FormControl>
            <FormMessage />
        </FormItem>
    )
}
