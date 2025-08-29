'use client'

import DescriptionTextarea from "@/components/DescriptionTextarea";
import EmailInput from "@/components/EmailInput";
import NameInput from "@/components/NameInput";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { Field } from "react-hook-form";
import { useForm } from "react-hook-form";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { postMessage } from "@/lib/postMessage";

const formSchema = z.object({
    from_name: z.string(),
    subject: z.string(),
    name: z.string().min(2, { message: "Name must be at least 2 characters long" }),
    email: z.email().includes("@", { message: "Invalid email address" }),
    message: z.string().min(20, { message: "Message must be at least 20 characters long" }),
    botcheck: z.boolean()
})

type formSchemaType = z.infer<typeof formSchema>

export default function ContactForm() {
    const [, setIsSuccess] = useState(false)
    const form = useForm<formSchemaType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            from_name: "Contact Form",
            subject: "",
            name: "",
            email: "",
            message: "",
            botcheck: undefined
        }
    })

    const { register, control, handleSubmit, formState: { isSubmitting } } = form

    const onSubmit = async (data: formSchemaType) => {

        try {
            const res = await postMessage(data, "contact")

            if (res && res.success) {
                setIsSuccess(true)
            } else {
                throw new Error("Error in await postMessage")
            }
        } catch (error) {
            setIsSuccess(false)
            console.error(error)
        }
    }

    return (
        <Card>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* Hidden fields */}
                        <FormField
                            render={() => <input type="checkbox" className="hidden" style={{ display: 'none' }} id="" {...register("botcheck")} />}
                            name="botcheck"
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
                        <FormField
                            control={control}
                            name="message"
                            render={({ field }) => <DescriptionTextarea field={field as unknown as Field} placeholder="Enter your message" />}

                        />
                        <Button className="mt-8 mb-4 cursor-pointer hover:bg-gray-950/60 w-full" type="submit">
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
                                "Submit"
                            )}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}
