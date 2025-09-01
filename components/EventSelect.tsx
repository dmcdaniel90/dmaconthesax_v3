import { FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Select } from "@/components/ui/select";


type EventSelectProps = {
    label?: string
    labelClasses?: string
    field: any
}

const defaultLabelStyles = "text-sm sm:text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 mt-4"


export default function EventSelect({ label = "Event Type", labelClasses = defaultLabelStyles, field }: EventSelectProps) {

    return (
        <FormItem>
            <FormLabel className={labelClasses} htmlFor="eventType">{label}</FormLabel>
            <FormControl>
                <Select name="eventType" onValueChange={field.onChange} {...field}>
                    <SelectTrigger id="eventtypeTrigger" className="h-10 sm:h-11 md:h-12 text-sm sm:text-base w-full cursor-pointer">
                        <SelectValue placeholder="Select Event Type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem className="cursor-pointer text-sm sm:text-base" value="Wedding">Wedding</SelectItem>
                        <SelectItem className="cursor-pointer text-sm sm:text-base" value="Birthday">Birthday</SelectItem>
                        <SelectItem className="cursor-pointer text-sm sm:text-base" value="Anniversary">Anniversary</SelectItem>
                        <SelectItem className="cursor-pointer text-sm sm:text-base" value="Corporate Event">Corporate Event</SelectItem>
                        <SelectItem className="cursor-pointer text-sm sm:text-base" value="Festival">Festival</SelectItem>
                        <SelectItem className="cursor-pointer text-sm sm:text-base" value="Other">Other (Please Specify)</SelectItem>
                    </SelectContent>
                </Select>
            </FormControl>
            <FormMessage />
        </FormItem>
    )
}
