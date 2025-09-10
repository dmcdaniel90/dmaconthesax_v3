import {z} from "zod"

export const eventSchema = z.object({
    eventName: z.string(),
    monthNumber: z.number(),
    day: z.number().default(1),
    year: z.number(),
    time: z.string().optional(),
    location: z.string().default("Not Listed"),
    ticketPrice: z.number().optional().default(0),
    imgSrc: z.string().optional(),
    imgAltText: z.string().optional(),
})