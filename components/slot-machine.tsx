"use client"

import { useState } from "react"

interface SlotMachineProps {
  onWin: (amount: number) => void
  onLose: (amount: number) => void
  stars: number
}

export default function SlotMachine({ onWin, onLose, stars }: SlotMachineProps) {
  const [spinning, setSpinning] = useState(false)
  const [result, setResult] = useState<"win" | "lose" | null>(null)
  const [betAmount, setBetAmount] = useState(25)
  const [reels, setReels] = useState([0, 0, 0]) // Index of symbols on each reel

  // Symbols for the slot machine
  const symbols = [
    { name: "Вишня", icon: "🍒", value: 3 },
    { name: "Апельсин", icon: "🍊", value: 2 },
    { name: "Клевер", icon: "☘️", value: 4 },
    { name: "Сердце", icon: "❤️", value: 5 },
  ]

  const spin = () => {
    if (stars < betAmount) {
      alert("Недостаточно звезд!")
      return
    }

    setSpinning(true)
    setResult(null)

    // Animate the reels spinning
    let spinCount = 0
    const maxSpins = 20 // Number of animation frames
    const spinInterval = setInterval(() => {
      setReels([
        Math.floor(Math.random() * symbols.length),
        Math.floor(Math.random() * symbols.length),
        Math.floor(Math.random() * symbols.length),
      ])

      spinCount++
      if (spinCount >= maxSpins) {
        clearInterval(spinInterval)

        // Determine final result
        const finalReels = [
          Math.floor(Math.random() * symbols.length),
          Math.floor(Math.random() * symbols.length),
          Math.floor(Math.random() * symbols.length),
        ]

        setReels(finalReels)
        setSpinning(false)

        // Check for win
        if (finalReels[0] === finalReels[1] && finalReels[1] === finalReels[2]) {
          // All three match - big win
          const winSymbol = symbols[finalReels[0]]
          setResult("win")

          // Add winnings based on symbol value
          onWin(betAmount * winSymbol.value)
        } else if (
          finalReels[0] === finalReels[1] ||
          finalReels[1] === finalReels[2] ||
          finalReels[0] === finalReels[2]
        ) {
          // Two match - small win
          setResult("win")

          // Add smaller winnings
          onWin(Math.floor(betAmount * 1.5))
        } else {
          // No match - lose
          setResult("lose")
          onLose(betAmount)
        }
      }
    }, 100)
  }

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-xs bg-gray-900 p-4 rounded-lg shadow-sm border border-gray-700 mb-4">
        <h3 className="text-xl font-bold mb-4 text-center">Игровой автомат</h3>

        {/* Slot Machine */}
        <div className="relative mb-6 flex justify-center">
          <div className="relative w-64 h-64">
            {/* Gold frame with lights */}
            <div className="absolute inset-0 bg-yellow-500 rounded-lg p-3">
              {/* Lights around the frame */}
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-4 h-4 bg-yellow-300 rounded-full animate-pulse"
                  style={{
                    top: i < 3 ? "0" : i < 6 ? `${(i - 3) * 33 + 16}%` : i < 9 ? "100%" : `${(11 - i) * 33 + 16}%`,
                    left: i < 3 ? `${i * 33 + 16}%` : i < 6 ? "100%" : i < 9 ? `${(8 - i) * 33 + 16}%` : "0",
                    transform: "translate(-50%, -50%)",
                  }}
                />
              ))}

              {/* Slot machine display */}
              <div className="absolute inset-4 bg-gray-800 rounded-md flex items-center justify-center">
                <div className="bg-white w-full h-4/5 mx-4 rounded-md flex items-center justify-center">
                  {/* Reels */}
                  <div className="flex gap-1 h-full w-full p-1">
                    {[0, 1, 2].map((reelIndex) => (
                      <div key={reelIndex} className="flex-1 bg-gray-100 rounded-md relative overflow-hidden">
                        <div
                          className="absolute inset-0 flex flex-col items-center justify-center transition-transform duration-100"
                          style={{
                            transform: spinning ? `translateY(${Math.random() * 100 - 50}%)` : "translateY(0)",
                          }}
                        >
                          {/* Symbol above (for animation) */}
                          <div className="text-4xl mb-2">
                            {symbols[(reels[reelIndex] - 1 + symbols.length) % symbols.length].icon}
                          </div>

                          {/* Current symbol */}
                          <div className="text-4xl mb-2">{symbols[reels[reelIndex]].icon}</div>

                          {/* Symbol below (for animation) */}
                          <div className="text-4xl">{symbols[(reels[reelIndex] + 1) % symbols.length].icon}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Lever */}
              <div className="absolute -right-6 top-1/2 -translate-y-1/2 flex flex-col items-center">
                <div className="w-8 h-8 bg-red-600 rounded-full shadow-lg"></div>
                <div className="w-3 h-16 bg-blue-800 rounded-b-md"></div>
              </div>
            </div>
          </div>
        </div>

        {result && (
          <div
            className={`text-center p-2 border ${result === "win" ? "border-green-500 text-green-500" : "border-red-500 text-red-500"} mb-4`}
          >
            {result === "win" ? "ПОБЕДА!" : "ПРОИГРЫШ!"}
          </div>
        )}

        <button
          onClick={spin}
          disabled={spinning}
          className="w-full py-2 bg-blue-600 text-white font-bold rounded disabled:bg-blue-800 disabled:opacity-50"
        >
          {spinning ? "КРУТИТСЯ..." : "КРУТИТЬ!"}
        </button>
      </div>

      <div className="w-full max-w-xs">
        <p className="text-center mb-2 text-sm font-medium">Выберите ставку:</p>
        <div className="grid grid-cols-3 gap-2 mb-4">
          <button
            onClick={() => setBetAmount(25)}
            className={`p-2 border ${betAmount === 25 ? "border-blue-500 bg-blue-900" : "border-gray-700 bg-gray-800"} text-center rounded`}
          >
            25 ⭐
          </button>
          <button
            onClick={() => setBetAmount(50)}
            className={`p-2 border ${betAmount === 50 ? "border-blue-500 bg-blue-900" : "border-gray-700 bg-gray-800"} text-center rounded`}
          >
            50 ⭐
          </button>
          <button
            onClick={() => setBetAmount(100)}
            className={`p-2 border ${betAmount === 100 ? "border-blue-500 bg-blue-900" : "border-gray-700 bg-gray-800"} text-center rounded`}
          >
            100 ⭐
          </button>
        </div>

        <div className="border border-gray-700 p-3 rounded bg-gray-800">
          <p className="text-sm mb-2 font-medium">Выигрыши:</p>
          <ul className="text-xs space-y-1">
            <li>🍒🍒🍒 - выигрыш x3</li>
            <li>🍊🍊🍊 - выигрыш x2</li>
            <li>☘️☘️☘️ - выигрыш x4</li>
            <li>❤️❤️❤️ - выигрыш x5</li>
            <li>Две одинаковые - выигрыш x1.5</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

