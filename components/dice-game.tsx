"use client"

import { useState } from "react"

interface DiceGameProps {
  onWin: (amount: number) => void
  onLose: (amount: number) => void
  stars: number
}

export default function DiceGame({ onWin, onLose, stars }: DiceGameProps) {
  const [rolling, setRolling] = useState(false)
  const [diceValue, setDiceValue] = useState(1)
  const [userGuess, setUserGuess] = useState(5)
  const [betAmount, setBetAmount] = useState(25)
  const [result, setResult] = useState<"win" | "lose" | null>(null)

  const rollDice = () => {
    if (stars < betAmount) {
      alert("Недостаточно звезд!")
      return
    }

    setRolling(true)
    setResult(null)

    // Simulate dice rolling animation
    const rollInterval = setInterval(() => {
      setDiceValue(Math.floor(Math.random() * 6) + 1)
    }, 100)

    // Stop rolling after 1 second and determine result
    setTimeout(() => {
      clearInterval(rollInterval)
      const finalValue = Math.floor(Math.random() * 6) + 1
      setDiceValue(finalValue)
      setRolling(false)

      if (finalValue === userGuess) {
        setResult("win")
        onWin(betAmount * 2)
      } else {
        setResult("lose")
        onLose(betAmount)
      }
    }, 1000)
  }

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-xs bg-gray-900 p-4 rounded-lg shadow-sm border border-gray-700 mb-4">
        <div className="flex justify-between mb-4">
          <div className="text-center">
            <p className="text-xs text-blue-400">ВАШЕ ЧИСЛО</p>
            <div className="w-12 h-12 border border-blue-500 flex items-center justify-center text-2xl font-bold">
              {userGuess}
            </div>
          </div>

          <div className="w-32 h-32 flex items-center justify-center">
            {diceValue === 1 && (
              <div className="w-24 h-24 bg-gray-200 rounded-lg relative shadow-md">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                </div>
              </div>
            )}
            {diceValue === 2 && (
              <div className="w-24 h-24 bg-gray-200 rounded-lg relative shadow-md">
                <div className="absolute top-3 left-3">
                  <div className="w-4 h-4 bg-black rounded-full"></div>
                </div>
                <div className="absolute bottom-3 right-3">
                  <div className="w-4 h-4 bg-black rounded-full"></div>
                </div>
              </div>
            )}
            {diceValue === 3 && (
              <div className="w-24 h-24 bg-gray-200 rounded-lg relative shadow-md">
                <div className="absolute top-3 left-3">
                  <div className="w-4 h-4 bg-black rounded-full"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-4 h-4 bg-black rounded-full"></div>
                </div>
                <div className="absolute bottom-3 right-3">
                  <div className="w-4 h-4 bg-black rounded-full"></div>
                </div>
              </div>
            )}
            {diceValue === 4 && (
              <div className="w-24 h-24 bg-gray-200 rounded-lg relative shadow-md">
                <div className="absolute top-3 left-3">
                  <div className="w-4 h-4 bg-black rounded-full"></div>
                </div>
                <div className="absolute top-3 right-3">
                  <div className="w-4 h-4 bg-black rounded-full"></div>
                </div>
                <div className="absolute bottom-3 left-3">
                  <div className="w-4 h-4 bg-black rounded-full"></div>
                </div>
                <div className="absolute bottom-3 right-3">
                  <div className="w-4 h-4 bg-black rounded-full"></div>
                </div>
              </div>
            )}
            {diceValue === 5 && (
              <div className="w-24 h-24 bg-gray-200 rounded-lg relative shadow-md">
                <div className="absolute top-3 left-3">
                  <div className="w-4 h-4 bg-black rounded-full"></div>
                </div>
                <div className="absolute top-3 right-3">
                  <div className="w-4 h-4 bg-black rounded-full"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-4 h-4 bg-black rounded-full"></div>
                </div>
                <div className="absolute bottom-3 left-3">
                  <div className="w-4 h-4 bg-black rounded-full"></div>
                </div>
                <div className="absolute bottom-3 right-3">
                  <div className="w-4 h-4 bg-black rounded-full"></div>
                </div>
              </div>
            )}
            {diceValue === 6 && (
              <div className="w-24 h-24 bg-gray-200 rounded-lg relative shadow-md">
                <div className="absolute top-3 left-3">
                  <div className="w-4 h-4 bg-black rounded-full"></div>
                </div>
                <div className="absolute top-3 right-3">
                  <div className="w-4 h-4 bg-black rounded-full"></div>
                </div>
                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                  <div className="w-4 h-4 bg-black rounded-full"></div>
                </div>
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <div className="w-4 h-4 bg-black rounded-full"></div>
                </div>
                <div className="absolute bottom-3 left-3">
                  <div className="w-4 h-4 bg-black rounded-full"></div>
                </div>
                <div className="absolute bottom-3 right-3">
                  <div className="w-4 h-4 bg-black rounded-full"></div>
                </div>
              </div>
            )}
          </div>

          <div className="text-center">
            <p className="text-xs text-blue-400">ВЫПАЛО</p>
            <div className="w-12 h-12 border border-blue-500 flex items-center justify-center text-2xl font-bold">
              {diceValue}
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
          onClick={rollDice}
          disabled={rolling}
          className="w-full py-2 bg-blue-600 text-white font-bold rounded disabled:bg-blue-800 disabled:opacity-50"
        >
          {rolling ? "КРУТИТСЯ..." : "КРУТИТЬ!"}
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

        <p className="text-center mb-2 text-sm font-medium">Выберите число:</p>
        <div className="grid grid-cols-6 gap-1">
          {[1, 2, 3, 4, 5, 6].map((num) => (
            <button
              key={num}
              onClick={() => setUserGuess(num)}
              className={`p-2 border ${userGuess === num ? "border-blue-500 bg-blue-900" : "border-gray-700 bg-gray-800"} text-center rounded`}
            >
              {num}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

