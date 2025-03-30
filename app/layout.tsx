import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import Script from "next/script"

const inter = Inter({ subsets: ["latin", "cyrillic"] })

export const metadata = {
  title: "Игровой Мини-Апп",
  description: "Игра с кубиками и призами",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <head>
        <Script src="https://telegram.org/js/telegram-web-app.js" strategy="beforeInteractive" />
        {/* Add the Telegram Payments script */}
        <Script id="telegram-payment-init">
          {`
            window.telegramPaymentSetup = function() {
              if (window.Telegram && window.Telegram.WebApp) {
                console.log("Telegram WebApp payment initialized");
              }
            };
            
            if (document.readyState === 'complete' || document.readyState === 'interactive') {
              window.telegramPaymentSetup();
            } else {
              document.addEventListener('DOMContentLoaded', window.telegramPaymentSetup);
            }
          `}
        </Script>
      </head>
      <body className={inter.className}>
        <main className="flex min-h-screen flex-col items-center justify-between">{children}</main>
      </body>
    </html>
  )
}



import './globals.css'