import { FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { Field } from "@/app/booking/BookingForm";

type EmailInputProps = {
    label?: string,
    labelClasses?: string,
    field: Field;
}

const defaultLabelStyles = "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 mt-4"

export default function EmailInput({ label = "Email", labelClasses = defaultLabelStyles, field }: EmailInputProps) {
    return (
        <FormItem>
            <FormLabel className={labelClasses} htmlFor="email">{label}</FormLabel>
            <FormControl>
                <Input id="email" type="email" {...field} />
            </FormControl>
            <FormMessage />
        </FormItem>
    )
}
