"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { ArrowRight, Eye, X, ChevronLeft, ChevronRight, Loader2 } from "lucide-react"
import { galleryItems, showcaseSectionContent } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Lightbox } from "@/components/lightbox" // Import the new Lightbox component

export function ShowcaseSection() {
  const ref = React.useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [selectedImage, setSelectedImage] = React.useState<typeof galleryItems[0] | null>(null)

  // Take first 6 items for the showcase
  const showcaseItems = galleryItems.slice(0, 6)

  const currentIndex = selectedImage ? showcaseItems.findIndex(item => item.id === selectedImage.id) : -1

  const handlePrev = React.useCallback(() => {
    if (currentIndex > 0) {
      setSelectedImage(showcaseItems[currentIndex - 1])
    }
  }, [currentIndex, showcaseItems])

  const handleNext = React.useCallback(() => {
    if (currentIndex < showcaseItems.length - 1) {
      setSelectedImage(showcaseItems[currentIndex + 1])
    }
  }, [currentIndex, showcaseItems])

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedImage) return
      if (e.key === "Escape") setSelectedImage(null)
      if (e.key === "ArrowLeft") handlePrev()
      if (e.key === "ArrowRight") handleNext()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [selectedImage, handlePrev, handleNext])

  return (
    <section id="showcase" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 water-pattern" />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-bold mb-4"
          >
            <span className="gradient-text">{showcaseSectionContent.title}</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            {showcaseSectionContent.subtitle}
          </motion.p>
        </div>

        {/* Bento Grid Layout */}
        {showcaseItems.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-lg text-muted-foreground">Our project gallery is being updated. Check back soon to see our latest work.</p>
          </div>
        ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px] md:auto-rows-[250px]">
          {showcaseItems.map((item, index) => {
            // Create varied sizes for bento effect
            const sizes = [
              "col-span-2 row-span-2",
              "col-span-1 row-span-1",
              "col-span-1 row-span-1",
              "col-span-1 row-span-2",
              "col-span-1 row-span-1",
              "col-span-2 row-span-1",
            ]

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className={`${sizes[index]} relative group cursor-pointer`}
                onClick={() => { setSelectedImage(item); }}
              >
                <div className="absolute inset-0 rounded-2xl overflow-hidden glass-card skeleton-shimmer">
                  {/* Project Image */}
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes={index === 0 ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 50vw, 25vw"}
                  />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors duration-500" />

                  {/* Shimmer Effect on Hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 animate-shimmer" />
                  </div>

                  {/* Content */}
                  <div className="absolute inset-0 p-4 sm:p-6 flex flex-col justify-end">
                    {/* Category Badge */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileHover={{ opacity: 1, y: 0 }}
                      className="absolute top-4 left-4"
                    >
                      <span className="px-3 py-1 rounded-full glass text-primary text-xs font-medium">
                        {item.category}
                      </span>
                    </motion.div>

                    {/* View Icon */}
                    <motion.div
                      className="absolute top-4 right-4 w-10 h-10 rounded-full glass flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      whileHover={{ scale: 1.1 }}
                    >
                      <Eye className="w-5 h-5 text-primary" />
                    </motion.div>

                    {/* Title & Description */}
                    <motion.div
                      className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                    >
                      <div className="backdrop-blur-md bg-black/20 border border-white/10 py-2 px-4 rounded-2xl w-fit">
                        <h3 className="text-white text-lg sm:text-xl font-bold">
                          {item.title}
                        </h3>
                      </div>
                    </motion.div>
                  </div>

                  {/* Border Glow Effect */}
                  <div className="absolute inset-0 rounded-2xl ring-1 ring-primary/10 group-hover:ring-primary/50 transition-all duration-300" />
                </div>
              </motion.div>
            )
          })}
        </div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center mt-12"
        >
          <Button asChild size="lg" className="group glow-blue">
            <Link href={showcaseSectionContent.button.href}>
              {showcaseSectionContent.button.text}
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </motion.div>
      </div>

      {/* Lightbox */}
      <Lightbox
        images={showcaseItems}
        selectedImage={selectedImage}
        onClose={() => setSelectedImage(null)}
        onPrev={handlePrev}
        onNext={handleNext}
        currentIndex={currentIndex}
        totalImages={showcaseItems.length}
      />
    </section>
  )
}
