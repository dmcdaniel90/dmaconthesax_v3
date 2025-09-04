"use server"

import z from "zod"

const bookingFormSchema = z.object({
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
    botcheck: z.boolean(),
    cc_email: z.string().optional()
})

const contactFormSchema = z.object({
    from_name: z.string(),
    subject: z.string(),
    name: z.string().min(2, { message: "Name must be at least 2 characters long" }),
    email: z.email().includes("@", { message: "Invalid email address" }),
    message: z.string().min(20, { message: "Message must be at least 20 characters long" }),
    botcheck: z.boolean()
})

type bookingFormSchemaType = z.infer<typeof bookingFormSchema>
type contactFormSchemaType = z.infer<typeof contactFormSchema>

async function callN8NWorkflow(formData: bookingFormSchemaType | contactFormSchemaType) {

    await fetch("https://n8n.devsdev.space/webhook/2f09ffd7-680d-46be-a408-6c0b1048d4fc", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
            access_key: "aa34ec7c-8d5b-4457-b1a1-0971e28a0e9b",
            ...formData
        })
    }).then(async (response) => {
        if (response.status !== 200) {
            throw new Error("Failed to call N8N workflow")
        }
    }).catch(() => {
        // Handle error silently
    })

    return {
        success: true
    }
}

export async function postMessage(formData: bookingFormSchemaType | contactFormSchemaType, type: 'booking' | 'contact') {
    let validatedData;

    if (type === "booking") {
        validatedData = bookingFormSchema.safeParse(formData)
    } else {
        validatedData = contactFormSchema.safeParse(formData)
    }

    if (!validatedData.success) {
        return {
            success: false,
            error: validatedData.error.issues
        }
    }

    try {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({
                access_key: "aa34ec7c-8d5b-4457-b1a1-0971e28a0e9b",
                ...validatedData.data
            })
        });

        // Try to parse JSON only if there is content
        let data = null;
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            data = await response.json();
        }

        if (data && data.error) {
            return {
                success: false,
                error: data.error
            };
        }

        // Fire and forget
        callN8NWorkflow(formData);

        return {
            success: true,
            error: null
        };
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : error
        };
    }
}