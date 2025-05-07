'use client';

import type React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaMoneyBillWave, FaExternalLinkAlt, FaQrcode, FaCopy, FaLink, FaWallet, FaPiggyBank, FaHeart, FaHandHoldingHeart, FaGift } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

interface Registry {
  id: number;
  name: string;
  description: string;
  url: string;
  icon: React.ReactNode;
  qrCode?: string;
  accountNumber?: string;
  isExternal?: boolean;
  bankName?: string;
  accountName?: string;
  additionalDetails?: string;
}

const registries: Registry[] = [
  {
    id: 1,
    name: "GCash",
    description: "Send your monetary gift through GCash",
    url: "",
    icon: <FaWallet className="text-3xl" />,
    accountNumber: "09123456789",
    accountName: "John & Jane Doe",
    qrCode: "/qr/gcash.png",
    additionalDetails: "Your presence at our wedding is the greatest gift of all. However, if you wish to give a monetary gift, we've provided our GCash details above. Thank you for your generosity! 💝"
  },
  {
    id: 2,
    name: "Bank Transfer",
    description: "Support our new journey together",
    url: "#bank-details",
    icon: <FaPiggyBank className="text-3xl" />,
    bankName: "BDO",
    accountName: "John Doe",
    accountNumber: "1234567890",
    additionalDetails: "We are grateful for your contribution to our new beginning. Your thoughtfulness means the world to us! ✨\n\nPlease include your name in the transfer reference so we can properly thank you."
  },
  {
    id: 3,
    name: "PayMaya",
    description: "Send your gift via PayMaya",
    url: "",
    icon: <FaMoneyBillWave className="text-3xl" />,
    accountNumber: "09876543210",
    accountName: "Jane Doe",
    qrCode: "/qr/maya.png",
    additionalDetails: "Thank you for being part of our special day and for your generous gift! 🙏"
  }
];

export default function RegistrySection() {
  const [mounted, setMounted] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [showQR, setShowQR] = useState<number | null>(null);
  const [selectedRegistry, setSelectedRegistry] = useState<Registry | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const copyToClipboard = (text: string) => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(text);
      toast.success('Account number copied to clipboard!');
    }
  };

  const handleRegistryClick = (registry: Registry) => {
    if (registry.url.startsWith('#')) {
      setSelectedRegistry(registry);
    } else if (registry.url.startsWith('http') && typeof window !== 'undefined') {
      window.open(registry.url, '_blank', 'noopener,noreferrer');
    } else if (registry.accountNumber) {
      setSelectedRegistry(registry);
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.2 * i,
        duration: 0.5,
        ease: "easeOut"
      }
    }),
    hover: {
      scale: 1.02,
      y: -5,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <section
      ref={ref}
      className="relative py-12 sm:py-16 md:py-24 px-4 sm:px-6 overflow-hidden bg-gradient-to-b from-white via-white to-rose-50/10"
    >
        {/* Floral Decorations */}
        <img src="/background/flower_border_transparent.png" alt="Floral border" className="absolute top-0 left-0 w-32 md:w-48 opacity-70 pointer-events-none select-none z-0" />
        <img src="/background/flower_border_transparent.png" alt="Floral border" className="absolute bottom-0 right-0 w-32 md:w-48 opacity-70 pointer-events-none select-none z-0 transform rotate-180" />

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-32 h-32 sm:w-64 sm:h-64 pointer-events-none">
        {/* <motion.div
          animate={{
            scale: [1, 1.05, 1],
            rotate: [0, 2, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          <Image
            src="/background/floral-design_transparent.png"
            alt="Wedding decoration"
            width={128}
            height={128}
            className="opacity-30"
            priority
            sizes="(max-width: 640px) 128px, 256px"
          />
        </motion.div> */}
      </div>
      <div className="absolute top-0 right-0 w-32 h-32 sm:w-64 sm:h-64 pointer-events-none">
        {/* <motion.div
          animate={{
            scale: [1, 1.05, 1],
            rotate: [90, 92, 90]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          <Image
            src="/background/floral-design_transparent.png"
            alt="Wedding decoration"
            width={128}
            height={128}
            className="opacity-30"
            priority
            sizes="(max-width: 640px) 128px, 256px"
          />
        </motion.div> */}
      </div>

      {/* Section Header */}
      <div className="text-center mb-12">
            <img src="/background/floral-design_transparent.png" alt="Floral decoration" className="mx-auto mb-2 w-32 md:w-48 pointer-events-none select-none" />
            <div className="inline-block rounded-2xl px-8 py-3 bg-rose-500 shadow-lg mb-4">
              <h2 className="text-3xl md:text-4xl text-white font-bold tracking-wide">
                Wedding <span className="italic font-normal">Registry</span>
              </h2>
            </div>
            <div className="w-20 h-1 bg-rose-400 mx-auto mb-6 rounded-full"></div>
            <p className="text-gray-700 max-w-2xl mx-auto text-lg md:text-xl mb-2">Your presence is our present, but if you wish to give...</p>
          </div>


      {/* Gift Message */}
      <div className="container mx-auto max-w-3xl mb-8 sm:mb-12 md:mb-16">
        <motion.div
          className="relative bg-white/80 backdrop-blur-lg rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 text-center shadow-md sm:shadow-lg border border-rose-100 hover:border-rose-200 transition-all duration-300 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <motion.div
            className="relative z-10"
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            <FaHeart className="text-rose-400 mx-auto mb-3 sm:mb-4 md:mb-6 text-xl sm:text-2xl md:text-3xl" />
          </motion.div>
          
          <p className="text-sm sm:text-base md:text-lg text-gray-600 italic relative z-10 mb-3 sm:mb-4 md:mb-6">
            We are truly blessed to have you celebrate our special day with us. While your presence is our greatest gift, 
            if you wish to give a monetary gift, we've provided several convenient options below:
          </p>

          <motion.div
            className="mt-3 sm:mt-4 md:mt-6 p-3 sm:p-4 bg-rose-50/20 rounded-lg border border-rose-100"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <p className="text-xs sm:text-sm md:text-base text-gray-700">
              Your generous contribution will help us start our new life together and create beautiful memories. 
              Whether it's helping us furnish our new home, plan our honeymoon, or save for our future, 
              your gift will be cherished and appreciated beyond measure.
            </p>
          </motion.div>

          <motion.div
            className="mt-3 sm:mt-4 md:mt-6 flex justify-center gap-2 sm:gap-3 md:gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <FaGift className="text-rose-400 text-base sm:text-lg md:text-xl" />
            <FaHandHoldingHeart className="text-rose-500 text-base sm:text-lg md:text-xl" />
            <FaGift className="text-rose-400 text-base sm:text-lg md:text-xl" />
          </motion.div>
        </motion.div>
      </div>

      {/* Registry Cards */}
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {registries.map((registry: Registry, index: number) => (
            <motion.div
              key={registry.id}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              whileHover="hover"
              className="group"
            >
              <Card className="h-full flex flex-col bg-white/80 backdrop-blur-lg border-rose-100 hover:border-rose-200 shadow-md sm:shadow-lg transition-all duration-500 relative overflow-hidden">
                <CardHeader className="relative p-4 sm:p-6">
                  <div className="mb-2 sm:mb-3 text-2xl sm:text-3xl text-rose-400 relative z-10">
                    {registry.icon}
                  </div>
                  
                  <CardTitle className="text-xl sm:text-2xl font-serif text-gray-900 relative z-10">
                    {registry.name}
                  </CardTitle>
                  
                  <CardDescription className="text-sm sm:text-base text-gray-600 relative z-10">
                    {registry.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex-grow relative z-10 p-4 sm:p-6">
                  {registry.accountNumber && (
                    <div className="mt-2 sm:mt-4 space-y-2 sm:space-y-4">
                      <div className="bg-gray-50/50 rounded-lg p-3">
                        <p className="text-xs text-gray-500 mb-1">Account Number</p>
                        <div className="flex items-center justify-between">
                          <code className="text-sm font-medium text-gray-900">
                            {registry.accountNumber}
                          </code>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(registry.accountNumber!)}
                            className="text-rose-500 hover:text-rose-600 hover:bg-rose-50 p-1"
                          >
                            <FaCopy size={12} />
                          </Button>
                        </div>
                      </div>

                      {registry.qrCode && (
                        <div>
                          <Button
                            variant="outline"
                            className="w-full bg-white/80 border-rose-100 hover:border-rose-200 hover:bg-rose-50/10 transition-all duration-300 relative overflow-hidden text-xs sm:text-sm"
                            onClick={() => setShowQR(showQR === registry.id ? null : registry.id)}
                          >
                            <span className="relative z-10 flex items-center justify-center">
                              <FaQrcode className="mr-2 text-xs sm:text-sm" />
                              {showQR === registry.id ? 'Hide QR Code' : 'Show QR Code'}
                            </span>
                          </Button>
                          <AnimatePresence>
                            {showQR === registry.id && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="relative rounded-lg overflow-hidden bg-white/90 p-4 mt-2 flex flex-col items-center"
                              >
                                <Image
                                  src={registry.qrCode}
                                  alt={`${registry.name} QR Code`}
                                  width={150}
                                  height={150}
                                  className="mx-auto"
                                  priority
                                />
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>

                <CardFooter className="mt-auto relative z-10 p-4 sm:p-6">
                  <Button 
                    onClick={() => handleRegistryClick(registry)}
                    className="w-full bg-gray-900/90 hover:bg-gray-800 text-white transition-all duration-300 relative overflow-hidden text-xs sm:text-sm"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {registry.url.startsWith('#') ? (
                        <>
                          View Details <FaLink className="text-xs" />
                        </>
                      ) : registry.url.startsWith('http') ? (
                        <>
                          View Registry <FaExternalLinkAlt className="text-xs" />
                        </>
                      ) : (
                        <>
                          View Details <FaCopy className="text-xs" />
                        </>
                      )}
                    </span>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Details Dialog */}
      {selectedRegistry && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={(e) => {
            // Close modal when clicking outside
            if (e.target === e.currentTarget) {
              setSelectedRegistry(null);
            }
          }}
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-2xl p-4 sm:p-6 max-w-md w-full mx-4 relative overflow-hidden"
          >
            {/* Close X Button */}
            <button
              aria-label="Close"
              onClick={() => setSelectedRegistry(null)}
              className="absolute top-2 right-2 text-gray-400 hover:text-rose-500 transition-colors rounded-full p-1.5 focus:outline-none focus:ring-2 focus:ring-rose-300 z-20"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-20 h-20 opacity-10 pointer-events-none">
              {selectedRegistry.icon}
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <div className="text-xl text-rose-400">
                  {selectedRegistry.icon}
                </div>
                <h3 className="text-xl font-serif text-gray-900">{selectedRegistry.name}</h3>
              </div>

              <div className="space-y-3 mb-4">
                {selectedRegistry.bankName && (
                  <div className="bg-gray-50 rounded-lg p-2.5">
                    <p className="text-xs text-gray-500 mb-0.5">Bank</p>
                    <p className="text-gray-900 font-medium text-sm">{selectedRegistry.bankName}</p>
                  </div>
                )}
                
                {selectedRegistry.accountName && (
                  <div className="bg-gray-50 rounded-lg p-2.5">
                    <p className="text-xs text-gray-500 mb-0.5">Account Name</p>
                    <p className="text-gray-900 font-medium text-sm">{selectedRegistry.accountName}</p>
                  </div>
                )}
                
                {selectedRegistry.accountNumber && (
                  <button
                    type="button"
                    onClick={() => copyToClipboard(selectedRegistry.accountNumber!)}
                    className="w-full flex items-center justify-between gap-2 bg-gray-50 rounded-lg p-3 border border-gray-200 hover:border-rose-300 transition group focus:outline-none focus:ring-2 focus:ring-rose-300"
                  >
                    <span className="flex-1 text-left">
                      <span className="block text-xs text-gray-500 mb-0.5">Account Number</span>
                      <span className="text-base font-mono text-gray-900 select-all">{selectedRegistry.accountNumber}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <FaCopy className="text-rose-400 group-hover:text-rose-600 transition" size={16} />
                    </span>
                  </button>
                )}

                {selectedRegistry.qrCode && (
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <p className="text-xs text-gray-500 mb-2">Scan QR Code</p>
                    <div className="bg-white p-2 rounded-lg inline-block">
                      <Image
                        src={selectedRegistry.qrCode}
                        alt={`${selectedRegistry.name} QR Code`}
                        width={120}
                        height={120}
                        className="mx-auto"
                        priority
                      />
                    </div>
                  </div>
                )}
              </div>

              {selectedRegistry.additionalDetails && (
                <div className="bg-rose-50/50 rounded-lg p-3">
                  <p className="text-gray-700 text-xs leading-relaxed">
                    {selectedRegistry.additionalDetails}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
}
