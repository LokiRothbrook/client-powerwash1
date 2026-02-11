"use client"

import * as React from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { Users, Trophy, Sparkles, ThumbsUp } from "lucide-react"
import { aboutSectionContent } from "@/lib/data"

export function AboutSection() {
  const ref = React.useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="about" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 water-pattern" />
      <motion.div
        className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]"
        animate={{ x: [-50, 50, -50], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 15, repeat: Infinity }}
      />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Image/Visual */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            {/* Main Image Container */}
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Decorative Background */}
              <div className="absolute inset-4 rounded-3xl bg-gradient-to-br from-primary/20 to-accent/20 blur-2xl" />

              {/* Main Visual */}
              <div className="relative h-full rounded-3xl overflow-hidden">
                {/* Background Image or Gradient */}
                {aboutSectionContent.image.src ? (
                  <Image
                    src={aboutSectionContent.image.src}
                    alt="About our company"
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 1024px) 100vw, 512px"
                  />
                ) : (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary/80" />
                    {/* Pattern Overlay - only shown when no image */}
                    <div className="absolute inset-0 opacity-10">
                      <svg className="w-full h-full" viewBox="0 0 100 100">
                        <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                          <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
                        </pattern>
                        <rect width="100" height="100" fill="url(#grid)" />
                      </svg>
                    </div>
                    {/* Floating Elements - only shown when no image */}
                    <motion.div
                      className="absolute top-8 right-8 w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center"
                      animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                      transition={{ duration: 5, repeat: Infinity }}
                    >
                      <Sparkles className="w-10 h-10 text-white" />
                    </motion.div>
                    <motion.div
                      className="absolute bottom-12 left-8 w-16 h-16 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center"
                      animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
                      transition={{ duration: 6, repeat: Infinity, delay: 1 }}
                    >
                      <Trophy className="w-8 h-8 text-white" />
                    </motion.div>
                    {/* Center Content - only shown when no image */}
                    <div className="relative h-full flex items-center justify-center p-8 text-center text-white">
                      <div>
                        <motion.div
                          className="text-8xl font-bold mb-2"
                          initial={{ scale: 0 }}
                          animate={isInView ? { scale: 1 } : {}}
                          transition={{ duration: 0.5, delay: 0.3, type: "spring" }}
                        >
                          {aboutSectionContent.image.year}
                        </motion.div>
                        <div className="text-xl font-medium opacity-90">{aboutSectionContent.image.line1}</div>
                        <div className="mt-4 text-sm opacity-75">{aboutSectionContent.image.line2}</div>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Floating Stats Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="absolute -bottom-6 -right-6 glass-card rounded-2xl p-4 shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                    <ThumbsUp className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{aboutSectionContent.statsCard.value}</div>
                    <div className="text-sm text-muted-foreground">{aboutSectionContent.statsCard.label}</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 mt-20 text-center lg:text-left">
               <span className="gradient-text">{aboutSectionContent.title.line1}<br />{aboutSectionContent.title.line2}</span>
            </h2>
            {aboutSectionContent.paragraphs.map((p, i) => (
              <p key={i} className={`text-${i === 0 ? 'lg' : ''} text-muted-foreground mb-${i === 0 ? '6' : '8'}`}>
                {p}
              </p>
            ))}

            {/* Values Grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              {aboutSectionContent.values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  className="p-4 rounded-xl glass-card hover:bg-primary/5 transition-colors"
                >
                  <h4 className="font-semibold mb-1">{value.title}</h4>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {aboutSectionContent.stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
              className="text-center group"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                <stat.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              <div className="text-3xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
