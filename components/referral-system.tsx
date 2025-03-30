"use client"

import { useState, useEffect } from "react"
import { Share2, Users, Gift, Copy } from "lucide-react"

interface ReferralSystemProps {
  stars: number
  onEarnStars: (amount: number) => void
}

export default function ReferralSystem({ stars, onEarnStars }: ReferralSystemProps) {
  const [referralCode, setReferralCode] = useState<string>("")
  const [referrals, setReferrals] = useState<number>(0)
  const [earnedStars, setEarnedStars] = useState<number>(0)
  const [copied, setCopied] = useState(false)
  const [tgApp, setTgApp] = useState<any>(null)

  useEffect(() => {
    // Initialize Telegram WebApp
    const tg = window.Telegram?.WebApp
    if (tg) {
      setTgApp(tg)

      // Generate referral code based on user ID or random if not available
      const userId = tg.initDataUnsafe?.user?.id || Math.floor(Math.random() * 1000000)
      setReferralCode(`ref${userId}`)
    } else {
      // Fallback for development
      setReferralCode(`ref${Math.floor(Math.random() * 1000000)}`)
    }

    // Load referral data from localStorage
    const savedReferrals = localStorage.getItem("referrals")
    const savedEarnedStars = localStorage.getItem("referralStars")

    if (savedReferrals) setReferrals(Number(savedReferrals))
    if (savedEarnedStars) setEarnedStars(Number(savedEarnedStars))
  }, [])

  const copyReferralLink = () => {
    const referralLink = `https://t.me/your_bot?start=${referralCode}`

    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(referralLink)
        .then(() => {
          setCopied(true)
          setTimeout(() => setCopied(false), 2000)
        })
        .catch((err) => {
          console.error("Failed to copy: ", err)
        })
    }

    // If Telegram API is available, use it
    if (tgApp) {
      tgApp.showPopup(
        {
          title: "Реферальная ссылка скопирована!",
          message: "Поделитесь ссылкой с друзьями, чтобы получить звезды",
          buttons: [
            { id: "share", type: "default", text: "Поделиться" },
            { id: "close", type: "cancel", text: "Закрыть" },
          ],
        },
        (buttonId: string) => {
          if (buttonId === "share") {
            shareReferralLink()
          }
        },
      )
    }
  }

  const shareReferralLink = () => {
    const referralLink = `https://t.me/your_bot?start=${referralCode}`
    const message = `Присоединяйся к игре и получи 50 звезд на старте! ${referralLink}`

    if (tgApp) {
      tgApp.shareUrl({
        url: referralLink,
        text: message,
      })
    }
  }

  // Simulate receiving a referral bonus (in a real app, this would be triggered by backend)
  const simulateReferralBonus = () => {
    const bonusAmount = 25

    // Update local state
    const newReferrals = referrals + 1
    const newEarnedStars = earnedStars + bonusAmount

    setReferrals(newReferrals)
    setEarnedStars(newEarnedStars)

    // Save to localStorage
    localStorage.setItem("referrals", newReferrals.toString())
    localStorage.setItem("referralStars", newEarnedStars.toString())

    // Update parent component
    onEarnStars(bonusAmount)

    // Show notification
    if (tgApp) {
      tgApp.showPopup({
        title: "Новый реферал!",
        message: `Ваш друг присоединился! Вы получили ${bonusAmount} звезд.`,
        buttons: [{ id: "ok", type: "ok", text: "Супер!" }],
      })
    }
  }

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-xs bg-gray-900 p-4 rounded-lg shadow-sm border border-gray-700 mb-4">
        <h2 className="text-xl font-bold text-center mb-4">Реферальная система</h2>

        <div className="bg-blue-900/30 border border-blue-500 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Ваш код:</span>
            <span className="font-bold">{referralCode}</span>
          </div>

          <div className="flex gap-2">
            <button
              onClick={copyReferralLink}
              className="flex-1 flex items-center justify-center gap-1 py-2 bg-blue-600 text-white font-medium rounded"
            >
              <Copy size={16} />
              {copied ? "Скопировано!" : "Копировать"}
            </button>

            <button
              onClick={shareReferralLink}
              className="flex-1 flex items-center justify-center gap-1 py-2 bg-blue-600 text-white font-medium rounded"
            >
              <Share2 size={16} />
              Поделиться
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-3 text-center">
            <Users className="w-6 h-6 mx-auto mb-1 text-blue-400" />
            <div className="text-xl font-bold">{referrals}</div>
            <div className="text-xs text-gray-400">Рефералов</div>
          </div>

          <div className="bg-gray-800 border border-gray-700 rounded-lg p-3 text-center">
            <Gift className="w-6 h-6 mx-auto mb-1 text-yellow-400" />
            <div className="text-xl font-bold">{earnedStars} ⭐</div>
            <div className="text-xs text-gray-400">Заработано</div>
          </div>
        </div>

        {/* For demo purposes only - in a real app this would be triggered by backend */}
        <button onClick={simulateReferralBonus} className="w-full py-2 bg-green-600 text-white font-bold rounded mb-4">
          Симулировать нового реферала
        </button>

        <div className="border border-gray-700 rounded p-3 bg-gray-800">
          <h3 className="font-medium mb-2">Как это работает:</h3>
          <ul className="text-sm space-y-1 text-gray-300">
            <li>• Пригласите друга по вашей реферальной ссылке</li>
            <li>• Когда друг присоединится, вы получите 25 ⭐</li>
            <li>• Ваш друг получит бонус 50 ⭐ на старте</li>
            <li>• Приглашайте больше друзей - получайте больше звезд!</li>
          </ul>
        </div>
      </div>

      <div className="w-full max-w-xs">
        <div className="border border-gray-700 p-3 rounded bg-gray-800">
          <p className="text-sm mb-2 font-medium">Уровни реферальной программы:</p>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs">5 рефералов</span>
              <span className="text-xs font-medium bg-blue-900 px-2 py-1 rounded">+100 ⭐ бонус</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs">10 рефералов</span>
              <span className="text-xs font-medium bg-purple-900 px-2 py-1 rounded">+250 ⭐ бонус</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs">25 рефералов</span>
              <span className="text-xs font-medium bg-yellow-900 px-2 py-1 rounded">+1000 ⭐ бонус</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

