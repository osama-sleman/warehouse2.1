"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ProductCard } from "./product-card"
import { CategoryFilter } from "./category-filter"
import { useTelegram } from "@/hooks/use-telegram"

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

// Mock warehouse data
const mockProducts: Product[] = [
  {
    id: "1",
    name: "Industrial Steel Pipes",
    price: 45.99,
    image: "/placeholder.svg?height=200&width=200",
    category: "Materials",
    stock: 150,
    sku: "SP-001",
    description: "High-quality steel pipes for construction",
  },
  {
    id: "2",
    name: "Safety Helmets",
    price: 29.99,
    image: "/placeholder.svg?height=200&width=200",
    category: "Safety",
    stock: 75,
    sku: "SH-002",
    description: "OSHA compliant safety helmets",
  },
  {
    id: "3",
    name: "Power Drill Set",
    price: 89.99,
    image: "/placeholder.svg?height=200&width=200",
    category: "Tools",
    stock: 32,
    sku: "PD-003",
    description: "Professional cordless drill set",
  },
  {
    id: "4",
    name: "LED Work Lights",
    price: 34.99,
    image: "/placeholder.svg?height=200&width=200",
    category: "Lighting",
    stock: 88,
    sku: "LW-004",
    description: "Bright LED work lights for job sites",
  },
  {
    id: "5",
    name: "Concrete Mixer",
    price: 299.99,
    image: "/placeholder.svg?height=200&width=200",
    category: "Equipment",
    stock: 12,
    sku: "CM-005",
    description: "Portable concrete mixer for small projects",
  },
  {
    id: "6",
    name: "Work Gloves",
    price: 12.99,
    image: "/placeholder.svg?height=200&width=200",
    category: "Safety",
    stock: 200,
    sku: "WG-006",
    description: "Durable work gloves with grip",
  },
]

const categories = ["All", "Materials", "Safety", "Tools", "Lighting", "Equipment"]

interface ProductCatalogProps {
  searchQuery: string
}

export function ProductCatalog({ searchQuery }: ProductCatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [filteredProducts, setFilteredProducts] = useState(mockProducts)
  const { webApp } = useTelegram()

  useEffect(() => {
    let filtered = mockProducts

    if (selectedCategory !== "All") {
      filtered = filtered.filter((product) => product.category === selectedCategory)
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    setFilteredProducts(filtered)
  }, [selectedCategory, searchQuery])

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    webApp?.HapticFeedback.selectionChanged()
  }

  return (
    <div className="px-4 py-4 space-y-4">
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />

      <motion.div layout className="grid grid-cols-2 gap-4">
        <AnimatePresence>
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredProducts.length === 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
          <div className="text-gray-400 text-lg mb-2">No items found</div>
          <div className="text-gray-500 text-sm">Try adjusting your search or filters</div>
        </motion.div>
      )}
    </div>
  )
}
