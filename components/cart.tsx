"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/use-cart"
import { useTelegram } from "@/hooks/use-telegram"
import Image from "next/image"
import { useEffect } from "react"

export function Cart() {
  const { items, updateQuantity, removeItem, totalPrice, totalItems } = useCart()
  const { webApp } = useTelegram()

  useEffect(() => {
    if (webApp && items.length > 0) {
      webApp.MainButton.text = `Order Now • $${totalPrice.toFixed(2)}`
      webApp.MainButton.show()
      webApp.MainButton.enable()

      const handleOrder = () => {
        webApp.HapticFeedback.notificationOccurred("success")
        // Handle order submission
        console.log("Order submitted:", items)
      }

      webApp.MainButton.onClick(handleOrder)

      return () => {
        webApp.MainButton.offClick(handleOrder)
        webApp.MainButton.hide()
      }
    } else if (webApp) {
      webApp.MainButton.hide()
    }
  }, [webApp, items, totalPrice])

  if (items.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center py-16 px-4"
      >
        <div className="bg-gray-100 rounded-full p-6 mb-4">
          <ShoppingBag className="w-12 h-12 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
        <p className="text-gray-500 text-center">Add some items from the catalog to get started</p>
      </motion.div>
    )
  }

  return (
    <div className="px-4 py-4 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Your Cart</h2>
        <div className="text-sm text-gray-500">{totalItems} items</div>
      </div>

      <div className="space-y-3">
        <AnimatePresence>
          {items.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={60}
                      height={60}
                      className="w-15 h-15 object-cover rounded-lg"
                    />

                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 truncate">{item.name}</h3>
                      <p className="text-sm text-gray-500">{item.sku}</p>
                      <div className="text-lg font-bold text-blue-600 mt-1">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          removeItem(item.id)
                          webApp?.HapticFeedback.impactOccurred("light")
                        }}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>

                      <div className="flex items-center gap-2">
                        <motion.div whileTap={{ scale: 0.9 }}>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              updateQuantity(item.id, item.quantity - 1)
                              webApp?.HapticFeedback.impactOccurred("light")
                            }}
                            className="w-8 h-8 p-0 rounded-full"
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                        </motion.div>

                        <span className="w-8 text-center font-medium">{item.quantity}</span>

                        <motion.div whileTap={{ scale: 0.9 }}>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              updateQuantity(item.id, item.quantity + 1)
                              webApp?.HapticFeedback.impactOccurred("light")
                            }}
                            className="w-8 h-8 p-0 rounded-full"
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-sm text-gray-600">Total ({totalItems} items)</div>
              <div className="text-2xl font-bold text-blue-600">${totalPrice.toFixed(2)}</div>
            </div>
            <div className="text-right text-sm text-gray-500">
              Tap "Order Now" below
              <br />
              to proceed
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
