"use client"

import { motion } from "framer-motion"
import { Package, Clock, CheckCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const mockOrders = [
  {
    id: "ORD-001",
    status: "delivered",
    items: 3,
    total: 156.97,
    date: "2024-01-15",
    estimatedDelivery: "2024-01-18",
  },
  {
    id: "ORD-002",
    status: "processing",
    items: 1,
    total: 89.99,
    date: "2024-01-16",
    estimatedDelivery: "2024-01-20",
  },
  {
    id: "ORD-003",
    status: "pending",
    items: 5,
    total: 234.5,
    date: "2024-01-17",
    estimatedDelivery: "2024-01-22",
  },
]

export function OrderFlow() {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case "processing":
        return <Package className="w-5 h-5 text-blue-600" />
      default:
        return <Clock className="w-5 h-5 text-yellow-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800"
      case "processing":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-yellow-100 text-yellow-800"
    }
  }

  return (
    <div className="px-4 py-4 space-y-4">
      <h2 className="text-xl font-bold text-gray-900">Your Orders</h2>

      <div className="space-y-3">
        {mockOrders.map((order, index) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="overflow-hidden hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(order.status)}
                    <div>
                      <div className="font-medium text-gray-900">{order.id}</div>
                      <div className="text-sm text-gray-500">{order.date}</div>
                    </div>
                  </div>
                  <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                </div>

                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-600">
                    {order.items} items • ${order.total.toFixed(2)}
                  </div>
                  <div className="text-sm text-gray-500">Est. delivery: {order.estimatedDelivery}</div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
