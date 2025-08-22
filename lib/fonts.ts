import { Playfair_Display, Lato } from "next/font/google";

export const playfairDisplay = Playfair_Display({
    variable: "--font-heading",
    subsets: ["latin"],
    weight: ["400", "700"],
    style: "italic",
});
export const lato = Lato({
    weight: ["400", "700"],
    variable: "--font-body",
    subsets: ["latin"],
});