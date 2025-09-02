'use client'

import DefaultStateContactForm from "./DefaultStateContactForm";
import SuccessStateContactForm from "./SuccessStateContactForm";
import FailureStateContactForm from "./FailureStateContactForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { postMessage } from "@/lib/postMessage";
import { contactFormSchema, ContactFormSchemaType } from "@/lib/contactSchema";

export default function ContactForm() {
    const [isSuccess, setIsSuccess] = useState(false)
    const form = useForm<ContactFormSchemaType>({
        resolver: zodResolver(contactFormSchema),
        defaultValues: {
            from_name: "Contact Form",
            subject: "",
            name: "",
            email: "",
            message: "",
            botcheck: undefined
        }
    })

    const { formState: { isSubmitSuccessful } } = form

    const onSubmit = async (data: ContactFormSchemaType) => {
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
        <Card className="min-h-fit w-full px-0 sm:px-4">
            <CardHeader>
                <CardTitle id="contact-form-title" className="text-2xl sm:text-3xl md:text-4xl my-2 sm:my-4">Contact Me</CardTitle>
                <CardDescription id="contact-form-description" className="text-base sm:text-lg">Send me a message and I&apos;ll get back to you soon</CardDescription>
            </CardHeader>
            <CardContent className="pb-8">
                {!isSubmitSuccessful && (
                    <DefaultStateContactForm onSubmit={onSubmit} form={form} />
                )}
                {isSubmitSuccessful && isSuccess && (
                    <SuccessStateContactForm form={form} />
                )}
                {isSubmitSuccessful && !isSuccess && (
                    <FailureStateContactForm form={form} />
                )}
            </CardContent>
        </Card>
    )
}
