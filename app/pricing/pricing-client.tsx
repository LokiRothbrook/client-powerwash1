"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Check, Sparkles, ArrowRight, Phone } from "lucide-react"
import { pricingPlans, services, pricingPageContent, siteConfig } from "@/lib/data"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { CtaSection } from "@/components/sections/cta"
import { IndividualServicesPricingSection } from "@/components/sections/individual-services-pricing"
import { FaqSection } from "@/components/sections/faq-section"

export default function PricingPageClient() {
  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-24 overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 water-pattern" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-primary/5 to-accent/10" />
          <motion.div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-[150px]"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 10, repeat: Infinity }}
          />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl sm:text-6xl font-bold mb-6"
            >
              <span className="gradient-text">Simple, Transparent<br />Pricing</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-muted-foreground max-w-2xl mx-auto"
            >
              {pricingPageContent.heroSubtitle}
            </motion.p>
          </div>
        </section>

        {/* Pricing Plans */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {pricingPlans.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-lg text-muted-foreground">Pricing information is being updated. Please contact us for a quote.</p>
              </div>
            ) : (
            <div className="grid md:grid-cols-3 gap-8 items-start">
              {pricingPlans.map((plan, index) => (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className={`relative group ${plan.highlighted ? 'md:-mt-8' : ''}`}
                >
                  {/* Highlighted Badge */}
                  {plan.badge && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                      <span className="inline-flex items-center gap-1 px-4 py-1.5 rounded-full bg-primary text-primary-foreground text-sm font-medium shadow-lg glow-blue">
                        <Sparkles className="w-4 h-4" />
                        {plan.badge}
                      </span>
                    </div>
                  )}

                  <div className={`
                    relative h-full p-8 rounded-3xl transition-all duration-500 overflow-hidden
                    ${plan.highlighted
                      ? 'glass-card border-primary shadow-2xl shadow-primary/10'
                      : 'glass-card hover:border-primary/30'
                    }
                  `}>
                    {/* Glow Effect for Highlighted */}
                    {plan.highlighted && (
                      <>
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
                        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-[100px]" />
                      </>
                    )}

                    <div className="relative z-10">
                      <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                      <p className="text-muted-foreground mb-6">{plan.description}</p>

                      <div className="mb-8">
                        <span className="text-5xl font-bold">{plan.price}</span>
                        <span className="text-muted-foreground">/{plan.period}</span>
                      </div>

                      <Button
                        asChild
                        className={`w-full mb-8 ${plan.highlighted ? 'glow-blue' : ''}`}
                        variant={plan.highlighted ? 'default' : 'outline'}
                        size="lg"
                      >
                        <Link href="/#contact">
                          Get Started
                          <ArrowRight className="w-5 h-5 ml-2" />
                        </Link>
                      </Button>

                      <ul className="space-y-4">
                        {plan.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-3">
                            <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            )}
          </div>
        </section>

        {/* Individual Services Pricing */}
        {siteConfig.pages.pricing.showIndividualServicesPricing && (
          <IndividualServicesPricingSection />
        )}

        {/* FAQ Section */}
        <FaqSection />
        
        {/* CTA Section */}
        <CtaSection />
      </main>
      <Footer />
    </>
  )
}
