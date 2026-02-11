"use client"

import * as React from "react"
import Image from "next/image"
import { AnimatePresence, motion } from "framer-motion"
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react"
import { GalleryItem } from "@/lib/data/gallery"
import { useSwipeable } from "react-swipeable" // For swipe functionality

interface LightboxProps {
  images: GalleryItem[]
  selectedImage: GalleryItem | null
  onClose: () => void
  onPrev: () => void
  onNext: () => void
  currentIndex: number
  totalImages: number
}

export function Lightbox({
  images,
  selectedImage,
  onClose,
  onPrev,
  onNext,
  currentIndex,
  totalImages,
}: LightboxProps) {
  const [isLoadingImage, setIsLoadingImage] = React.useState(true)
  const [zoomLevel, setZoomLevel] = React.useState(1)
  const [imagePosition, setImagePosition] = React.useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = React.useState(false)
  const [startDrag, setStartDrag] = React.useState({ x: 0, y: 0 })

  const imageRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (selectedImage) {
      setIsLoadingImage(true) // Start loading when selectedImage changes
      setZoomLevel(1) // Reset zoom
      setImagePosition({ x: 0, y: 0 }) // Reset position
    }
  }, [selectedImage])

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedImage) return
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowLeft") onPrev()
      if (e.key === "ArrowRight") onNext()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [selectedImage, onClose, onPrev, onNext])

  // Zoom and Pan Handlers
  const handleWheel = React.useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    if (!selectedImage || !imageRef.current) return;

    const scaleAmount = 0.1;
    let newZoomLevel = e.deltaY < 0 ? zoomLevel * (1 + scaleAmount) : zoomLevel * (1 - scaleAmount);
    newZoomLevel = Math.max(1, Math.min(newZoomLevel, 5)); // Limit zoom between 1x and 5x

    setZoomLevel(newZoomLevel);

    // Keep image centered if not zoomed
    if (newZoomLevel === 1) {
      setImagePosition({ x: 0, y: 0 });
    }
  }, [zoomLevel, selectedImage]);

  const handleMouseDown = React.useCallback((e: React.MouseEvent) => {
    if (zoomLevel > 1) {
      setIsDragging(true);
      setStartDrag({ x: e.clientX - imagePosition.x, y: e.clientY - imagePosition.y });
    }
  }, [zoomLevel, imagePosition]);

  const handleMouseMove = React.useCallback((e: React.MouseEvent) => {
    if (isDragging && imageRef.current && selectedImage) {
      const newX = e.clientX - startDrag.x;
      const newY = e.clientY - startDrag.y;

      // Restrict panning to image boundaries
      const img = imageRef.current.querySelector('img');
      if (img) {
        const imgWidth = img.naturalWidth * (imageRef.current.offsetHeight / img.naturalHeight) * zoomLevel; // Scaled image width
        const imgHeight = imageRef.current.offsetHeight * zoomLevel; // Scaled image height
        const containerWidth = imageRef.current.offsetWidth;
        const containerHeight = imageRef.current.offsetHeight;

        const maxMoveX = Math.max(0, (imgWidth - containerWidth) / 2 / zoomLevel);
        const maxMoveY = Math.max(0, (imgHeight - containerHeight) / 2 / zoomLevel);

        const boundedX = Math.max(-maxMoveX, Math.min(maxMoveX, newX));
        const boundedY = Math.max(-maxMoveY, Math.min(maxMoveY, newY));

        setImagePosition({ x: boundedX, y: boundedY });
      }
    }
  }, [isDragging, startDrag, zoomLevel, selectedImage]);

  const handleMouseUp = React.useCallback(() => {
    setIsDragging(false);
  }, []);

  // Swipe handlers for mobile navigation
  const handlers = useSwipeable({
    onSwipedLeft: () => selectedImage && onNext(),
    onSwipedRight: () => selectedImage && onPrev(),
    preventScrollOnSwipe: true,
    trackMouse: true // Enable mouse swiping for testing on desktop
  });

  if (!selectedImage) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-background/95 backdrop-blur-xl flex items-center justify-center p-2 sm:p-4 md:p-8" // More padding for smaller screens
        onClick={onClose}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 sm:top-4 sm:right-4 z-50 w-10 h-10 sm:w-12 sm:h-12 rounded-full glass hover:bg-primary/20 flex items-center justify-center transition-colors"
          aria-label="Close Lightbox"
        >
          <X className="w-5 h-5 sm:w-6 sm:h-6 text-foreground" />
        </button>

        {/* Navigation */}
        {currentIndex > 0 && (
          <button
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-50 w-10 h-10 sm:w-12 sm:h-12 rounded-full glass hover:bg-primary/20 flex items-center justify-center transition-colors hidden md:flex" // Hide on mobile, use swipe
            aria-label="Previous Image"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-foreground" />
          </button>
        )}
        {currentIndex < totalImages - 1 && (
          <button
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-50 w-10 h-10 sm:w-12 sm:h-12 rounded-full glass hover:bg-primary/20 flex items-center justify-center transition-colors hidden md:flex" // Hide on mobile, use swipe
            aria-label="Next Image"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-foreground" />
          </button>
        )}

        {/* Image Content */}
        <motion.div
          key={selectedImage.id} // Key for re-animating image content on change
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full h-full max-h-[calc(100vh-4rem)] max-w-full flex justify-center items-center" // Adjust for more fullscreen
          {...handlers} // Apply swipe handlers to the image container
        >
          <div
            ref={imageRef}
            className={`relative w-full h-full rounded-2xl overflow-hidden glass-card flex items-center justify-center cursor-zoom-in ${isLoadingImage ? 'skeleton-shimmer' : ''}`}
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp} // End drag if mouse leaves
            style={{ cursor: zoomLevel > 1 && !isDragging ? 'grab' : zoomLevel > 1 && isDragging ? 'grabbing' : 'zoom-in' }}
          >
            <Image
              src={selectedImage.image}
              alt={selectedImage.title}
              fill
              className="object-contain"
              sizes="100vw" // Image takes full width of its parent
              priority
              onLoad={() => setIsLoadingImage(false)}
              style={{
                opacity: isLoadingImage ? 0 : 1,
                transition: 'opacity 0.3s ease-in-out',
                transform: `scale(${zoomLevel}) translate(${imagePosition.x}px, ${imagePosition.y}px)`,
                cursor: zoomLevel > 1 ? 'grab' : 'zoom-in', // Change cursor for grab when zoomed
                transitionDuration: isDragging ? '0s' : '0.1s', // Smooth transition when not dragging
              }}
            />

            {/* Text Overlay - Removed as per requirements */}

            {/* Zoom Controls - Always visible for mobile */}
            <div className="absolute top-4 left-4 z-10 flex gap-2">
              <button
                onClick={(e) => { e.stopPropagation(); setZoomLevel(prev => Math.max(1, prev - 0.5)); setImagePosition({x:0, y:0}); }}
                className="w-8 h-8 rounded-full glass hover:bg-primary/20 flex items-center justify-center transition-colors"
                aria-label="Zoom Out"
              >
                <ZoomOut className="w-4 h-4 text-foreground" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); setZoomLevel(prev => Math.min(5, prev + 0.5)); }}
                className="w-8 h-8 rounded-full glass hover:bg-primary/20 flex items-center justify-center transition-colors"
                aria-label="Zoom In"
              >
                <ZoomIn className="w-4 h-4 text-foreground" />
              </button>
              {zoomLevel > 1 && (
                <button
                  onClick={(e) => { e.stopPropagation(); setZoomLevel(1); setImagePosition({x:0, y:0}); }}
                  className="w-8 h-8 rounded-full glass hover:bg-primary/20 flex items-center justify-center transition-colors"
                  aria-label="Reset Zoom"
                >
                  <X className="w-4 h-4 text-foreground" />
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}