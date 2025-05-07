"use client"

import { useState, useEffect, useRef } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { v4 as uuidv4 } from "uuid"
import { Loader2, CheckCircle, AlertCircle, UserPlus, Calendar, Mail, MessageSquare, RefreshCw, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import type { RSVPEntry } from "@/components/guest-counter"
import Stack from './Stack'
import { Marquee } from "@/components/ui/marquee"


// Constants
const GOOGLE_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSejSnwGH9gZJm_JuXrVq0yd8ncHKu5ZqyMKG-4bcw2zOtWKJw/formResponse"
const GOOGLE_SHEET_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vSvwEIvTyS6nA_UhkWiqUwU9gNe5wfTSO144N_rul9eNrhsRE48mDLFIOmCFVhiFEBbMwCHftLvU5Dp/pubhtml"
const RSVP_STORAGE_KEY = "wedding-rsvp-entries"

// Form schema
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  guestCount: z.string().refine((val) => !isNaN(Number.parseInt(val)), {
    message: "Please select the number of guests",
  }),
  message: z.string().optional(),
})

const images = [
  { id: 1, img: "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=500&auto=format" },
  { id: 2, img: "https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=500&auto=format" },
  { id: 3, img: "https://images.unsplash.com/photo-1452626212852-811d58933cae?q=80&w=500&auto=format" },
  { id: 4, img: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=500&auto=format" }
];

export default function RsvpForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [rsvpEntries, setRsvpEntries] = useState<RSVPEntry[]>([])
  const [totalGuests, setTotalGuests] = useState(0)
  const [activeTab, setActiveTab] = useState("form")
  const [isLoading, setIsLoading] = useState(false)


  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      guestCount: "1",
      message: "",
    },
  })

  // Fetch RSVP entries from Google Apps Script endpoint ONLY (no localStorage, no fallback)
  const fetchAndUpdateEntries = async () => {
    setIsLoading(true)
    setError(null)

    try {
      // Fetch from Google Apps Script endpoint
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbyds6WEYLzHKj-1P9NMIJllY0F1pLBgPJNCcL_CjyUM9EUAmwGVpsx4bf7AfTMgCDjU9A/exec",
        { cache: "no-store" }
      )
      if (!response.ok) throw new Error("Failed to fetch guest list from Google Sheet")
      const data = await response.json()
      const rows: string[][] = data.GoogleSheetData
      if (!Array.isArray(rows) || rows.length < 2) throw new Error("No RSVP data found")

      // The first row is the header
      const header = rows[0]
      const entries = rows.slice(1)

      // Map Google Sheet rows to RSVPEntry objects
      const apiEntries: RSVPEntry[] = entries.map((row, idx) => {
        const rowObj: Record<string, string> = {}
        header.forEach((col, i) => {
          rowObj[col] = row[i] || ""
        })
        return {
          id: `api-${idx}-${rowObj["Email"] || rowObj["Full Name"] || idx}`,
          name: rowObj["Full Name"] || "Guest",
          email: rowObj["Email"] || `no-email-${idx}@example.com`,
          guestCount: Number.parseInt(rowObj["Number Of Guests"] || "1"),
          message: rowObj["Message"] || undefined,
          date: rowObj["Timestamp"] || new Date().toISOString(),
          source: "api",
        }
      })

      // Set state directly from API
      setRsvpEntries(apiEntries)
      setTotalGuests(apiEntries.reduce((sum, entry) => sum + entry.guestCount, 0))
    } catch (error) {
      console.error("Failed to load entries:", error)
      setError("Failed to load entries. Please try again.")
      setRsvpEntries([])
      setTotalGuests(0)
    } finally {
      setIsLoading(false)
    }
  }

  // Load saved entries from localStorage on component mount
  useEffect(() => {
    fetchAndUpdateEntries()

    // Set up event listener for RSVP updates
    const handleRsvpUpdate = () => {
      fetchAndUpdateEntries()
    }

    window.addEventListener("rsvpUpdated", handleRsvpUpdate)

    return () => {
      window.removeEventListener("rsvpUpdated", handleRsvpUpdate)
    }
  }, [])

  // Update the onSubmit function to match the Google Sheet format
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true)
    setError(null)

    try {
      console.log("Submitting RSVP form...", values)

      // Create form data for Google Form submission
      const formData = new URLSearchParams()
      formData.append("entry.405401269", values.name) // Full Name
      formData.append("entry.1755234596", values.email) // Email
      formData.append("entry.1335956832", values.guestCount) // Number of Guests
      formData.append("entry.893740636", values.message || "") // Message

      // Submit to Google Form using a hidden iframe
      const form = document.createElement("form")
      form.method = "POST"
      form.action = GOOGLE_FORM_URL
      form.target = "hidden-iframe"
      form.style.display = "none"

      // Add form fields
      for (const [key, value] of formData.entries()) {
        const input = document.createElement("input")
        input.type = "hidden"
        input.name = key
        input.value = value
        form.appendChild(input)
      }

      // Create hidden iframe if it doesn't exist
      let iframe = document.getElementById("hidden-iframe") as HTMLIFrameElement
      if (!iframe) {
        iframe = document.createElement("iframe")
        iframe.name = "hidden-iframe"
        iframe.id = "hidden-iframe"
        iframe.style.display = "none"
        document.body.appendChild(iframe)
      }

      // Add form to document and submit
      document.body.appendChild(form)
      form.submit()
      document.body.removeChild(form)

      // Create a new entry from the submitted data
      const newEntry: RSVPEntry = {
        id: uuidv4(),
        name: values.name,
        email: values.email,
        guestCount: Number.parseInt(values.guestCount) || 1,
        message: values.message,
        date: new Date().toLocaleString("en-US", {
          year: "numeric",
          month: "numeric",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
        }),
        source: "local",
      }

      // Get existing entries
      let existingEntries: RSVPEntry[] = []
      try {
        const savedEntries = localStorage.getItem(RSVP_STORAGE_KEY)
        if (savedEntries) {
          existingEntries = JSON.parse(savedEntries)
        }
      } catch (error) {
        console.error("Failed to load saved entries:", error)
      }

      // Add the new entry
      const updatedEntries = [newEntry, ...existingEntries]

      // Save to localStorage
      try {
        localStorage.setItem(RSVP_STORAGE_KEY, JSON.stringify(updatedEntries))
        console.log("Saved updated entries to localStorage")

        // Update state
        setRsvpEntries(updatedEntries)
        setTotalGuests((prev) => prev + (Number.parseInt(values.guestCount) || 1))

        // Dispatch a custom event to notify other components of the update
        window.dispatchEvent(new Event("rsvpUpdated"))
      } catch (error) {
        console.error("Failed to save to localStorage:", error)
        setError("Failed to save your RSVP locally. Please try again.")
      }

      // Show success message and reset form
      setIsSuccess(true)
      form.reset()

      // Switch to responses tab after successful submission
      setTimeout(() => {
        setActiveTab("responses")
      }, 1500)

      // Fetch updated data after a delay to allow Google Sheets to update
      setTimeout(() => {
        fetchAndUpdateEntries()
      }, 5000) // Try after 5 seconds to get the updated list

    } catch (error) {
      console.error("Error submitting form:", error)
      setError("There was a problem submitting your RSVP. Please try again.")
    } finally {
      setIsSubmitting(false)
      // Reset success message after a delay
      setTimeout(() => {
        setIsSuccess(false)
      }, 5000)
    }
  }

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-4 px-2 bg-rose-50">
      <div className="flex flex-col md:flex-row w-full max-w-6xl bg-white/90 shadow-2xl rounded-2xl overflow-hidden border-none">
        {/* Couple Image Section - Adjusted for mobile */}
        <div className="w-full md:w-2/5 flex flex-col items-center justify-center bg-rose-100 p-4 md:p-10">
          <div className="relative flex items-center justify-center w-full" style={{ minHeight: 180 }}>
            <Stack
              sensitivity={150}
              sendToBackOnClick={false}
              cardDimensions={{ width: 250, height: 450 }}
              cardsData={images}
              animationConfig={{ stiffness: 200, damping: 25 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-rose-100/50 to-transparent rounded-2xl pointer-events-none" />
          </div>
          <div className="text-center space-y-1 mt-2">
            <h2 className="text-xl md:text-3xl font-script text-rose-600">Lance &amp; Rosa</h2>
            <p className="text-rose-500 text-sm md:text-base font-medium leading-relaxed">
              Together with their families<br />
              invite you to celebrate their wedding
            </p>
          </div>
        </div>

        {/* RSVP Form Section - Mobile optimized */}
        <div className="w-full md:w-3/5 flex flex-col justify-center p-4 md:p-10">
          <Card className="border-none shadow-none bg-transparent">
            <CardHeader className="bg-transparent p-0 mb-2 md:mb-4 flex flex-col items-center">
              <img src="/background/floral-design_transparent.png" alt="Wedding Flowers" className="h-8 md:h-12 mb-2" />
              <CardTitle className="text-2xl md:text-3xl font-script text-rose-600 mb-1 text-center">Wedding RSVP</CardTitle>
              <CardDescription className="text-rose-500 text-sm md:text-base font-medium text-center">
                Please let us know if you'll be joining us
              </CardDescription>
            </CardHeader>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="px-0 mt-4 md:mt-6 mb-4 md:mb-8 flex justify-center">
                <TabsList className="flex w-auto bg-rose-50/50 p-1.5 md:p-2 rounded-full shadow-lg gap-2 md:gap-3 border border-rose-100/50 backdrop-blur-sm">
                  <TabsTrigger
                    value="form"
                    className={`relative rounded-full px-4 md:px-6 py-2 md:py-3 font-semibold text-sm md:text-base transition-all duration-300 ease-in-out flex items-center gap-1.5 md:gap-2
                      ${activeTab === 'form'
                        ? 'bg-rose-500 text-white border-2 border-rose-500 shadow-md scale-105'
                        : 'bg-rose-100/80 text-rose-600 border-2 border-rose-200/50 hover:bg-rose-200/80 hover:scale-[1.02]'}
                    `}
                  >
                    <UserPlus className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 group-hover:scale-110" />
                    <span className="relative">RSVP</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="responses"
                    className={`relative rounded-full px-4 md:px-6 py-2 md:py-3 font-semibold text-sm md:text-base transition-all duration-300 ease-in-out flex items-center gap-1.5 md:gap-2
                      ${activeTab === 'responses'
                        ? 'bg-rose-500 text-white border-2 border-rose-500 shadow-md scale-105'
                        : 'bg-rose-100/80 text-rose-600 border-2 border-rose-200/50 hover:bg-rose-200/80 hover:scale-[1.02]'}
                    `}
                  >
                    <Users className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 group-hover:scale-110" />
                    <span className="relative">Guests</span>
                    <Badge className={`transition-all duration-300 text-xs md:text-sm ${
                      activeTab === 'responses'
                        ? 'bg-white/90 text-rose-500 border-none font-semibold px-2 md:px-3 py-0.5 ml-1 shadow-sm'
                        : 'bg-rose-100/90 text-rose-600 border-none font-semibold px-2 md:px-3 py-0.5 ml-1'
                    }`}>
                      {totalGuests}
                    </Badge>
                  </TabsTrigger>
                </TabsList>
              </div>
              <TabsContent value="form" className="h-[550px] md:h-[500px]">
                <CardContent className="p-0">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 md:space-y-4 h-full flex flex-col max-w-2xl mx-auto">
                      <div className="flex-1 overflow-y-auto pr-2">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-rose-600 font-semibold text-sm md:text-base">Full Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter your full name" {...field} className="bg-rose-50 rounded-lg focus:ring-2 focus:ring-rose-300 border-rose-200 text-rose-700 placeholder:text-rose-400 text-sm md:text-base h-10 md:h-11" />
                              </FormControl>
                              <FormMessage className="text-xs md:text-sm" />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-rose-600 font-semibold text-sm md:text-base">Email Address</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter your email address" {...field} className="bg-rose-50 rounded-lg focus:ring-2 focus:ring-rose-300 border-rose-200 text-rose-700 placeholder:text-rose-400 text-sm md:text-base h-10 md:h-11" />
                              </FormControl>
                              <FormMessage className="text-xs md:text-sm" />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="guestCount"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-rose-600 font-semibold text-sm md:text-base">Number of Guests</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="bg-rose-50 rounded-lg focus:ring-2 focus:ring-rose-300 border-rose-200 text-rose-700 placeholder:text-rose-400 text-sm md:text-base h-10 md:h-11">
                                    <SelectValue placeholder="Select number of guests" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className="bg-white text-rose-700">
                                  {[1, 2, 3, 4, 5].map((num) => (
                                    <SelectItem 
                                      key={num} 
                                      value={num.toString()} 
                                      className="text-sm md:text-base text-rose-700 hover:bg-rose-50 data-[state=checked]:bg-rose-100 data-[state=checked]:font-semibold"
                                    >
                                      {num} {num === 1 ? 'Guest' : 'Guests'}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage className="text-xs md:text-sm" />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="message"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-rose-600 font-semibold text-sm md:text-base">Message (Optional)</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Share a message or any dietary restrictions"
                                  className="resize-none bg-rose-50 rounded-lg focus:ring-2 focus:ring-rose-300 border-rose-200 text-rose-700 placeholder:text-rose-400 text-sm md:text-base min-h-[80px] md:min-h-[100px]"
                                  {...field}
                                />
                              </FormControl>
                              <FormDescription className="text-xs md:text-sm text-rose-400">
                                Let us know if you have any dietary restrictions or special requests.
                              </FormDescription>
                              <FormMessage className="text-xs md:text-sm" />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="pt-2 mt-auto">
                        <Button
                          type="submit"
                          className="w-full bg-rose-500 hover:bg-rose-600 text-white text-base md:text-lg font-semibold py-2.5 md:py-3 rounded-xl shadow-md transition-all duration-200"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              <span className="text-sm md:text-base">Submitting...</span>
                            </>
                          ) : (
                            "Submit RSVP"
                          )}
                        </Button>

                        {isSuccess && (
                          <div className="flex items-center justify-center mt-3 p-2 bg-green-50 text-green-700 rounded-md shadow-sm text-sm md:text-base">
                            <CheckCircle className="h-4 w-4 md:h-5 md:w-5 mr-2" />
                            <span>Thank you! Your RSVP has been submitted successfully.</span>
                          </div>
                        )}

                        {error && (
                          <div className="flex items-center justify-center mt-3 p-2 bg-rose-100 text-rose-700 rounded-md shadow-sm text-sm md:text-base">
                            <AlertCircle className="h-4 w-4 md:h-5 md:w-5 mr-2" />
                            <span>{error}</span>
                          </div>
                        )}
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </TabsContent>
              <TabsContent value="responses" className="h-[550px] md:h-[500px]">
                <CardContent className="p-0">
                  <div className="space-y-3 md:space-y-4 h-full">
                    {isLoading ? (
                      <div className="flex items-center justify-center h-full">
                        <Loader2 className="h-6 w-6 md:h-8 md:w-8 animate-spin text-rose-600" />
                      </div>
                    ) : error ? (
                      <div className="flex items-center justify-center h-full text-red-500 text-sm md:text-base">
                        <AlertCircle className="h-6 w-6 md:h-8 md:w-8 mr-2" />
                        {error}
                      </div>
                    ) : rsvpEntries.length === 0 ? (
                      <div className="flex items-center justify-center h-full text-rose-500 text-sm md:text-base">
                        <MessageSquare className="h-6 w-6 md:h-8 md:w-8 mr-2" />
                        No responses yet
                      </div>
                    ) : (
                      <Marquee
                        vertical
                        pauseOnHover
                        className="h-[calc(550px-80px)] md:h-[calc(500px-80px)]"
                      >
                        {rsvpEntries.map((entry, idx) => (
                          <Card key={entry.id} className={`${idx % 2 === 0 ? "bg-rose-50" : "bg-white"} border-none shadow-sm rounded-xl mb-4`}>
                            <CardContent className="p-3 md:p-4">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4 className="font-medium text-base md:text-lg text-rose-700">{entry.name}</h4>
                                  <div className="flex items-center text-xs md:text-sm text-rose-400 mt-1">
                                    <Mail className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                                    <span>{entry.email}</span>
                                  </div>
                                </div>
                                <div className="flex flex-col items-end">
                                  <Badge
                                    variant="outline"
                                    className={`bg-rose-200 text-rose-700 border-none font-semibold px-2 md:px-3 py-0.5 md:py-1 rounded-full text-xs md:text-sm`}
                                  >
                                    {entry.guestCount} {entry.guestCount === 1 ? "Guest" : "Guests"}
                                  </Badge>
                                  <span className="text-[10px] md:text-xs text-rose-400 mt-1">
                                    {entry.source === "api" ? "Google Sheet" : "Website"}
                                  </span>
                                </div>
                              </div>

                              {entry.message && (
                                <div className="mt-2 md:mt-3 pt-2 md:pt-3 border-t border-rose-100">
                                  <div className="flex items-start">
                                    <MessageSquare className="h-3 w-3 md:h-4 md:w-4 mr-1 mt-0.5 text-rose-300" />
                                    <p className="text-xs md:text-sm text-rose-600">{entry.message}</p>
                                  </div>
                                </div>
                              )}

                              <div className="mt-2 md:mt-3 text-[10px] md:text-xs text-rose-300 flex items-center">
                                <Calendar className="h-3 w-3 mr-1" />
                                <span>Submitted: {formatDate(entry.date)}</span>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </Marquee>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-center border-t pt-3 md:pt-4 bg-rose-50 rounded-b-2xl">
                  <Button
                    variant="outline"
                    className="flex items-center gap-2 text-rose-600 hover:text-rose-700 hover:bg-rose-100/50 border-rose-200"
                    onClick={() => window.open('https://docs.google.com/spreadsheets/d/e/2PACX-1vSvwEIvTyS6nA_UhkWiqUwU9gNe5wfTSO144N_rul9eNrhsRE48mDLFIOmCFVhiFEBbMwCHftLvU5Dp/pubhtml', '_blank')}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-4 h-4"
                    >
                      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                      <polyline points="14 2 14 8 20 8" />
                      <path d="M8 13h8" />
                      <path d="M8 17h8" />
                      <path d="M8 9h1" />
                    </svg>
                    View in Google Sheets
                  </Button>
                </CardFooter>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </div>
  )
}
