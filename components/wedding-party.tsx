"use client"

import Image from "next/image"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

// Data for each group
const happyCouple = [
  {
    id: 1,
    name: "Lance Padilla",
    role: "Groom",
    description:
      "Lance John Elago Ford, known professionally as Lance Padilla, is a Filipino actor and singer. He is a recipient of multiple accolades across television, film, and music, including the FAMAS Award for Best Actor and PMPC Star Award for Movie Actor of the Year, as well as three World Music Awards nominations.",
    image: "/weddingParty/avatar.png?height=300&width=300",
  },
  {
    id: 2,
    name: "Rosa Bernardo",
    role: "Bride",
    description:
      "She is the youngest of four siblings and was raised by her parents, Luzviminda and Teodore Bernardo. Initially, Bernardo was raised as a member of Iglesia ni Cristo. However, it is believed that she converted to born again around 2016",
    image: "/weddingParty/image.png?height=300&width=300",
  },
]

const groomParents = [
  {
    id: 101,
    name: "Rommel Padilla",
    role: "Father of the Groom",
    description: "Father",
    image: "/weddingParty/avatar.png?height=300&width=300",
  },
  {
    id: 102,
    name: "Karla Estrada",
    role: "Mother of the Groom",
    description: "Mother",
    image: "/weddingParty/image.png?height=300&width=300",
  },
]
const brideParents = [
  {
    id: 201,
    name: "James Doe",
    role: "Father of the Bride",
    description: "Father",
    image: "/weddingParty/avatar.png?height=300&width=300",
  },
  {
    id: 202,
    name: "Elizabeth Doe",
    role: "Mother of the Bride",
    description: "Mother",
    image: "/weddingParty/image.png?height=300&width=300",
  },
]

const entourage = [
  {
    id: 301,
    name: "Michael Brown",
    role: "Best Man",
    description: "John's best friend since college",
    image: "/weddingParty/avatar.png?height=300&width=300",
  },
  {
    id: 302,
    name: "Sarah Johnson",
    role: "Maid of Honor",
    description: "Jane's sister and closest confidante",
    image: "/weddingParty/image.png?height=300&width=300",
  },
  {
    id: 303,
    name: "David Lee",
    role: "Groomsman",
    description: "College roommate",
    image: "/weddingParty/avatar.png?height=300&width=300",
  },
  {
    id: 304,
    name: "Richard Wilson",
    role: "Groomsman",
    description: "Childhood friend",
    image: "/weddingParty/avatar.png?height=300&width=300",
  },
  {
    id: 305,
    name: "Emily Wilson",
    role: "Bridesmaid",
    description: "Best friend from art school",
    image: "/weddingParty/image.png?height=300&width=300",
  },
  {
    id: 306,
    name: "Jessica Taylor",
    role: "Bridesmaid",
    description: "Cousin and childhood friend",
    image: "/weddingParty/image.png?height=300&width=300",
  },
  {
    id: 307,
    name: "Tommy Wilson",
    role: "Ring Bearer",
    description: "The groom's nephew",
    image: "/weddingParty/avatar.png?height=300&width=300",
  },
  {
    id: 308,
    name: "Jimmy Parker",
    role: "Coin Bearer",
    description: "The bride's nephew",
    image: "/weddingParty/avatar.png?height=300&width=300",
  },
  {
    id: 309,
    name: "Billy Thompson",
    role: "Bible Bearer",
    description: "The groom's cousin",
    image: "/weddingParty/avatar.png?height=300&width=300",
  },
]

const flowerGirls = [
  {
    id: 401,
    name: "Lily Anderson",
    role: "Flower Girl",
    description: "The bride's niece",
    image: "/weddingParty/image.png?height=300&width=300",
  },
  {
    id: 402,
    name: "Rose Martinez",
    role: "Flower Girl",
    description: "The groom's niece",
    image: "/weddingParty/image.png?height=300&width=300",
  },
]

const veilSponsors = [
  {
    id: 501,
    name: "Thomas Anderson",
    role: "Veil Sponsor",
    description: "Family friend",
    image: "/weddingParty/avatar.png?height=300&width=300",
  },
  {
    id: 502,
    name: "Margaret Anderson",
    role: "Veil Sponsor",
    description: "Family friend",
    image: "/weddingParty/image.png?height=300&width=300",
  },
]

const cordSponsors = [
  {
    id: 601,
    name: "Robert Wilson",
    role: "Cord Sponsor",
    description: "Uncle of the groom",
    image: "/weddingParty/avatar.png?height=300&width=300",
  },
  {
    id: 602,
    name: "Patricia Wilson",
    role: "Cord Sponsor",
    description: "Aunt of the groom",
    image: "/weddingParty/image.png?height=300&width=300",
  },
]

const candleSponsors = [
  {
    id: 701,
    name: "William Taylor",
    role: "Candle Sponsor",
    description: "Uncle of the bride",
    image: "/weddingParty/avatar.png?height=300&width=300",
  },
  {
    id: 702,
    name: "Catherine Taylor",
    role: "Candle Sponsor",
    description: "Aunt of the bride",
    image: "/weddingParty/image.png?height=300&width=300",
  },
]

const principalSponsors = [
  {
    id: 801,
    name: "Thomas Anderson",
    role: "Principal Sponsor",
    description: "Godfather\nMentor and family friend",
    image: "/weddingParty/avatar.png?height=300&width=300",
  },
  {
    id: 802,
    name: "Margaret Anderson",
    role: "Principal Sponsor",
    description: "Godmother\nFamily friend and spiritual guide",
    image: "/weddingParty/image.png?height=300&width=300",
  },
  {
    id: 803,
    name: "William Taylor",
    role: "Principal Sponsor",
    description: "Godfather\nBusiness mentor",
    image: "/weddingParty/avatar.png?height=300&width=300",
  },
  {
    id: 804,
    name: "Patricia Taylor",
    role: "Principal Sponsor",
    description: "Godmother\nLife mentor",
    image: "/weddingParty/image.png?height=300&width=300",
  },
]

interface SectionHeaderProps {
  label: string;
  description?: string;
}

function SectionHeader({ label, description }: SectionHeaderProps) {
  return (
    <div className="flex flex-col items-center mb-8">
      <img src="/background/floral-design_transparent.png" alt="Floral decoration" className="mx-auto mb-2 w-24 md:w-32 pointer-events-none select-none" />
      <div className="inline-block rounded-2xl px-8 py-3 bg-rose-500 shadow-lg mb-2 text-center">
        <h3 className="text-2xl md:text-3xl text-white font-bold tracking-wide font-serif">{label}</h3>
      </div>
      {description && <p className="text-gray-700 text-base md:text-lg mt-2 max-w-2xl text-center">{description}</p>}
    </div>
  )
}

interface PartyMemberCardProps {
  member: {
    id: number;
    name: string;
    role: string;
    description?: string;
    image: string;
  }
  onClick: () => void
}

const PLACEHOLDER_DESCRIPTION = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam euismod, urna eu tincidunt consectetur, nisi nisl aliquam enim, eget facilisis massa enim nec sem."

function PartyMemberCard({ member, onClick }: PartyMemberCardProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <motion.button
      className="focus:outline-none w-full h-full"
      onClick={onClick}
      aria-label={`View details for ${member.name}`}
      tabIndex={0}
      type="button"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card
        className={`
          relative overflow-hidden rounded-2xl border border-rose-200
          bg-gradient-to-br from-rose-50 via-white to-rose-100
          shadow-lg transition-all duration-300
          hover:shadow-2xl hover:border-rose-300
          before:absolute before:inset-0 before:bg-[url('/background/floral-swirls.svg')] before:bg-no-repeat before:bg-right-top before:opacity-10 before:pointer-events-none
          group flex flex-col items-center justify-start pt-8 pb-4
        `}
      >
        <img 
          src="/background/floral-design_transparent.png" 
          alt="Floral decoration" 
          className="absolute top-2 right-2 w-10 opacity-60 pointer-events-none select-none z-10" 
        />
        <div className="flex flex-col items-center w-full">
          <motion.div
            className="rounded-full border-4 border-rose-200 shadow-md bg-white h-32 w-32 flex items-center justify-center relative"
            whileHover={{ scale: 1.07, boxShadow: "0 0 0 6px #f43f5e33" }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-rose-50">
                <div className="w-8 h-8 border-4 border-rose-200 border-t-rose-500 rounded-full animate-spin" />
              </div>
            )}
            <Image 
              src={member.image || "/placeholder.svg"} 
              alt={member.name} 
              fill 
              className={`object-cover object-center rounded-full transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
              onLoadingComplete={() => setIsLoading(false)}
            />
          </motion.div>
        </div>
        <CardContent className="p-4 text-center flex-1 flex flex-col justify-between items-center w-full">
          <div className="w-full">
            <h4 className="font-script text-2xl font-semibold mb-1 text-rose-600">{member.name}</h4>
            <p className="font-serif font-semibold text-rose-500 text-lg mb-1">{member.role}</p>
            <p className="text-gray-600 text-base whitespace-pre-line min-h-[3.5rem] line-clamp-3">
              {member.description || PLACEHOLDER_DESCRIPTION}
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.button>
  );
}

function PartyMemberModal({ 
  member, 
  open, 
  onClose,
  onNext,
  onPrev,
  hasNext,
  hasPrev 
}: { 
  member: PartyMemberCardProps["member"]; 
  open: boolean; 
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  hasNext: boolean;
  hasPrev: boolean;
}): React.ReactElement | null {
  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.25 }}
          className="relative bg-white rounded-2xl shadow-2xl border-4 border-rose-200 max-w-md w-full p-6 flex flex-col items-center"
        >
          <img 
            src="/background/floral-design_transparent.png" 
            alt="Floral decoration" 
            className="mx-auto mb-2 w-24 pointer-events-none select-none" 
          />
          
          {/* Navigation Buttons */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-2 pointer-events-none">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onPrev}
              disabled={!hasPrev}
              className={`p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-lg border border-rose-200 
                ${hasPrev ? 'text-rose-500 hover:bg-rose-500 hover:text-white' : 'text-gray-300 cursor-not-allowed'}
                pointer-events-auto transition-colors`}
              aria-label="Previous member"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onNext}
              disabled={!hasNext}
              className={`p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-lg border border-rose-200 
                ${hasNext ? 'text-rose-500 hover:bg-rose-500 hover:text-white' : 'text-gray-300 cursor-not-allowed'}
                pointer-events-auto transition-colors`}
              aria-label="Next member"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </div>

          <button
            className="absolute top-4 right-4 bg-white text-rose-500 hover:bg-rose-500 hover:text-white rounded-full p-2 shadow-lg transition-colors z-20 border border-rose-200"
            onClick={onClose}
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </button>

          <motion.div 
            key={member.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="relative h-40 w-40 mt-2 mb-4 flex items-center justify-center bg-white rounded-full border-4 border-rose-200 shadow-md overflow-hidden"
          >
            <Image 
              src={member.image || "/placeholder.svg"} 
              alt={member.name} 
              fill 
              className="object-cover object-center rounded-full" 
            />
          </motion.div>

          <motion.h4 
            key={`name-${member.id}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-script text-2xl font-semibold mb-1 text-center text-rose-600"
          >
            {member.name}
          </motion.h4>
          
          <motion.p 
            key={`role-${member.id}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-serif font-semibold text-rose-500 text-lg mb-2 text-center"
          >
            {member.role}
          </motion.p>

          <div className="w-16 h-1 bg-rose-400 rounded-full mx-auto mb-4"></div>
          
          <motion.p 
            key={`desc-${member.id}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-gray-600 text-base whitespace-pre-line text-center"
          >
            {member.description || PLACEHOLDER_DESCRIPTION}
          </motion.p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// Sticky Navigation Component
function StickyNav({ sections, activeSection, onSectionClick }: { 
  sections: { id: string; label: string }[]; 
  activeSection: string;
  onSectionClick: (id: string) => void;
}) {
  return (
    <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-rose-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex overflow-x-auto py-4 space-x-4 scrollbar-hide">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => onSectionClick(section.id)}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors
                ${activeSection === section.id 
                  ? 'bg-rose-500 text-white' 
                  : 'bg-rose-50 text-rose-600 hover:bg-rose-100'}`}
            >
              {section.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function WeddingParty() {
  const [selectedMember, setSelectedMember] = useState<PartyMemberCardProps["member"] | null>(null);
  const [activeSection, setActiveSection] = useState("happy-couple");
  const [allMembers] = useState(() => [
    ...happyCouple,
    ...groomParents,
    ...brideParents,
    ...entourage,
    ...flowerGirls,
    ...veilSponsors,
    ...cordSponsors,
    ...candleSponsors,
    ...principalSponsors,
  ]);
  
  const currentIndex = selectedMember ? allMembers.findIndex(m => m.id === selectedMember.id) : -1;

  const sections = [
    { id: "happy-couple", label: "The Happy Couple" },
    { id: "parents", label: "Our Beloved Parents" },
    { id: "entourage", label: "The Bridal Entourage" },
    { id: "flower-girls", label: "Flower Girls" },
    { id: "sponsors", label: "Wedding Sponsors" },
  ];

  const handleSectionClick = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative">
      {/* <StickyNav 
        sections={sections} 
        activeSection={activeSection} 
        onSectionClick={handleSectionClick} 
      /> */}
      
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-24">
        <div id="happy-couple">
          <SectionHeader 
            label="The Happy Couple" 
            description="Together in love, forever in harmony" 
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {happyCouple.map((member) => (
              <PartyMemberCard 
                key={member.id} 
                member={member} 
                onClick={() => setSelectedMember(member)} 
              />
            ))}
          </div>
        </div>

        <div id="parents">
          <SectionHeader 
            label="Our Beloved Parents" 
            description="With deepest gratitude and love" 
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-bold text-rose-500 mb-2 text-center">Groom's Parents</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {groomParents.map((member) => (
                  <PartyMemberCard 
                    key={member.id} 
                    member={member} 
                    onClick={() => setSelectedMember(member)} 
                  />
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-lg font-bold text-rose-500 mb-2 text-center">Bride's Parents</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {brideParents.map((member) => (
                  <PartyMemberCard 
                    key={member.id} 
                    member={member} 
                    onClick={() => setSelectedMember(member)} 
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div id="entourage">
          <SectionHeader 
            label="The Bridal Entourage" 
            description="Our cherished friends and family who make our day special" 
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {entourage.map((member) => (
              <PartyMemberCard 
                key={member.id} 
                member={member} 
                onClick={() => setSelectedMember(member)} 
              />
            ))}
          </div>
        </div>

        <div id="flower-girls">
          <SectionHeader 
            label="Flower Girls" 
            description="Our precious little angels spreading joy and flowers" 
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {flowerGirls.map((member) => (
              <PartyMemberCard 
                key={member.id} 
                member={member} 
                onClick={() => setSelectedMember(member)} 
              />
            ))}
          </div>
        </div>

        <div id="sponsors">
          <SectionHeader 
            label="Wedding Sponsors" 
            description="Our mentors and guides, whose wisdom lights our path" 
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {[...veilSponsors, ...cordSponsors, ...candleSponsors, ...principalSponsors].map((member) => (
              <PartyMemberCard 
                key={member.id} 
                member={member} 
                onClick={() => setSelectedMember(member)} 
              />
            ))}
          </div>
        </div>
      </div>

      <PartyMemberModal 
        member={selectedMember!} 
        open={!!selectedMember} 
        onClose={() => setSelectedMember(null)}
        onNext={() => {
          if (currentIndex < allMembers.length - 1) {
            setSelectedMember(allMembers[currentIndex + 1]);
          }
        }}
        onPrev={() => {
          if (currentIndex > 0) {
            setSelectedMember(allMembers[currentIndex - 1]);
          }
        }}
        hasNext={currentIndex < allMembers.length - 1}
        hasPrev={currentIndex > 0}
      />
    </div>
  );
}
