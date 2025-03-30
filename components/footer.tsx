"use client"

import { Trophy, Users, CreditCard, Star, Gamepad2, Gift } from "lucide-react"

interface FooterProps {
  currentGame: string
  onGameChange: (game: string) => void
  onTopUp: () => void
}

export default function Footer({ currentGame, onGameChange, onTopUp }: FooterProps) {
  return (
    <footer className="w-full bg-gray-900 border-t border-gray-700 p-2">
      <div className="grid grid-cols-5 items-center">
        <button onClick={() => onGameChange("dice")} className="flex flex-col items-center justify-center">
          <Gamepad2
            className={`w-5 h-5 ${
              currentGame === "dice" ||
              currentGame === "slots" ||
              currentGame === "rewards" ||
              currentGame === "chat-game"
                ? "text-blue-400"
                : "text-gray-500"
            }`}
          />
          <span
            className={`text-xs mt-1 ${
              currentGame === "dice" ||
              currentGame === "slots" ||
              currentGame === "rewards" ||
              currentGame === "chat-game"
                ? "text-blue-400"
                : "text-gray-500"
            }`}
          >
            Игры
          </span>
        </button>

        <button onClick={() => onGameChange("referral")} className="flex flex-col items-center justify-center">
          <Users className={`w-5 h-5 ${currentGame === "referral" ? "text-blue-400" : "text-gray-500"}`} />
          <span className={`text-xs mt-1 ${currentGame === "referral" ? "text-blue-400" : "text-gray-500"}`}>
            Друзья
          </span>
        </button>

        <button onClick={() => onGameChange("rating")} className="flex flex-col items-center justify-center">
          <Trophy className={`w-5 h-5 ${currentGame === "rating" ? "text-blue-400" : "text-gray-500"}`} />
          <span className={`text-xs mt-1 ${currentGame === "rating" ? "text-blue-400" : "text-gray-500"}`}>
            Рейтинг
          </span>
        </button>

        <button onClick={() => onGameChange("roulette")} className="flex flex-col items-center justify-center">
          <Gift className={`w-5 h-5 ${currentGame === "roulette" ? "text-blue-400" : "text-gray-500"}`} />
          <span className={`text-xs mt-1 ${currentGame === "roulette" ? "text-blue-400" : "text-gray-500"}`}>
            Подарки
          </span>
        </button>

        <button onClick={() => onGameChange("transactions")} className="flex flex-col items-center justify-center">
          <CreditCard className={`w-5 h-5 ${currentGame === "transactions" ? "text-blue-400" : "text-gray-500"}`} />
          <span className={`text-xs mt-1 ${currentGame === "transactions" ? "text-blue-400" : "text-gray-500"}`}>
            Обмен
          </span>
        </button>

        <button onClick={onTopUp} className="flex flex-col items-center justify-center">
          <Star className={`w-5 h-5 ${currentGame === "balance" ? "text-blue-400" : "text-gray-500"}`} />
          <span className={`text-xs mt-1 ${currentGame === "balance" ? "text-blue-400" : "text-gray-500"}`}>
            Баланс
          </span>
        </button>
      </div>
    </footer>
  )
}

