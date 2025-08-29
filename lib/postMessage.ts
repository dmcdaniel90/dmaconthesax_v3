"use server"

import z from "zod"

const formSchema = z.object({
    from_name: z.string(),
    subject: z.string(),
    name: z.string().min(2, { message: "Name must be at least 2 characters long" }),
    email: z.email().includes("@", { message: "Invalid email address" }),
    date: z.string({ message: "Date is required" }),
    time: z.string().optional(),
    location: z.string().optional(),
    eventType: z.string().optional(),
    message: z.string().min(20, { message: "Description of your event must be at least 20 characters long" }),
    consent: z.boolean({ message: "You must consent to our privacy policy to submit this form" }),
    bot_check: z.boolean(),
    cc_email: z.string().optional()
})

type formSchemaType = z.infer<typeof formSchema>
export async function postMessage(data: formSchemaType) {
    let returnData;
    const validatedData = formSchema.safeParse(data)
    if (!validatedData.success) {
        console.log("Error: ", validatedData.error.issues)
        return {
            success: false,
            error: validatedData.error.issues
        }

    } else {
        await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({
                access_key: "aa34ec7c-8d5b-4457-b1a1-0971e28a0e9b",
                subject: validatedData.data.subject,
                from_name: validatedData.data.from_name,
                name: validatedData.data.name,
                email: validatedData.data.email,
                date: validatedData.data.date,
                time: validatedData.data.time,
                location: validatedData.data.location,
                eventType: validatedData.data.eventType,
                message: validatedData.data.message,
                consent: validatedData.data.consent,
                bot_check: validatedData.data.bot_check,
                cc_email: validatedData.data.cc_email
            })
        })
            .then(async (response) => {
                const data = await response.json()
                if (response.status !== 200) {
                    throw (
                        data.error ||
                        new Error(`Request failed with status ${response.status}`)
                    )
                }
                returnData = data
            })
            .catch((error) => {
                console.log(error)
            })

        return {
            success: true,
            error: null,
            data: returnData as any
        }
    }
}