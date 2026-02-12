"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AboutSection } from "@/components/sections/about";
import { CtaSection } from "@/components/sections/cta"
import { aboutPageContent } from "@/lib/data"
import { motion } from "framer-motion"

export default function AboutPageClient() {
  return (
    <>
      <Header />
      <main className="pt-15">
        {/* Page Header */}
        <section className="relative p-5 overflow-hidden">
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
              <span className="gradient-text">{aboutPageContent.pageHeader.title}</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-muted-foreground max-w-2xl mx-auto"
            >
              {aboutPageContent.pageHeader.subtitle}
            </motion.p>
          </div>
        </section>

        <AboutSection />
        {/* CTA Section */}
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
