import Image from "next/image"
import Link from "next/link"
import { Calendar, MapPin, Clock, Music, Facebook, Instagram, Twitter, Share2, Phone, Mail } from "lucide-react"
import { QRCodeSVG } from 'qrcode.react'
import ShareSection from "@/components/share-section"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Countdown from "@/components/countdown"
import GallerySection from "@/components/gallery-section"
import RsvpForm from "@/components/rsvp-form"
import Navigation from "@/components/navigation"
import WeddingParty from "@/components/wedding-party"
import RegistrySection from "@/components/registry-section"
import FaqSection from "@/components/faq-section"
import GuestCounter from "@/components/guest-counter"
import AttendeeMarquee from "@/components/attendee-marquee"
import BackgroundSlideshow from "@/components/background-slideshow"
import { AudioPlayer } from "@/components/AudioPlayer"
import { PrenupVideoWrapper } from "@/components/PrenupVideoWrapper"

export default function Home() {
  // Wedding date - set to 6 months in the future
  const weddingDate = new Date()
  weddingDate.setMonth(weddingDate.getMonth() + 6)

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Flower Decorations */}
        <img src="/background/flower_border_transparent.png" alt="Floral border" className="absolute top-0 left-0 w-40 md:w-64 opacity-80 pointer-events-none select-none z-10" />
        <img src="/background/flower_border_transparent.png" alt="Floral border" className="absolute bottom-0 right-0 w-40 md:w-64 opacity-80 pointer-events-none select-none z-10 transform rotate-180" />
        <BackgroundSlideshow />
        {/* Rose Gradient Overlay for better contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-rose-200/80 via-rose-300/70 to-rose-400/60 z-0" />
        <div className="absolute inset-0 bg-black/40 z-0" />
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto flex flex-col items-center justify-center h-full">
          {/* Names */}
          <h1 className="text-[2.8rem] xs:text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-script text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.7)] tracking-wide mb-2 md:mb-4">
           Lance <span className="inline-block">&</span> Rosa
          </h1>
          {/* Wedding Date */}
          <p className="text-lg md:text-2xl font-serif font-semibold text-white drop-shadow mb-4">
            {weddingDate.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
          </p>
          {/* Subtitle */}
          <p className="text-lg xs:text-xl md:text-2xl lg:text-3xl text-white/90 mb-10 max-w-2xl mx-auto font-serif drop-shadow">
            You're invited to celebrate our love.<br />
            Join us for a day filled with joy, laughter, and memories to cherish forever.
          </p>
          {/* Buttons */}
          <div className="flex flex-row gap-4 justify-center w-full max-w-md mb-10">
            <Button
              size="lg"
              className="bg-rose-500 hover:bg-rose-600 font-semibold rounded-full shadow-xl hover:shadow-2xl px-6 md:px-10 py-3 text-base md:text-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 focus:ring-4 focus:ring-rose-300 focus:outline-none"
            >
              <Link href="#rsvp" className="flex items-center justify-center gap-2">
                <span>RSVP</span>
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-rose-500 border-2 border-rose-200 hover:text-rose-600 hover:bg-rose-300 rounded-full shadow-xl hover:shadow-2xl px-6 md:px-10 py-3 text-base md:text-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 focus:ring-4 focus:ring-rose-200 focus:outline-none"
            >
              <Link href="#details" className="flex items-center justify-center gap-2">
                <span>Details</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
              </Link>
            </Button>
          </div>
          {/* Countdown */}
          <div className="mt-6">
            <Countdown targetDate={weddingDate} />
          </div>
        </div>
        {/* Scroll Down Icon */}
        <div className="absolute bottom-10 left-0 right-0 flex justify-center animate-bounce z-20">
          <a href="#story" className="text-white opacity-80 hover:opacity-100 transition-opacity duration-200">
            <svg
              xmlns="/svg/dove-svgrepo-com.svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </a>
        </div>
      </section>

      {/* Prenup Video Section */}
      <section id="prenup" className="relative py-20 bg-rose-50 overflow-hidden">
        {/* Floral Decorations */}
        <img src="/background/flower_border_transparent.png" alt="Floral border" className="absolute top-0 left-0 w-32 md:w-48 opacity-70 pointer-events-none select-none z-0" />
        <img src="/background/flower_border_transparent.png" alt="Floral border" className="absolute bottom-0 right-0 w-32 md:w-48 opacity-70 pointer-events-none select-none z-0 transform rotate-180" />
        
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-serif text-rose-800 mb-4">
              Our Love Story
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Watch our prenup video and experience the beautiful moments that led us to this special day.
            </p>
          </div>
          
          <PrenupVideoWrapper />
        </div>
      </section>

      {/* Our Story Section */}
      <section id="story" className="relative py-20 bg-rose-50 overflow-hidden">
        {/* Floral Decorations */}
        <img src="/background/flower_border_transparent.png" alt="Floral border" className="absolute top-0 left-0 w-32 md:w-48 opacity-70 pointer-events-none select-none z-0" />
        <img src="/background/flower_border_transparent.png" alt="Floral border" className="absolute bottom-0 right-0 w-32 md:w-48 opacity-70 pointer-events-none select-none z-0 transform rotate-180" />
        {/* Optional: Soft overlay for depth */}
        <div className="absolute inset-0 bg-white/30 z-0" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <img src="/background/floral-design_transparent.png" alt="Floral decoration" className="mx-auto mb-2 w-32 md:w-48 pointer-events-none select-none" />
            <div className="inline-block rounded-2xl px-8 py-3 bg-rose-500 shadow-lg mb-4">
              <h2 className="text-3xl md:text-4xl text-white font-bold tracking-wide">
                Our <span className="italic font-normal">Story</span>
              </h2>
            </div>
            <div className="w-20 h-1 bg-rose-400 mx-auto mb-6"></div>
            <p className="text-gray-700 max-w-2xl mx-auto">
              How we met, fell in love, and decided to spend our lives together
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="prose max-w-none">
                <h3 className="text-2xl font-serif mb-4">How We Met</h3>
                <p>
                  It was a crisp autumn day in October 2018 when our paths first crossed at a mutual friend's
                  housewarming party. Emma was helping in the kitchen, preparing appetizers, while James was setting up
                  the music playlist. We struck up a conversation about our shared love for 80's classics, and the rest,
                  as they say, is history.
                </p>

                <h3 className="text-2xl font-serif mt-8 mb-4">Our First Date</h3>
                <p>
                  Two weeks later, we went on our first official date to a small Italian restaurant downtown. What was
                  meant to be a quick dinner turned into hours of conversation, laughter, and the realization that we
                  had found something special. We walked through the park afterward, talking until midnight, neither of
                  us wanting the evening to end.
                </p>

                <h3 className="text-2xl font-serif mt-8 mb-4">The Proposal</h3>
                <p>
                  After three wonderful years together, James proposed during a weekend getaway to the mountains. At
                  sunset, overlooking the valley where we had hiked on one of our first trips together, he got down on
                  one knee and asked Emma to spend forever with him. Through happy tears, she said yes, and we began
                  planning our future together.
                </p>
              </div>

              <div className="mt-8 flex justify-center lg:justify-start">
                <Button className="bg-rose-500 hover:bg-rose-600 text-white rounded-full px-8">
                  <Link href="#photos">See Our Photos</Link>
                </Button>
              </div>
            </div>

            <div className="order-1 lg:order-2 grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="relative h-64 overflow-hidden rounded-lg">
                  <Image src="/gallery/firstDate.png?height=400&width=300" alt="First date" fill className="object-cover" />
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-sm">
                    First Date
                  </div>
                </div>
                <div className="relative h-48 overflow-hidden rounded-lg">
                  <Image
                    src="/gallery/holiday.png?height=300&width=400"
                    alt="Vacation together"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-sm">
                    Summer Vacation
                  </div>
                </div>
              </div>
              <div className="space-y-4 mt-8">
                <div className="relative h-48 overflow-hidden rounded-lg">
                  <Image
                    src="/background/background_2.png?height=300&width=400"
                    alt="Holiday celebration"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-sm">
                    Holiday Celebration
                  </div>
                </div>
                <div className="relative h-64 overflow-hidden rounded-lg">
                  <Image src="/background/background_3.png?height=400&width=300" alt="The proposal" fill className="object-cover" />
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-sm">
                    The Proposal
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Photos Section */}
      <section id="photos" className="relative py-20 bg-rose-50 overflow-hidden">
        {/* Floral Decorations */}
        <div className="absolute inset-0 bg-white/30 z-0" />
        <div className="container mx-auto px-4 relative z-10">
          <GallerySection />
        </div>
      </section>

      {/* Details Section */}
      <section id="details" className="py-20 bg-rose-50">
        {/* Floral Decorations */}
        <img src="/background/flower_border_transparent.png" alt="Floral border" className="absolute top-0 left-0 w-32 md:w-48 opacity-70 pointer-events-none select-none z-0" />
        <img src="/background/flower_border_transparent.png" alt="Floral border" className="absolute bottom-0 right-0 w-32 md:w-48 opacity-70 pointer-events-none select-none z-0 transform rotate-180" />

        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <img src="/background/floral-design_transparent.png" alt="Floral decoration" className="mx-auto mb-2 w-32 md:w-48 pointer-events-none select-none" />
            <div className="inline-block rounded-2xl px-8 py-3 bg-rose-500 shadow-lg mb-4">
              <h2 className="text-3xl md:text-4xl text-white font-bold tracking-wide">
                Wedding <span className="italic font-normal">Details</span>
              </h2>
            </div>
            <div className="w-20 h-1 bg-rose-400 mx-auto mb-6 rounded-full"></div>
            <p className="text-gray-700 max-w-2xl mx-auto text-lg md:text-xl mb-2">Everything you need to know about our special day</p>
          </div>

          {/* Decorative Divider */}
          <div className="flex justify-center mb-12">
            <img src="/background/floral-design_transparent.png" alt="Floral divider" className="w-24 md:w-32 opacity-60" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Card className="bg-white/90 border-none shadow-lg rounded-2xl transition-shadow text-center p-6">
              <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-rose-200">
                <Calendar className="w-8 h-8 text-rose-500" />
              </div>
              <h3 className="text-xl font-serif mb-3 text-rose-600">When</h3>
              <p className="text-gray-700 font-medium mb-1">{weddingDate.toLocaleDateString("en-US", { weekday: "long" })}</p>
              <p className="text-gray-700 font-medium mb-1">{weddingDate.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</p>
              <div className="flex items-center justify-center mt-4 gap-2">
                <Clock className="w-5 h-5 text-rose-400" />
                <span className="text-gray-700">Ceremony: 3:00 PM</span>
              </div>
              <div className="flex items-center justify-center mt-2 gap-2">
                <Clock className="w-5 h-5 text-rose-400" />
                <span className="text-gray-700">Reception: 5:00 PM</span>
              </div>
            </Card>

            <Card className="bg-white/90 border-none shadow-lg rounded-2xl transition-shadow text-center p-6">
              <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-rose-200">
                <MapPin className="w-8 h-8 text-rose-500" />
              </div>
              <h3 className="text-xl font-serif mb-3 text-rose-600">Where</h3>
              <p className="text-gray-700 font-medium mb-1">Rosewood Gardens</p>
              <p className="text-gray-600 mb-4">123 Blossom Avenue<br />Meadowville, CA 90210</p>
              <Button className="mt-6 bg-rose-500 hover:bg-rose-600 text-white rounded-full shadow-lg px-6 py-2 font-semibold">
                <Link href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="flex items-center">
                  View Map
                </Link>
              </Button>
            </Card>

            <Card className="bg-white/90 border-none shadow-lg rounded-2xl transition-shadow text-center p-6">
              <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-rose-200">
                <Music className="w-8 h-8 text-rose-500" />
              </div>
              <h3 className="text-xl font-serif mb-3 text-rose-600">What to Expect</h3>
              <ul className="text-left space-y-3 mt-4">
                <li className="flex items-start gap-2">
                  <span className="inline-block w-4 h-4 bg-rose-100 border-2 border-rose-300 rounded-full flex-shrink-0 mt-1"></span>
                  <span className="text-gray-700">Outdoor ceremony in the garden pavilion</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="inline-block w-4 h-4 bg-rose-100 border-2 border-rose-300 rounded-full flex-shrink-0 mt-1"></span>
                  <span className="text-gray-700">Cocktail hour with live music</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="inline-block w-4 h-4 bg-rose-100 border-2 border-rose-300 rounded-full flex-shrink-0 mt-1"></span>
                  <span className="text-gray-700">Dinner & dancing in the grand ballroom</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="inline-block w-4 h-4 bg-rose-100 border-2 border-rose-300 rounded-full flex-shrink-0 mt-1"></span>
                  <span className="text-gray-700">Dress code: Semi-formal attire</span>
                </li>
              </ul>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <Card className="bg-white/90 border-none shadow-lg rounded-2xl p-8">
              <h3 className="text-2xl font-serif mb-4 text-rose-600 border-b-2 border-rose-100 pb-2">Accommodations</h3>
              <p className="text-gray-700 mb-4">We've reserved a block of rooms at the Meadowville Grand Hotel for our out-of-town guests.</p>
              <div className="space-y-3 text-gray-700">
                <p>
                  <span className="font-medium">Meadowville Grand Hotel</span><br />456 Evergreen Road<br />Meadowville, CA 90210
                </p>
                <p><span className="font-medium">Reservation Code:</span> EMMA&JAMES2023</p>
                <p><span className="font-medium">Phone:</span> (555) 123-4567</p>
              </div>
              <Button className="mt-6 bg-rose-500 hover:bg-rose-600 text-white rounded-full shadow-lg px-6 py-2 font-semibold">
                <Link href="https://hotel.example.com" target="_blank" rel="noopener noreferrer">Book Your Room</Link>
              </Button>
            </Card>
            <Card className="bg-white/90 border-none shadow-lg rounded-2xl p-8">
              <h3 className="text-2xl font-serif mb-4 text-rose-600 border-b-2 border-rose-100 pb-2">Transportation</h3>
              <p className="text-gray-700 mb-4">We'll be providing shuttle service between the Meadowville Grand Hotel and the wedding venue.</p>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <Clock className="w-5 h-5 text-rose-400 mt-1" />
                  <div>
                    <p className="font-medium text-rose-600">To Ceremony:</p>
                    <p className="text-gray-700">Departing hotel at 2:00 PM & 2:30 PM</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Clock className="w-5 h-5 text-rose-400 mt-1" />
                  <div>
                    <p className="font-medium text-rose-600">Return to Hotel:</p>
                    <p className="text-gray-700">Departing venue at 10:00 PM & 11:00 PM</p>
                  </div>
                </div>
              </div>
              <p className="mt-4 text-gray-700">If you plan to drive, parking is complimentary at the venue.</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Wedding Party Section */}
      <section id="wedding-party" className="py-20 bg-rose-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <img src="/background/floral-design_transparent.png" alt="Floral decoration" className="mx-auto mb-2 w-32 md:w-48 pointer-events-none select-none" />
            <div className="inline-block rounded-2xl px-8 py-3 bg-rose-500 shadow-lg mb-4">
              <h2 className="text-3xl md:text-4xl text-white font-bold tracking-wide">
                Wedding <span className="italic font-normal">Party</span>
              </h2>
            </div>
            <div className="w-20 h-1 bg-rose-400 mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">Meet the special people who will be standing by our side</p>
          </div>

          <WeddingParty />
        </div>
      </section>

      {/* RSVP Section */}
      <section id="rsvp" className="relative py-20 bg-rose-50">
        <div className="container mx-auto px-4">
          <RsvpForm />
        </div>
      </section>

      {/* Registry Section */}
      <section id="registry" className="relative py-20 bg-rose-50">
        <div className="container mx-auto px-4">
          <RegistrySection />
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="relative py-20 bg-rose-50">
        <div className="container mx-auto px-4">
          <FaqSection />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Couple Info */}
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-serif font-light mb-4">
                Lance <span className="font-bold">&</span> Rosa
              </h2>
              <p className="text-gray-400 mb-4">We can't wait to celebrate with you on our special day!</p>
              <div className="flex justify-center md:justify-start gap-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <div className="grid grid-cols-2 gap-2">
                <a href="#home" className="text-gray-400 hover:text-white transition-colors">Home</a>
                <a href="#story" className="text-gray-400 hover:text-white transition-colors">Our Story</a>
                <a href="#photos" className="text-gray-400 hover:text-white transition-colors">Photos</a>
                <a href="#details" className="text-gray-400 hover:text-white transition-colors">Details</a>
                <a href="#wedding-party" className="text-gray-400 hover:text-white transition-colors">Wedding Party</a>
                <a href="#rsvp" className="text-gray-400 hover:text-white transition-colors">RSVP</a>
                <a href="#registry" className="text-gray-400 hover:text-white transition-colors">Registry</a>
                <a href="#faq" className="text-gray-400 hover:text-white transition-colors">FAQ</a>
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <div className="space-y-3">
                <div className="flex items-center text-gray-400">
                  <MapPin className="w-5 h-5 mr-2" />
                  <span>123 Wedding Venue, City, Country</span>
                </div>
                <div className="flex items-center text-gray-400">
                  <Phone className="w-5 h-5 mr-2" />
                  <span>+1 234 567 8900</span>
                </div>
                <div className="flex items-center text-gray-400">
                  <Mail className="w-5 h-5 mr-2" />
                  <span>contact@lanceandrosa.com</span>
                </div>
              </div>
            </div>

            {/* QR Code */}
            <ShareSection />
          </div>

          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-500 mb-4 md:mb-0">&copy; {new Date().getFullYear()} | Lance & Rosa Wedding</p>
              <div className="flex gap-4 text-sm text-gray-500">
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              </div>
            </div>
            <div className="mt-8 flex justify-center">
              <AudioPlayer />
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
