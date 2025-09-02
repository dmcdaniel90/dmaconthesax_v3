/**------------------------------------------------------------------------------------------------
 * *                                           INFO
 * @description A date picker component that uses the react-day-picker library and React Hook Form with Shadcn UI
 * @version 1.0.0
 *------------------------------------------------------------------------------------------------**/

import { useState } from "react"
import { FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { ControllerRenderProps } from "react-hook-form"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { CalendarIcon } from "lucide-react"

type DatePickerProps = {
    label?: string
    labelClasses?: string
    field: ControllerRenderProps<any, any>
    date?: Date
}

const defaultLabelStyles = "text-sm sm:text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 mt-4"

export default function DatePicker({
    label = "Date",
    labelClasses = defaultLabelStyles,
    field,
}: DatePickerProps) {
    const [isOpen, setIsOpen] = useState(false)

    // Convert field.value to Date object if it's a string
    const selectedDate = field.value ? new Date(field.value) : undefined

    return (
        <FormItem className="flex flex-col">
            <FormLabel className={labelClasses} htmlFor="date">{label}</FormLabel>
            <Popover open={isOpen} onOpenChange={setIsOpen}>
                <PopoverTrigger asChild>
                    <FormControl>
                        <Button
                            variant="outline"
                            className={cn(
                                "cursor-pointer w-full pl-3 text-left font-normal h-10 sm:h-11 md:h-12 text-sm sm:text-base bg-background",
                                !field.value && "text-muted-foreground"
                            )}
                        >
                            {field.value ? (
                                format(selectedDate!, "PPP")
                            ) : (
                                <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                    </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={(date) => {
                            // Convert Date to ISO string for form storage
                            field.onChange(date ? date.toISOString() : undefined)
                            setIsOpen(false)
                        }}
                        disabled={(date) =>
                            date < new Date(new Date().setHours(0, 0, 0, 0))
                        }
                        initialFocus
                    />
                </PopoverContent>
            </Popover>
            <FormMessage />
        </FormItem>
    )
}
