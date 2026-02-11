"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { individualServicesPricingContent, services } from "@/lib/data"
import { getIcon } from "@/lib/icon-map"

export function IndividualServicesPricingSection() {
  return (
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
            <span className="gradient-text">{individualServicesPricingContent.title}</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {individualServicesPricingContent.subtitle}
          </p>
        </motion.div>

        {services.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-lg text-muted-foreground">Service pricing is being updated. Please contact us for details.</p>
          </div>
        ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const ServiceIcon = getIcon(service.iconName)
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Link href={`/services/${service.id}`} className="group block h-full">
                  <div className="h-full p-6 rounded-2xl glass-card hover:border-primary/50 transition-all">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary transition-colors">
                      {ServiceIcon && <ServiceIcon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />}
                    </div>
                    <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-2xl font-bold text-primary">{service.price}</p>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
        )}
      </div>
    </section>
  )
}
