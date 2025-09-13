import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Photo Gallery",
  description: "Browse photos from DMAC on the Sax performances. See live saxophone music at weddings, corporate events, festivals, and clubs. Professional musician photo gallery.",
  keywords: ["saxophonist photos", "performance photos", "wedding music photos", "event photos", "live music gallery", "saxophone performances"],
  openGraph: {
    title: "Photo Gallery | DMAC on the Sax",
    description: "Browse photos from DMAC on the Sax performances. See live saxophone music at weddings, corporate events, festivals, and clubs.",
    type: "website",
  },
  twitter: {
    title: "Photo Gallery | DMAC on the Sax",
    description: "Browse photos from DMAC on the Sax performances. See live saxophone music at weddings, corporate events, festivals, and clubs.",
  },
}

export default function PhotosLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
