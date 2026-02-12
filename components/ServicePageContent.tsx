"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Phone,
  Star,
} from "lucide-react"
import { services, siteConfig, companyInfo } from "@/lib/data"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { CtaSection } from "@/components/sections/cta"
import { getIcon } from "@/lib/icon-map"

interface ServicePageContentProps {
  service: Omit<typeof services[number], 'icon'> & { iconName: string };
  prevService: Omit<typeof services[number], 'icon'> & { iconName: string } | null;
  nextService: Omit<typeof services[number], 'icon'> & { iconName: string } | null;
}

export function ServicePageContent({ service, prevService, nextService }: ServicePageContentProps) {
  const ServiceIcon = getIcon(service.iconName)

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
        "name": "Services",
        "item": `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/services`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": service.title,
        "item": `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/services/${service.id}`
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
      />
      <Header />
      <main className="pt-15">
        {/* Hero Section */}
        <section className="relative p-5 overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 water-pattern" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-primary/5 to-accent/10" />
          <motion.div
            className="absolute top-20 right-20 w-[400px] h-[400px] rounded-full bg-primary/10 blur-[120px]"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-20 left-20 w-[300px] h-[300px] rounded-full bg-accent/10 blur-[100px]"
            animate={{ scale: [1.2, 1, 1.2] }}
            transition={{ duration: 10, repeat: Infinity }}
          />

          <div className="relative z-10 max-w-7xl mx-auto pt-5 px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Services
              </Link>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Content */}
              <div>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
                >
                  <span className="gradient-text">{service.title}</span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-xl text-muted-foreground mb-8"
                >
                  {service.description}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center gap-6 mb-8"
                >
                  <div className="text-3xl font-bold text-primary text-center">{service.price}</div>
                  {siteConfig.showStarsOnServicePage && (
                    <div className="flex items-center gap-1 text-accent">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} className="w-5 h-5 fill-current" />
                      ))}
                      <span className="ml-2 text-sm text-muted-foreground">5.0 (120+ reviews)</span>
                    </div>
                  )}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <Button asChild size="lg" className="glow-blue">
                    <Link href="/#contact">
                      Get Free Quote
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Link>
                  </Button>
                  <Button asChild size="lg">
                    <motion.a
                      href={`tel:${companyInfo.phone.replace(/[^0-9]/g, "")}`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <motion.div
                        animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
                      >
                        <Phone className="w-5 h-5 mr-2" />
                      </motion.div>
                      Call Now
                    </motion.a>
                  </Button>
                </motion.div>
              </div>

              {/* Visual */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="relative"
              >
                <div className="aspect-square rounded-3xl bg-gradient-to-br from-primary/20 to-accent/20 p-8 relative overflow-hidden border border-primary skeleton-shimmer">
                  <Image src={service.image} alt={service.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />

                  {/* Floating Elements */}
                  <motion.div
                    className="absolute top-8 right-8 px-4 py-2 rounded-xl glass shadow-lg"
                    animate={{ y: [0, -5, 0], rotate: [0, 2, 0] }}
                    transition={{ duration: 5, repeat: Infinity }}
                  >
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-primary" />
                      <span className="font-medium">Licensed & Insured</span>
                    </div>
                  </motion.div>

                  <motion.div
                    className="absolute bottom-8 left-8 px-4 py-2 rounded-xl glass shadow-lg"
                    animate={{ y: [0, 5, 0], rotate: [0, -2, 0] }}
                    transition={{ duration: 6, repeat: Infinity, delay: 1 }}
                  >
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 text-accent fill-current" />
                      <span className="font-medium">100% Satisfaction</span>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 water-pattern opacity-50" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                <span className="gradient-text">What&apos;s Included</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our {service.title.toLowerCase()} service includes everything you need
                for a beautifully clean property.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {service.features.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 rounded-2xl glass-card hover:border-primary/30 transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary transition-colors">
                    <CheckCircle className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <h3 className="font-semibold mb-2">{feature}</h3>
                  <p className="text-sm text-muted-foreground">
                    Professional service with attention to detail and quality results.
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                <span className="gradient-text">How It Works</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Getting started is easy. Here&apos;s our simple process.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                { step: 1, title: "Request Quote", description: "Fill out our quick form or give us a call" },
                { step: 2, title: "Free Assessment", description: "We'll evaluate your property and needs" },
                { step: 3, title: "Get Your Quote", description: "Receive a detailed, no-obligation estimate" },
                { step: 4, title: "Enjoy Results", description: "Sit back while we transform your property" },
              ].map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative text-center"
                >
                  {index < 3 && (
                    <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-gradient-to-r from-primary/50 to-primary/10" />
                  )}
                  <div className="relative z-10 w-16 h-16 rounded-2xl bg-primary flex items-center justify-center text-2xl font-bold text-primary-foreground mx-auto mb-4 glow-blue">
                    {item.step}
                  </div>
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        {/* CTA Section */}
        <CtaSection />
      </main>
      <Footer />
    </>
  )
}
