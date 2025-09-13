import type { Metadata } from "next";
import { lato } from "@/lib/fonts";
import Header from "@/app/layout/Header";
import VideoBackground from "@/components/VideoBackground";
import PerformanceMonitor from "@/components/PerformanceMonitor";
import StickyNavSpacer from "@/components/StickyNavSpacer";
import "./globals.css";
import { HeaderProvider } from "./contexts/HeaderContext";

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://devinmcdaniel.com';
  
  return {
    title: {
      default: "DMAC on the Sax - Professional Saxophonist for Events",
      template: "%s | DMAC on the Sax"
    },
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
    authors: [{ name: "Devin McDaniel" }],
    creator: "Devin McDaniel",
    publisher: "DMAC on the Sax",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: 'website',
      locale: 'en_GB',
      url: baseUrl,
      siteName: 'DMAC on the Sax',
      title: 'DMAC on the Sax - Professional Saxophonist for Events',
      description: 'Professional saxophonist for weddings, events, and festivals. Over 20 years of experience delivering unforgettable musical experiences.',
      images: [
        {
          url: `${baseUrl}/sax_portrait_1.jpg`,
          width: 1200,
          height: 630,
          alt: 'DMAC on the Sax - Professional Saxophonist',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'DMAC on the Sax - Professional Saxophonist for Events',
      description: 'Professional saxophonist for weddings, events, and festivals. Over 20 years of experience delivering unforgettable musical experiences.',
      images: [`${baseUrl}/sax_portrait_1.jpg`],
      creator: '@dmcdaniel9',
    },
    alternates: {
      canonical: baseUrl,
    },
    other: {
      // Performance optimizations
      "X-DNS-Prefetch-Control": "on",
      // Additional SEO
      "geo.region": "GB",
      "geo.placename": "Swindon, Wiltshire",
      "geo.position": "51.5558;-1.7797",
      "ICBM": "51.5558, -1.7797",
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
          
          {/* Preload critical images to prevent CLS - moved to specific pages that use them */}
          
          {/* Performance meta tags */}
          <meta name="theme-color" content="#02ACAC" />
          <meta name="color-scheme" content="dark" />
          
          {/* Structured Data - JSON-LD */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Person",
                "name": "Devin McDaniel",
                "alternateName": "DMAC on the Sax",
                "description": "Professional saxophonist for weddings, events, and festivals with over 20 years of experience",
                "url": "https://devinmcdaniel.com",
                "image": "https://devinmcdaniel.com/sax_portrait_1.jpg",
                "sameAs": [
                  "https://www.instagram.com/dmaconthesax",
                  "https://www.youtube.com/@dmcdaniel9",
                  "https://www.facebook.com/dmaconthesax"
                ],
                "jobTitle": "Professional Saxophonist",
                "worksFor": {
                  "@type": "Organization",
                  "name": "DMAC on the Sax"
                },
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "Swindon",
                  "addressRegion": "Wiltshire",
                  "addressCountry": "GB"
                },
                "telephone": "+447359142634",
                "email": "dmcdaniel9@gmail.com",
                "knowsAbout": [
                  "Saxophone Performance",
                  "Wedding Music",
                  "Event Entertainment",
                  "Jazz Music",
                  "Live Music Performance"
                ],
                "hasOccupation": {
                  "@type": "Occupation",
                  "name": "Professional Saxophonist",
                  "description": "Live saxophone performance for weddings, corporate events, festivals, and private parties"
                }
              })
            }}
          />
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
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var script = document.createElement('script');
                script.async = true;
                script.src = 'https://scripts.simpleanalyticscdn.com/latest.js';
                script.onerror = function() {
                  if (typeof console !== 'undefined' && console.warn) {
                    console.warn('Simple Analytics script blocked by ad blocker - this is expected behavior');
                  }
                };
                script.onload = function() {
                  if (typeof console !== 'undefined' && console.log && ${process.env.NODE_ENV === 'development' ? 'true' : 'false'}) {
                    console.log('Simple Analytics loaded successfully');
                  }
                };
                document.head.appendChild(script);
              })();
            `
          }}
        />
        </body>
      </html>
    </HeaderProvider>
  );
}
