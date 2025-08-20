import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

export const formSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters long" }),
    email: z.email(),
    date: z.string(),
    time: z.string(),
    location: z.string(),
    eventType: z.string(),
    message: z.string().min(20, { message: "Message must be at least 20 characters long" }),
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
        }
    })

    return ({
        form
    })
}
