"use client"

import { useState, useRef } from "react"

interface RewardsProps {
  stars: number
  onPurchase: (amount: number) => void
}

export default function Rewards({ stars, onPurchase }: RewardsProps) {
  const [spinning, setSpinning] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [selectedCost, setSelectedCost] = useState(25)
  const rouletteRef = useRef<HTMLDivElement>(null)

  const rewards = [
    { name: "Роза", icon: "🌹", cost: 25, color: "#FF5252" }, // Red
    { name: "Подарок", icon: "🎁", cost: 50, color: "#FFEB3B" }, // Yellow
    { name: "Мишка", icon: "🧸", cost: 100, color: "#2196F3" }, // Blue
    { name: "Сердце", icon: "❤️", cost: 15, color: "#4CAF50" }, // Green
    { name: "Звезда", icon: "⭐", cost: 20, color: "#9C27B0" }, // Purple
    { name: "Корона", icon: "👑", cost: 75, color: "#FF9800" }, // Orange
  ]

  // Create a longer strip by repeating the rewards multiple times
  const extendedRewards = [...rewards, ...rewards, ...rewards, ...rewards, ...rewards]

  const spin = (cost: number) => {
    if (stars < cost) {
      alert("Недостаточно звезд!")
      return
    }

    if (spinning) return

    setSpinning(true)
    setShowResult(false)
    setSelectedCost(cost)

    // Random index from the original rewards array
    const randomIndex = Math.floor(Math.random() * rewards.length)

    // Calculate the position to stop at
    // We want to stop at a position where the selected reward is in the center
    // The strip starts at position 0, we need to scroll it to position where our target item is centered
    const itemWidth = 100 // Width of each item in pixels
    const centerOffset = Math.floor(extendedRewards.length / 2) - randomIndex
    const scrollDistance = centerOffset * itemWidth - 2 * itemWidth // Adjust to center the selected item

    // Set the final position as a CSS variable
    if (rouletteRef.current) {
      rouletteRef.current.style.setProperty("--final-position", `${scrollDistance}px`)
    }

    // Set the result after the animation completes
    setTimeout(() => {
      setSpinning(false)
      setResult(rewards[randomIndex].name)
      onPurchase(cost)

      // Show the result after a short delay
      setTimeout(() => {
        setShowResult(true)
      }, 500)
    }, 4000) // Match this with the CSS animation duration
  }

  return (
    <div className="flex flex-col items-center">
      {!showResult ? (
        <div className="w-full max-w-xs bg-card p-4 rounded-lg shadow-sm border mb-4 flex flex-col items-center">
          <h3 className="text-xl font-bold mb-4 text-center">Линейная Рулетка</h3>

          {/* Linear Roulette */}
          <div className="relative mb-6 mt-2 w-full">
            <div className="linear-roulette-container">
              {/* Indicator */}
              <div className="linear-roulette-indicator">
                <div className="linear-roulette-arrow"></div>
              </div>

              {/* Roulette Strip */}
              <div ref={rouletteRef} className={`linear-roulette-strip ${spinning ? "linear-roulette-spinning" : ""}`}>
                {extendedRewards.map((reward, index) => (
                  <div key={index} className="linear-roulette-item" style={{ backgroundColor: reward.color }}>
                    <div className="text-2xl">{reward.icon}</div>
                    <div className="text-xs font-bold mt-1">{reward.cost} ⭐</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 w-full">
            {[25, 50, 100].map((cost) => (
              <button
                key={cost}
                onClick={() => spin(cost)}
                disabled={spinning || stars < cost}
                className="py-2 px-4 bg-blue-500 text-white font-bold rounded disabled:bg-blue-300 disabled:cursor-not-allowed"
              >
                {cost} ⭐
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="w-full max-w-xs bg-card p-4 rounded-lg shadow-sm border mb-4">
          <div className="flex flex-col items-center">
            <h3 className="text-xl font-bold mb-4 text-center">ПОБЕДА!</h3>
            <div className="bg-black p-6 rounded-lg mb-4 w-full">
              <div className="flex justify-center gap-8">
                <div className="flex flex-col items-center">
                  <div className="text-5xl mb-2">
                    {result === "Роза"
                      ? "🌹"
                      : result === "Подарок"
                        ? "🎁"
                        : result === "Мишка"
                          ? "🧸"
                          : result === "Сердце"
                            ? "❤️"
                            : result === "Звезда"
                              ? "⭐"
                              : "👑"}
                  </div>
                  <div className="text-xs text-yellow-400">+1</div>
                </div>
              </div>
            </div>
            <button
              onClick={() => setShowResult(false)}
              className="w-full py-2 bg-blue-500 text-white font-bold rounded"
            >
              КРУТИТЬ СНОВА!
            </button>
          </div>
        </div>
      )}

      <div className="w-full max-w-xs">
        <p className="text-center mb-2 text-sm font-medium">Ваши призы:</p>
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="p-2 border border-gray-700 text-center bg-gray-800 rounded">
            <div className="text-2xl">🌹</div>
            <div className="text-xs">25 ⭐</div>
          </div>
          <div className="p-2 border border-gray-700 text-center bg-gray-800 rounded">
            <div className="text-2xl">❤️</div>
            <div className="text-xs">15 ⭐</div>
          </div>
          <div className="p-2 border border-gray-700 text-center bg-gray-800 rounded">
            <div className="text-2xl">🧸</div>
            <div className="text-xs">15 ⭐</div>
          </div>
        </div>
      </div>
    </div>
  )
}

