"use client"

import { motion } from "framer-motion"
import { Package, ShoppingCart, ClipboardList } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface BottomNavProps {
  currentView: "catalog" | "cart" | "orders"
  onViewChange: (view: "catalog" | "cart" | "orders") => void
  cartItemCount: number
}

export function BottomNav({ currentView, onViewChange, cartItemCount }: BottomNavProps) {
  const navItems = [
    { id: "catalog", icon: Package, label: "Catalog" },
    { id: "cart", icon: ShoppingCart, label: "Cart" },
    { id: "orders", icon: ClipboardList, label: "Orders" },
  ] as const

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 safe-area-pb">
      <div className="flex justify-around">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = currentView === item.id

          return (
            <motion.button
              key={item.id}
              whileTap={{ scale: 0.9 }}
              onClick={() => onViewChange(item.id)}
              className={`flex flex-col items-center py-2 px-4 rounded-lg transition-colors ${
                isActive ? "text-blue-600" : "text-gray-500"
              }`}
            >
              <div className="relative">
                <Icon className={`w-6 h-6 ${isActive ? "text-blue-600" : "text-gray-400"}`} />
                {item.id === "cart" && cartItemCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs min-w-[18px] h-[18px] flex items-center justify-center p-0">
                    {cartItemCount > 99 ? "99+" : cartItemCount}
                  </Badge>
                )}
              </div>
              <span className={`text-xs mt-1 ${isActive ? "text-blue-600 font-medium" : "text-gray-500"}`}>
                {item.label}
              </span>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
