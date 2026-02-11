import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"
import { companyInfo, siteConfig, seoConfig } from "@/lib/data";

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),

  title: {
    default: `${companyInfo.name} | ${seoConfig.titleSuffix}`,
    template: `%s | ${companyInfo.name}`,
  },

  description: seoConfig.defaultDescription,

  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },

  openGraph: {
    title: `${companyInfo.name} | ${seoConfig.titleSuffix}`,
    description: `${companyInfo.tagline}. Discover our professional services and get a free quote today!`,
    url: '/',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: `${companyInfo.name} - ${companyInfo.tagline}`,
      },
    ],
    siteName: companyInfo.name,
    type: 'website',
    locale: 'en_US',
  },

  twitter: {
    card: 'summary_large_image',
    title: `${companyInfo.name} | ${seoConfig.titleSuffix}`,
    description: `${companyInfo.tagline}. Discover our professional services and get a free quote today!`,
    images: [
      {
        url: '/og-image.png',
        alt: `${companyInfo.name} - ${companyInfo.tagline}`,
      },
    ],
  },
};

// Build sameAs links from enabled social media
const sameAsLinks = Object.values(siteConfig.socialMedia)
  .filter((social) => social.enabled)
  .map((social) => social.href);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": companyInfo.name,
    "description": `Professional pressure washing services in ${companyInfo.serviceAreaDescription}. From house washing to driveway cleaning, we keep your property looking its best all year round.`,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": companyInfo.location.city,
      "addressRegion": companyInfo.location.state,
      "postalCode": companyInfo.location.zip,
      "streetAddress": companyInfo.location.streetAddress,
    },
    "telephone": companyInfo.phone,
    "email": companyInfo.email,
    "openingHours": companyInfo.openingHoursSchema,
    "priceRange": companyInfo.priceRange,
    "areaServed": companyInfo.serviceAreas.map((area) => ({
      "@type": "Place",
      "name": area,
    })),
    "serviceArea": companyInfo.serviceAreaDescription,
    ...(sameAsLinks.length > 0 && { "sameAs": sameAsLinks }),
  };

  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
