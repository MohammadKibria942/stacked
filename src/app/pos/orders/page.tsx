"use client";

import React, { useState } from "react";
import { MenuTabs } from "@/components/MenuTabs";

interface CartItem {
  name: string;
  description: string;
  price: string;
  image: string;
  quantity: number;
}

export default function OrdersPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const handleAddToCart = (item: {
    name: string;
    description: string;
    price: string;
    image: string;
  }) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (cartItem) => cartItem.name === item.name
      );
      if (existingItemIndex > -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1,
        };
        return updatedItems;
      } else {
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };

  const handleRemoveItemByName = (itemName: string) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (cartItem) => cartItem.name === itemName
      );
      if (existingItemIndex > -1) {
        const updatedItems = [...prevItems];
        if (updatedItems[existingItemIndex].quantity > 1) {
          updatedItems[existingItemIndex] = {
            ...updatedItems[existingItemIndex],
            quantity: updatedItems[existingItemIndex].quantity - 1,
          };
        } else {
          updatedItems.splice(existingItemIndex, 1);
        }
        return updatedItems;
      }
      return prevItems;
    });
  };

  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => {
        const price = parseFloat(item.price.replace(/[^0-9.-]+/g, ""));
        return total + price * item.quantity;
      }, 0)
      .toFixed(2);
  };

  return (
    <div className="flex h-screen bg-white text-foreground">
      {/* Menu Section - Left Side */}
      <div className="flex-1 overflow-y-auto p-4 border-r">
        <MenuTabs 
          onAddToCart={handleAddToCart} 
          onRemoveItemByName={handleRemoveItemByName}
        />
      </div>

      {/* Cart Section - Right Side */}
      <div className="w-96 bg-white p-6 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Current Order</h2>
        {cartItems.length > 0 ? (
          <>
            <ul className="space-y-4 mb-6">
              {cartItems.map((item, index) => (
                <li key={index} className="flex justify-between items-center">
                  <div>
                    <span className="font-medium">
                      {item.name} {item.quantity > 1 && `(x${item.quantity})`}
                    </span>
                    <span className="block text-sm text-gray-500">
                      £{item.price}
                    </span>
                  </div>
                  <button
                    className="text-red-500 hover:text-red-600 text-sm"
                    onClick={() => handleRemoveItemByName(item.name)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            <div className="border-t pt-4">
              <div className="flex justify-between items-center font-bold text-xl mb-6">
                <span>Total:</span>
                <span>£{calculateTotal()}</span>
              </div>
              <button 
                className="w-full bg-primary text-primary-foreground py-3 rounded-lg hover:bg-primary/90 transition font-semibold text-lg"
                onClick={() => {
                  // Handle payment logic here
                  setCartItems([]);
                }}
              >
                Complete Order
              </button>
            </div>
          </>
        ) : (
          <p className="text-gray-500">No items in the order.</p>
        )}
      </div>
    </div>
  );
}
