"use client"

import * as React from "react"
import Image from "next/image"

interface BeforeAfterSliderProps {
  beforeImage: string
  afterImage: string
  alt: string
  initialPosition?: number
  zoomLevel?: number
  imagePosition?: { x: number; y: number }
  onLoad?: () => void
  onImageClick?: () => void
  onPositionChange?: (position: number) => void
  className?: string
}

export function BeforeAfterSlider({
  beforeImage,
  afterImage,
  alt,
  initialPosition = 50,
  zoomLevel = 1,
  imagePosition = { x: 0, y: 0 },
  onLoad,
  onImageClick,
  onPositionChange,
  className = "",
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = React.useState(initialPosition)
  const sliderPositionRef = React.useRef(initialPosition)

  // Sync with initialPosition when it changes (e.g., from lightbox to thumbnail)
  React.useEffect(() => {
    setSliderPosition(initialPosition)
    sliderPositionRef.current = initialPosition
  }, [initialPosition])
  const [isDragging, setIsDragging] = React.useState(false)
  const loadedCountRef = React.useRef(0)
  const containerRef = React.useRef<HTMLDivElement>(null)
  const hasDraggedRef = React.useRef(false)

  const handleImageLoad = React.useCallback(() => {
    loadedCountRef.current += 1
    if (loadedCountRef.current >= 2 && onLoad) {
      onLoad()
    }
  }, [onLoad])

  const updateSliderPosition = React.useCallback((clientX: number) => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
    setSliderPosition(percentage)
    sliderPositionRef.current = percentage
  }, [])

  const handleSliderMouseDown = React.useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragging(true)
      hasDraggedRef.current = false
      updateSliderPosition(e.clientX)
    },
    [updateSliderPosition]
  )

  const handleSliderTouchStart = React.useCallback(
    (e: React.TouchEvent) => {
      e.stopPropagation()
      setIsDragging(true)
      hasDraggedRef.current = false
      updateSliderPosition(e.touches[0].clientX)
    },
    [updateSliderPosition]
  )

  // Prevent click events on the handle from bubbling
  const handleSliderClick = React.useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
  }, [])

  const handleMouseMove = React.useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return
      hasDraggedRef.current = true
      updateSliderPosition(e.clientX)
    },
    [isDragging, updateSliderPosition]
  )

  const handleMouseUp = React.useCallback(() => {
    // Notify parent of final position when drag ends
    if (isDragging && onPositionChange) {
      onPositionChange(sliderPositionRef.current)
    }
    setIsDragging(false)
    // Reset drag flag after a short delay to allow the current click event to be ignored
    // but future clicks to work normally
    setTimeout(() => {
      hasDraggedRef.current = false
    }, 0)
  }, [isDragging, onPositionChange])

  const handleTouchMove = React.useCallback(
    (e: TouchEvent) => {
      if (!isDragging) return
      e.preventDefault()
      hasDraggedRef.current = true
      updateSliderPosition(e.touches[0].clientX)
    },
    [isDragging, updateSliderPosition]
  )

  // Handle clicks on the image area (the click overlay)
  const handleImageAreaClick = React.useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      // Only trigger if we didn't just finish dragging
      if (!hasDraggedRef.current && onImageClick) {
        onImageClick()
      }
      hasDraggedRef.current = false
    },
    [onImageClick]
  )

  React.useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseup", handleMouseUp)
    window.addEventListener("touchmove", handleTouchMove, { passive: false })
    window.addEventListener("touchend", handleMouseUp)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
      window.removeEventListener("touchmove", handleTouchMove)
      window.removeEventListener("touchend", handleMouseUp)
    }
  }, [handleMouseMove, handleMouseUp, handleTouchMove])

  const imageStyle: React.CSSProperties = {
    transform: `scale(${zoomLevel}) translate(${imagePosition.x}px, ${imagePosition.y}px)`,
    transition: isDragging ? "none" : "transform 0.1s ease-out",
  }

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden select-none ${className}`}
    >
      {/* After Image (Right side - full width, clipped from left) */}
      <div className="absolute inset-0">
        <Image
          src={afterImage}
          alt={`${alt} - After`}
          fill
          className="object-cover"
          style={imageStyle}
          sizes="100vw"
          onLoad={handleImageLoad}
          priority
        />
      </div>

      {/* Before Image (Left side - clipped from right) */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <Image
          src={beforeImage}
          alt={`${alt} - Before`}
          fill
          className="object-cover"
          style={imageStyle}
          sizes="100vw"
          onLoad={handleImageLoad}
          priority
        />
      </div>

      {/* Click overlay - captures clicks on image area (z-[5] is between images and slider z-10) */}
      {onImageClick && (
        <div
          className="absolute inset-0 z-[5] cursor-pointer"
          onClick={handleImageAreaClick}
        />
      )}

      {/* Slider Line */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg z-10 pointer-events-none"
        style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
      >
        {/* Slider Handle */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center pointer-events-auto cursor-ew-resize hover:scale-110 transition-transform"
          onMouseDown={handleSliderMouseDown}
          onTouchStart={handleSliderTouchStart}
          onClick={handleSliderClick}
        >
          <div className="flex items-center gap-0.5">
            <svg
              className="w-3 h-3 text-gray-600 rotate-180"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <svg className="w-3 h-3 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Before/After Labels */}
      <div className="absolute bottom-4 left-4 px-2 py-1 rounded-md bg-black/50 text-white text-xs font-medium backdrop-blur-sm z-10 pointer-events-none">
        Before
      </div>
      <div className="absolute bottom-4 right-4 px-2 py-1 rounded-md bg-black/50 text-white text-xs font-medium backdrop-blur-sm z-10 pointer-events-none">
        After
      </div>
    </div>
  )
}
