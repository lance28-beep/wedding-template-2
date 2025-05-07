"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

interface NavLinkProps {
  href: string
  label: string
  isScrolled: boolean
  isActive?: boolean
  onClick?: () => void
}

interface MobileNavLinkProps {
  href: string
  label: string
  onClick: () => void
  isActive?: boolean
}

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }

      // Update active section based on scroll position
      const sections = ["home", "story", "photos", "details", "wedding-party", "rsvp", "registry", "faq"]
      const currentSection = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          // Consider a section active when its top is near the top of the viewport
          // and it's not too far below
          return rect.top <= 150 && rect.bottom >= 150
        }
        return false
      })
      if (currentSection) {
        setActiveSection(currentSection)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const headerOffset = 100 // Increased offset to account for the header and some padding
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      })
    }
  }

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  const handleNavClick = (sectionId: string) => {
    scrollToSection(sectionId)
    closeMenu()
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-white/90 backdrop-blur-md shadow-lg py-2" 
          : "bg-white/10 backdrop-blur-sm py-3"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="font-script tracking-wide text-2xl md:text-3xl flex items-center gap-2">
            <span className={`relative ${isScrolled ? "text-rose-600" : "text-white"}`}>
              Lance <span className="font-bold">&</span> Rosa
              <motion.div
                className="absolute -top-2 -right-2"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-rose-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                    clipRule="evenodd"
                  />
                </svg>
              </motion.div>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink href="#home" label="Home" isScrolled={isScrolled} isActive={activeSection === "home"} onClick={() => handleNavClick("home")} />
            <NavLink href="#story" label="Our Story" isScrolled={isScrolled} isActive={activeSection === "story"} onClick={() => handleNavClick("story")} />
            <NavLink href="#photos" label="Photos" isScrolled={isScrolled} isActive={activeSection === "photos"} onClick={() => handleNavClick("photos")} />
            <NavLink href="#details" label="Details" isScrolled={isScrolled} isActive={activeSection === "details"} onClick={() => handleNavClick("details")} />
            <NavLink href="#wedding-party" label="Wedding Party" isScrolled={isScrolled} isActive={activeSection === "wedding-party"} onClick={() => handleNavClick("wedding-party")} />
            <NavLink href="#rsvp" label="RSVP" isScrolled={isScrolled} isActive={activeSection === "rsvp"} onClick={() => handleNavClick("rsvp")} />
            <NavLink href="#registry" label="Registry" isScrolled={isScrolled} isActive={activeSection === "registry"} onClick={() => handleNavClick("registry")} />
            <NavLink href="#faq" label="FAQ" isScrolled={isScrolled} isActive={activeSection === "faq"} onClick={() => handleNavClick("faq")} />
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className={`md:hidden relative w-10 h-10 rounded-full transition-all duration-300 ${
              isScrolled 
                ? "bg-white/80 backdrop-blur-md text-gray-900 hover:bg-white/90 hover:shadow-lg" 
                : "bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 hover:shadow-lg"
            }`}
            onClick={toggleMenu}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center justify-center"
                >
                  <X className="h-5 w-5" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center justify-center"
                >
                  <Menu className="h-5 w-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 md:hidden flex items-start justify-center"
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={closeMenu} />
            {/* Card-like menu */}
            <motion.div
              initial={{ y: -40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -40, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative w-11/12 max-w-sm mx-auto mt-6 bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl flex flex-col py-8 px-6 border border-gray-200"
            >
              <div className="flex items-center justify-between mb-8">
                <Link href="/" className="font-script font-light text-xl text-gray-900 flex items-center gap-2" onClick={closeMenu}>
                  Lance <span className="font-bold">&</span> Rosa
                  <motion.div
                    className="relative"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-rose-500 ml-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </motion.div>
                </Link>
                <button
                  onClick={closeMenu}
                  aria-label="Close menu"
                  className="ml-4 rounded-full p-2 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-rose-400"
                >
                  <X className="h-5 w-5 text-gray-900" />
                </button>
              </div>
              <hr className="mb-6 border-gray-200" />
              <nav className="flex flex-col space-y-4 pl-2">
                <MobileNavLink href="#home" label="Home" onClick={() => handleNavClick("home")} isActive={activeSection === "home"} />
                <MobileNavLink href="#story" label="Our Story" onClick={() => handleNavClick("story")} isActive={activeSection === "story"} />
                <MobileNavLink href="#photos" label="Photos" onClick={() => handleNavClick("photos")} isActive={activeSection === "photos"} />
                <MobileNavLink href="#details" label="Details" onClick={() => handleNavClick("details")} isActive={activeSection === "details"} />
                <MobileNavLink href="#wedding-party" label="Wedding Party" onClick={() => handleNavClick("wedding-party")} isActive={activeSection === "wedding-party"} />
                <MobileNavLink href="#rsvp" label="RSVP" onClick={() => handleNavClick("rsvp")} isActive={activeSection === "rsvp"} />
                <MobileNavLink href="#registry" label="Registry" onClick={() => handleNavClick("registry")} isActive={activeSection === "registry"} />
                <MobileNavLink href="#faq" label="FAQ" onClick={() => handleNavClick("faq")} isActive={activeSection === "faq"} />
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

function NavLink({ href, label, isScrolled, isActive, onClick }: NavLinkProps) {
  return (
    <motion.a
      href={href}
      onClick={(e) => {
        e.preventDefault()
        onClick?.()
      }}
      className={`text-sm font-medium transition-all duration-300 px-2 py-1 rounded-md ${
        isActive 
          ? "text-rose-500 font-semibold" 
          : isScrolled 
            ? "text-gray-700 hover:text-rose-500" 
            : "text-white hover:text-rose-500"
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {label}
    </motion.a>
  )
}

function MobileNavLink({ href, label, onClick, isActive }: MobileNavLinkProps) {
  return (
    <motion.a
      href={href}
      onClick={(e) => {
        e.preventDefault()
        onClick()
      }}
      className={`text-base font-medium transition-all duration-300 px-3 py-2 rounded-lg ${
        isActive 
          ? "bg-rose-50 text-rose-500 font-semibold" 
          : "text-gray-900 hover:text-rose-500 hover:bg-gray-50"
      }`}
      whileHover={{ x: 8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {label}
    </motion.a>
  )
}
