import AboutPageClient from "./about-client";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/data";
import { notFound } from "next/navigation";
import { aboutSectionContent } from "@/lib/data"; // Using content for metadata

export const metadata: Metadata = {
  title: aboutSectionContent.sectionTitle,
  description: aboutSectionContent.paragraphs[0], // Using the first paragraph as description
};

export default function AboutPage() {
  if (!siteConfig.pages.about.enabled) {
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
        "name": "About Us",
        "item": `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/about`
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
      />
      <AboutPageClient />
    </>
  );
}
