"use client"

import * as React from "react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { services, servicesSectionContent } from "@/lib/data"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export function ServicesSection() {
  const ref = React.useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="services" className="relative py-24 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 water-pattern" />
      <motion.div
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[100px]"
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-bold mb-4"
          >
            <span className="gradient-text">{servicesSectionContent.title}</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            {servicesSectionContent.subtitle}
          </motion.p>
        </div>

        {/* Services Grid */}
        {(() => {
          const displayedServices = services.slice(0, 6);
          const count = displayedServices.length;

          if (count === 0) {
            return (
              <div className="text-center py-16">
                <p className="text-lg text-muted-foreground">We are currently updating our service offerings. Please check back later.</p>
              </div>
            );
          }

          return (
            <div className="flex flex-wrap justify-center gap-6">
              {displayedServices.map((service, index) => (
                <React.Fragment key={service.id}>
                  {count === 4 && index === 2 && (
                    <div className="hidden lg:block lg:basis-full lg:h-0 lg:-my-3" aria-hidden="true" />
                  )}
                  <motion.div
                    className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                  <Link href={`/services/${service.id}`} className="group block h-full">
                    <div className="relative h-full rounded-2xl glass-card hover:border-primary/50 transition-all duration-300 overflow-hidden">
                      {/* Hover Glow */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      {/* Image */}
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="relative w-full h-32 skeleton-shimmer"
                      >
                        <Image
                          src={service.image}
                          alt={service.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </motion.div>

                      {/* Content */}
                      <div className="p-6">
                        <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                          {service.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          {service.shortDescription}
                        </p>

                        {/* Price & Arrow */}
                        <div className="flex items-center justify-between mt-auto">
                          <span className="text-sm font-medium text-primary">{service.price}</span>
                          <motion.div
                            className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors"
                            whileHover={{ x: 3 }}
                          >
                            <ArrowRight className="w-4 h-4 text-primary group-hover:text-primary-foreground transition-colors" />
                          </motion.div>
                        </div>
                      </div>

                      {/* Bottom Accent Line */}
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                    </div>
                  </Link>
                </motion.div>
                </React.Fragment>
              ))}
            </div>
          );
        })()}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center mt-12"
        >
          <Button asChild size="lg" className="group">
            <Link href={servicesSectionContent.button.href}>
              {servicesSectionContent.button.text}
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
