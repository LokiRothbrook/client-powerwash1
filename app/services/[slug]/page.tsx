import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { services, companyInfo } from "@/lib/data"
import { ServicePageContent } from "@/components/ServicePageContent"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

interface ServiceDetailPageProps {
  params: { slug: string }
}

export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.id,
  }));
}

export async function generateMetadata({
  params,
}: ServiceDetailPageProps): Promise<Metadata> {
  const { slug: resolvedSlug } = await params
  const service = services.find((s) => s.id === resolvedSlug)

  if (!service) {
    return {};
  }

  const title = service.title;
  const description = service.description;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/services/${service.id}`,
      images: [
        {
          url: service.image,
          alt: service.title,
        },
      ],
    },
  }
}

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const { slug: resolvedSlug } = await params
  const service = services.find((s) => s.id === resolvedSlug)
  const currentIndex = services.findIndex((s) => s.id === resolvedSlug)
  const prevService = currentIndex > 0 ? services[currentIndex - 1] : null
  const nextService = currentIndex < services.length - 1 ? services[currentIndex + 1] : null

  if (!service) {
    notFound()
  }

  // Service structured data
  const serviceStructuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": service.title,
    "provider": {
      "@type": "LocalBusiness",
      "name": companyInfo.name,
    },
    "description": service.description,
    "offers": {
      "@type": "Offer",
      "priceSpecification": {
        "@type": "PriceSpecification",
        "priceCurrency": "USD",
        "price": service.price.replace(/[^\d]/g, '')
      }
    }
  };

  // Breadcrumb structured data
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
        "name": "Services",
        "item": `${BASE_URL}/services`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": service.title,
        "item": `${BASE_URL}/services/${service.id}`
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceStructuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
      />
      <ServicePageContent
        service={service}
        prevService={prevService}
        nextService={nextService}
      />
    </>
  )
}
