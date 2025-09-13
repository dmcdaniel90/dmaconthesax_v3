import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Video Gallery",
  description: "Watch videos of DMAC on the Sax live performances. See saxophone music at weddings, corporate events, festivals, and clubs. Professional musician video gallery.",
  keywords: ["saxophonist videos", "performance videos", "wedding music videos", "event videos", "live music videos", "saxophone performances"],
  openGraph: {
    title: "Video Gallery | DMAC on the Sax",
    description: "Watch videos of DMAC on the Sax live performances. See saxophone music at weddings, corporate events, festivals, and clubs.",
    type: "website",
  },
  twitter: {
    title: "Video Gallery | DMAC on the Sax",
    description: "Watch videos of DMAC on the Sax live performances. See saxophone music at weddings, corporate events, festivals, and clubs.",
  },
}

export default function VideosLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
