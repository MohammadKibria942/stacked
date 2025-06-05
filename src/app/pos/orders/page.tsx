"use client";

import React, { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

interface OrderItem {
  name: string;
  price: string;
  quantity: number;
}

interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  status: "completed" | "pending";
  timestamp: string;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load orders from localStorage on component mount
    const loadOrders = () => {
      const savedOrders = localStorage.getItem("stacked_orders");
      if (savedOrders) {
        setOrders(JSON.parse(savedOrders));
      }
      setLoading(false);
    };

    loadOrders();

    // Set up event listener for storage changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "stacked_orders") {
        const newOrders = e.newValue ? JSON.parse(e.newValue) : [];
        setOrders(newOrders);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-8">
      <h1 className="text-3xl font-bold mb-8">Recent Orders</h1>

      {orders.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
          <p>No orders yet</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white border rounded-lg shadow-sm p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm text-gray-500">Order ID: {order.id}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(order.timestamp).toLocaleString()}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    order.status === "completed"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {order.status}
                </span>
              </div>

              <div className="space-y-2">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span>
                      {item.quantity}x {item.name}
                    </span>
                    <span className="text-gray-600">
                      £
                      {(parseFloat(item.price.replace(/[^0-9.-]+/g, "")) *
                        item.quantity)
                        .toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t flex justify-between items-center font-semibold">
                <span>Total</span>
                <span>£{order.total.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
