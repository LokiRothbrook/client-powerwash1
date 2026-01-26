import { siteConfig, galleryPageContent } from "@/lib/data";
import { notFound } from "next/navigation";
import GalleryPageClient from "./gallery-client";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: galleryPageContent.title,
  description: galleryPageContent.description,
};

export default function GalleryPage() {
  if (!siteConfig.pages.gallery.enabled) {
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
        "name": "Gallery",
        "item": `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/gallery`
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
      />
      <GalleryPageClient />
    </>
  );
}
