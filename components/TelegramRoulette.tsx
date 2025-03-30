"use client"

import { useState, useRef, useEffect } from "react"
import { telegramGifts, type TelegramGift } from "@/lib/gifts"
import { Sparkles } from "lucide-react"

interface TelegramRouletteProps {
  onWin: (gift: TelegramGift) => void
  stars: number
}

export default function TelegramRoulette({ onWin, stars }: TelegramRouletteProps) {
  const [spinning, setSpinning] = useState(false)
  const [selectedGift, setSelectedGift] = useState<TelegramGift | null>(null)
  const [spinCost, setSpinCost] = useState(5) // Стоимость одного вращения
  const [tgApp, setTgApp] = useState<any>(null)
  const rouletteRef = useRef<HTMLDivElement>(null)

  // Создаем расширенный массив подарков для бесконечной прокрутки
  const extendedGifts = [...telegramGifts, ...telegramGifts, ...telegramGifts]

  useEffect(() => {
    // Инициализация Telegram WebApp
    const tg = window.Telegram?.WebApp
    if (tg) {
      tg.expand() // Расширяем приложение на весь экран
      tg.ready() // Сообщаем Telegram, что приложение готово
      setTgApp(tg)

      // Можно получить ID пользователя
      const userId = tg.initDataUnsafe?.user?.id
      console.log("User ID:", userId)
    }
  }, [])

  const spinRoulette = () => {
    if (spinning) return

    // Проверка на достаточное количество звезд
    if (stars < spinCost) {
      tgApp?.showAlert("Недостаточно звезд для вращения рулетки!")
      return
    }

    setSpinning(true)
    setSelectedGift(null)

    // Выбираем случайный подарок
    const randomIndex = Math.floor(Math.random() * telegramGifts.length)
    const winningGift = telegramGifts[randomIndex]

    // Рассчитываем позицию для остановки (центрируем выбранный подарок)
    const itemWidth = 160 // Ширина карточки подарка + отступы
    const containerWidth = rouletteRef.current?.clientWidth || 400
    const centerPosition = containerWidth / 2

    // Находим позицию выбранного подарка в расширенном массиве
    // Выбираем второй набор подарков из трех для более плавной анимации
    const targetIndex = telegramGifts.length + randomIndex
    const targetPosition = targetIndex * itemWidth

    // Рассчитываем смещение, чтобы выбранный подарок оказался в центре
    const scrollTo = targetPosition - centerPosition + itemWidth / 2

    // Устанавливаем CSS переменную для анимации
    if (rouletteRef.current) {
      rouletteRef.current.style.setProperty("--final-position", `-${scrollTo}px`)
    }

    // Ждем окончания анимации и показываем результат
    setTimeout(() => {
      setSelectedGift(winningGift)
      setSpinning(false)
      onWin(winningGift)
    }, 4000) // Время должно совпадать с длительностью CSS анимации
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-gray-900 p-4 rounded-lg shadow-sm border border-gray-700 mb-4">
        <h2 className="text-xl font-bold text-center mb-4">Рулетка подарков Telegram</h2>

        {/* Контейнер рулетки */}
        <div className="relative mb-6 overflow-hidden">
          <div className="linear-roulette-container">
            {/* Индикатор центра */}
            <div className="linear-roulette-indicator">
              <div className="linear-roulette-arrow"></div>
            </div>

            {/* Лента с подарками */}
            <div ref={rouletteRef} className={`linear-roulette-strip ${spinning ? "linear-roulette-spinning" : ""}`}>
              {extendedGifts.map((gift, index) => (
                <div
                  key={`${gift.id}-${index}`}
                  className="linear-roulette-item"
                  style={{ backgroundColor: gift.color }}
                >
                  <div className="flex flex-col items-center justify-center h-full">
                    <div className="w-12 h-12 bg-white rounded-full mb-1 flex items-center justify-center overflow-hidden">
                      <img
                        src={gift.image || "/placeholder.svg"}
                        alt={gift.name}
                        className="w-10 h-10 object-contain"
                      />
                    </div>
                    <div className="text-xs font-bold text-white text-center px-1">{gift.name}</div>
                    <div className="text-xs text-white/80 mt-1">{gift.price} ⭐</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Результат */}
        {selectedGift && !spinning && (
          <div className="bg-gray-800 p-3 rounded-lg border border-gray-700 mb-4 flex items-center">
            <div className="w-12 h-12 rounded-full mr-3 flex-shrink-0" style={{ backgroundColor: selectedGift.color }}>
              <div className="w-full h-full flex items-center justify-center">
                <img
                  src={selectedGift.image || "/placeholder.svg"}
                  alt={selectedGift.name}
                  className="w-8 h-8 object-contain"
                />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-white">{selectedGift.name}</h3>
              <p className="text-xs text-gray-300">{selectedGift.description}</p>
            </div>
            <div className="text-yellow-400 font-bold">{selectedGift.price} ⭐</div>
          </div>
        )}

        {/* Кнопка вращения */}
        <button
          onClick={spinRoulette}
          disabled={spinning}
          className="w-full py-3 bg-blue-600 text-white font-bold rounded disabled:bg-blue-800 disabled:opacity-50 flex items-center justify-center"
        >
          {spinning ? (
            <>
              <div className="animate-spin mr-2 w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
              Крутится...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 mr-2" />
              Крутить рулетку ({spinCost} ⭐)
            </>
          )}
        </button>
      </div>

      <div className="bg-gray-800 p-3 rounded-lg border border-gray-700">
        <h3 className="font-medium text-sm mb-2">Как это работает:</h3>
        <ul className="text-xs space-y-1 text-gray-300">
          <li>• Крутите рулетку, чтобы выиграть подарок Telegram</li>
          <li>• Каждое вращение стоит {spinCost} звезд</li>
          <li>• Выигранный подарок можно купить за Telegram Stars</li>
          <li>• После оплаты подарок будет добавлен в вашу коллекцию</li>
        </ul>
      </div>
    </div>
  )
}

