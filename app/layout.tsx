import type { Metadata } from "next";
import { lato } from "@/lib/fonts";
import Header from "@/app/layout/Header";
import VideoBackground from "@/components/VideoBackground";
import "./globals.css";
import Head from "next/head";
import { HeaderProvider } from "./contexts/HeaderContext";

const metadata: Metadata = {
  title: "DMAC on the Sax - Professional Saxophonist for Events",
  description: "Professional saxophonist for weddings, events, and festivals. Over 20 years of experience delivering unforgettable musical experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <HeaderProvider>
      <html lang="en">
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="preconnect" href="https://youtube.com" />
        </Head>
        <body
          className={`${lato.variable} antialiased bg-gradient-to-br from-gray-900/90 via-gray-800/80 to-gray-900/95 min-h-screen flex flex-col`}
        >
          <VideoBackground />
          <Header />
          <main className="landscape-mobile-content">
            {children}
          </main>
        </body>
      </html>
    </HeaderProvider>
  );
}
