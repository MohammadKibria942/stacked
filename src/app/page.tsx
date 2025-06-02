'use client';

import { useState } from "react";
import Image from "next/image";
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

const tabs = [
	"Home",
	"Burgers",
	"Chicken Wings",
	"Loaded Fries",
	"Fries",
	"Drinks",
];

export default function Home() {
	const today = getTodayHours();
	const [activeTab, setActiveTab] = useState(tabs[0]);
	const [cartItems, setCartItems] = useState<{ name: string; description: string; price: string; image: string }[]>([]);

	const handleAddToCart = (item: { name: string; description: string; price: string; image: string }) => {
		setCartItems((prevItems) => [...prevItems, item]);
	};

	return (
		<div className="min-h-screen flex flex-col bg-white text-foreground">
			<Header cartItems={cartItems} setCartItems={setCartItems} />
			{/* Address & Opening Hours */}
			<div className="flex flex-col justify-center items-start gap-2 py-8 px-4 max-w-5xl mx-auto w-full md:items-start md:pl-0 md:w-full">
				<Address />
				<OpeningHours />
			</div>

			{/* Tabs Section */}
			<MenuTabs onAddToCart={handleAddToCart} />
			<div className="h-16" />

			<Footer />
		</div>
	);
}
