"use client"

import { useState, useEffect } from "react"
import { Trophy, ChevronUp, ChevronDown, Medal } from "lucide-react"

interface Player {
  id: number
  name: string
  score: number
  avatar?: string
  change?: "up" | "down" | "same"
}

interface RatingSystemProps {
  currentUserId?: number
}

export default function RatingSystem({ currentUserId }: RatingSystemProps) {
  const [topPlayers, setTopPlayers] = useState<Player[]>([])
  const [userRank, setUserRank] = useState<Player | null>(null)
  const [timeframe, setTimeframe] = useState<"daily" | "weekly" | "alltime">("weekly")
  const [loading, setLoading] = useState(true)
  const [tgApp, setTgApp] = useState<any>(null)

  useEffect(() => {
    // Initialize Telegram WebApp
    const tg = window.Telegram?.WebApp
    if (tg) {
      setTgApp(tg)

      // If available, use the actual Telegram user ID
      const userId = tg.initDataUnsafe?.user?.id || currentUserId || 0

      fetchRankings(timeframe, userId)
    } else {
      // Fallback for development/testing
      fetchRankings(timeframe, currentUserId || 123456789)
    }
  }, [timeframe, currentUserId])

  const fetchRankings = (period: "daily" | "weekly" | "alltime", userId: number) => {
    setLoading(true)

    // In a real app, this would be an API call to your backend
    // For demo purposes, we'll simulate with mock data
    setTimeout(() => {
      const mockTopPlayers: Player[] = [
        { id: 111222, name: "Артем К.", score: 7850, avatar: "/placeholder.svg?height=48&width=48", change: "up" },
        { id: 222333, name: "Мария С.", score: 6420, avatar: "/placeholder.svg?height=48&width=48", change: "same" },
        { id: 333444, name: "Алексей П.", score: 5930, avatar: "/placeholder.svg?height=48&width=48", change: "down" },
        { id: 444555, name: "Елена Т.", score: 4870, avatar: "/placeholder.svg?height=48&width=48", change: "up" },
        { id: 555666, name: "Дмитрий К.", score: 4210, avatar: "/placeholder.svg?height=48&width=48", change: "up" },
        { id: 666777, name: "Ольга В.", score: 3640, avatar: "/placeholder.svg?height=48&width=48", change: "down" },
        { id: 777888, name: "Сергей Л.", score: 3540, avatar: "/placeholder.svg?height=48&width=48", change: "same" },
        { id: 888999, name: "Наталья Р.", score: 3290, avatar: "/placeholder.svg?height=48&width=48", change: "up" },
        { id: 999000, name: "Игорь С.", score: 2780, avatar: "/placeholder.svg?height=48&width=48", change: "down" },
        { id: 123000, name: "Анна Ф.", score: 2150, avatar: "/placeholder.svg?height=48&width=48", change: "up" },
      ]

      // Add the current user if they're not in top 10
      const userInTop = mockTopPlayers.some((player) => player.id === userId)

      setTopPlayers(mockTopPlayers)

      if (!userInTop) {
        // Set the current user's rank (in a real app, this would come from your backend)
        setUserRank({
          id: userId,
          name: "Вы",
          score: 980,
          avatar: "/placeholder.svg?height=48&width=48",
          change: "up",
        })
      }

      setLoading(false)
    }, 1000)
  }

  return (
    <div className="flex flex-col">
      <div className="w-full max-w-md bg-gray-900 p-4 rounded-lg shadow-sm border border-gray-700 mb-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Рейтинг игроков</h2>
          <Trophy className="h-6 w-6 text-yellow-400" />
        </div>

        {/* Timeframe selector */}
        <div className="flex rounded-lg overflow-hidden border border-gray-700 mb-4">
          <button
            onClick={() => setTimeframe("daily")}
            className={`flex-1 py-2 text-center text-sm font-medium ${
              timeframe === "daily" ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-300"
            }`}
          >
            День
          </button>
          <button
            onClick={() => setTimeframe("weekly")}
            className={`flex-1 py-2 text-center text-sm font-medium ${
              timeframe === "weekly" ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-300"
            }`}
          >
            Неделя
          </button>
          <button
            onClick={() => setTimeframe("alltime")}
            className={`flex-1 py-2 text-center text-sm font-medium ${
              timeframe === "alltime" ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-300"
            }`}
          >
            Все время
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            {/* Top 3 players podium */}
            <div className="flex justify-between items-end mb-6 px-6">
              {topPlayers.length >= 3 && (
                <>
                  {/* 2nd place */}
                  <div className="flex flex-col items-center">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-500">
                        <img
                          src={topPlayers[1].avatar || "/placeholder.svg?height=48&width=48"}
                          alt={topPlayers[1].name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute -bottom-2 -right-2 bg-gray-700 rounded-full w-6 h-6 flex items-center justify-center border-2 border-gray-500">
                        <Medal className="w-3 h-3 text-gray-300" />
                      </div>
                    </div>
                    <div className="mt-1 text-sm font-medium truncate max-w-[80px] text-center">
                      {topPlayers[1].name}
                    </div>
                    <div className="text-xs text-gray-400">{topPlayers[1].score} ⭐</div>
                    <div className="h-20 w-12 bg-gray-700 mt-2"></div>
                  </div>

                  {/* 1st place */}
                  <div className="flex flex-col items-center">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-yellow-500">
                        <img
                          src={topPlayers[0].avatar || "/placeholder.svg?height=64&width=64"}
                          alt={topPlayers[0].name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute -bottom-2 -right-2 bg-yellow-500 rounded-full w-7 h-7 flex items-center justify-center border-2 border-yellow-600">
                        <Trophy className="w-4 h-4 text-white" />
                      </div>
                    </div>
                    <div className="mt-1 text-sm font-medium truncate max-w-[80px] text-center">
                      {topPlayers[0].name}
                    </div>
                    <div className="text-xs text-yellow-400">{topPlayers[0].score} ⭐</div>
                    <div className="h-28 w-16 bg-yellow-700/50 mt-2"></div>
                  </div>

                  {/* 3rd place */}
                  <div className="flex flex-col items-center">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-amber-700">
                        <img
                          src={topPlayers[2].avatar || "/placeholder.svg?height=48&width=48"}
                          alt={topPlayers[2].name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute -bottom-2 -right-2 bg-amber-700 rounded-full w-6 h-6 flex items-center justify-center border-2 border-amber-800">
                        <Medal className="w-3 h-3 text-amber-200" />
                      </div>
                    </div>
                    <div className="mt-1 text-sm font-medium truncate max-w-[80px] text-center">
                      {topPlayers[2].name}
                    </div>
                    <div className="text-xs text-amber-400">{topPlayers[2].score} ⭐</div>
                    <div className="h-16 w-12 bg-amber-900/40 mt-2"></div>
                  </div>
                </>
              )}
            </div>

            {/* Player list (excluding top 3) */}
            <div className="space-y-2">
              {topPlayers.slice(3).map((player, index) => (
                <div
                  key={player.id}
                  className={`flex items-center p-2 rounded-lg ${
                    player.id === currentUserId ? "bg-blue-900/30 border border-blue-700" : "bg-gray-800"
                  }`}
                >
                  <div className="text-sm font-medium w-6 text-center text-gray-400">{index + 4}</div>
                  <div className="w-8 h-8 rounded-full overflow-hidden mx-2">
                    <img
                      src={player.avatar || "/placeholder.svg?height=32&width=32"}
                      alt={player.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 text-sm font-medium">{player.name}</div>
                  <div className="flex items-center">
                    <span className="text-sm font-medium mr-1">{player.score} ⭐</span>
                    {player.change === "up" && <ChevronUp className="w-4 h-4 text-green-500" />}
                    {player.change === "down" && <ChevronDown className="w-4 h-4 text-red-500" />}
                  </div>
                </div>
              ))}
            </div>

            {/* Current user's position if not in top 10 */}
            {userRank && (
              <div className="mt-4 pt-4 border-t border-gray-700">
                <div className="flex items-center p-2 rounded-lg bg-blue-900/30 border border-blue-700">
                  <div className="text-sm font-medium w-6 text-center text-gray-400">42</div>
                  <div className="w-8 h-8 rounded-full overflow-hidden mx-2">
                    <img
                      src={userRank.avatar || "/placeholder.svg?height=32&width=32"}
                      alt={userRank.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 text-sm font-medium">{userRank.name}</div>
                  <div className="flex items-center">
                    <span className="text-sm font-medium mr-1">{userRank.score} ⭐</span>
                    {userRank.change === "up" && <ChevronUp className="w-4 h-4 text-green-500" />}
                    {userRank.change === "down" && <ChevronDown className="w-4 h-4 text-red-500" />}
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Rating explanation */}
      <div className="w-full max-w-md border border-gray-700 p-3 rounded bg-gray-800">
        <p className="text-sm mb-2 font-medium">О рейтинге:</p>
        <ul className="text-xs space-y-1 text-gray-300">
          <li>• Рейтинг обновляется каждый час</li>
          <li>• Очки начисляются за выигрыши в играх</li>
          <li>• Чем больше ставка, тем больше очков</li>
          <li>• Топ-3 игрока недели получают призы</li>
          <li>• Ежемесячный сброс рейтинга</li>
        </ul>
      </div>
    </div>
  )
}

