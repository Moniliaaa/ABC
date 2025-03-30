"use client"

import { useState, useEffect } from "react"

interface BalanceProps {
  stars: number
  onTopUp: (newBalance: number) => void
}

export default function Balance({ stars, onTopUp }: BalanceProps) {
  const [amount, setAmount] = useState<number>(100)
  const [isProcessing, setIsProcessing] = useState(false)
  const [tgApp, setTgApp] = useState<any>(null)

  useEffect(() => {
    // Initialize Telegram WebApp
    const tg = window.Telegram?.WebApp
    if (tg) {
      setTgApp(tg)
    }
  }, [])

  const handleTelegramPayment = async () => {
    if (!tgApp) {
      alert("Telegram WebApp не инициализирован")
      return
    }

    setIsProcessing(true)

    try {
      // Create an invoice for the stars purchase
      const invoiceParams = {
        title: `${amount} Звезд`,
        description: `Пополнение баланса на ${amount} звезд для мини-игр`,
        payload: JSON.stringify({
          userId: tgApp.initDataUnsafe?.user?.id || "anonymous",
          amount: amount,
          timestamp: Date.now(),
        }),
        provider_token: "PROVIDER_TOKEN", // In production, this would be your actual provider token
        currency: "XTR", // XTR is the currency code for Telegram Stars
        prices: [
          { label: `${amount} Звезд`, amount: amount * 100 }, // Amount in smallest units (100 = 1 Star)
        ],
        photo_url: "https://example.com/stars.png", // Optional: URL of the product photo
        need_name: false,
        need_phone_number: false,
        need_email: false,
        need_shipping_address: false,
        is_flexible: false,
      }

      // Open the payment interface
      tgApp.showPopup(
        {
          title: "Покупка Звезд",
          message: `Вы собираетесь приобрести ${amount} звезд. Продолжить?`,
          buttons: [
            { id: "cancel", type: "cancel", text: "Отмена" },
            { id: "buy", type: "default", text: "Купить" },
          ],
        },
        (buttonId: string) => {
          if (buttonId === "buy") {
            // In a real implementation, you would use tgApp.sendData to communicate with your bot
            // and the bot would create the actual invoice using the Bot API

            // For demo purposes, we'll simulate a successful payment
            setTimeout(() => {
              onTopUp(stars + amount)
              tgApp.showAlert(`Успешно добавлено ${amount} звезд!`)
              setIsProcessing(false)
            }, 1500)
          } else {
            setIsProcessing(false)
          }
        },
      )
    } catch (error) {
      console.error("Payment error:", error)
      tgApp?.showAlert("Произошла ошибка при обработке платежа")
      setIsProcessing(false)
    }
  }

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-xs bg-gray-900 p-4 rounded-lg shadow-sm border border-gray-700 mb-4">
        <h2 className="text-xl font-bold text-center mb-4">Пополнить баланс</h2>

        <div className="mb-4">
          <p className="text-sm mb-2">
            Текущий баланс: <span className="font-bold">{stars} ⭐</span>
          </p>

          <div className="border border-gray-700 rounded-lg p-3 bg-gray-800">
            <p className="text-sm mb-2">Выберите сумму:</p>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setAmount(100)}
                className={`p-2 border ${amount === 100 ? "border-blue-500 bg-blue-900" : "border-gray-700"} text-center rounded`}
              >
                100 ⭐
              </button>
              <button
                onClick={() => setAmount(300)}
                className={`p-2 border ${amount === 300 ? "border-blue-500 bg-blue-900" : "border-gray-700"} text-center rounded`}
              >
                300 ⭐
              </button>
              <button
                onClick={() => setAmount(500)}
                className={`p-2 border ${amount === 500 ? "border-blue-500 bg-blue-900" : "border-gray-700"} text-center rounded`}
              >
                500 ⭐
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={handleTelegramPayment}
            disabled={isProcessing}
            className="w-full py-3 bg-blue-600 text-white font-bold rounded text-center disabled:bg-blue-800 disabled:opacity-50"
          >
            {isProcessing ? "Обработка..." : "Купить Звезды Telegram"}
          </button>

          <div className="flex items-center justify-center p-2 border border-blue-500 rounded">
            <img src="/placeholder.svg?height=24&width=24" alt="Telegram Stars" className="w-6 h-6 mr-2" />
            <span className="text-blue-400 font-medium">Оплата Звездами Telegram</span>
          </div>
        </div>
      </div>

      <div className="w-full max-w-xs">
        <div className="border border-gray-700 p-3 rounded bg-gray-800">
          <p className="text-sm mb-2 font-medium">О Звездах Telegram:</p>
          <ul className="text-xs space-y-1">
            <li>• Звезды — официальная цифровая валюта Telegram</li>
            <li>• Покупайте их через встроенные покупки или @PremiumBot</li>
            <li>• Используйте для покупок в ботах и мини-приложениях</li>
            <li>• Безопасные и мгновенные транзакции</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

