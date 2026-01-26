import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { services, companyInfo } from "@/lib/data"
import { ServicePageContent } from "@/components/ServicePageContent"

interface ServiceDetailPageProps {
  params: { slug: string }
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
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/services/${service.id}`,
      images: [
        {
          url: service.image, // Assuming service.image is a full URL or can be relative to base URL
          alt: service.title,
        },
      ],
      type: "website",
    },
    // Add more meta tags as needed, e.g., Twitter cards
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
      "name": "PowerWash Pro's"
    },
    "description": service.description,
    "offers": {
      "@type": "Offer",
      "priceSpecification": {
        "@type": "PriceSpecification",
        "priceCurrency": "USD",
        "price": service.price.replace(/[^\d]/g, '') // Extract numeric price
      }
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceStructuredData) }}
      />
      <ServicePageContent
        service={service}
        prevService={prevService}
        nextService={nextService}
      />
    </>
  )
}
