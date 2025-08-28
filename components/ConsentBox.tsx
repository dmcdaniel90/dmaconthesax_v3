import { FormItem, FormLabel, FormControl } from "./ui/form"
import { Checkbox } from "./ui/checkbox"
import { ControllerRenderProps, Field } from "react-hook-form"

type ConsentBoxProps = {
    labelClasses?: string
    field: ControllerRenderProps & Field
}
const defaultLabelStyles = "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
export default function ConsentBox({ labelClasses = defaultLabelStyles, field }: ConsentBoxProps) {
    return (
        <FormItem className="flex flex-col gap-6 mt-8 bg-gray-100 p-8">
            <div className="flex items-center gap-2">
                <FormControl >
                    <Checkbox
                        id="terms"
                        className="border-slate-700 cursor-pointer hover:bg-slate-400 transition-colors duration-300"
                        checked={field.value}
                        onCheckedChange={(checked) => field.onChange(checked)}
                        aria-label="I agree to the terms and conditions"
                        aria-describedby="terms"
                        aria-checked={field.value}
                    />
                </FormControl>
                <FormLabel className={labelClasses} htmlFor="terms">I agree to the terms and conditions</FormLabel>
            </div>
            <p className="text-muted-foreground text-sm">
                Your information is only used to book your event. We do not share your information with any third parties.
            </p>
        </FormItem>
    )
}
