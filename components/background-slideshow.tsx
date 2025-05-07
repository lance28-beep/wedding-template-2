"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

const backgroundImages = [
  {
    src: "/background/background.png?height=1080&width=1920",
    alt: "Wedding couple background 1",
  },
  {
    src: "/background/background_1.png?height=1080&width=1920",
    alt: "Wedding couple background 2",
  },
  {
    src: "/background/background_3.png?height=1080&width=1920",
    alt: "Wedding couple background 3",
  },
  {
    src: "/background/background_4.png?height=1080&width=1920",
    alt: "Wedding couple background 4",
  },
]

export default function BackgroundSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length)
    }, 10000) // Change image every 10 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="absolute inset-0 z-0">
      {backgroundImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover brightness-50"
            priority={index === 0}
          />
        </div>
      ))}
    </div>
  )
} 