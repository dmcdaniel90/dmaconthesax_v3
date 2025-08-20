import { FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Field } from "react-hook-form";

type NameInputProps = {
    label?: string
    labelClasses?: string
    field: Field
}

const defaultLabelStyles = "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 mt-4"

export default function NameInput({ label = "Name", labelClasses = defaultLabelStyles, field }: NameInputProps) {
    return (
        <FormItem>
            <FormLabel className={labelClasses} htmlFor="name">{label}</FormLabel>
            <FormControl>
                <Input id="name" {...field} />
            </FormControl>
            <FormMessage />
        </FormItem>
    )
}
