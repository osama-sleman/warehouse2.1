"use client";

import { useEffect, useState } from "react";
import { ProductCatalog } from "@/components/product-catalog";
import { Cart } from "@/components/cart";
import { OrderFlow } from "@/components/order-flow";
import { SearchHeader } from "@/components/search-header";
import { BottomNav } from "@/components/bottom-nav";
import { useTelegram } from "@/hooks/use-telegram";
import { useCart } from "@/hooks/use-cart";

export default function TelegramWarehouseApp() {
  const [currentView, setCurrentView] = useState<"catalog" | "cart" | "orders">(
    "catalog"
  );
  const [searchQuery, setSearchQuery] = useState("");
  const { webApp, user } = useTelegram();
  const { items, totalItems } = useCart();

  useEffect(() => {
    if (webApp) {
      webApp.ready();
      webApp.expand();
      webApp.setHeaderColor("#1f2937");
      webApp.setBackgroundColor("#f9fafb");
    }
  }, [webApp]);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <SearchHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        user={user}
      />

      <main className="pt-16">
        {currentView === "catalog" && (
          <ProductCatalog searchQuery={searchQuery} />
        )}
        {currentView === "cart" && <Cart />}
        {currentView === "orders" && <OrderFlow />}
      </main>

      <BottomNav
        currentView={currentView}
        onViewChange={setCurrentView}
        cartItemCount={totalItems}
      />
    </div>
  );
}
