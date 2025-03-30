"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Balance from "@/components/balance"
import GameHeader from "@/components/game-header"
import Footer from "@/components/footer"

export default function BalancePage() {
  const router = useRouter()
  const [stars, setStars] = useState<number>(100)
  const [tgApp, setTgApp] = useState<any>(null)

  useEffect(() => {
    // Initialize Telegram WebApp
    const tg = window.Telegram?.WebApp
    if (tg) {
      tg.expand()
      tg.ready()
      setTgApp(tg)

      // Listen for payment events
      tg.onEvent("invoice_closed", (event: any) => {
        if (event.status === "paid") {
          // Update stars based on the payment
          const paymentData = JSON.parse(event.payload || "{}")
          if (paymentData.amount) {
            setStars((prev) => prev + paymentData.amount)
            localStorage.setItem("stars", (stars + paymentData.amount).toString())
          }
        }
      })
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
    }
  }

  const handleTopUp = () => {
    // Already on balance page
  }

  return (
    <div className="w-full max-w-md mx-auto bg-gray-900 min-h-screen flex flex-col text-white">
      <GameHeader currentGame="balance" onGameChange={handleGameChange} stars={stars} />

      <div className="flex-1 p-4">
        <Balance stars={stars} onTopUp={setStars} />
      </div>

      <Footer currentGame="balance" onGameChange={handleGameChange} onTopUp={handleTopUp} />
    </div>
  )
}

