import FaqClient from "./faq-client";
import type { Metadata } from "next";
import { faqPageContent } from "@/lib/data";

export const metadata: Metadata = {
    title: faqPageContent.title,
    description: faqPageContent.description,
};

export default function FAQPage() {
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
            "name": "FAQ",
            "item": `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/faq`
        }
        ]
    };

    return (
        <>
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
        />
        <FaqClient />
        </>
    );
}