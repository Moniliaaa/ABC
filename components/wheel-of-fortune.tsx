"use client"

import { useState, useRef } from "react"

interface WheelOfFortuneProps {
  rewards: Array<{
    name: string
    icon: string
    cost: number
    color: string
  }>
  onSpin: (rewardIndex: number) => void
  spinning: boolean
  setSpinning: (spinning: boolean) => void
}

export default function WheelOfFortune({ rewards, onSpin, spinning, setSpinning }: WheelOfFortuneProps) {
  const [rotationAngle, setRotationAngle] = useState(0)
  const [selectedRewardIndex, setSelectedRewardIndex] = useState<number | null>(null)
  const wheelRef = useRef<HTMLDivElement>(null)

  const spinWheel = () => {
    if (spinning) return

    setSpinning(true)

    // Determine winning reward
    const randomIndex = Math.floor(Math.random() * rewards.length)
    setSelectedRewardIndex(randomIndex)

    // Random final position (between 5-10 full rotations + random segment)
    const fullRotations = 5 + Math.floor(Math.random() * 5)
    const segmentAngle = 360 / rewards.length

    // Calculate final angle to land on the selected reward
    // We add a small offset to make it land in the middle of the segment
    const finalAngle = fullRotations * 360 + randomIndex * segmentAngle + segmentAngle / 2

    // Start animation
    const startAngle = rotationAngle
    const duration = 4000 // 4 seconds
    const startTime = Date.now()

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Easing function for natural slowdown
      const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)
      const currentProgress = easeOut(progress)

      const currentAngle = startAngle + (finalAngle - startAngle) * currentProgress
      setRotationAngle(currentAngle)

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        // Animation complete
        setTimeout(() => {
          setSpinning(false)
          if (selectedRewardIndex !== null) {
            onSpin(selectedRewardIndex)
          }
        }, 500)
      }
    }

    requestAnimationFrame(animate)
  }

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-64 h-64 mb-4">
        {/* Spinning wheel */}
        <div
          ref={wheelRef}
          className="absolute w-64 h-64 rounded-full border-4 border-gray-800 overflow-hidden"
          style={{
            transform: `rotate(${rotationAngle}deg)`,
            transition: spinning ? "none" : "transform 0.3s ease-out",
          }}
        >
          {/* Wheel segments */}
          {rewards.map((reward, index) => {
            const segmentAngle = 360 / rewards.length
            const rotation = index * segmentAngle
            return (
              <div
                key={index}
                className="absolute w-full h-full"
                style={{
                  transform: `rotate(${rotation}deg)`,
                  clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.cos((segmentAngle * Math.PI) / 180)}% ${50 - 50 * Math.sin((segmentAngle * Math.PI) / 180)}%, 50% 0%)`,
                  backgroundColor: reward.color,
                }}
              >
                <div
                  className="absolute text-white font-bold"
                  style={{
                    left: "50%",
                    top: "20%",
                    transform: "translateX(-50%) rotate(180deg)",
                    fontSize: "1.5rem",
                  }}
                >
                  {reward.icon}
                </div>
              </div>
            )
          })}
        </div>

        {/* Center of wheel */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full border-4 border-gray-800 z-10"></div>

        {/* Pointer */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-12 z-20">
          <div className="w-0 h-0 border-l-[12px] border-r-[12px] border-b-[24px] border-l-transparent border-r-transparent border-b-red-600"></div>
        </div>
      </div>

      <button
        onClick={spinWheel}
        disabled={spinning}
        className="w-full max-w-xs py-2 bg-blue-500 text-white font-bold rounded disabled:bg-blue-300"
      >
        {spinning ? "КРУТИТСЯ..." : "КРУТИТЬ!"}
      </button>
    </div>
  )
}

