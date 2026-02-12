import { siteConfig, pricingPageContent } from "@/lib/data";
import { notFound } from "next/navigation";
import PricingPageClient from "./pricing-client";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: pricingPageContent.title,
  description: pricingPageContent.description,
  openGraph: {
    url: '/pricing',
  },
};

export default function PricingPage() {
  if (!siteConfig.pages.pricing.enabled) {
    notFound();
  }

  // Breadcrumb structured data
  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/`
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Pricing",
        "item": `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/pricing`
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
      />
      <PricingPageClient />
    </>
  );
}
