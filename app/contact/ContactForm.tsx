'use client'

import DescriptionTextarea from "@/components/DescriptionTextarea";
import EmailInput from "../../components/EmailInput";
import NameInput from "@/components/NameInput";
import { Button } from "../../components/ui/button";
import { Form, FormField } from "../../components/ui/form";
import { Card, CardContent } from "../../components/ui/card";
import { Field } from "react-hook-form";
import { useForm } from "react-hook-form";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters long" }),
    email: z.email(),
    message: z.string().min(20, { message: "Message must be at least 20 characters long" }),
})

type formSchemaType = z.infer<typeof formSchema>

export default function ContactForm() {
    const form = useForm<formSchemaType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            message: "",
        }
    })

    function onSubmit(values: formSchemaType) {
        console.table(values)
    }

    return (
        <Card>
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
                        <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => <DescriptionTextarea field={field as unknown as Field} placeholder="Enter your message" />}

                        />
                        <Button className="mt-8 mb-4 cursor-pointer hover:bg-gray-950/60 w-full" type="submit">Submit</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}
