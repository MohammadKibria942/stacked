import React, { useState, useEffect } from "react";
import { ShoppingCart } from "lucide-react";
import { useRouter } from 'next/navigation';

export function Header({ cartItems, setCartItems }: { cartItems: { name: string; description: string; price: string; image: string; quantity: number }[]; setCartItems: React.Dispatch<React.SetStateAction<{ name: string; description: string; price: string; image: string; quantity: number }[]>> }) {
	const [isCartOpen, setIsCartOpen] = useState(false);
	const router = useRouter(); // Correct hook for App Router

  // Ref to track previous cart length for smarter cart opening
  const prevCartLengthRef = React.useRef(cartItems.length);

  useEffect(() => {
    // Open cart only when it transitions from empty to non-empty
    if (prevCartLengthRef.current === 0 && cartItems.length > 0) {
      setIsCartOpen(true); 
    }
    prevCartLengthRef.current = cartItems.length;
  }, [cartItems.length]); // Depend on cartItems.length to detect change from empty to non-empty

  const handleRemoveItem = (index: number) => {
		setCartItems((prevItems) => {
			const updatedItems = [...prevItems]; // Create a copy
			if (updatedItems[index].quantity > 1) {
				// Decrease quantity
				updatedItems[index] = {
					...updatedItems[index],
					quantity: updatedItems[index].quantity - 1,
				};
			} else {
				// Remove item if quantity is 1
				updatedItems.splice(index, 1);
			}
			return updatedItems;
		});
  };

  const calculateTotal = () => {
		return cartItems.reduce((total, item) => {
			const price = parseFloat(item.price.replace(/[^0-9.-]+/g, ""));
			return total + price * item.quantity;
		}, 0).toFixed(2);
  };

  const handleCheckout = () => {
    // console.log("handleCheckout called. Cart items count:", cartItems.length); // For debugging
    if (cartItems.length > 0) {
      try {
        // console.log("Attempting to set localStorage and navigate..."); // For debugging
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        // console.log("localStorage set successfully."); // For debugging
        setIsCartOpen(false); // Close cart popover before navigating
        // console.log("Navigating to /checkout..."); // For debugging
        router.push('/checkout'); // Perform navigation
        // console.log("router.push('/checkout') called."); // For debugging
      } catch (error) {
        console.error("Error during checkout process:", error);
        alert("An error occurred while trying to proceed to checkout. Please check the console for details.");
      }
    } else {
      // console.log("Cart is empty, showing alert."); // For debugging
      alert("Your cart is empty. Please add items to proceed to checkout.");
    }
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
                      <span>
                        {item.name} {item.quantity > 1 && `(x${item.quantity})`}
                      </span>
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
          <button
            className={`w-full text-primary-foreground py-2 rounded transition mt-4 ${cartItems.length > 0 ? 'bg-primary hover:bg-primary/90' : 'bg-gray-400 cursor-not-allowed'}`}
            onClick={handleCheckout}
            disabled={cartItems.length === 0}
          >
            Checkout
          </button>
        </div>
      </div>
    </header>
  );
}
