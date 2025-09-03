import { FormControl, FormItem, FormMessage, FormLabel } from "@/components/ui/form";
import { SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Select } from "@/components/ui/select";

type LocationSelectProps = {
    label?: string
    labelClasses?: string,
    field: any;
}

const defaultLabelStyles = "text-sm sm:text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 mt-4"
export default function LocationSelect({ label = "Location", labelClasses = defaultLabelStyles, field }: LocationSelectProps) {

    return (
        <FormItem>
            <FormLabel className={labelClasses} htmlFor="location">{label}</FormLabel>
            <FormControl>
                <Select name="location" onValueChange={field.onChange} {...field}>
                    <SelectTrigger id="locationTrigger" className="h-10 sm:h-11 md:h-12 text-sm sm:text-base w-full cursor-pointer" aria-label="Select event location">
                        <SelectValue placeholder="Select Location" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem className="cursor-pointer text-sm sm:text-base" value="Swindon">Swindon</SelectItem>
                        <SelectItem className="cursor-pointer text-sm sm:text-base" value="Bath">Bath</SelectItem>
                        <SelectItem className="cursor-pointer text-sm sm:text-base" value="Bristol">Bristol</SelectItem>
                        <SelectItem className="cursor-pointer text-sm sm:text-base" value="London">London</SelectItem>
                        <SelectItem className="cursor-pointer text-sm sm:text-base" value="Brighton">Gloucester</SelectItem>
                        <SelectItem className="cursor-pointer text-sm sm:text-base" value="Manchester">Manchester</SelectItem>
                        <SelectItem className="cursor-pointer text-sm sm:text-base" value="Newcastle">Newcastle</SelectItem>
                        <SelectItem className="cursor-pointer text-sm sm:text-base" value="Nottingham">Nottingham</SelectItem>
                        <SelectItem className="cursor-pointer text-sm sm:text-base" value="Oxford">Oxford</SelectItem>
                        <SelectItem className="cursor-pointer text-sm sm:text-base" value="Other">Other (Please Specify)</SelectItem>
                    </SelectContent>
                </Select>
            </FormControl>
            <FormMessage />
        </FormItem>
    )
}
