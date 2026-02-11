"use client";

import { siteConfig, faqPageContent } from "@/lib/data"
import { notFound } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import { FaqSection } from "@/components/sections/faq-section"
import { CtaSection } from "@/components/sections/cta"

export default function FaqClient() {
  if (!siteConfig.pages.faq.enabled) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="pt-15">
        <section className="relative p-5 overflow-hidden">
          <div className="absolute inset-0 water-pattern" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-primary/5 to-accent/10" />
          <motion.div
            className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[150px]"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
            >
              <span className="gradient-text">{faqPageContent.title.split(" ")[0]}<br />{faqPageContent.title.split(" ").slice(1).join(" ")}</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-muted-foreground"
            >
              {faqPageContent.description}
            </motion.p>
          </div>
        </section>

        <FaqSection showHeader={false} />

        {/* CTA Section */}
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
