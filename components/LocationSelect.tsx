import { FormControl, FormItem, FormMessage, FormLabel } from "@/components/ui/form";
import { SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Select } from "@/components/ui/select";

type LocationSelectProps = {
    label?: string
    labelClasses?: string,
    field: any;
}

export default function LocationSelect({ label, labelClasses, field }: LocationSelectProps) {

    return (
        <FormItem>
            <FormLabel className={labelClasses} htmlFor="location">{label}</FormLabel>
            <FormControl>
                <Select name="location" onValueChange={field.onChange} {...field}>
                    <SelectTrigger id="locationTrigger" className="w-full cursor-pointer">
                        <SelectValue placeholder="Select Location" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem className="cursor-pointer" value="Swindon">Swindon</SelectItem>
                        <SelectItem className="cursor-pointer" value="Bath">Bath</SelectItem>
                        <SelectItem className="cursor-pointer" value="Bristol">Bristol</SelectItem>
                        <SelectItem className="cursor-pointer" value="London">London</SelectItem>
                        <SelectItem className="cursor-pointer" value="Brighton">Gloucester</SelectItem>
                        <SelectItem className="cursor-pointer" value="Manchester">Manchester</SelectItem>
                        <SelectItem className="cursor-pointer" value="Newcastle">Newcastle</SelectItem>
                        <SelectItem className="cursor-pointer" value="Nottingham">Nottingham</SelectItem>
                        <SelectItem className="cursor-pointer" value="Oxford">Oxford</SelectItem>
                        <SelectItem className="cursor-pointer" value="Other">Other (Please Specify)</SelectItem>
                    </SelectContent>
                </Select>
            </FormControl>
            <FormMessage />
        </FormItem>
    )
}
