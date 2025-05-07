"use client"

import { Share2 } from "lucide-react"
import { QRCodeSVG } from 'qrcode.react'
import { useEffect, useState } from 'react'

export default function ShareSection() {
  const [url, setUrl] = useState('')

  useEffect(() => {
    setUrl(window.location.href)
  }, [])

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Lance & Rosa Wedding',
        text: 'Join us in celebrating our special day!',
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }

  return (
    <div className="flex flex-col items-center md:items-end">
      <h3 className="text-lg font-semibold mb-4">Share Our Wedding</h3>
      <div className="bg-white p-2 rounded-lg">
        {url && (
          <QRCodeSVG
            value={url}
            size={120}
            level="H"
            includeMargin={false}
          />
        )}
      </div>
      <button
        onClick={handleShare}
        className="mt-3 flex items-center text-gray-400 hover:text-white transition-colors"
      >
        <Share2 className="w-4 h-4 mr-2" />
        Share Website
      </button>
    </div>
  )
} 