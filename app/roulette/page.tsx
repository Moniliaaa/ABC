"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import GameHeader from "@/components/game-header"
import Footer from "@/components/footer"
import TelegramRoulette from "@/components/TelegramRoulette"
import GiftPayment from "@/components/GiftPayment"
import type { TelegramGift } from "@/lib/gifts"

export default function RoulettePage() {
  const router = useRouter()
  const [stars, setStars] = useState<number>(100)
  const [selectedGift, setSelectedGift] = useState<TelegramGift | null>(null)
  const [showPayment, setShowPayment] = useState(false)

  useEffect(() => {
    // Инициализация Telegram WebApp
    const tg = window.Telegram?.WebApp
    if (tg) {
      tg.expand()
      tg.ready()
    }

    // Получаем звезды из localStorage
    const savedStars = localStorage.getItem("stars")
    if (savedStars) {
      setStars(Number.parseInt(savedStars, 10))
    }
  }, [])

  useEffect(() => {
    // Сохраняем звезды в localStorage при обновлении
    localStorage.setItem("stars", stars.toString())
  }, [stars])

  const handleGameChange = (game: string) => {
    if (game === "dice" || game === "slots" || game === "rewards") {
      router.push("/")
    } else if (game === "balance") {
      router.push("/balance")
    } else if (game === "referral") {
      router.push("/referral")
    } else if (game === "rating") {
      router.push("/rating")
    } else if (game === "transactions") {
      router.push("/transactions")
    }
  }

  const handleWin = (gift: TelegramGift) => {
    setSelectedGift(gift)

    // Уменьшаем количество звезд за вращение
    setStars((prev) => Math.max(0, prev - 5))

    // Показываем диалог оплаты
    setTimeout(() => {
      setShowPayment(true)
    }, 1000)
  }

  const handlePaymentClose = () => {
    setShowPayment(false)
  }

  const handlePaymentSuccess = () => {
    // Здесь можно добавить логику для добавления подарка в коллекцию пользователя
    setTimeout(() => {
      setShowPayment(false)
      setSelectedGift(null)
    }, 2000)
  }

  const handleTopUp = () => {
    router.push("/balance")
  }

  return (
    <div className="w-full max-w-md mx-auto bg-gray-900 min-h-screen flex flex-col text-white">
      <GameHeader currentGame="roulette" onGameChange={handleGameChange} stars={stars} />

      <div className="flex-1 p-4">
        <TelegramRoulette onWin={handleWin} stars={stars} />
      </div>

      <Footer currentGame="roulette" onGameChange={handleGameChange} onTopUp={handleTopUp} />

      {showPayment && selectedGift && (
        <GiftPayment gift={selectedGift} onClose={handlePaymentClose} onSuccess={handlePaymentSuccess} />
      )}
    </div>
  )
}

