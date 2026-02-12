"use client"

import { motion } from "framer-motion"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { faqData, faqPageContent } from "@/lib/data" // Import faqPageContent for the title and description

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

export function FaqSection({ showHeader = true }: { showHeader?: boolean }) {
  return (
    <section className="py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {showHeader && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              {faqPageContent.title.split(" ")[0]}{" "}
              <span className="gradient-text">{faqPageContent.title.split(" ").slice(1).join(" ")}</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {faqPageContent.description}
            </p>
          </motion.div>
        )}

        <div className="space-y-4">
          {faqData.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-lg text-muted-foreground">Our FAQ section is being updated. Please contact us directly with any questions.</p>
            </div>
          ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <Accordion type="single" collapsible className="w-full">
              {faqData.map((faq, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="p-6 rounded-2xl glass-card"
                >
                  <AccordionItem value={`item-${index}`}>
                    <AccordionTrigger className="text-lg font-medium text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-base text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}
