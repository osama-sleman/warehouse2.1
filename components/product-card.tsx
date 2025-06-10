"use client"

import { motion } from "framer-motion"
import { Plus, Package } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/hooks/use-cart"
import { useTelegram } from "@/hooks/use-telegram"
import Image from "next/image"

interface Product {
  id: string
  name: string
  price: number
  image: string
  category: string
  stock: number
  sku: string
  description: string
}

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()
  const { webApp } = useTelegram()

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      sku: product.sku,
    })
    webApp?.HapticFeedback.notificationOccurred("success")
  }

  const getStockColor = (stock: number) => {
    if (stock > 50) return "bg-green-100 text-green-800"
    if (stock > 20) return "bg-yellow-100 text-yellow-800"
    return "bg-red-100 text-red-800"
  }

  return (
    <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
      <Card className="overflow-hidden bg-white shadow-sm border-0 hover:shadow-md transition-shadow duration-200">
        <CardContent className="p-0">
          <div className="relative">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              width={200}
              height={160}
              className="w-full h-40 object-cover"
            />
            <Badge className={`absolute top-2 right-2 text-xs ${getStockColor(product.stock)}`}>
              {product.stock} in stock
            </Badge>
          </div>

          <div className="p-3 space-y-2">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-sm text-gray-900 truncate">{product.name}</h3>
                <div className="flex items-center gap-1 mt-1">
                  <Package className="w-3 h-3 text-gray-400" />
                  <span className="text-xs text-gray-500">{product.sku}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-lg font-bold text-blue-600">${product.price}</div>
              <motion.div whileTap={{ scale: 0.9 }}>
                <Button
                  size="sm"
                  onClick={handleAddToCart}
                  className="bg-blue-600 hover:bg-blue-700 text-white rounded-full w-8 h-8 p-0"
                  disabled={product.stock === 0}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </motion.div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
