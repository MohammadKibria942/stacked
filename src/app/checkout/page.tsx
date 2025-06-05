'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Footer } from '@/components/Footer';
import { getStripe } from '@/lib/stripe';
import { Loader2 } from 'lucide-react';

interface CartItem {
  name: string;
  description: string;
  price: string;
  image: string;
  quantity: number;
}

interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'completed';
  paymentStatus: 'paid';
  timestamp: string;
}

export default function CheckoutPage() {
  const [checkoutItems, setCheckoutItems] = useState<CartItem[]>([]);
  const [paymentStatus, setPaymentStatus] = useState<'success' | 'canceled' | null>(null);  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  useEffect(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      setCheckoutItems(JSON.parse(storedCartItems));
    }    // Check URL parameters for payment status
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('success')) {
      setPaymentStatus('success');
      
      // Save the order to localStorage
      const currentCartItems = localStorage.getItem('cartItems');
      if (currentCartItems) {
        const items: CartItem[] = JSON.parse(currentCartItems);
        const newOrder: Order = {
          id: `ORD-${Date.now()}`,
          items: items,
          total: items.reduce((total: number, item: CartItem) => {
            return total + (parseFloat(item.price.replace(/[^0-9.-]+/g, "")) * item.quantity);
          }, 0),
          status: 'pending', // New orders are pending cooking
          paymentStatus: 'paid', // Mark order as paid
          timestamp: new Date().toISOString(),
        };

        // Get existing orders
        const existingOrders = localStorage.getItem('stacked_orders');
        const orders = existingOrders ? JSON.parse(existingOrders) : [];

        // Add new order to the beginning of the array
        orders.unshift(newOrder);
        
        // Keep only the last 50 orders
        const limitedOrders = orders.slice(0, 50);
        
        setConfirmedOrder(newOrder); // Set the confirmed order for display
        // Save back to localStorage
        localStorage.setItem('stacked_orders', JSON.stringify(limitedOrders));
      }
      
      localStorage.removeItem('cartItems'); // Clear cart on successful payment
    } else if (urlParams.get('canceled')) {
      setPaymentStatus('canceled');
    }
  }, []);

  const calculateTotal = () => {
    return checkoutItems.reduce((total, item) => {
      const price = parseFloat(item.price.replace(/[^0-9.-]+/g, ""));
      return total + price * item.quantity;
    }, 0).toFixed(2);
  };

  const handlePayment = async () => {
    try {
      setIsProcessing(true);      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items: checkoutItems }),
      });
      
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Server error - received non-JSON response');
      }
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Network response was not ok');
      }      const { sessionId } = data;
      
      try {
        const stripe = await getStripe();
        const { error } = await stripe.redirectToCheckout({ sessionId });
        if (error) {
          throw error;
        }
      } catch (stripeError: any) {
        console.error('Stripe error:', stripeError);
        setError(stripeError.message || 'Failed to redirect to payment page');
        setIsProcessing(false);
      }} catch (error: any) {
      console.error('Payment error:', error);
      setError(error.message || 'An error occurred during payment');
      setIsProcessing(false);
    }
  };

  if (checkoutItems.length === 0 && !paymentStatus) {
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
      <header className="w-full flex justify-center items-center py-6 px-8 bg-neutral-100 dark:bg-neutral-900">
        <h1 className="text-4xl font-bold tracking-tight">STACKED - Checkout</h1>
      </header>
      <main className="flex-grow container mx-auto px-4 py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg">
            <p className="font-medium">{error}</p>
          </div>
        )}
        {paymentStatus === 'success' && (
          <div className="mb-6 p-6 bg-green-50 text-green-800 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-green-700">Payment Successful!</h2>
            <p className="mb-4">Thank you for your order. Here are your order details:</p>
            {confirmedOrder && (
              <div className="bg-white p-4 rounded-md border border-green-200">
                <p className="mb-2"><strong>Order ID:</strong> {confirmedOrder.id}</p>
                <h3 className="text-lg font-semibold mb-2">Items:</h3>
                <ul className="list-disc list-inside mb-3 space-y-1 text-sm">
                  {confirmedOrder.items.map((item, index) => (
                    <li key={index}>
                      {item.quantity}x {item.name} - £{(parseFloat(item.price.replace(/[^0-9.-]+/g, "")) * item.quantity).toFixed(2)}
                    </li>
                  ))}
                </ul>
                <p className="font-bold text-lg border-t border-green-200 pt-3 mt-3">
                  Total Paid: £{confirmedOrder.total.toFixed(2)}
                </p>
              </div>
            )}
            <Link href="/" className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition mt-6 inline-block">
              Continue Shopping
            </Link>
          </div>
        )}
        {paymentStatus === 'canceled' && (
          <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg">
            <p className="font-medium">Payment was canceled. Please try again.</p>
          </div>
        )}
        
        {!paymentStatus && (
          <>
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
            <button 
              className="w-full bg-green-500 text-white py-3 rounded hover:bg-green-600 transition mt-8 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              disabled={isProcessing}
              onClick={handlePayment}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processing...
                </>
              ) : (
                'Pay Now'
              )}
            </button>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}