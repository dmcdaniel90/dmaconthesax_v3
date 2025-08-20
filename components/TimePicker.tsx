import { Input } from "@/components/ui/input";
import { FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Field } from "react-hook-form";

type TimePickerProps = {
    label?: string,
    labelClasses?: string
    field: Field
    min?: string
    max?: string
    step?: number
}

export default function TimePicker({ label = "Time", labelClasses, field, min = "10:00", max = "23:59", step = 1800 }: TimePickerProps) {
    return (
        <FormItem className="flex flex-col">
            <FormLabel className={labelClasses} htmlFor="time">{label}</FormLabel>
            <FormControl>
                <Input
                    type="time"
                    name="time"
                    step={step}
                    min={min}
                    max={max}
                    className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                    {...field}
                />
            </FormControl>
            <FormMessage />
        </FormItem>
    )
}
