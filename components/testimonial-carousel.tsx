"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const testimonials = [
  {
    id: 1,
    name: "Sarah & Michael",
    date: "June 2023",
    image: "/placeholder.svg?height=80&width=80",
    content:
      "LoveLove made our dream wedding a reality! From the initial consultation to the big day, they were professional, attentive, and truly cared about our vision. We couldn't have asked for a better team to help us plan our special day.",
    rating: 5,
  },
  {
    id: 2,
    name: "Jessica & David",
    date: "September 2023",
    image: "/placeholder.svg?height=80&width=80",
    content:
      "Working with LoveLove was the best decision we made for our wedding. They took care of every detail, allowing us to enjoy our engagement and wedding day without stress. Their creativity and attention to detail exceeded our expectations!",
    rating: 5,
  },
  {
    id: 3,
    name: "Emily & James",
    date: "May 2023",
    image: "/placeholder.svg?height=80&width=80",
    content:
      "We were blown away by the level of service provided by LoveLove. They transformed our venue into a magical space that perfectly reflected our personalities. Our guests are still talking about how beautiful everything was!",
    rating: 5,
  },
  {
    id: 4,
    name: "Amanda & Robert",
    date: "August 2023",
    image: "/placeholder.svg?height=80&width=80",
    content:
      "LoveLove went above and beyond to make our destination wedding perfect. Despite the challenges of planning from afar, they coordinated everything flawlessly. We're forever grateful for their expertise and dedication.",
    rating: 4,
  },
  {
    id: 5,
    name: "Nicole & Thomas",
    date: "October 2023",
    image: "/placeholder.svg?height=80&width=80",
    content:
      "From the moment we hired LoveLove, we knew we were in good hands. Their team is not only professional but also warm and friendly. They made the planning process enjoyable and delivered a wedding day that was even better than we imagined.",
    rating: 5,
  },
  {
    id: 6,
    name: "Lauren & Christopher",
    date: "July 2023",
    image: "/placeholder.svg?height=80&width=80",
    content:
      "We had a limited budget but still wanted a beautiful wedding. LoveLove worked with us to create a stunning event without breaking the bank. Their creativity and resourcefulness made all the difference!",
    rating: 5,
  },
]

export default function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [visibleTestimonials, setVisibleTestimonials] = useState([])

  useEffect(() => {
    // Determine how many testimonials to show based on screen size
    const handleResize = () => {
      let itemsToShow = 1
      if (window.innerWidth >= 1024) {
        itemsToShow = 3
      } else if (window.innerWidth >= 768) {
        itemsToShow = 2
      }

      const endIndex = Math.min(currentIndex + itemsToShow, testimonials.length)
      setVisibleTestimonials(testimonials.slice(currentIndex, endIndex))
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [currentIndex])

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, testimonials.length - 1))
  }

  return (
    <div className="relative">
      <div className="flex overflow-hidden">
        <div className="flex transition-transform duration-300 gap-6">
          {visibleTestimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-8 gap-4">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full"
          onClick={handlePrev}
          disabled={currentIndex === 0}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full"
          onClick={handleNext}
          disabled={currentIndex >= testimonials.length - 1}
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}

function TestimonialCard({ testimonial }) {
  return (
    <Card className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] flex-shrink-0 border-none shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          <Image
            src={testimonial.image || "/placeholder.svg"}
            alt={testimonial.name}
            width={60}
            height={60}
            className="rounded-full object-cover mr-4"
          />
          <div>
            <h4 className="font-semibold">{testimonial.name}</h4>
            <p className="text-sm text-gray-500">{testimonial.date}</p>
          </div>
        </div>

        <div className="flex mb-3">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
            />
          ))}
        </div>

        <p className="text-gray-700 italic">{testimonial.content}</p>
      </CardContent>
    </Card>
  )
}
