/**------------------------------------------------------------------------------------------------
 * *                                           INFO
 * @description A date picker component that uses the react-day-picker library and React Hook Form with Shadcn UI
 * @version 1.0.0
 *------------------------------------------------------------------------------------------------**/

import { useState, useEffect } from "react"
import { FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
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

// Utility function to detect mobile devices and native picker support
const isMobileDevice = () => {
    if (typeof window === 'undefined') return false
    
    const userAgent = navigator.userAgent
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)
    
    // Only use native picker on actual mobile devices, not desktop with touch
    return isMobile
}

export default function DatePicker({
    label = "Date",
    labelClasses = defaultLabelStyles,
    field,
}: DatePickerProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        // Check if device supports native date picker
        const checkMobileSupport = () => {
            setIsMobile(isMobileDevice())
        }

        checkMobileSupport()
        window.addEventListener('resize', checkMobileSupport)
        
        return () => window.removeEventListener('resize', checkMobileSupport)
    }, [])

    // Convert field.value to Date object if it's a string
    const selectedDate = field.value ? new Date(field.value) : undefined

    // Native mobile date picker
    if (isMobile) {
        return (
            <FormItem className="flex flex-col">
                <FormLabel className={labelClasses} htmlFor="date">{label}</FormLabel>
                <FormControl>
                    <Input
                        type="date"
                        value={field.value ? format(selectedDate!, "yyyy-MM-dd") : ""}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            const date = e.target.value ? new Date(e.target.value) : undefined
                            field.onChange(date ? date.toISOString() : undefined)
                        }}
                        min={new Date().toISOString().split('T')[0]} // Today as minimum date
                        className="h-10 sm:h-11 md:h-12 text-sm sm:text-base cursor-pointer"
                        id="date"
                        // Mobile-specific attributes for better UX
                        autoComplete="off"
                        inputMode="none"
                    />
                </FormControl>
                <FormMessage />
            </FormItem>
        )
    }

    // Desktop custom calendar picker
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
