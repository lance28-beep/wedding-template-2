"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const faqs = [
  {
    id: 1,
    question: "What is the dress code?",
    answer:
      "The dress code for our wedding is semi-formal/cocktail attire. Ladies may wear cocktail dresses, and gentlemen may wear suits or dress pants with a jacket. Please avoid white, cream, or ivory as these are reserved for the bride.",
  },
  {
    id: 2,
    question: "Can I bring a plus one?",
    answer:
      "Due to venue capacity limitations, we can only accommodate the guests named on your invitation. Please refer to your invitation for the exact number of seats reserved in your honor, and indicate in your RSVP who will be attending.",
  },
  {
    id: 3,
    question: "Will the ceremony and reception be indoors or outdoors?",
    answer:
      "The ceremony will be held outdoors in the garden pavilion (weather permitting), while the reception will be indoors in the grand ballroom. We recommend bringing a light jacket or wrap for the evening as temperatures may drop.",
  },
  {
    id: 4,
    question: "Is there parking available at the venue?",
    answer:
      "Yes, complimentary parking is available at the venue. There will also be a shuttle service running between the hotel and the venue for your convenience.",
  },
  {
    id: 5,
    question: "Are children welcome?",
    answer:
      "While we love your little ones, our wedding is an adult-only celebration. We hope this gives you an opportunity to let loose and enjoy the evening! We've provided a list of recommended babysitters in the area on our website.",
  },
  {
    id: 6,
    question: "Can I take photos during the ceremony?",
    answer:
      "We have hired professional photographers to capture our special day. We kindly ask that you refrain from taking photos during the ceremony so that you can be fully present with us. Feel free to take photos during the reception and share them using our wedding hashtag #EmmaAndJames2023.",
  },
  {
    id: 7,
    question: "What if I have dietary restrictions?",
    answer:
      "We're happy to accommodate dietary restrictions. Please indicate any special dietary needs in your RSVP, and we'll make sure you're taken care of.",
  },
  {
    id: 8,
    question: "When is the RSVP deadline?",
    answer:
      "Please RSVP by one month before the wedding date. This will help us finalize arrangements with our vendors.",
  },
]

export default function FaqSection() {
  const [openId, setOpenId] = useState<number | null>(null)

  const toggleFaq = (id: number) => {
    setOpenId(openId === id ? null : id)
  }

  return (
    <section className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <div className="text-center mb-8 sm:mb-12">
        <h2 className="text-2xl sm:text-3xl font-serif font-medium text-gray-900 mb-3">
          Frequently Asked Questions
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Find answers to common questions about our wedding celebration. If you have any other questions, please don't hesitate to contact us.
        </p>
      </div>

      <div className="space-y-3 sm:space-y-4">
        {faqs.map((faq) => (
          <Card 
            key={faq.id} 
            className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <CardContent className="p-0">
              <button
                className="flex items-center justify-between w-full p-4 sm:p-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-400 rounded-lg"
                onClick={() => toggleFaq(faq.id)}
                aria-expanded={openId === faq.id}
                aria-controls={`faq-answer-${faq.id}`}
              >
                <h3 className="text-base sm:text-lg font-serif tracking-wide text-gray-800 pr-4">
                  {faq.question}
                </h3>
                <ChevronDown
                  className={`w-5 h-5 text-gray-500 transition-transform duration-200 flex-shrink-0 ${
                    openId === faq.id ? "transform rotate-180" : ""
                  }`}
                  aria-hidden="true"
                />
              </button>
              <div 
                id={`faq-answer-${faq.id}`}
                className={`px-4 sm:px-5 overflow-hidden transition-all duration-300 ease-in-out ${
                  openId === faq.id ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-gray-600 text-sm sm:text-base pb-4 sm:pb-5 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
