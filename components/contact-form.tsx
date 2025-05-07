"use client"

import { useState } from "react"
import { Calendar } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format } from "date-fns"

export default function ContactForm() {
  const [date, setDate] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted")
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg">
      <h3 className="text-2xl font-serif mb-6">Send Us a Message</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Your Name *
          </label>
          <Input id="name" placeholder="Enter your name" required />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Your Email *
          </label>
          <Input id="email" type="email" placeholder="Enter your email" required />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <Input id="phone" placeholder="Enter your phone number" />
        </div>
        <div>
          <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">
            Service Interested In *
          </label>
          <Select required>
            <SelectTrigger id="service">
              <SelectValue placeholder="Select a service" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="full">Full Planning</SelectItem>
              <SelectItem value="partial">Partial Planning</SelectItem>
              <SelectItem value="day-of">Day-of Coordination</SelectItem>
              <SelectItem value="destination">Destination Wedding</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Wedding Date</label>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full justify-start text-left font-normal">
              <Calendar className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <CalendarComponent mode="single" selected={date} onSelect={setDate} initialFocus />
          </PopoverContent>
        </Popover>
      </div>

      <div className="mb-4">
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
          Your Message *
        </label>
        <Textarea id="message" placeholder="Tell us about your wedding plans and how we can help" rows={5} required />
      </div>

      <Button type="submit" className="w-full bg-rose-500 hover:bg-rose-600 text-white">
        Send Message
      </Button>
    </form>
  )
}
