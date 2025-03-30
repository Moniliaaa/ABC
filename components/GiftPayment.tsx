"use client"

import { useState, useEffect } from "react"
import type { TelegramGift } from "@/lib/gifts"
import { CreditCard, Check, X } from "lucide-react"

interface GiftPaymentProps {
  gift: TelegramGift | null
  onClose: () => void
  onSuccess: () => void
}

export default function GiftPayment({ gift, onClose, onSuccess }: GiftPaymentProps) {
  const [loading, setLoading] = useState(false)
  const [tgApp, setTgApp] = useState<any>(null)
  const [paymentStatus, setPaymentStatus] = useState<"pending" | "success" | "failed" | null>(null)

  useEffect(() => {
    // Инициализация Telegram WebApp
    const tg = window.Telegram?.WebApp
    if (tg) {
      setTgApp(tg)
    }
  }, [])

  const initiatePayment = async () => {
    if (!gift || !tgApp) return

    setLoading(true)
    setPaymentStatus("pending")

    try {
      // В реальном приложении здесь был бы запрос к вашему API для создания инвойса
      // Для демонстрации используем имитацию запроса

      // Создаем данные для отправки на сервер
      const paymentData = {
        userId: tgApp.initDataUnsafe?.user?.id || "unknown",
        giftId: gift.id,
        giftName: gift.name,
        price: gift.price,
        timestamp: Date.now(),
      }

      // Имитируем запрос к API
      console.log("Sending payment request:", paymentData)

      // В реальном приложении здесь был бы код:
      // const response = await fetch('/api/payment', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(paymentData)
      // })
      // const data = await response.json()

      // Имитируем успешный ответ от сервера
      setTimeout(() => {
        // Показываем диалог подтверждения через Telegram WebApp
        tgApp.showConfirm(
          `Вы хотите приобрести подарок "${gift.name}" за ${gift.price} Stars?`,
          (confirmed: boolean) => {
            if (confirmed) {
              // Имитируем успешную оплату
              setTimeout(() => {
                setPaymentStatus("success")
                setLoading(false)

                // Показываем уведомление об успешной оплате
                tgApp.showAlert(`Поздравляем! Вы приобрели подарок "${gift.name}". Он добавлен в вашу коллекцию.`)

                // Вызываем колбэк успешной оплаты
                onSuccess()
              }, 1500)
            } else {
              setPaymentStatus("failed")
              setLoading(false)
            }
          },
        )
      }, 1000)
    } catch (error) {
      console.error("Payment error:", error)
      setPaymentStatus("failed")
      setLoading(false)
      tgApp?.showAlert("Произошла ошибка при обработке платежа. Пожалуйста, попробуйте позже.")
    }
  }

  if (!gift) return null

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-lg max-w-md w-full border border-gray-700 overflow-hidden">
        {/* Заголовок */}
        <div className="bg-gray-800 p-4 flex items-center justify-between">
          <h2 className="font-bold text-lg">Покупка подарка</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Содержимое */}
        <div className="p-4">
          {/* Информация о подарке */}
          <div className="flex items-center mb-6">
            <div
              className="w-16 h-16 rounded-lg mr-4 flex-shrink-0 flex items-center justify-center"
              style={{ backgroundColor: gift.color }}
            >
              <img src={gift.image || "/placeholder.svg"} alt={gift.name} className="w-12 h-12 object-contain" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg">{gift.name}</h3>
              <p className="text-sm text-gray-300">{gift.description}</p>
              <p className="text-yellow-400 font-bold mt-1">{gift.price} Stars</p>
            </div>
          </div>

          {/* Статус оплаты */}
          {paymentStatus === "success" && (
            <div className="bg-green-900/30 border border-green-600 rounded-lg p-4 mb-6 flex items-center">
              <Check className="w-6 h-6 text-green-500 mr-3" />
              <div>
                <p className="font-medium text-green-400">Оплата успешна!</p>
                <p className="text-sm text-green-300/80">Подарок добавлен в вашу коллекцию</p>
              </div>
            </div>
          )}

          {paymentStatus === "failed" && (
            <div className="bg-red-900/30 border border-red-600 rounded-lg p-4 mb-6 flex items-center">
              <X className="w-6 h-6 text-red-500 mr-3" />
              <div>
                <p className="font-medium text-red-400">Оплата отменена</p>
                <p className="text-sm text-red-300/80">Вы можете попробовать снова</p>
              </div>
            </div>
          )}

          {/* Информация об оплате */}
          <div className="bg-gray-800 rounded-lg p-4 mb-6">
            <h4 className="font-medium mb-2">Информация об оплате:</h4>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-400">Подарок:</span>
              <span>{gift.name}</span>
            </div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-400">Стоимость:</span>
              <span>{gift.price} Stars</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Способ оплаты:</span>
              <span>Telegram Stars</span>
            </div>
          </div>

          {/* Кнопки действий */}
          <div className="flex gap-3">
            <button onClick={onClose} className="flex-1 py-3 bg-gray-700 text-white font-medium rounded">
              Отмена
            </button>

            <button
              onClick={initiatePayment}
              disabled={loading || paymentStatus === "success"}
              className="flex-1 py-3 bg-blue-600 text-white font-bold rounded disabled:bg-blue-800 disabled:opacity-50 flex items-center justify-center"
            >
              {loading ? (
                <>
                  <div className="animate-spin mr-2 w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                  Обработка...
                </>
              ) : paymentStatus === "success" ? (
                <>
                  <Check className="w-5 h-5 mr-2" />
                  Оплачено
                </>
              ) : (
                <>
                  <CreditCard className="w-5 h-5 mr-2" />
                  Оплатить
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

