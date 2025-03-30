export interface TelegramGift {
  id: string
  name: string
  description: string
  image: string
  price: number // Цена в Stars
  color: string
}

export const telegramGifts: TelegramGift[] = [
  {
    id: "jelly-bunny",
    name: "Jelly Bunny",
    description: "Милый желейный кролик",
    image: "/placeholder.svg?height=120&width=120",
    price: 10,
    color: "#FF9FF3",
  },
  {
    id: "homemade-cake",
    name: "Homemade Cake",
    description: "Вкусный домашний торт",
    image: "/placeholder.svg?height=120&width=120",
    price: 15,
    color: "#FECA57",
  },
  {
    id: "spiced-wine",
    name: "Spiced Wine",
    description: "Ароматное пряное вино",
    image: "/placeholder.svg?height=120&width=120",
    price: 20,
    color: "#FF6B6B",
  },
  {
    id: "teddy-bear",
    name: "Teddy Bear",
    description: "Мягкий плюшевый мишка",
    image: "/placeholder.svg?height=120&width=120",
    price: 25,
    color: "#A3CB38",
  },
  {
    id: "bouquet",
    name: "Bouquet",
    description: "Красивый букет цветов",
    image: "/placeholder.svg?height=120&width=120",
    price: 30,
    color: "#1DD1A1",
  },
  {
    id: "chocolate-box",
    name: "Chocolate Box",
    description: "Коробка изысканных шоколадных конфет",
    image: "/placeholder.svg?height=120&width=120",
    price: 18,
    color: "#5F27CD",
  },
  {
    id: "balloon-heart",
    name: "Balloon Heart",
    description: "Воздушный шар в форме сердца",
    image: "/placeholder.svg?height=120&width=120",
    price: 12,
    color: "#FF9FF3",
  },
  {
    id: "gift-box",
    name: "Gift Box",
    description: "Таинственная подарочная коробка",
    image: "/placeholder.svg?height=120&width=120",
    price: 35,
    color: "#54A0FF",
  },
]

