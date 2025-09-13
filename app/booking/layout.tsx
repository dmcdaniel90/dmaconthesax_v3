import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Book Your Event",
  description: "Book DMAC on the Sax for your wedding, corporate event, or festival. Professional saxophonist with over 20 years of experience. Available worldwide.",
  keywords: ["book saxophonist", "wedding booking", "event booking", "hire saxophonist", "live music booking"],
  openGraph: {
    title: "Book Your Event | DMAC on the Sax",
    description: "Book DMAC on the Sax for your wedding, corporate event, or festival. Professional saxophonist with over 20 years of experience.",
    type: "website",
  },
  twitter: {
    title: "Book Your Event | DMAC on the Sax",
    description: "Book DMAC on the Sax for your wedding, corporate event, or festival. Professional saxophonist with over 20 years of experience.",
  },
}

export default function BookingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
