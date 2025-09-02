'use client'
import DefaultStateBookingForm from "./DefaultStateBookingForm";
import SuccessStateBookingForm from "./SuccessStateBookingForm";
import FailureStateBookingForm from "./FailureStateBookingForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useBookingForm, formSchemaType } from "@/hooks/useBookingForm";
import { postMessage } from "@/lib/postMessage";


export default function BookingForm() {
    const { form, isSuccess, setIsSuccess } = useBookingForm()
    const { formState: { isSubmitSuccessful } } = form

    const onSubmit = async (data: formSchemaType) => {

        try {
            const res = await postMessage(data, "booking")

            if (res) {
                setIsSuccess(true)
            } else {
                throw new Error("Error in await postMessage 'BookingForm.tsx:22'")
            }
        } catch (error) {
            setIsSuccess(false)
            console.error(error)
        }
    }



    return (
        <Card className="min-h-fit w-full px-0 sm:px-4">
            <CardHeader>
                <CardTitle className="text-2xl sm:text-3xl md:text-4xl my-2 sm:my-4">Request a Quote</CardTitle>
                <CardDescription className="text-base sm:text-lg">Enter your event details and we will get back to you soon</CardDescription>
            </CardHeader>
            <CardContent className="pb-8">
                {!isSubmitSuccessful && (
                    <DefaultStateBookingForm onSubmit={onSubmit} form={form} />
                )}
                {isSubmitSuccessful && isSuccess && (
                    <SuccessStateBookingForm form={form} />
                )}

                {isSubmitSuccessful && !isSuccess && (
                    <FailureStateBookingForm form={form} />
                )}
            </CardContent>
        </Card>

    )
}
