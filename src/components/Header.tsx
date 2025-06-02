import React, { useState, useEffect } from "react";
import { ShoppingCart } from "lucide-react";

export function Header({ cartItems, setCartItems }: { cartItems: { name: string; description: string; price: string; image: string }[]; setCartItems: React.Dispatch<React.SetStateAction<{ name: string; description: string; price: string; image: string }[]>> }) {
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    if (cartItems.length > 0) {
      setIsCartOpen(true);
    }
  }, [cartItems]);

  const handleRemoveItem = (index: number) => {
    setCartItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + parseFloat(item.price.replace(/[^0-9.-]+/g, "")), 0).toFixed(2);
  };

  return (
    <header className="w-full flex justify-between items-center py-6 px-8 bg-neutral-100 dark:bg-neutral-900 relative">
      <h1 className="text-4xl font-bold tracking-tight">STACKED</h1>
      <div className="relative">
        <ShoppingCart
          className="w-6 h-6 text-neutral-800 dark:text-neutral-200 cursor-pointer"
          onClick={() => setIsCartOpen(!isCartOpen)}
        />
        <div
          className={`absolute right-0 mt-2 w-80 bg-white dark:bg-neutral-800 shadow-lg rounded-lg p-6 transform transition-transform duration-300 ${
            isCartOpen ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"
          }`}
        >
          <h2 className="text-lg font-semibold mb-2">Cart</h2>
          {cartItems.length > 0 ? (
            <>
              <ul className="mb-4">
                {cartItems.map((item, index) => (
                  <li key={index} className="flex justify-between items-center mb-2">
                    <div>
                      <span>{item.name}</span>
                      <span className="ml-2 text-gray-500">{item.price}</span>
                    </div>
                    <button
                      className="text-red-500 hover:underline text-sm"
                      onClick={() => handleRemoveItem(index)}
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
              <div className="flex justify-between font-semibold text-lg">
                <span>Total:</span>
                <span>£{calculateTotal()}</span>
              </div>
            </>
          ) : (
            <>
              <p className="text-sm text-gray-500 mb-4">Your cart is empty.</p>
              <div className="h-4"></div>
            </>
          )}
          <button className="w-full bg-primary text-primary-foreground py-2 rounded hover:bg-primary/90 transition mt-4">
            Checkout
          </button>
        </div>
      </div>
    </header>
  );
}
