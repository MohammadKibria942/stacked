'use client';

import React,
{
  useState,
  useEffect
} from 'react';
import Link from 'next/link';
import { Footer } from '@/components/Footer';

interface CartItem {
  name: string;
  description: string;
  price: string;
  image: string;
  quantity: number;
}

export default function CheckoutPage() {
  const [checkoutItems, setCheckoutItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      setCheckoutItems(JSON.parse(storedCartItems));
    }
  }, []);

  const calculateTotal = () => {
    return checkoutItems.reduce((total, item) => {
      const price = parseFloat(item.price.replace(/[^0-9.-]+/g, ""));
      return total + price * item.quantity;
    }, 0).toFixed(2);
  };

  if (checkoutItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white text-foreground">
        <p className="text-xl mb-4">Your cart is empty. Add some items to checkout.</p>
        <Link href="/" className="bg-primary text-primary-foreground px-6 py-2 rounded hover:bg-primary/90 transition">
          Go to Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white text-foreground">
      {/* You might want a simplified header for the checkout page */}
      {/* <Header cartItems={checkoutItems} setCartItems={() => {}} />  */}
      <header className="w-full flex justify-center items-center py-6 px-8 bg-neutral-100 dark:bg-neutral-900">
        <h1 className="text-4xl font-bold tracking-tight">STACKED - Checkout</h1>
      </header>
      <main className="flex-grow container mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold mb-6">Your Order</h2>
        <ul className="mb-6 space-y-4">
          {checkoutItems.map((item, index) => (
            <li key={index} className="flex justify-between items-center p-4 border rounded-lg shadow-sm">
              <div>
                <span className="font-semibold">{item.name} {item.quantity > 1 && `(x${item.quantity})`}</span>
                <span className="ml-4 text-gray-600 dark:text-gray-400">{item.price} each</span>
              </div>
              <span className="font-semibold">£{(parseFloat(item.price.replace(/[^0-9.-]+/g, "")) * item.quantity).toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <div className="flex justify-between items-center font-bold text-xl p-4 border-t">
          <span>Total:</span>
          <span>£{calculateTotal()}</span>
        </div>
        <button className="w-full bg-green-500 text-white py-3 rounded hover:bg-green-600 transition mt-8 text-lg font-semibold">
          Pay Now
        </button>
      </main>
      <Footer />
    </div>
  );
}