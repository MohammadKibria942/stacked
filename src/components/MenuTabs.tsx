import React, { useState } from "react";
import { Settings2 } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const tabs = [
  "Burgers",
  "Chicken",
  "Chicken Wings",
  "Loaded Fries",
  "Fries",
  "Drinks",
];

const burgerItems = [
  {
    name: "Flam'in Smash",
    description:
      "2x 3oz Beef, American Cheese, Stacked Chilli Sauce, Caramelised Onion, Fresh Jalapeños & Brioche Bun, with a portion of fries.",
    price: "£10.49",
    image: "Flamin Smash.jpeg",
  },
  {
    name: "FULL HOUSE",
    description:
      "2X 3oz beef, American Cheese, Turkey Bacon, Stacked Sauce, Caramelised Onion, Gherkins & Brioche Bun, with a portion of fries",
    price: "£11.99",
    image: "FULL HOUSE.jpeg",
  },
  {
    name: "The STACKED",
    description:
      "2x 3oz Beef, American Cheese, Stacked Sauce, Caramelised Onion, Gherkins & Brioche Bun, with a portion of fries",
    price: "£10.99",
    image: "The STACKED.jpeg",
  },
];

const chickenItems = [
  {
    name: "The Chicken",
    description:
      "Buttermilk crispy chicken, cheese, lettuce, house slaw, garlic sauce, potato bun, with a portion of fries",
    price: "£7.99",
    image: "https://placehold.co/600x400.png",
  },
  {
    name: "The Hot Honey",
    description:
      "Buttermilk fried crispy chicken generously coated in our Hot Honey, topped with melted cheese, fresh lettuce, stacked with our signature chilli sauce, all served in a toasted brioche bun. Comes with a portion of fries.",
    price: "£7.99",
    image: "https://placehold.co/600x400.png",
  },
  {
    name: "The BBQ",
    description:
      "Buttermilk fried crispy chicken coated in our rich, smoky homemade BBQ sauce, topped with melted cheese, fresh lettuce, stacked with our signature chilli sauce, all served in a toasted brioche bun. Comes with a portion of fries.",
    price: "£7.99",
    image: "https://placehold.co/600x400.png",
  },
  {
    name: "The Buffalo",
    description:
      "Buttermilk fried crispy chicken coated in a classic tangy Buffalo sauce, topped with melted cheese, fresh lettuce, stacked with our signature chilli sauce, all served in a toasted brioche bun. Comes with a portion of fries.",
    price: "£7.99",
    image: "https://placehold.co/600x400.png",
  },
];

const chickenWingsItems = [
  {
    name: "Plain",
    description:
      "Crispy, golden wings. Served naked for you to enjoy the pure, unadulterated taste of our perfectly cooked chicken. Ideal for those who appreciate simplicity or like to add their own sauce.",
    price: "£5.00",
    image: "https://placehold.co/600x400.png",
  },
  {
    name: "Garlic Parm",
    description:
      "Savoury garlic and parmesan coated wings. A rich and aromatic blend of roasted garlic and sharp Parmesan cheese, creating a creamy, umami-packed coating that's utterly addictive.",
    price: "£6.49",
    image: "Garlic Parm.jpeg",
  },
  {
    name: "BUFFALO",
    description:
      "Lightly spicy wings in our Buffalo sauce. A classic American flavour with a tangy, spicy kick that's perfectly balanced. Not too hot, just right for a flavourful punch.",
    price: "£6.49",
    image: "Buffalo.jpeg",
  },
  {
    name: "Hot Honey",
    description:
      "Sweet and spicy honey-glazed wings. A tantalising combination of sweet golden honey and a fiery chilli kick, creating a sticky, glossy glaze that's both sweet and heat.",
    price: "£6.49",
    image: "Hot Honey.jpeg",
  },
  {
    name: "BBQ",
    description:
      "Wings tossed in a smooth, smoky BBQ sauce. Our signature BBQ sauce is rich, smoky, and slightly sweet, coating each wing in a deliciously messy glaze.",
    price: "£6.49",
    image: "https://placehold.co/600x400.png",
  },
];

const loadedFriesItems = [
  {
    name: "Beef'd Up",
    description:
      "Fries, smashed beef, gherkins, beef bacon, stacked sauce, caramelised onions.",
    price: "£9.99",
    image: "Beefd Up.jpeg",
    button: {
      text: "Add to Cart",
      icon: (
        <svg
          width="16"
          height="16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="10" />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 8v4m0 0v4m0-4h4m-4 0H8"
          />
        </svg>
      ),
    },
  },
  {
    name: "Loaded Chick",
    description:
      "House Fries Drizzled in House Sauce, Topped With our Chicken fillet.",
    price: "£8.49",
    image: "https://placehold.co/600x400.png",
    button: {
      text: "Customize & Add",
      icon: (
        <svg
          width="16"
          height="16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v6l4 2"
          />
        </svg>
      ),
    },
  },
];

const friesItems = [
  {
    name: "Plain Fries",
    description: "Classic crispy plain fries.",
    price: "£2.95",
    image: "https://placehold.co/600x400.png",
    button: { text: "Add to Cart" },
  },
  {
    name: "Fire Fries",
    description: "Crispy Fries tossed in Bold Cajun Seasoning.",
    price: "£3.95",
    image: "https://placehold.co/600x400.png",
    button: { text: "Add to Cart" },
  },
];

const drinksItems = [
  {
    name: "ICE Cola",
    description:
      "The original and best, a timeless classic that needs no introduction. Perfect for any meal, any time.",
    price: "£1.75",
    image: "ICE Cola.jpeg",
    button: { text: "Add to Cart" },
  },
  {
    name: "ICE Max",
    description:
      "All the great taste of classic cola, but with zero sugar. Maximum flavour, zero compromise.",
    price: "£1.75",
    image: "Ice Max.jpeg",
    button: { text: "Add to Cart" },
  },
  {
    name: "ICE Lemon",
    description:
      "A zesty and refreshing lemon-lime soda that's crisp, clean, and caffeine-free. Quench your thirst with its tangy sparkle.",
    price: "£1.75",
    image: "ICE Lemon.jpeg",
    button: { text: "Add to Cart" },
  },
  {
    name: "ICE Mango",
    description:
      "Escape to the tropics with this sweet and juicy mango flavoured drink. A vibrant taste of sunshine in every sip.",
    price: "£1.75",
    image: "ICE Mango.jpeg",
    button: { text: "Add to Cart" },
  },
  {
    name: "ICE Guava",
    description:
      "An exotic and fragrant guava drink that transports you to paradise. Sweet, floral, and utterly refreshing.",
    price: "£1.75",
    image: "ICE Guava.jpeg",
    button: { text: "Add to Cart" },
  },
  {
    name: "ICE Strawberry",
    description:
      "Bursting with the sweet taste of ripe strawberries. A fruity delight that's both refreshing and satisfying.",
    price: "£1.75",
    image: "ICE Strawberry.jpeg",
    button: { text: "Add to Cart" },
  },
  {
    name: "ICE Blu",
    description:
      "A vibrant and electrifying blue raspberry flavour. Bold, tangy, and undeniably fun – a real treat for your taste buds.",
    price: "£1.75",
    image: "ICE Blu.jpeg",
    button: { text: "Add to Cart" },
  },
  {
    name: "ICE Orange",
    description:
      "Bright, bubbly, and packed with sunny orange flavour. A classic fizzy drink that's always a crowd-pleaser.",
    price: "£1.75",
    image: "ICE Orange.jpeg",
    button: { text: "Add to Cart" },
  },
];

interface MenuTabsProps {
  onAddToCart: (item: {
    name: string;
    description: string;
    price: string;
    image: string;
  }) => void;
}

export function MenuTabs({ onAddToCart }: MenuTabsProps) {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedFries, setSelectedFries] = useState("");
  const [extraPatty, setExtraPatty] = useState(false);
  const [portionSize, setPortionSize] = useState("6pcs");
  const [currentItem, setCurrentItem] = useState<
    { name: string; description: string; price: string; image: string } | null
  >(null);
  const handleAddToCart = (item: {
    name: string;
    description: string;
    price: string;
    image: string;
  }) => {
    const isBurger = ["Flam'in Smash", "FULL HOUSE", "The STACKED"].includes(item.name);
    const isChicken = chickenItems.some(chicken => chicken.name === item.name);
    const isWings = chickenWingsItems.some(wing => wing.name === item.name);

    if (isBurger || isChicken || isWings) {
      setCurrentItem(item);
      setSelectedFries("");
      setExtraPatty(false);
      setShowPopup(true);
    } else {
      onAddToCart(item);
    }
  };

  const handleConfirmAddToCart = () => {
    if (currentItem) {
      const isWings = chickenWingsItems.some(wing => wing.name === currentItem.name);
      const extraPattyCost =
        extraPatty && ["Flam'in Smash", "FULL HOUSE", "The STACKED"].includes(
          currentItem.name
        )
          ? 2.0
          : 0;
      const extraFriesCost = selectedFries === "Cajun Fries" ? 2.95 : selectedFries === "Plain Fries" ? 1.95 : 0;
      const extraPortionCost = isWings && portionSize === "10pcs" ? 3.0 : 0;

      const updatedItem = {
        ...currentItem,
        name: `${currentItem.name}${
          extraPatty ? " with Extra Patty" : ""
        }${
          isWings ? ` (${portionSize})` : ""
        }${selectedFries ? ` with ${selectedFries}` : ""}`,
        price: `£${(
          parseFloat(currentItem.price.replace(/[^0-9.-]+/g, "")) +
          extraPattyCost +
          extraFriesCost +
          extraPortionCost
        ).toFixed(2)}`,
      };
      onAddToCart(updatedItem);
      setShowPopup(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center mt-8">
      <AnimatePresence>
        {showPopup && currentItem && (
          <motion.div
            className="fixed inset-0 bg-gray-500/50 backdrop-blur-sm flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18, ease: [0.4, 0, 0.2, 1] }}
          >
            <motion.div
              className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-lg w-96"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
            >
              <h2 className="text-2xl font-bold mb-2">{currentItem.name}</h2>
              <p className="text-sm text-gray-500 mb-4">
                {["Flam'in Smash", "FULL HOUSE", "The STACKED"].includes(currentItem.name)
                  ? "Customize your burger. Please select your fries option to continue."
                  : chickenWingsItems.some(wing => wing.name === currentItem.name)
                  ? "Customize your wings. Choose your portion size and optional fries."
                  : "Please select your fries option to continue."}
              </p>
              <img
                src={currentItem.image}
                alt={currentItem.name}
                className="w-full h-40 object-cover rounded mb-4"
              />
              <p className="text-sm text-gray-500 mb-4">
                {currentItem.description}
              </p>

              {chickenWingsItems.some(wing => wing.name === currentItem.name) && (
                <>
                  <h3 className="text-lg font-semibold mb-2">
                    Choose Your Portion:
                  </h3>
                  <div className="flex flex-col gap-2 mb-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="portionSize"
                        value="6pcs"
                        checked={portionSize === "6pcs"}
                        onChange={(e) => setPortionSize(e.target.value)}
                      />
                      6 Pieces (Standard)
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="portionSize"
                        value="10pcs"
                        checked={portionSize === "10pcs"}
                        onChange={(e) => setPortionSize(e.target.value)}
                      />
                      10 Pieces (+£3.00)
                    </label>
                  </div>
                </>
              )}

              <h3 className="text-lg font-semibold mb-2">
                {chickenWingsItems.some(wing => wing.name === currentItem.name)
                  ? "Add Fries? (Optional):"
                  : "Choose Your Fries:"}
              </h3>
              <div className="flex flex-col gap-2 mb-4">              <label className="flex items-center gap-2">                <input
                  type="radio"
                  name="fries"
                  value="Plain Fries"
                  checked={selectedFries === "Plain Fries"}
                  onChange={() => setSelectedFries("Plain Fries")}
                />
                Plain Fries (+£1.95)
              </label><label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="fries"
                  value="Cajun Fries"
                  checked={selectedFries === "Cajun Fries"}
                  onChange={() => setSelectedFries("Cajun Fries")}
                />
                Cajun Fries (+£2.95)
              </label>
            </div>            {["Flam'in Smash", "FULL HOUSE", "The STACKED"].includes(
              currentItem.name
            ) && (
              <div className="mb-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={extraPatty}
                    onChange={(e) => setExtraPatty(e.target.checked)}
                  />
                  <span>Add Extra Patty (+£2.00)</span>
                </label>
              </div>            )}
              <div className="flex justify-between items-center font-semibold text-lg mb-4">
                <span>Total:</span>
                <span>
                  £{(                  parseFloat(currentItem.price.replace(/[^0-9.-]+/g, "")) +
                  (extraPatty ? 2.0 : 0) +
                  (selectedFries === "Plain Fries" ? 1.95 : selectedFries === "Cajun Fries" ? 2.95 : 0)
                ).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  className="bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-2 rounded hover:bg-gray-400 dark:hover:bg-gray-600"
                  onClick={() => setShowPopup(false)}
                >
                  Cancel
                </button>
                <button                className={`bg-primary text-primary-foreground px-4 py-2 rounded transition ${
                  (chickenWingsItems.some(wing => wing.name === currentItem?.name) && !selectedFries)
                    ? "hover:bg-primary/90"
                    : !selectedFries
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-primary/90"
                }`}
                onClick={handleConfirmAddToCart}
                disabled={!chickenWingsItems.some(wing => wing.name === currentItem?.name) && !selectedFries}
              >
                Add to Cart
              </button>
            </div>
          </motion.div>
        </motion.div>
        )}
      </AnimatePresence>
      <div className="flex gap-2 bg-neutral-100 dark:bg-neutral-900 rounded-lg p-2 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded font-medium transition-colors text-sm ${
              activeTab === tab
                ? "bg-primary text-primary-foreground shadow"
                : "bg-transparent text-foreground hover:bg-neutral-200 dark:hover:bg-neutral-800"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      {activeTab === "Burgers" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
          {burgerItems.map((item) => (
            <div key={item.name} className="bg-white dark:bg-neutral-900 rounded-lg shadow p-4 flex flex-col items-center h-full">
              <div className="w-full h-48 relative mb-4">
                <Image
                  src={`/${item.image}`}
                  alt={item.name}
                  fill
                  className="rounded object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
              <p className="text-base text-center mb-2">{item.description}</p>
              <span className="font-bold text-lg mb-4">{item.price}</span>
              <div className="mt-auto w-full flex justify-center">
                <button
                  className="bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-primary/90 transition flex items-center gap-2 w-full justify-center"
                  onClick={() => handleAddToCart(item)}
                >
                  <Settings2 size={16} />
                  Customize & Add
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {activeTab === "Chicken" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
          {chickenItems.map((item) => (
            <div
              key={item.name}
              className="bg-white dark:bg-neutral-900 rounded-lg shadow p-4 flex flex-col items-center h-full"
            >
              <img
                src={item.image}
                alt={item.name}
                className="rounded mb-4 object-cover w-full h-48"
              />
              <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
              <p className="text-base text-center mb-2">{item.description}</p>
              <span className="font-bold text-lg mb-4">{item.price}</span>
              <div className="mt-auto w-full flex justify-center">
                <button
                  className="bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-primary/90 transition flex items-center gap-2 w-full justify-center"
                  onClick={() => handleAddToCart(item)}
                >
                  <Settings2 size={16} />
                  Customize & Add
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {activeTab === "Chicken Wings" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
          {chickenWingsItems.map((item) => (
            <div
              key={item.name}
              className="bg-white dark:bg-neutral-900 rounded-lg shadow p-4 flex flex-col items-center h-full"
            >
              <img
                src={item.image}
                alt={item.name}
                className="rounded mb-4 object-cover w-full h-48"
              />
              <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
              <p className="text-base text-center mb-2">{item.description}</p>
              <span className="font-bold text-lg mb-4">{item.price}</span>
              <div className="mt-auto w-full flex justify-center">
                <button
                  className="bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-primary/90 transition flex items-center gap-2 w-full justify-center"
                  onClick={() => handleAddToCart(item)}
                >
                  <Settings2 size={16} />
                  Customize & Add
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {activeTab === "Loaded Fries" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
          {loadedFriesItems.map((item) => (
            <div
              key={item.name}
              className="bg-white dark:bg-neutral-900 rounded-lg shadow p-4 flex flex-col items-center h-full"
            >
              <img
                src={item.image}
                alt={item.name}
                className="rounded mb-4 object-cover w-full h-48"
              />
              <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
              <p className="text-base text-center mb-2">{item.description}</p>
              <span className="font-bold text-lg mb-4">{item.price}</span>
              <div className="mt-auto w-full flex justify-center">
                <button
                  className="bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-primary/90 transition flex items-center gap-2 w-full justify-center"
                  onClick={() => handleAddToCart(item)}
                >
                  <Settings2 size={16} />
                  {item.button.text}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {activeTab === "Fries" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
          {friesItems.map((item) => (
            <div
              key={item.name}
              className="bg-white dark:bg-neutral-900 rounded-lg shadow p-4 flex flex-col items-center h-full"
            >
              <img
                src={item.image}
                alt={item.name}
                className="rounded mb-4 object-cover w-full h-48"
              />
              <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
              <p className="text-base text-center mb-2">{item.description}</p>
              <span className="font-bold text-lg mb-4">{item.price}</span>
              <div className="mt-auto w-full flex justify-center">
                <button
                  className="bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-primary/90 transition flex items-center gap-2 w-full justify-center"
                  onClick={() => handleAddToCart(item)}
                >
                  <Settings2 size={16} />
                  {item.button.text}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {activeTab === "Drinks" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
          {drinksItems.map((item) => (
            <div
              key={item.name}
              className="bg-white dark:bg-neutral-900 rounded-lg shadow p-4 flex flex-col items-center h-full"
            >
              <img
                src={item.image}
                alt={item.name}
                className="rounded mb-4 object-cover w-full h-48"
              />
              <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
              <p className="text-base text-center mb-2">{item.description}</p>
              <span className="font-bold text-lg mb-4">{item.price}</span>
              <div className="mt-auto w-full flex justify-center">
                <button
                  className="bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-primary/90 transition flex items-center gap-2 w-full justify-center"
                  onClick={() => handleAddToCart(item)}
                >
                  <Settings2 size={16} />
                  {item.button.text}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Tailwind CSS custom animation for popup
// Add this to your global CSS if not already present:
// @layer utilities {
//   @keyframes popup {
//     0% { opacity: 0; transform: scale(0.95); }
//     100% { opacity: 1; transform: scale(1); }
//   }
//   .animate-popup {
//     animation: popup 0.3s cubic-bezier(0.4,0,0.2,1);
//   }
// }
