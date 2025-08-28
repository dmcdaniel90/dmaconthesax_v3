"use server"

import z from "zod"

const formSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters long" }),
    email: z.email().includes("@", { message: "Invalid email address" }),
    date: z.string({ message: "Date is required" }),
    time: z.string().optional(),
    location: z.string().optional(),
    eventType: z.string().optional(),
    message: z.string().min(20, { message: "Description of your event must be at least 20 characters long" }),
    consent: z.boolean({ message: "You must consent to our privacy policy to submit this form" })
})

type formSchemaType = z.infer<typeof formSchema>
export async function postMessage(data: formSchemaType) {
    const validated = formSchema.safeParse(data)
    if (!validated.success) {
        console.log("Error: ", validated.error.issues)
        return {
            success: false,
            error: validated.error.issues
        }

    } else {
        console.log("Success: ", validated.data)

        return {
            success: true
        }
    }
}