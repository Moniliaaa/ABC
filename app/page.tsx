"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import GameHeader from "@/components/game-header"
import DiceGame from "@/components/dice-game"
import SlotMachine from "@/components/slot-machine"
import Rewards from "@/components/rewards"
import Footer from "@/components/footer"

export default function Home() {
  const router = useRouter()
  const [currentGame, setCurrentGame] = useState<string>("dice")
  const [stars, setStars] = useState<number>(100)
  const [tgApp, setTgApp] = useState<any>(null)

  useEffect(() => {
    // Initialize Telegram WebApp
    const tg = window.Telegram?.WebApp
    if (tg) {
      tg.expand()
      tg.ready()
      setTgApp(tg)

      // Listen for payment events from the bot
      tg.onEvent("invoice_closed", (event: any) => {
        if (event.status === "paid") {
          // Update stars based on the payment
          const paymentData = JSON.parse(event.payload || "{}")
          if (paymentData.amount) {
            setStars((prev) => prev + paymentData.amount)
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
      setCurrentGame(game)
    } else if (game === "balance") {
      router.push("/balance")
    } else if (game === "referral") {
      router.push("/referral")
    } else if (game === "rating") {
      router.push("/rating")
    } else if (game === "transactions") {
      router.push("/transactions")
    } else if (game === "chat-game") {
      router.push("/chat-game")
    } else if (game === "roulette") {
      router.push("/roulette")
    }
  }

  const handleWin = (amount: number) => {
    setStars((prev) => prev + amount)
  }

  const handleLose = (amount: number) => {
    setStars((prev) => Math.max(0, prev - amount))
  }

  const handleTopUp = () => {
    router.push("/balance")
  }

  return (
    <div className="w-full max-w-md mx-auto bg-gray-900 min-h-screen flex flex-col text-white">
      <GameHeader currentGame={currentGame} onGameChange={handleGameChange} stars={stars} />

      <div className="flex-1 p-4">
        {currentGame === "dice" && <DiceGame onWin={handleWin} onLose={handleLose} stars={stars} />}
        {currentGame === "slots" && <SlotMachine onWin={handleWin} onLose={handleLose} stars={stars} />}
        {currentGame === "rewards" && <Rewards stars={stars} onPurchase={handleLose} />}
      </div>

      <Footer currentGame={currentGame} onGameChange={handleGameChange} onTopUp={handleTopUp} />
    </div>
  )
}

