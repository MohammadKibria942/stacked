'use client';
import { useState } from "react";
import { Address } from "../components/Address";
import { OpeningHours } from "../components/OpeningHours";
import { Header } from "../components/Header";
import { MenuTabs } from "../components/MenuTabs";
import { Footer } from "../components/Footer";

const weekHours = [
	{ day: "Sunday", hours: "15:00 - 23:00" },
	{ day: "Monday", hours: "Closed" },
	{ day: "Tuesday", hours: "17:00 - 23:00" },
	{ day: "Wednesday", hours: "17:00 - 23:00" },
	{ day: "Thursday", hours: "17:00 - 23:00" },
	{ day: "Friday", hours: "17:00 - 23:00" },
	{ day: "Saturday", hours: "15:00 - 23:00" },
];

function getTodayHours() {
	const today = new Date().getDay(); // 0 = Sunday
	return weekHours[today];
}

export default function Home() {
	const today = getTodayHours();
	const [cartItems, setCartItems] = useState<{ name: string; description: string; price: string; image: string; quantity: number }[]>([]);

	const handleAddToCart = (item: { name: string; description: string; price: string; image: string }) => {
		setCartItems((prevItems) => {
			const existingItemIndex = prevItems.findIndex(
				(cartItem) => cartItem.name === item.name
			);
			if (existingItemIndex > -1) {
				// Item already exists, increase quantity
				const updatedItems = [...prevItems];
				updatedItems[existingItemIndex] = {
					...updatedItems[existingItemIndex],
					quantity: updatedItems[existingItemIndex].quantity + 1,
				};
				return updatedItems;
			} else {
				// New item, add it to the cart with quantity 1
				return [...prevItems, { ...item, quantity: 1 }];
			}
		});
	};

	const handleRemoveItemByName = (itemName: string) => {
		setCartItems((prevItems) => {
			const existingItemIndex = prevItems.findIndex(cartItem => cartItem.name === itemName);
			if (existingItemIndex > -1) {
				const updatedItems = [...prevItems];
				if (updatedItems[existingItemIndex].quantity > 1) {
					// Decrease quantity
					updatedItems[existingItemIndex] = {
						...updatedItems[existingItemIndex],
						quantity: updatedItems[existingItemIndex].quantity - 1,
					};
				} else {
					// Remove item if quantity is 1
					updatedItems.splice(existingItemIndex, 1);
				}
				return updatedItems;
			}
			return prevItems; // Return previous items if not found
		});
	};

	return (
		<div className="min-h-screen flex flex-col bg-white text-foreground">
			<Header cartItems={cartItems} setCartItems={setCartItems} />
			{/* Address & Opening Hours */}
			<div className="flex flex-col justify-center items-start gap-2 py-8 px-4 max-w-5xl mx-auto w-full md:items-start md:pl-0 md:w-full">
				<Address />
				<OpeningHours todayHoursString={today.hours} allWeekHours={weekHours} />
			</div>

			{/* Tabs Section */}
			<MenuTabs onAddToCart={handleAddToCart} onRemoveItemByName={handleRemoveItemByName} />
			<div className="h-16" />

			<Footer />
		</div>
	);
}
