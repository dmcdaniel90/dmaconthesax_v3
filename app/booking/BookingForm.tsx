import DatePicker from "@/components/DatePicker";
import DescriptionTextarea from "@/components/DescriptionTextarea";
import EventSelect from "@/components/EventSelect";
import LocationSelect from "@/components/LocationSelect";
import NameInput from "@/components/NameInput";
import EmailInput from "@/components/EmailInput";
import TimePicker from "@/components/TimePicker";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field } from "react-hook-form";
import { Form, FormField } from "@/components/ui/form";
import { useBookingForm, formSchemaType } from "@/hooks/useBookingForm";

export default function BookingForm({ dateString }: { dateString: string }) {

    const { form } = useBookingForm()

    function onSubmit(values: formSchemaType) {
        console.table(values)
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-3xl">Request a Quote</CardTitle>
                <CardDescription>Enter your event details and we will get back to you soon</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} data-netlify="true">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => <NameInput field={field as unknown as Field} />}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => <EmailInput field={field as unknown as Field} />}
                        />
                        <fieldset className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="date"
                                render={({ field }) => <DatePicker field={field as unknown as Field} dateString={dateString} />}
                            />
                            <FormField
                                control={form.control}
                                name="time"
                                render={({ field }) => <TimePicker field={field as unknown as Field} />}
                            />
                        </fieldset>
                        <fieldset>
                            <FormField
                                control={form.control}
                                name="location"
                                render={({ field }) => <LocationSelect field={field as unknown as Field} />}
                            />
                            <FormField
                                control={form.control}
                                name="eventType"
                                render={({ field }) => <EventSelect field={field as unknown as Field} />}
                            />
                            <FormField
                                control={form.control}
                                name="message"
                                render={({ field }) => <DescriptionTextarea label="Describe Your Event"
                                    placeholder="Enter a description of your event"
                                    field={field as unknown as Field} />}
                            />
                        </fieldset>
                        <Button className="mt-8 mb-4 cursor-pointer hover:bg-gray-950/60 w-full" type="submit">Request a Quote</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>

    )
}
