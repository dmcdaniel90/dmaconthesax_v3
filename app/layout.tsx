import type { Metadata } from "next";
import { lato } from "@/lib/fonts";
import Header from "@/app/layout/Header";
import VideoBackground from "@/components/VideoBackground";
import PerformanceMonitor from "@/components/PerformanceMonitor";
import StickyNavSpacer from "@/components/StickyNavSpacer";
import "./globals.css";
import { HeaderProvider } from "./contexts/HeaderContext";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "DMAC on the Sax - Professional Saxophonist for Events",
    description: "Professional saxophonist for weddings, events, and festivals. Over 20 years of experience delivering unforgettable musical experiences.",
    other: {
      // Performance optimizations
      "X-DNS-Prefetch-Control": "on",
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <HeaderProvider>
      <html lang="en">
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          
          {/* Performance optimizations - DNS prefetching */}
          <link rel="dns-prefetch" href="//res.cloudinary.com" />
          <link rel="dns-prefetch" href="//www.facebook.com" />
          <link rel="dns-prefetch" href="//www.instagram.com" />
          <link rel="dns-prefetch" href="//www.youtube.com" />
          
          {/* Preconnect to external domains */}
          <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="anonymous" />
          <link rel="preconnect" href="https://www.facebook.com" crossOrigin="anonymous" />
          <link rel="preconnect" href="https://www.instagram.com" crossOrigin="anonymous" />
          <link rel="preconnect" href="https://www.youtube.com" crossOrigin="anonymous" />
          
          {/* Preload critical resources */}
          <link rel="preload" href="/logo_white.svg" as="image" type="image/svg+xml" />
          <link rel="preload" href="/logo_colored.svg" as="image" type="image/svg+xml" />
          
          {/* Preload critical images to prevent CLS */}
          <link rel="preload" href="https://res.cloudinary.com/dllh8yqz8/image/upload/w_400,h_500,q_auto,f_auto/cruises_001_x335rh" as="image" />
          <link rel="preload" href="https://res.cloudinary.com/dllh8yqz8/image/upload/w_400,h_500,q_auto,f_auto/sticker_007_wcvnkt" as="image" />
          
          {/* Performance meta tags */}
          <meta name="theme-color" content="#02ACAC" />
          <meta name="color-scheme" content="dark" />
        </head>
        <body
          className={`${lato.variable} antialiased bg-gradient-to-br from-gray-900/90 via-gray-800/80 to-gray-900/95 min-h-screen flex flex-col`}
          suppressHydrationWarning={true} // Suppress hydration warnings caused by browser extensions
        >
          <VideoBackground />
          <Header />
          <StickyNavSpacer />
          <main className="landscape-mobile-content">
            {children}
          </main>
          {process.env.NODE_ENV === 'development' && <PerformanceMonitor />}
          {/* 100% privacy-first analytics */}
        <script async src="https://scripts.simpleanalyticscdn.com/latest.js"></script>
        </body>
      </html>
    </HeaderProvider>
  );
}
