import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Gallery & Media",
  description: "Explore photos and videos of DMAC on the Sax performances. See live saxophone music at weddings, corporate events, festivals, and clubs. Professional musician gallery.",
  keywords: ["saxophonist gallery", "live music photos", "performance videos", "wedding music gallery", "event photos", "saxophone performances"],
  openGraph: {
    title: "Gallery & Media | DMAC on the Sax",
    description: "Explore photos and videos of DMAC on the Sax performances. See live saxophone music at weddings, corporate events, festivals, and clubs.",
    type: "website",
  },
  twitter: {
    title: "Gallery & Media | DMAC on the Sax",
    description: "Explore photos and videos of DMAC on the Sax performances. See live saxophone music at weddings, corporate events, festivals, and clubs.",
  },
}

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
