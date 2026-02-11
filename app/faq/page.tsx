import FaqClient from "./faq-client";
import type { Metadata } from "next";
import { faqPageContent, faqData } from "@/lib/data";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

export const metadata: Metadata = {
    title: faqPageContent.title,
    description: faqPageContent.description,
    openGraph: {
        url: '/faq',
    },
};

export default function FAQPage() {
    const breadcrumbStructuredData = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": `${BASE_URL}/`
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "FAQ",
                "item": `${BASE_URL}/faq`
            }
        ]
    };

    const faqStructuredData = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqData.map((item) => ({
            "@type": "Question",
            "name": item.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": item.answer,
            },
        })),
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
            />
            <FaqClient />
        </>
    );
}