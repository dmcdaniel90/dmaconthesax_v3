'use client'

import DescriptionTextarea from "@/components/DescriptionTextarea";
import EmailInput from "@/components/EmailInput";
import NameInput from "@/components/NameInput";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { Field } from "react-hook-form";
import { UseFormReturn } from "react-hook-form";
import { ContactFormSchemaType } from "@/lib/contactSchema";

type Props = {
    onSubmit: (data: ContactFormSchemaType) => Promise<void>;
    form: UseFormReturn<ContactFormSchemaType>;
}

export default function DefaultStateContactForm({ onSubmit, form }: Props) {
    const { register, control, handleSubmit, formState: { isSubmitting } } = form

    return (
        <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} aria-labelledby="contact-form-title" aria-describedby="contact-form-description">
                {/* Hidden fields */}
                <FormField
                    render={() => <input type="checkbox" className="hidden" style={{ display: 'none' }} id="botcheck" {...register("botcheck")} />}
                    name="botcheck"
                />

                {/* Begin Form */}
                <FormField
                    control={control}
                    name="name"
                    render={({ field }) => <NameInput field={field as unknown as Field} required={true} />}
                />
                <FormField
                    control={control}
                    name="email"
                    render={({ field }) => <EmailInput field={field as unknown as Field} required={true} />}
                />
                <FormField
                    control={control}
                    name="message"
                    render={({ field }) => <DescriptionTextarea field={field as unknown as Field} placeholder="Enter your message" required={true} />}
                />
                <Button 
                    className="mt-8 mb-4 cursor-pointer w-full bg-[#02ACAC] hover:bg-[#02ACAC]/90 text-white text-base sm:text-lg px-4 sm:px-6 py-2 font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900" 
                    type="submit"
                    aria-label="Submit contact form"
                    tabIndex={0}
                >
                    {isSubmitting ? (
                        <svg
                            className="w-5 h-5 mx-auto text-white animate-spin"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            aria-hidden="true">
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
    )
}
