import type { Metadata } from "next";
import { lato } from "@/lib/fonts";
import Header from "@/app/layout/Header";
import VideoBackground from "@/components/VideoBackground";
import "./globals.css";
import Head from "next/head";
import { HeaderProvider } from "./contexts/HeaderContext";

export const metadata: Metadata = {
  title: "DMAC on the Sax - Private Saxophonist",
  description: "DMAC on the Sax is a professional saxophonist and music educator. He is a highly skilled musician who brings his passion for music to life in the studio and in the classroom.",

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
          className={`${lato.variable}  antialiased bg-foreground flex flex-col min-h-screen`}
        >
          <VideoBackground />
          <Header />
          {children}
        </body>
      </html>
    </HeaderProvider>
  );
}
