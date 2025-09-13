import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "DMAC on the Sax - Professional Saxophonist for Events",
  description: "Professional saxophonist for weddings, events, and festivals. Over 20 years of experience delivering unforgettable musical experiences. Based in the UK, available worldwide.",
  keywords: [
    "saxophonist",
    "wedding music",
    "event entertainment",
    "live music",
    "jazz saxophone",
    "corporate events",
    "festival music",
    "UK saxophonist",
    "professional musician",
    "DMAC on the Sax"
  ],
  openGraph: {
    title: "DMAC on the Sax - Professional Saxophonist for Events",
    description: "Professional saxophonist for weddings, events, and festivals. Over 20 years of experience delivering unforgettable musical experiences.",
    type: "website",
  },
  twitter: {
    title: "DMAC on the Sax - Professional Saxophonist for Events",
    description: "Professional saxophonist for weddings, events, and festivals. Over 20 years of experience delivering unforgettable musical experiences.",
  },
}

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
