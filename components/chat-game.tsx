"use client"

import { useState, useEffect } from "react"
import { AlertTriangle, Share2 } from "lucide-react"

interface ChatGameProps {
  stars: number
  onWin: (amount: number) => void
  onLose: (amount: number) => void
}

export default function ChatGame({ stars, onWin, onLose }: ChatGameProps) {
  const [gameActive, setGameActive] = useState(false)
  const [betAmount, setBetAmount] = useState(25)
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null)
  const [result, setResult] = useState<number | null>(null)
  const [gameStatus, setGameStatus] = useState<"waiting" | "won" | "lost" | "insufficient" | null>(null)
  const [showWarning, setShowWarning] = useState(false)
  const [tgApp, setTgApp] = useState<any>(null)

  useEffect(() => {
    // Initialize Telegram WebApp
    const tg = window.Telegram?.WebApp
    if (tg) {
      setTgApp(tg)
    }
  }, [])

  const startGame = () => {
    if (stars < betAmount) {
      setShowWarning(true)
      setGameStatus("insufficient")
      return
    }

    setGameActive(true)
    setGameStatus("waiting")
    setResult(null)
  }

  const selectNumber = (num: number) => {
    if (!gameActive) return

    setSelectedNumber(num)

    // Simulate random result
    setTimeout(() => {
      const randomResult = Math.floor(Math.random() * 10) + 1
      setResult(randomResult)

      if (randomResult === num) {
        // Win
        setGameStatus("won")
        onWin(betAmount * 3)
      } else {
        // Lose
        setGameStatus("lost")
        onLose(betAmount)
      }

      setGameActive(false)
    }, 1000)
  }

  const shareGame = () => {
    if (!tgApp) return

    // Share the game with friends
    tgApp.shareUrl({
      url: "https://t.me/your_bot",
      text: "Присоединяйся к игре и угадай число! Выигрывай звезды и соревнуйся с друзьями.",
    })
  }

  const closeWarning = () => {
    setShowWarning(false)
  }

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-xs bg-gray-900 p-4 rounded-lg shadow-sm border border-gray-700 mb-4">
        <h2 className="text-xl font-bold text-center mb-4">Игра в чате</h2>

        {showWarning && (
          <div className="bg-amber-900/50 border border-amber-600 rounded-lg p-3 mb-4 flex items-start">
            <AlertTriangle className="text-amber-500 w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm text-amber-200">Недостаточно звезд для ставки!</p>
              <p className="text-xs text-amber-300/70 mt-1">
                Вам необходимо {betAmount} звезд для игры. Пополните баланс или выберите меньшую ставку.
              </p>
            </div>
            <button onClick={closeWarning} className="text-gray-400 hover:text-white ml-2">
              ✕
            </button>
          </div>
        )}

        <div className="bg-gray-800 rounded-lg p-4 mb-4">
          <p className="text-center text-sm mb-3">Выберите число от 1 до 10</p>

          <div className="grid grid-cols-5 gap-2 mb-4">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
              <button
                key={num}
                onClick={() => selectNumber(num)}
                disabled={!gameActive}
                className={`
                  p-2 h-10 w-10 flex items-center justify-center rounded-md
                  ${!gameActive ? "cursor-not-allowed opacity-60" : "cursor-pointer"}
                  ${selectedNumber === num ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-200"}
                  ${result === num ? "bg-green-600 text-white" : ""}
                `}
              >
                {num}
              </button>
            ))}
          </div>

          {gameStatus === "waiting" && selectedNumber === null && (
            <p className="text-center text-sm text-blue-400">Выберите число!</p>
          )}

          {gameStatus === "waiting" && selectedNumber !== null && (
            <p className="text-center text-sm text-blue-400">Вы выбрали {selectedNumber}...</p>
          )}

          {gameStatus === "won" && (
            <div className="bg-green-900/30 border border-green-600 rounded p-2 text-center">
              <p className="text-green-400 font-medium">ПОБЕДА! +{betAmount * 3} ⭐</p>
              <p className="text-xs text-green-300/70">Выпало число: {result}</p>
            </div>
          )}

          {gameStatus === "lost" && (
            <div className="bg-red-900/30 border border-red-600 rounded p-2 text-center">
              <p className="text-red-400 font-medium">ПРОИГРЫШ! -{betAmount} ⭐</p>
              <p className="text-xs text-red-300/70">Выпало число: {result}</p>
            </div>
          )}
        </div>

        <div className="mb-4">
          <p className="text-center text-sm mb-2">Ваша ставка:</p>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => setBetAmount(25)}
              className={`p-2 border ${betAmount === 25 ? "border-blue-500 bg-blue-900" : "border-gray-700 bg-gray-800"} text-center rounded`}
              disabled={gameActive}
            >
              25 ⭐
            </button>
            <button
              onClick={() => setBetAmount(50)}
              className={`p-2 border ${betAmount === 50 ? "border-blue-500 bg-blue-900" : "border-gray-700 bg-gray-800"} text-center rounded`}
              disabled={gameActive}
            >
              50 ⭐
            </button>
            <button
              onClick={() => setBetAmount(100)}
              className={`p-2 border ${betAmount === 100 ? "border-blue-500 bg-blue-900" : "border-gray-700 bg-gray-800"} text-center rounded`}
              disabled={gameActive}
            >
              100 ⭐
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={startGame}
            disabled={gameActive}
            className="py-2 bg-blue-600 text-white font-bold rounded disabled:bg-blue-800 disabled:opacity-50"
          >
            {gameActive ? "Игра началась..." : "Начать игру"}
          </button>

          <button
            onClick={shareGame}
            className="py-2 bg-green-600 text-white font-bold rounded flex items-center justify-center"
          >
            <Share2 className="w-4 h-4 mr-1" /> Пригласить
          </button>
        </div>
      </div>

      <div className="w-full max-w-xs border border-gray-700 p-3 rounded bg-gray-800">
        <p className="text-sm mb-2 font-medium">Правила игры:</p>
        <ul className="text-xs space-y-1 text-gray-300">
          <li>• Выберите число от 1 до 10</li>
          <li>• Если ваше число совпадет с результатом, вы выиграете ставку ×3</li>
          <li>• Шанс выигрыша: 1 из 10</li>
          <li>• Игру можно отправлять друзьям в чат</li>
        </ul>
      </div>
    </div>
  )
}

