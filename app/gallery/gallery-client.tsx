"use client"

import * as React from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronLeft, ChevronRight, ZoomIn, Loader2 } from "lucide-react"
import { galleryItems } from "@/lib/data"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CtaSection } from "@/components/sections/cta"
import { Lightbox } from "@/components/lightbox" // Import the new Lightbox component

// Memoized outside component since galleryItems is static
const categories = ["All", ...Array.from(new Set(galleryItems.map(item => item.category)))]

export default function GalleryPageClient() {
  const [selectedCategory, setSelectedCategory] = React.useState("All")
  const [selectedImage, setSelectedImage] = React.useState<typeof galleryItems[0] | null>(null)

  // Memoize filtered items to prevent recalculation on every render
  const filteredItems = React.useMemo(
    () => selectedCategory === "All"
      ? galleryItems
      : galleryItems.filter(item => item.category === selectedCategory),
    [selectedCategory]
  )

  const currentIndex = selectedImage ? filteredItems.findIndex(item => item.id === selectedImage.id) : -1

  const handlePrev = React.useCallback(() => {
    if (currentIndex > 0) {
      setSelectedImage(filteredItems[currentIndex - 1])
    }
  }, [currentIndex, filteredItems])

  const handleNext = React.useCallback(() => {
    if (currentIndex < filteredItems.length - 1) {
      setSelectedImage(filteredItems[currentIndex + 1])
    }
  }, [currentIndex, filteredItems])

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
    <>
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-24 overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 water-pattern" />
          <motion.div
            className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[150px]"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 10, repeat: Infinity }}
          />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl sm:text-6xl font-bold mb-6"
            >
              <span className="gradient-text">Project Gallery</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-muted-foreground max-w-2xl mx-auto"
            >
              Browse our portfolio of completed projects. See the quality
              results we deliver for clients like you.
            </motion.p>
          </div>
        </section>

        {/* Filter & Gallery */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Category Filter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap justify-center gap-2 mb-12"
            >
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`
                    px-5 py-2.5 rounded-full text-sm font-medium transition-all
                    ${selectedCategory === category
                      ? 'bg-primary text-primary-foreground shadow-lg glow-blue'
                      : 'glass hover:bg-primary/10 text-muted-foreground hover:text-foreground'
                    }
                  `}
                >
                  {category}
                </button>
              ))}
            </motion.div>

            {/* Gallery Grid */}
            <motion.div
              layout
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            >
              <AnimatePresence mode="popLayout">
                {filteredItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3, delay: index * 0.03 }}
                    className={`
                      relative group cursor-pointer overflow-hidden rounded-2xl
                      ${index % 5 === 0 ? 'md:col-span-2 md:row-span-2' : ''}
                    `}
                    onClick={() => setSelectedImage(item)}
                  >
                    <div className={`
                      relative w-full glass-card
                      ${index % 5 === 0 ? 'aspect-square' : 'aspect-[4/3]'}
                    `}>
                      {/* Project Image */}
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes={index % 5 === 0 ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 50vw, 25vw"}
                      />

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-background/0 group-hover:bg-background/70 transition-all duration-300">
                        <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4">
                          <motion.div
                            initial={{ scale: 0 }}
                            whileHover={{ scale: 1.1 }}
                            className="w-14 h-14 rounded-full glass flex items-center justify-center mb-4 glow-blue"
                          >
                            <ZoomIn className="w-7 h-7 text-primary" />
                          </motion.div>
                          <h3 className="text-foreground font-semibold text-center text-lg mb-1">
                            {item.title}
                          </h3>
                          <span className="text-muted-foreground text-sm">{item.category}</span>
                        </div>
                      </div>

                      {/* Category Badge */}
                      <div className="absolute top-4 left-4 px-3 py-1 rounded-full glass text-primary text-xs font-medium">
                        {item.category}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        {/* Lightbox */}
        <Lightbox
          images={filteredItems}
          selectedImage={selectedImage}
          onClose={() => setSelectedImage(null)}
          onPrev={handlePrev}
          onNext={handleNext}
          currentIndex={currentIndex}
          totalImages={filteredItems.length}
        />


        {/* CTA Section */}
        <CtaSection />
      </main>
      <Footer />
    </>
  )
}
