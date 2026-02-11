"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import Image from "next/image"
import { ArrowRight, CheckCircle } from "lucide-react"
import { services, servicesPageContent } from "@/lib/data"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CtaSection } from "@/components/sections/cta"

export default function ServicesClient() {
  return (
    <>
      <Header />
      <main className="pt-15">
        {/* Hero Section */}
        <section className="relative p-5 overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 water-pattern" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-primary/5 to-accent/10" />
          <motion.div
            className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[150px]"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 10, repeat: Infinity }}
          />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl sm:text-6xl font-bold mb-6"
            >
              <span className="gradient-text">{servicesPageContent.title}</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-muted-foreground max-w-2xl mx-auto"
            >
              {servicesPageContent.subtitle}
            </motion.p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {services.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-lg text-muted-foreground">We are currently updating our service offerings. Please check back later.</p>
              </div>
            ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {services.map((service) => (
                <Link href={`/services/${service.id}`} key={service.id} className="group block h-full">
                  <div className="relative h-full rounded-2xl glass-card hover:border-primary/50 transition-all duration-500 overflow-hidden">
                    <div className="relative w-full h-48 skeleton-shimmer">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <motion.div
                        className="absolute bottom-8 right-8 px-4 py-2 rounded-xl glass shadow-lg"
                        animate={{ y: [0, 5, 0], rotate: [0, -2, 0] }}
                        transition={{ duration: 6, repeat: Infinity, delay: 1 }}
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{service.price}</span>
                        </div>
                      </motion.div>
                    </div>
                    <div className="p-8">
                      <h2 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                        {service.title}
                      </h2>
                      <p className="text-muted-foreground mb-6">
                        {service.description}
                      </p>
                      <ul className="space-y-2 mb-6">
                        {service.features.slice(0, 3).map((feature) => (
                          <li key={feature} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="flex items-center text-primary font-medium group-hover:gap-3 gap-2 transition-all">
                        <span>Learn More</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  </div>
                </Link>
              ))}
            </div>
            )}
          </div>
        </section>
        {/* CTA Section */}
        <CtaSection />
      </main>
      <Footer />
    </>
  )
}
