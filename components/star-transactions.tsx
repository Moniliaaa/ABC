"use client"

import { useState, useEffect } from "react"
import { ArrowDownUp, ChevronDown, ChevronUp, Clock, CreditCard, DollarSign, Users } from "lucide-react"

interface Transaction {
  id: string
  type: "buy" | "sell" | "win" | "lose" | "referral" | "withdrawal"
  amount: number
  date: Date
  status: "completed" | "pending" | "failed"
  details?: string
}

interface StarTransactionsProps {
  stars: number
  onStarsChange: (newAmount: number) => void
}

export default function StarTransactions({ stars, onStarsChange }: StarTransactionsProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [tgApp, setTgApp] = useState<any>(null)
  const [buyAmount, setBuyAmount] = useState(100)
  const [sellAmount, setSellAmount] = useState(100)
  const [withdrawAmount, setWithdrawAmount] = useState(100)
  const [activeTab, setActiveTab] = useState<"buy" | "sell" | "history">("buy")
  const [processing, setProcessing] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [confirmationAction, setConfirmationAction] = useState<(() => void) | null>(null)
  const [confirmationMessage, setConfirmationMessage] = useState("")

  useEffect(() => {
    // Initialize Telegram WebApp
    const tg = window.Telegram?.WebApp
    if (tg) {
      setTgApp(tg)
    }

    // Load mock transaction history
    const mockTransactions: Transaction[] = [
      {
        id: "tx-" + Math.random().toString(36).substring(2, 9),
        type: "buy",
        amount: 100,
        date: new Date(Date.now() - 3600000 * 2), // 2 hours ago
        status: "completed",
      },
      {
        id: "tx-" + Math.random().toString(36).substring(2, 9),
        type: "win",
        amount: 50,
        date: new Date(Date.now() - 3600000 * 5), // 5 hours ago
        status: "completed",
        details: "Dice Game",
      },
      {
        id: "tx-" + Math.random().toString(36).substring(2, 9),
        type: "referral",
        amount: 25,
        date: new Date(Date.now() - 3600000 * 24), // 1 day ago
        status: "completed",
        details: "From: User123",
      },
      {
        id: "tx-" + Math.random().toString(36).substring(2, 9),
        type: "sell",
        amount: 200,
        date: new Date(Date.now() - 3600000 * 48), // 2 days ago
        status: "completed",
      },
      {
        id: "tx-" + Math.random().toString(36).substring(2, 9),
        type: "lose",
        amount: 50,
        date: new Date(Date.now() - 3600000 * 72), // 3 days ago
        status: "completed",
        details: "Slot Machine",
      },
    ]

    setTransactions(mockTransactions)
  }, [])

  const buyStars = () => {
    if (!tgApp) return

    setProcessing(true)

    // In a real app, you would use tgApp.sendData to communicate with your bot
    // and the bot would create an actual invoice using the Bot API

    // For demo purposes, simulate a purchase
    setTimeout(() => {
      const newTransaction: Transaction = {
        id: "tx-" + Math.random().toString(36).substring(2, 9),
        type: "buy",
        amount: buyAmount,
        date: new Date(),
        status: "completed",
      }

      setTransactions([newTransaction, ...transactions])
      onStarsChange(stars + buyAmount)
      setProcessing(false)

      tgApp.showPopup({
        title: "Покупка завершена",
        message: `Вы успешно приобрели ${buyAmount} звезд!`,
        buttons: [{ id: "ok", type: "ok", text: "OK" }],
      })
    }, 1500)
  }

  const sellStars = () => {
    if (stars < sellAmount) {
      tgApp?.showPopup({
        title: "Недостаточно звезд",
        message: `У вас только ${stars} звезд. Выберите меньшую сумму.`,
        buttons: [{ id: "ok", type: "ok", text: "OK" }],
      })
      return
    }

    showConfirm(`Вы собираетесь продать ${sellAmount} звезд. Продолжить?`, () => {
      setProcessing(true)

      // In a real app, you would communicate with your backend to process the sale

      // For demo purposes, simulate a sale
      setTimeout(() => {
        const newTransaction: Transaction = {
          id: "tx-" + Math.random().toString(36).substring(2, 9),
          type: "sell",
          amount: sellAmount,
          date: new Date(),
          status: "completed",
        }

        setTransactions([newTransaction, ...transactions])
        onStarsChange(stars - sellAmount)
        setProcessing(false)

        tgApp?.showPopup({
          title: "Продажа завершена",
          message: `Вы успешно продали ${sellAmount} звезд!`,
          buttons: [{ id: "ok", type: "ok", text: "OK" }],
        })
      }, 1500)
    })
  }

  const withdrawStars = () => {
    if (stars < withdrawAmount) {
      tgApp?.showPopup({
        title: "Недостаточно звезд",
        message: `У вас только ${stars} звезд. Выберите меньшую сумму.`,
        buttons: [{ id: "ok", type: "ok", text: "OK" }],
      })
      return
    }

    showConfirm(`Вы собираетесь вывести ${withdrawAmount} звезд. Продолжить?`, () => {
      setProcessing(true)

      // In a real app, you would communicate with your backend to process the withdrawal

      // For demo purposes, simulate a withdrawal
      setTimeout(() => {
        const newTransaction: Transaction = {
          id: "tx-" + Math.random().toString(36).substring(2, 9),
          type: "withdrawal",
          amount: withdrawAmount,
          date: new Date(),
          status: "completed",
        }

        setTransactions([newTransaction, ...transactions])
        onStarsChange(stars - withdrawAmount)
        setProcessing(false)

        tgApp?.showPopup({
          title: "Вывод средств",
          message: `Заявка на вывод ${withdrawAmount} звезд принята. Средства поступят на ваш счет в течение 24 часов.`,
          buttons: [{ id: "ok", type: "ok", text: "OK" }],
        })
      }, 1500)
    })
  }

  const showConfirm = (message: string, onConfirm: () => void) => {
    setConfirmationMessage(message)
    setConfirmationAction(() => onConfirm)
    setShowConfirmation(true)
  }

  const handleConfirm = () => {
    if (confirmationAction) {
      confirmationAction()
    }
    setShowConfirmation(false)
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  return (
    <div className="flex flex-col">
      <div className="w-full max-w-xs bg-gray-900 p-4 rounded-lg shadow-sm border border-gray-700 mb-4">
        <h2 className="text-xl font-bold text-center mb-4">Управление звездами</h2>

        {/* Tab navigation */}
        <div className="flex rounded-lg overflow-hidden border border-gray-700 mb-4">
          <button
            onClick={() => setActiveTab("buy")}
            className={`flex-1 py-2 text-center text-sm font-medium ${
              activeTab === "buy" ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-300"
            }`}
          >
            Купить
          </button>
          <button
            onClick={() => setActiveTab("sell")}
            className={`flex-1 py-2 text-center text-sm font-medium ${
              activeTab === "sell" ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-300"
            }`}
          >
            Продать
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={`flex-1 py-2 text-center text-sm font-medium ${
              activeTab === "history" ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-300"
            }`}
          >
            История
          </button>
        </div>

        {/* Buy stars */}
        {activeTab === "buy" && (
          <div>
            <div className="mb-4">
              <p className="text-sm mb-2">Выберите количество звезд:</p>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setBuyAmount(100)}
                  className={`p-2 border ${buyAmount === 100 ? "border-blue-500 bg-blue-900" : "border-gray-700 bg-gray-800"} text-center rounded`}
                >
                  100 ⭐
                </button>
                <button
                  onClick={() => setBuyAmount(250)}
                  className={`p-2 border ${buyAmount === 250 ? "border-blue-500 bg-blue-900" : "border-gray-700 bg-gray-800"} text-center rounded`}
                >
                  250 ⭐
                </button>
                <button
                  onClick={() => setBuyAmount(500)}
                  className={`p-2 border ${buyAmount === 500 ? "border-blue-500 bg-blue-900" : "border-gray-700 bg-gray-800"} text-center rounded`}
                >
                  500 ⭐
                </button>
              </div>
            </div>

            <button
              onClick={buyStars}
              disabled={processing}
              className="w-full py-3 bg-blue-600 text-white font-bold rounded text-center disabled:bg-blue-800 disabled:opacity-50 mb-3"
            >
              {processing ? "Обработка..." : `Купить за ${buyAmount * 0.01} XTR`}
            </button>

            <div className="flex items-center justify-center p-2 border border-blue-500 rounded">
              <CreditCard className="w-5 h-5 mr-2 text-blue-400" />
              <span className="text-blue-400 font-medium">Оплата Звездами Telegram</span>
            </div>
          </div>
        )}

        {/* Sell stars */}
        {activeTab === "sell" && (
          <div>
            <div className="mb-4">
              <p className="text-sm mb-2">Выберите количество звезд:</p>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setSellAmount(100)}
                  className={`p-2 border ${sellAmount === 100 ? "border-blue-500 bg-blue-900" : "border-gray-700 bg-gray-800"} text-center rounded`}
                >
                  100 ⭐
                </button>
                <button
                  onClick={() => setSellAmount(250)}
                  className={`p-2 border ${sellAmount === 250 ? "border-blue-500 bg-blue-900" : "border-gray-700 bg-gray-800"} text-center rounded`}
                >
                  250 ⭐
                </button>
                <button
                  onClick={() => setSellAmount(500)}
                  className={`p-2 border ${sellAmount === 500 ? "border-blue-500 bg-blue-900" : "border-gray-700 bg-gray-800"} text-center rounded`}
                >
                  500 ⭐
                </button>
              </div>
            </div>

            <div className="bg-gray-800 rounded p-3 mb-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Курс обмена:</span>
                <span className="text-sm font-medium">1 ⭐ = 0.008 XTR</span>
              </div>
              <div className="flex justify-between items-center mt-1">
                <span className="text-sm">Вы получите:</span>
                <span className="text-sm font-medium text-green-400">{(sellAmount * 0.008).toFixed(2)} XTR</span>
              </div>
            </div>

            <button
              onClick={sellStars}
              disabled={processing || stars < sellAmount}
              className="w-full py-3 bg-green-600 text-white font-bold rounded text-center disabled:bg-green-800 disabled:opacity-50 mb-3"
            >
              {processing ? "Обработка..." : `Продать ${sellAmount} звезд`}
            </button>

            <div className="flex items-center justify-center p-2 border border-green-500 rounded">
              <DollarSign className="w-5 h-5 mr-2 text-green-400" />
              <span className="text-green-400 font-medium">Получите XTR на ваш кошелек</span>
            </div>
          </div>
        )}

        {/* Transaction history */}
        {activeTab === "history" && (
          <div>
            <p className="text-sm mb-3">История транзакций:</p>

            {transactions.length === 0 ? (
              <div className="text-center py-6 text-gray-500">
                <Clock className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>У вас пока нет транзакций</p>
              </div>
            ) : (
              <div className="space-y-2">
                {transactions.map((transaction) => (
                  <div key={transaction.id} className="bg-gray-800 p-2 rounded border border-gray-700">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        {transaction.type === "buy" && <CreditCard className="w-4 h-4 text-blue-400 mr-2" />}
                        {transaction.type === "sell" && <ArrowDownUp className="w-4 h-4 text-green-400 mr-2" />}
                        {transaction.type === "win" && <ChevronUp className="w-4 h-4 text-green-400 mr-2" />}
                        {transaction.type === "lose" && <ChevronDown className="w-4 h-4 text-red-400 mr-2" />}
                        {transaction.type === "referral" && <Users className="w-4 h-4 text-purple-400 mr-2" />}
                        {transaction.type === "withdrawal" && <DollarSign className="w-4 h-4 text-amber-400 mr-2" />}

                        <span className="text-sm">
                          {transaction.type === "buy" && "Покупка"}
                          {transaction.type === "sell" && "Продажа"}
                          {transaction.type === "win" && "Выигрыш"}
                          {transaction.type === "lose" && "Проигрыш"}
                          {transaction.type === "referral" && "Реферал"}
                          {transaction.type === "withdrawal" && "Вывод"}
                        </span>
                      </div>

                      <span
                        className={`text-sm font-medium ${
                          transaction.type === "buy" || transaction.type === "win" || transaction.type === "referral"
                            ? "text-green-400"
                            : "text-red-400"
                        }`}
                      >
                        {transaction.type === "buy" || transaction.type === "win" || transaction.type === "referral"
                          ? "+"
                          : "-"}
                        {transaction.amount} ⭐
                      </span>
                    </div>

                    <div className="flex justify-between items-center mt-1 text-xs text-gray-400">
                      <span>{formatDate(transaction.date)}</span>
                      <span
                        className={`
                        ${transaction.status === "completed" ? "text-green-400" : ""}
                        ${transaction.status === "pending" ? "text-amber-400" : ""}
                        ${transaction.status === "failed" ? "text-red-400" : ""}
                      `}
                      >
                        {transaction.status === "completed" && "Завершено"}
                        {transaction.status === "pending" && "В обработке"}
                        {transaction.status === "failed" && "Ошибка"}
                      </span>
                    </div>

                    {transaction.details && <div className="text-xs text-gray-500 mt-1">{transaction.details}</div>}
                  </div>
                ))}
              </div>
            )}

            <div className="mt-4">
              <p className="text-center text-xs text-gray-500">Показаны последние 5 транзакций</p>
            </div>
          </div>
        )}
      </div>

      {/* Withdrawal option */}
      {activeTab === "sell" && (
        <div className="w-full max-w-xs border border-gray-700 p-3 rounded bg-gray-800 mb-4">
          <p className="text-sm mb-2 font-medium">Вывод средств:</p>

          <div className="mb-3">
            <p className="text-xs mb-2">Количество звезд для вывода:</p>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setWithdrawAmount(100)}
                className={`p-2 border ${withdrawAmount === 100 ? "border-amber-500 bg-amber-900/30" : "border-gray-700 bg-gray-800"} text-center rounded text-xs`}
              >
                100 ⭐
              </button>
              <button
                onClick={() => setWithdrawAmount(250)}
                className={`p-2 border ${withdrawAmount === 250 ? "border-amber-500 bg-amber-900/30" : "border-gray-700 bg-gray-800"} text-center rounded text-xs`}
              >
                250 ⭐
              </button>
              <button
                onClick={() => setWithdrawAmount(500)}
                className={`p-2 border ${withdrawAmount === 500 ? "border-amber-500 bg-amber-900/30" : "border-gray-700 bg-gray-800"} text-center rounded text-xs`}
              >
                500 ⭐
              </button>
            </div>
          </div>

          <button
            onClick={withdrawStars}
            disabled={processing || stars < withdrawAmount}
            className="w-full py-2 bg-amber-600 text-white font-bold rounded text-center text-sm disabled:bg-amber-800 disabled:opacity-50"
          >
            {processing ? "Обработка..." : `Вывести ${withdrawAmount} звезд`}
          </button>
        </div>
      )}

      {/* Information box */}
      <div className="w-full max-w-xs border border-gray-700 p-3 rounded bg-gray-800">
        <p className="text-sm mb-2 font-medium">Информация:</p>
        <ul className="text-xs space-y-1 text-gray-300">
          <li>• Минимальная сумма для покупки: 100 ⭐</li>
          <li>• Минимальная сумма для продажи: 100 ⭐</li>
          <li>• Курс покупки: 1 XTR = 100 ⭐</li>
          <li>• Курс продажи: 100 ⭐ = 0.8 XTR</li>
          <li>• Вывод средств обрабатывается в течение 24 часов</li>
        </ul>
      </div>

      {/* Confirmation modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-4 rounded-lg max-w-xs w-full mx-4 border border-gray-700">
            <h3 className="text-lg font-bold mb-3">Подтверждение</h3>
            <p className="text-sm mb-4">{confirmationMessage}</p>
            <div className="flex gap-2">
              <button onClick={() => setShowConfirmation(false)} className="flex-1 py-2 bg-gray-700 text-white rounded">
                Отмена
              </button>
              <button onClick={handleConfirm} className="flex-1 py-2 bg-green-600 text-white rounded">
                Подтвердить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

