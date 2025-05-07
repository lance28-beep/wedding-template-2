"use client"

import { useState, useEffect } from "react"

export default function Countdown({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      } else {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  return (
    <div className="flex justify-center gap-4 md:gap-8">
      <CountdownItem value={timeLeft.days} label="Days" />
      <CountdownItem value={timeLeft.hours} label="Hours" />
      <CountdownItem value={timeLeft.minutes} label="Minutes" />
      <CountdownItem value={timeLeft.seconds} label="Seconds" />
    </div>
  )
}

function CountdownItem({ value, label }) {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-white/20 backdrop-blur-sm rounded-lg w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
        <span className="text-2xl md:text-3xl font-bold text-white">{value}</span>
      </div>
      <span className="text-xs md:text-sm mt-2 text-white/80">{label}</span>
    </div>
  )
}
