"use client"

import * as React from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronLeft, ChevronRight, ZoomIn, Loader2 } from "lucide-react"
import { galleryItems } from "@/lib/data"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CtaSection } from "@/components/sections/cta"
import { Lightbox } from "@/components/lightbox"
import { Button } from "@/components/ui/button"

// Memoized outside component since galleryItems is static
const categories = ["All", ...Array.from(new Set(galleryItems.map(item => item.category)))]

export default function GalleryPageClient() {
  const [selectedCategory, setSelectedCategory] = React.useState("All")
  const [selectedImage, setSelectedImage] = React.useState<typeof galleryItems[0] | null>(null)
  const [visibleCount, setVisibleCount] = React.useState(12)

  // Memoize filtered items to prevent recalculation on every render
  const filteredItems = React.useMemo(
    () => selectedCategory === "All"
      ? galleryItems
      : galleryItems.filter(item => item.category === selectedCategory),
    [selectedCategory]
  )

  const visibleItems = filteredItems.slice(0, visibleCount)
  const hasMore = visibleCount < filteredItems.length

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
      <main className="pt-15">
        {/* Hero Section */}
        <section className="relative p-5 overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 water-pattern" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-primary/5 to-accent/10" />
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
                  onClick={() => { setSelectedCategory(category); setVisibleCount(12); }}
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
              {filteredItems.length === 0 ? (
                <div className="col-span-full text-center py-16">
                  <p className="text-lg text-muted-foreground">
                    {galleryItems.length === 0
                      ? "Our project gallery is being updated. Check back soon to see our latest work."
                      : "No projects found in this category."}
                  </p>
                </div>
              ) : (
              <AnimatePresence mode="popLayout">
                {visibleItems.map((item, index) => (
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
                      relative w-full glass-card skeleton-shimmer
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
                      <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-all duration-300">
                        <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4">
                          <motion.div
                            initial={{ scale: 0 }}
                            whileHover={{ scale: 1.1 }}
                            className="w-14 h-14 rounded-full backdrop-blur-md bg-black/20 border border-white/10 flex items-center justify-center mb-4"
                          >
                            <ZoomIn className="w-7 h-7 text-white" />
                          </motion.div>
                          <div className="backdrop-blur-md bg-black/20 border border-white/10 py-2 px-4 rounded-2xl">
                            <h3 className="text-white font-semibold text-center text-lg">
                              {item.title}
                            </h3>
                          </div>
                        </div>
                      </div>

                      {/* Category Badge */}
                      <div className="absolute top-4 left-4 px-3 py-1 rounded-2xl backdrop-blur-md bg-black/20 border border-white/10 text-white text-xs font-medium">
                        {item.category}
                      </div>

                      {/* Border Glow Effect */}
                      <div className="absolute inset-0 rounded-2xl ring-1 ring-primary/10 group-hover:ring-primary/50 transition-all duration-300" />
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              )}
            </motion.div>

            {/* Load More Button */}
            {hasMore && (
              <div className="text-center mt-12">
                <Button
                  size="lg"
                  onClick={() => setVisibleCount(prev => prev + 12)}
                >
                  Load More ({filteredItems.length - visibleCount} remaining)
                </Button>
              </div>
            )}
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
