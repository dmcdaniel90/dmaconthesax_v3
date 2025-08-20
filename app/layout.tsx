import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/app/layout/Header";
import VideoBackground from "@/components/VideoBackground";
import "./globals.css";
import Head from "next/head";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next.js Musician Website Template",
  description: "Created by Devin McDaniel",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://youtube.com" />
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-foreground flex flex-col min-h-screen`}
      >
        <VideoBackground />
        <Header />
        {children}
        <footer className="flex items-center justify-center h-12 shrink-0">
          <p className="text-sm text-muted-foreground">
            Devin McDaniel Music - 2025
          </p>
        </footer>
      </body>
    </html>
  );
}
