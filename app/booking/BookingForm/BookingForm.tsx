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
        console.log(`Submitting data: ${JSON.stringify(data)}`)

        await postMessage(data)
            .then(res => {
                if (res.success) {
                    setIsSuccess(true)
                } else {
                    setIsSuccess(false)
                }
            }).catch(err => {
                setIsSuccess(false)
                console.error(err)
            })
    }



    return (
        <Card className="h-full flex flex-col justify-center rounded-l-none rounded-br-lg px-4">
            <CardHeader>
                <CardTitle className="text-4xl my-4">Request a Quote</CardTitle>
                <CardDescription className="text-lg">Enter your event details and we will get back to you soon</CardDescription>
            </CardHeader>
            <CardContent>
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
