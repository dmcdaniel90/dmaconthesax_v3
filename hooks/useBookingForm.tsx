import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

export const formSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters long" }),
    email: z.email().includes("@", { message: "Invalid email address" }),
    date: z.string({ message: "Date is required" }),
    time: z.string().optional(),
    location: z.string().optional(),
    eventType: z.string().optional(),
    message: z.string().min(20, { message: "Description of your event must be at least 20 characters long" }),
    consent: z.boolean({ message: "You must consent to our privacy policy to submit this form" })
})

export type formSchemaType = z.infer<typeof formSchema>

export function useBookingForm() {
    const form = useForm<formSchemaType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            date: "",
            time: "",
            location: "",
            eventType: "",
            message: "",
            consent: undefined
        }
    })

    return ({
        form
    })
}
