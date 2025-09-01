/**------------------------------------------------------------------------------------------------
 * *                                           INFO
 * @description A date picker component that uses the react-day-picker library and React Hook Form with Shadcn UI
 * @version 1.0.0
 *------------------------------------------------------------------------------------------------**/

import { FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Field } from "react-hook-form";

type DatePickerProps = {
    label?: string
    labelClasses?: string
    field: Field
    date?: Date
}

const defaultLabelStyles = "text-sm sm:text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 mt-4"

export default function DatePicker({
    label = "Date",
    labelClasses = defaultLabelStyles,
    field,
}: DatePickerProps) {

    return (
        <FormItem className="flex flex-col">
            <FormLabel className={labelClasses} htmlFor="date">{label}</FormLabel>
            <FormControl>
                <Input
                    type="date"
                    name="date"
                    className="h-10 sm:h-11 md:h-12 text-sm sm:text-base bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                    {...field}
                />
            </FormControl>
            <FormMessage />
        </FormItem>
    )
}
