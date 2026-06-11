'use client'

import { useState } from 'react'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

interface LightboxImage {
  src: string
  alt: string
  category?: string
}

export function GalleryWithLightbox({ images }: { images: LightboxImage[] }) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  // Extract categories
  const categories = ['all', ...new Set(images.map((img) => img.category || 'other'))]

  // Filter images
  const filteredImages =
    selectedCategory === 'all' ? images : images.filter((img) => img.category === selectedCategory)

  // Find index in filtered array
  const currentIndex = filteredImages.findIndex(
    (img) => images.indexOf(img) === (selectedImage ?? -1)
  )

  const goNext = () => {
    if (selectedImage !== null) {
      const nextIndex = (currentIndex + 1) % filteredImages.length
      setSelectedImage(images.indexOf(filteredImages[nextIndex]))
    }
  }

  const goPrev = () => {
    if (selectedImage !== null) {
      const prevIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length
      setSelectedImage(images.indexOf(filteredImages[prevIndex]))
    }
  }

  return (
    <div>
      {/* Category Filters */}
      <div className="mb-8 flex flex-wrap gap-3 justify-center">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => {
              setSelectedCategory(category)
              setSelectedImage(null)
            }}
            className={`px-4 py-2 rounded-full font-medium transition-all ${
              selectedCategory === category
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-foreground hover:bg-secondary/80'
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {filteredImages.map((image, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedImage(images.indexOf(image))}
            className="group relative aspect-square overflow-hidden rounded-xl"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/0 transition-all duration-300 group-hover:bg-black/30 flex items-center justify-center">
              <div className="opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="text-white font-medium">View</div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImage !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4">
          {/* Close Button */}
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 z-10 rounded-full bg-white/10 p-2 hover:bg-white/20 transition-colors"
            aria-label="Close lightbox"
          >
            <X className="h-6 w-6 text-white" />
          </button>

          {/* Main Image */}
          <div className="relative w-full h-[80vh] max-w-4xl">
            <Image
              src={images[selectedImage].src}
              alt={images[selectedImage].alt}
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={goPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/10 p-3 hover:bg-white/20 transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-6 w-6 text-white" />
          </button>

          <button
            onClick={goNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/10 p-3 hover:bg-white/20 transition-colors"
            aria-label="Next image"
          >
            <ChevronRight className="h-6 w-6 text-white" />
          </button>

          {/* Image Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/10 px-4 py-2 rounded-full text-white text-sm">
            {currentIndex + 1} / {filteredImages.length}
          </div>

          {/* Thumbnail Strip */}
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2 max-w-[80vw] overflow-x-auto pb-2">
            {filteredImages.map((image, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(images.indexOf(image))}
                className={`relative h-12 w-12 shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                  images.indexOf(image) === selectedImage
                    ? 'border-primary'
                    : 'border-white/30 hover:border-white/50'
                }`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes="48px"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
