import { Button } from "@/components/ui/button";
import ConsentBox from "@/components/ConsentBox";
import DatePicker from "@/components/DatePicker";
import DescriptionTextarea from "@/components/DescriptionTextarea";
import EmailInput from "@/components/EmailInput";
import EventSelect from "@/components/EventSelect";
import LocationSelect from "@/components/LocationSelect";
import NameInput from "@/components/NameInput";
import TimePicker from "@/components/TimePicker";
import { Form, FormField } from "@/components/ui/form";
import { Field, ControllerRenderProps, UseFormReturn } from "react-hook-form";
import { formSchemaType } from "@/hooks/useBookingForm";


type DefaultStateBookingFormProps = {
    onSubmit: (data: formSchemaType) => void;
    form: UseFormReturn<formSchemaType>;
}

export default function DefaultStateBookingForm({ onSubmit, form }: DefaultStateBookingFormProps) {

    const { formState: { isSubmitting }, register, handleSubmit, control } = form

    return (
        <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} name="booking-form" className="flex flex-col gap-y-4">
                {/* Hidden fields */}
                <FormField
                    control={control}
                    render={() => <input type="hidden" {...register("subject")} />}
                    name="subject"
                />
                <FormField
                    control={control}
                    render={() => <input type="hidden" {...register("from_name")} />}
                    name="from_name"
                />
                <FormField
                    render={() => <input type="checkbox" className="hidden" style={{ display: 'none' }} id="" {...register("botcheck")} />} name="botcheck"
                />
                <FormField
                    render={() => <input type="hidden" {...register("cc_email")} value={"dmcdaniel9@gmail.com"} />} name="ccemail"
                />

                {/* Begin Form */}
                <FormField
                    control={control}
                    name="name"
                    render={({ field }) => <NameInput field={field as unknown as Field} />}
                />
                <FormField
                    control={control}
                    name="email"
                    render={({ field }) => <EmailInput field={field as unknown as Field} />}
                />
                <fieldset className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                    <FormField
                        control={control}
                        name="date"
                        render={({ field }) => <DatePicker field={field as unknown as ControllerRenderProps} />}
                    />
                    <FormField
                        control={control}
                        name="time"
                        render={({ field }) => <TimePicker field={field as unknown as ControllerRenderProps} />}
                    />
                </fieldset>

                <fieldset>
                    <FormField
                        control={control}
                        name="location"
                        render={({ field }) => <LocationSelect field={field as unknown as Field} />}
                    />
                    <FormField
                        control={control}
                        name="eventType"
                        render={({ field }) => <EventSelect field={field as unknown as Field} />}
                    />
                    <FormField
                        control={control}
                        name="message"
                        render={({ field }) => <DescriptionTextarea label="Describe Your Event"
                            placeholder="Enter a description of your event"
                            field={field as unknown as Field} />}
                    />
                </fieldset>

                <FormField
                    control={control}
                    name="consent"
                    render={({ field }) => <ConsentBox field={field as unknown as ControllerRenderProps & Field} />}
                />
                <Button className="mt-6 sm:mt-8 mb-4 sm:mb-6 cursor-pointer w-full bg-[#02ACAC] hover:bg-[#02ACAC]/90 text-white text-base sm:text-lg px-4 sm:px-6 py-2 font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 cursor-pointer" type="submit">
                    {isSubmitting ? (
                        <svg
                            className="w-5 h-5 mx-auto text-white animate-spin"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24">
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    ) : (
                        "Request a Quote"
                    )}
                </Button>
            </form>
        </Form>
    )
}
