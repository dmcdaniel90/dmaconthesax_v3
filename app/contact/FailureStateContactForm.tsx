import { Button } from "@/components/ui/button";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
    from_name: z.string(),
    subject: z.string(),
    name: z.string().min(2, { message: "Name must be at least 2 characters long" }),
    email: z.email().includes("@", { message: "Invalid email address" }),
    message: z.string().min(20, { message: "Message must be at least 20 characters long" }),
    botcheck: z.boolean()
})

type formSchemaType = z.infer<typeof formSchema>

type Props = {
    form: UseFormReturn<formSchemaType>;
}

export default function FailureStateContactForm({ form }: Props) {
    const { reset } = form

    return (
        <div className="h-full flex flex-col items-center justify-center text-center text-black rounded-md">
            <svg
                width="97"
                height="97"
                viewBox="0 0 97 97"
                className="text-red-400"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M27.9995 69C43.6205 53.379 52.3786 44.621 67.9995 29M26.8077 29L67.9995 69M48.2189 95C42.0906 95 36.0222 93.7929 30.3604 91.4477C24.6985 89.1025 19.554 85.6651 15.2206 81.3316C10.8872 76.9982 7.44975 71.8538 5.10454 66.1919C2.75932 60.53 1.55225 54.4617 1.55225 48.3333C1.55225 42.205 2.75932 36.1366 5.10454 30.4748C7.44975 24.8129 10.8872 19.6684 15.2206 15.335C19.554 11.0016 24.6985 7.56418 30.3604 5.21896C36.0222 2.87374 42.0906 1.66667 48.2189 1.66667C60.5957 1.66667 72.4655 6.58333 81.2172 15.335C89.9689 24.0867 94.8856 35.9566 94.8856 48.3333C94.8856 60.7101 89.9689 72.58 81.2172 81.3316C72.4655 90.0833 60.5957 95 48.2189 95Z"
                    stroke="CurrentColor"
                    strokeWidth="3"
                />
            </svg>

            <h3 className="text-2xl text-red-400 py-7">
                Oops, Something went wrong!
            </h3>
            <p className="text-gray-500 md:px-3">There was a problem sending your message. Please try again later or contact me directly at <a href="mailto:contact@devinmcdaniel.com" className="underline hover:text-red-400">contact@devinmcdaniel.com</a></p>
            <Button className="mt-8 mb-4 cursor-pointer w-full bg-red-600 hover:bg-red-500/90 text-white text-base sm:text-lg px-4 sm:px-6 py-2 font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 cursor-pointer" onClick={() => reset()}>
                Try Again
            </Button>
        </div>
    )
}
