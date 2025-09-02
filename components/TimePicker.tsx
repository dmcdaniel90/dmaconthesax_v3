import { useState } from "react"
import { Input } from "@/components/ui/input"
import { FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ControllerRenderProps } from "react-hook-form"
import { cn } from "@/lib/utils"
import { Clock } from "lucide-react"

type TimePickerProps = {
    label?: string,
    labelClasses?: string
    field: ControllerRenderProps<any, any>
    min?: string
    max?: string
    step?: number
}

const defaultLabelStyles = "text-sm sm:text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 mt-4"

export default function TimePicker({ 
    label = "Time", 
    labelClasses = defaultLabelStyles, 
    field, 
    min = "10:00", 
    max = "23:59", 
    step = 1800 
}: TimePickerProps) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <FormItem className="flex flex-col">
            <FormLabel className={labelClasses} htmlFor="time">{label}</FormLabel>
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
                                field.value
                            ) : (
                                <span>Pick a time</span>
                            )}
                            <Clock className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                    </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-4" align="start">
                    <div className="space-y-4">
                        <div className="text-center">
                            <h4 className="font-medium text-sm text-muted-foreground mb-2">Select Time</h4>
                            <Input
                                type="time"
                                value={field.value || ""}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    field.onChange(e.target.value)
                                    setIsOpen(false)
                                }}
                                min={min}
                                max={max}
                                step={step}
                                className="text-center text-lg"
                            />
                        </div>
                        <div className="grid grid-cols-4 gap-2">
                            {["10:00", "12:00", "14:00", "16:00", "18:00", "20:00", "22:00"].map((time) => (
                                <Button
                                    key={time}
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                        field.onChange(time)
                                        setIsOpen(false)
                                    }}
                                    className="text-xs"
                                >
                                    {time}
                                </Button>
                            ))}
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
            <FormMessage />
        </FormItem>
    )
}
