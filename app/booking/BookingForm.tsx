'use client'

import DatePicker from "@/components/DatePicker";
import DescriptionTextarea from "@/components/DescriptionTextarea";
import EventSelect from "@/components/EventSelect";
import LocationSelect from "@/components/LocationSelect";
import NameInput from "@/components/NameInput";
import EmailInput from "@/components/EmailInput";
import TimePicker from "@/components/TimePicker";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ControllerRenderProps, Field } from "react-hook-form";
import { Form, FormField } from "@/components/ui/form";
import { useBookingForm, formSchemaType } from "@/hooks/useBookingForm";
import ConsentBox from "@/components/ConsentBox";
import { postMessage } from "@/lib/postMessage";


export default function BookingForm({ date }: { date?: Date }) {
    const { form } = useBookingForm()

    const onSubmit = async (data: formSchemaType) => {
        // const res = await fetch('/booking/api', {
        //     method: 'POST',
        //     body: JSON.stringify(data)
        // })

        // if (res.ok) {
        //     console.log(res)
        // }

        const res = await postMessage(data)
        console.log(res)
    }

    return (
        <Card className="rounded-l-none rounded-br-lg px-4">
            <CardHeader>
                <CardTitle className="text-4xl my-4">Request a Quote</CardTitle>
                <CardDescription className="text-lg">Enter your event details and we will get back to you soon</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} name="booking-form" className="flex flex-col gap-y-4 max-h-[1000px]">
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
                                render={({ field }) => <DatePicker field={field as unknown as Field} date={date} />}
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

                        <FormField
                            control={form.control}
                            name="consent"
                            render={({ field }) => <ConsentBox field={field as unknown as ControllerRenderProps & Field} />}
                        />
                        <Button className="mt-8 mb-4 cursor-pointer hover:bg-gray-950/60 w-full" type="submit">Request a Quote</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>

    )
}
