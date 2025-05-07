"use client"

import { useState } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  caption: string;
  category: string;
}

const galleryImages: GalleryImage[] = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80",
    alt: "The day our paths first crossed",
    caption: "The day our paths first crossed",
    category: "ceremony",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    alt: "Our first date—where it all began",
    caption: "Our first date—where it all began",
    category: "ceremony",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80",
    alt: "Exploring the world, hand in hand",
    caption: "Exploring the world, hand in hand",
    category: "reception",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
    alt: "Cherishing every milestone together",
    caption: "Cherishing every milestone together",
    category: "reception",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80",
    alt: "Surrounded by love and laughter",
    caption: "Surrounded by love and laughter",
    category: "decor",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80",
    alt: "Making memories, one adventure at a time",
    caption: "Making memories, one adventure at a time",
    category: "decor",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80",
    alt: "The moment we said 'forever'",
    caption: "The moment we said 'forever'",
    category: "decor",
  },
  {
    id: 8,
    src: "/background/background_4.png",
    alt: "Finding joy in the little things",
    caption: "Finding joy in the little things",
    category: "ceremony",
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80",
    alt: "Celebrating the seasons of life",
    caption: "Celebrating the seasons of life",
    category: "ceremony",
  },
  {
    id: 10,
    src: "/background/background_1.png",
    alt: "Dreaming and planning our big day",
    caption: "Dreaming and planning our big day",
    category: "venue",
  },
  {
    id: 11,
    src: "/background/background_3.png",
    alt: "Dreaming and planning our big day",
    caption: "Dreaming and planning our big day",
    category: "venue",
  },
  {
    id: 12,
    src: "/background/background_4.png",
    alt: "Dreaming and planning our big day",
    caption: "Dreaming and planning our big day",
    category: "venue",
  },
]

const categories = [
  { id: "all", name: "All" },
  { id: "ceremony", name: "Ceremony" },
  { id: "reception", name: "Reception" },
  { id: "decor", name: "Decor" },
  { id: "venue", name: "Venue" },
]

export default function GallerySection() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)

  const filteredImages =
    activeCategory === "all" ? galleryImages : galleryImages.filter((img) => img.category === activeCategory)

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center">
          <img src="/background/floral-design_transparent.png" alt="Floral decoration" className="mx-auto mb-2 w-32 md:w-48 pointer-events-none select-none" />
          <div className="inline-block rounded-2xl px-8 py-3 bg-rose-500 shadow-lg mb-6 mt-2">
            <h2 className="text-3xl md:text-4xl text-white font-bold tracking-wide">
              Our <span className="italic font-normal">Photos</span>
            </h2>
          </div>
          <div className="w-16 h-1 bg-rose-400 rounded-full mx-auto mb-6"></div>
          <p className="text-gray-700 max-w-2xl mx-auto text-lg md:text-xl mb-2">
            A glimpse into our journey together through the years
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              className={activeCategory === category.id ? "bg-rose-500 hover:bg-rose-600" : ""}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredImages.map((image) => (
            <div
              key={image.id}
              className="relative overflow-hidden rounded-xl border-4 border-rose-200 shadow-lg bg-white cursor-pointer group"
              onClick={() => setSelectedImage(image)}
            >
              <Image
                src={image.src || "/placeholder.svg"}
                alt={image.alt}
                width={800}
                height={600}
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-white text-center">
                  <p className="font-serif text-lg">{image.caption}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedImage && (
          <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
            <div className="relative max-w-3xl w-full bg-white rounded-2xl shadow-2xl border-4 border-rose-200 flex flex-col items-center p-4">
              {/* Floral Decoration */}
              <img src="/background/floral-design_transparent.png" alt="Floral decoration" className="mx-auto mb-2 w-24 md:w-32 pointer-events-none select-none" />
              {/* X Button */}
              <button
                className="absolute top-4 right-4 bg-white text-rose-500 hover:bg-rose-500 hover:text-white rounded-full p-2 shadow-lg transition-colors z-20 border border-rose-200"
                onClick={() => setSelectedImage(null)}
                aria-label="Close"
              >
                <X className="h-7 w-7" />
              </button>
              {/* Navigation Arrows */}
              <button
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white text-rose-500 hover:bg-rose-500 hover:text-white rounded-full p-2 shadow-lg transition-colors z-20 border border-rose-200 disabled:opacity-40"
                onClick={() => {
                  const idx = filteredImages.findIndex(img => img.id === selectedImage.id)
                  if (idx > 0) setSelectedImage(filteredImages[idx - 1])
                }}
                disabled={filteredImages.findIndex(img => img.id === selectedImage.id) === 0}
                aria-label="Previous photo"
              >
                <ChevronLeft className="h-7 w-7" />
              </button>
              <button
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white text-rose-500 hover:bg-rose-500 hover:text-white rounded-full p-2 shadow-lg transition-colors z-20 border border-rose-200 disabled:opacity-40"
                onClick={() => {
                  const idx = filteredImages.findIndex(img => img.id === selectedImage.id)
                  if (idx < filteredImages.length - 1) setSelectedImage(filteredImages[idx + 1])
                }}
                disabled={filteredImages.findIndex(img => img.id === selectedImage.id) === filteredImages.length - 1}
                aria-label="Next photo"
              >
                <ChevronRight className="h-7 w-7" />
              </button>
              {/* Framed Image */}
              <div className="relative w-full flex justify-center items-center">
                <div className="rounded-xl border-4 border-rose-200 shadow-lg bg-white p-2">
                  <Image
                    src={selectedImage.src}
                    alt={selectedImage.alt}
                    width={1200}
                    height={800}
                    className="w-full h-auto max-h-[70vh] object-contain rounded-lg"
                  />
                </div>
              </div>
              <p className="text-rose-700 text-center mt-4 font-serif text-xl">{selectedImage.caption}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
