"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import GameHeader from "@/components/game-header"
import Footer from "@/components/footer"
import ReferralSystem from "@/components/referral-system"

export default function ReferralPage() {
  const router = useRouter()
  const [stars, setStars] = useState<number>(100)

  useEffect(() => {
    // Initialize Telegram WebApp
    const tg = window.Telegram?.WebApp
    if (tg) {
      tg.expand()
      tg.ready()
    }

    // Get stars from localStorage if available
    const savedStars = localStorage.getItem("stars")
    if (savedStars) {
      setStars(Number.parseInt(savedStars, 10))
    }
  }, [])

  useEffect(() => {
    // Save stars to localStorage when updated
    localStorage.setItem("stars", stars.toString())
  }, [stars])

  const handleGameChange = (game: string) => {
    if (game === "dice" || game === "slots" || game === "rewards") {
      router.push("/")
    } else if (game === "balance") {
      router.push("/balance")
    }
  }

  const handleEarnStars = (amount: number) => {
    setStars((prev) => prev + amount)
  }

  const handleTopUp = () => {
    router.push("/balance")
  }

  return (
    <div className="w-full max-w-md mx-auto bg-gray-900 min-h-screen flex flex-col text-white">
      <GameHeader currentGame="referral" onGameChange={handleGameChange} stars={stars} />

      <div className="flex-1 p-4">
        <ReferralSystem stars={stars} onEarnStars={handleEarnStars} />
      </div>

      <Footer currentGame="referral" onGameChange={handleGameChange} onTopUp={handleTopUp} />
    </div>
  )
}

