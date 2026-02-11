"use client"

import * as React from "react"
import { motion, useInView } from "framer-motion"
import { Star, Quote } from "lucide-react"
import { testimonials, testimonialsSectionContent } from "@/lib/data"

function TestimonialCard({ testimonial, index }: { testimonial: typeof testimonials[0]; index: number }) {
  const cardContent = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="relative h-full p-6 rounded-2xl glass-card hover:border-primary/30 transition-all duration-300 group"
    >
      {/* Quote Icon */}
      <div className="absolute -top-3 -left-3 w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg glow-blue">
        <Quote className="w-5 h-5 text-primary-foreground" />
      </div>

      {/* Stars */}
      <div className="flex gap-1 mb-4 pt-2">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-accent text-accent" />
        ))}
      </div>

      {/* Content */}
      <p className="text-muted-foreground mb-6 leading-relaxed">
        &ldquo;{testimonial.content}&rdquo;
      </p>

      {/* Author */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold">
          {testimonial.name.charAt(0)}
        </div>
        <div>
          <div className="font-semibold">{testimonial.name}</div>
          <div className="text-sm text-muted-foreground">{testimonial.role}</div>
        </div>
      </div>

      {/* Hover Glow */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </motion.div>
  );

  return (
    <div className="flex-shrink-0 w-[350px] sm:w-[400px] p-6 mx-3">
      {testimonial.link ? (
        <a
          href={testimonial.link}
          target="_blank"
          rel="noopener noreferrer"
          className="block h-full"
        >
          {cardContent}
        </a>
      ) : (
        cardContent
      )}
    </div>
  );
}

// Memoized outside component since testimonials is static
const duplicatedTestimonials = [...testimonials, ...testimonials]

export function TestimonialsSection() {
  const ref = React.useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="testimonials" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 water-pattern" />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-[150px]"
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 15, repeat: Infinity }}
      />

      <div ref={ref} className="relative z-10">
        {/* Section Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-bold mb-4"
          >
            <span className="gradient-text">{testimonialsSectionContent.title}</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            {testimonialsSectionContent.subtitle}
          </motion.p>
        </div>

        {/* Infinite Scroll Carousel */}
        {testimonials.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-lg text-muted-foreground">Customer testimonials coming soon.</p>
          </div>
        ) : (
        <div className="relative">
          {/* Gradient Masks */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          {/* Scrolling Container */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="overflow-hidden"
          >
            <div className="flex animate-marquee hover:[animation-play-state:paused]">
              {duplicatedTestimonials.map((testimonial, index) => (
                <TestimonialCard
                  key={`${testimonial.id}-${index}`}
                  testimonial={testimonial}
                  index={index % testimonials.length}
                />
              ))}
            </div>
          </motion.div>
        </div>
        )}

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16"
        >
          <div className="flex flex-wrap items-center justify-center gap-8 text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent border-2 border-background"
                  />
                ))}
              </div>
              <span className="text-sm">
                <strong className="text-foreground">{testimonialsSectionContent.trustIndicators[0].value}</strong> {testimonialsSectionContent.trustIndicators[0].label}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>
              <span className="text-sm">
                <strong className="text-foreground">{testimonialsSectionContent.trustIndicators[1].value}</strong> {testimonialsSectionContent.trustIndicators[1].label}
              </span>
            </div>
            <div className="text-sm">
              <strong className="text-foreground">{testimonialsSectionContent.trustIndicators[2].value}</strong> {testimonialsSectionContent.trustIndicators[2].label}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
