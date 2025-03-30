"use client"

import { useState } from "react"
import { Menu, X, Star, Trophy, Users, CreditCard, MessageCircle, Gift } from "lucide-react"

interface GameHeaderProps {
  currentGame: string
  onGameChange: (game: string) => void
  stars: number
}

export default function GameHeader({ currentGame, onGameChange, stars }: GameHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  return (
    <header className="w-full bg-gray-900 border-b border-gray-700">
      <div className="flex items-center justify-between p-2">
        <button onClick={toggleMenu} className="p-2 text-blue-400 flex items-center justify-center">
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        <div className="h-8 flex-1 text-center font-bold text-lg">
          {currentGame === "dice" && "Кубик"}
          {currentGame === "slots" && "Слоты"}
          {currentGame === "rewards" && "Рулетка"}
          {currentGame === "balance" && "Баланс"}
          {currentGame === "referral" && "Рефералы"}
          {currentGame === "rating" && "Рейтинг"}
          {currentGame === "transactions" && "Операции"}
          {currentGame === "chat-game" && "Игра в чате"}
          {currentGame === "roulette" && "Рулетка подарков"}
        </div>

        <div className="px-3 py-1 text-sm font-medium text-blue-400 border border-blue-500 rounded flex items-center">
          <Star className="w-4 h-4 mr-1" /> {stars}
        </div>
      </div>

      {menuOpen && (
        <div className="absolute top-14 left-0 right-0 bg-gray-900 border-b border-gray-700 z-50">
          <div className="p-2 grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                onGameChange("dice")
                setMenuOpen(false)
              }}
              className={`flex items-center p-2 rounded ${
                currentGame === "dice" ? "bg-blue-900 text-white" : "bg-gray-800 text-gray-300"
              }`}
            >
              <span className="text-xl mr-2">🎲</span>
              <span className="text-sm">Кубик</span>
            </button>

            <button
              onClick={() => {
                onGameChange("slots")
                setMenuOpen(false)
              }}
              className={`flex items-center p-2 rounded ${
                currentGame === "slots" ? "bg-blue-900 text-white" : "bg-gray-800 text-gray-300"
              }`}
            >
              <span className="text-xl mr-2">🎰</span>
              <span className="text-sm">Слоты</span>
            </button>

            <button
              onClick={() => {
                onGameChange("rewards")
                setMenuOpen(false)
              }}
              className={`flex items-center p-2 rounded ${
                currentGame === "rewards" ? "bg-blue-900 text-white" : "bg-gray-800 text-gray-300"
              }`}
            >
              <span className="text-xl mr-2">🎁</span>
              <span className="text-sm">Рулетка</span>
            </button>

            <button
              onClick={() => {
                onGameChange("chat-game")
                setMenuOpen(false)
              }}
              className={`flex items-center p-2 rounded ${
                currentGame === "chat-game" ? "bg-blue-900 text-white" : "bg-gray-800 text-gray-300"
              }`}
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              <span className="text-sm">Чат-игра</span>
            </button>

            <button
              onClick={() => {
                onGameChange("referral")
                setMenuOpen(false)
              }}
              className={`flex items-center p-2 rounded ${
                currentGame === "referral" ? "bg-blue-900 text-white" : "bg-gray-800 text-gray-300"
              }`}
            >
              <Users className="w-5 h-5 mr-2" />
              <span className="text-sm">Рефералы</span>
            </button>

            <button
              onClick={() => {
                onGameChange("rating")
                setMenuOpen(false)
              }}
              className={`flex items-center p-2 rounded ${
                currentGame === "rating" ? "bg-blue-900 text-white" : "bg-gray-800 text-gray-300"
              }`}
            >
              <Trophy className="w-5 h-5 mr-2" />
              <span className="text-sm">Рейтинг</span>
            </button>

            <button
              onClick={() => {
                onGameChange("balance")
                setMenuOpen(false)
              }}
              className={`flex items-center p-2 rounded ${
                currentGame === "balance" ? "bg-blue-900 text-white" : "bg-gray-800 text-gray-300"
              }`}
            >
              <Star className="w-5 h-5 mr-2" />
              <span className="text-sm">Пополнить</span>
            </button>

            <button
              onClick={() => {
                onGameChange("transactions")
                setMenuOpen(false)
              }}
              className={`flex items-center p-2 rounded ${
                currentGame === "transactions" ? "bg-blue-900 text-white" : "bg-gray-800 text-gray-300"
              }`}
            >
              <CreditCard className="w-5 h-5 mr-2" />
              <span className="text-sm">Операции</span>
            </button>

            <button
              onClick={() => {
                onGameChange("roulette")
                setMenuOpen(false)
              }}
              className={`flex items-center p-2 rounded ${
                currentGame === "roulette" ? "bg-blue-900 text-white" : "bg-gray-800 text-gray-300"
              }`}
            >
              <Gift className="w-5 h-5 mr-2" />
              <span className="text-sm">Рулетка</span>
            </button>
          </div>
        </div>
      )}

      {!menuOpen && (
        <div className="flex items-center justify-between px-2 py-1 border-t border-gray-700 overflow-x-auto">
          <button
            onClick={() => onGameChange("dice")}
            className={`px-2 py-1 text-sm font-medium text-blue-400 whitespace-nowrap ${currentGame === "dice" ? "underline" : ""}`}
          >
            КУБИК 🎲
          </button>
          <button
            onClick={() => onGameChange("slots")}
            className={`px-2 py-1 text-sm font-medium text-blue-400 whitespace-nowrap ${currentGame === "slots" ? "underline" : ""}`}
          >
            СЛОТЫ 🎰
          </button>
          <button
            onClick={() => onGameChange("rewards")}
            className={`px-2 py-1 text-sm font-medium text-blue-400 whitespace-nowrap ${currentGame === "rewards" ? "underline" : ""}`}
          >
            РУЛЕТКА 🎁
          </button>
          <button
            onClick={() => onGameChange("rating")}
            className={`px-2 py-1 text-sm font-medium text-blue-400 whitespace-nowrap ${currentGame === "rating" ? "underline" : ""}`}
          >
            РЕЙТИНГ 🏆
          </button>
          <button
            onClick={() => onGameChange("referral")}
            className={`px-2 py-1 text-sm font-medium text-blue-400 whitespace-nowrap ${currentGame === "referral" ? "underline" : ""}`}
          >
            ДРУЗЬЯ 👥
          </button>
          <button
            onClick={() => onGameChange("roulette")}
            className={`px-2 py-1 text-sm font-medium text-blue-400 whitespace-nowrap ${currentGame === "roulette" ? "underline" : ""}`}
          >
            ПОДАРКИ 🎁
          </button>
        </div>
      )}
    </header>
  )
}

