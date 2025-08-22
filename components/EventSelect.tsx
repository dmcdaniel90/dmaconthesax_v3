import { FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Select } from "@/components/ui/select";


type EventSelectProps = {
    label?: string
    labelClasses?: string
    field: any
}

const defaultLabelStyles = "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 mt-4"


export default function EventSelect({ label = "Event Type", labelClasses = defaultLabelStyles, field }: EventSelectProps) {

    return (
        <FormItem>
            <FormLabel className={labelClasses} htmlFor="eventType">{label}</FormLabel>
            <FormControl>
                <Select name="eventType" onValueChange={field.onChange} {...field}>
                    <SelectTrigger id="eventtypeTrigger" className="w-full cursor-pointer">
                        <SelectValue placeholder="Select Event Type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem className="cursor-pointer" value="Wedding">Wedding</SelectItem>
                        <SelectItem className="cursor-pointer" value="Birthday">Birthday</SelectItem>
                        <SelectItem className="cursor-pointer" value="Anniversary">Anniversary</SelectItem>
                        <SelectItem className="cursor-pointer" value="Corporate Event">Corporate Event</SelectItem>
                        <SelectItem className="cursor-pointer" value="Festival">Festival</SelectItem>
                        <SelectItem className="cursor-pointer" value="Other">Other (Please Specify)</SelectItem>
                    </SelectContent>
                </Select>
            </FormControl>
            <FormMessage />
        </FormItem>
    )
}
