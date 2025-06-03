import React, { useState } from "react";
import { Settings2, Plus, Minus } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { BurgerPopup } from "./BurgerPopup";
import { ChickenWingsPopup } from "./ChickenWingsPopup";
import { LoadedChickPopup } from "./LoadedChickPopup";

const tabs = [
  "Burgers",
  "Chicken",
  "Chicken Wings",
  "Loaded Fries",
  "Fries",
  "Drinks",
  "Sauces",
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

const saucesItems = [
  {
    name: "Ketchup",
    description: "Classic tomato ketchup.",
    price: "£0.50",
    image: "https://placehold.co/600x400.png",
    button: { text: "Add to Cart" },
  },
  {
    name: "Mayonnaise",
    description: "Smooth and creamy mayo.",
    price: "£0.50",
    image: "https://placehold.co/600x400.png",
    button: { text: "Add to Cart" },
  },
  {
    name: "Garlic Sauce",
    description: "Rich garlic sauce.",
    price: "£0.50",
    image: "https://placehold.co/600x400.png",
    button: { text: "Add to Cart" },
  },
  {
    name: "Chilli Sauce",
    description: "Spicy chilli sauce.",
    price: "£0.50",
    image: "https://placehold.co/600x400.png",
    button: { text: "Add to Cart" },
  },
  {
    name: "Ranch",
    description: "Classic ranch dip.",
    price: "£0.50",
    image: "https://placehold.co/600x400.png",
    button: { text: "Add to Cart" },
  },
  {
    name: "Stacked Sauce",
    description: "Signature house sauce.",
    price: "£0.50",
    image: "https://placehold.co/600x400.png",
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
  onRemoveItemByName?: (itemName: string) => void;
}

export function MenuTabs({ onAddToCart, onRemoveItemByName }: MenuTabsProps) {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [showPopup, setShowPopup] = useState(false);
  const [loadedFriesQuantities, setLoadedFriesQuantities] = useState<{ [itemName: string]: number }>({});
  const [friesQuantities, setFriesQuantities] = useState<{ [itemName: string]: number }>({});
  const [drinkQuantities, setDrinkQuantities] = useState<{ [itemName: string]: number }>({});
  const [sauceQuantities, setSauceQuantities] = useState<{ [itemName: string]: number }>({});
  const [selectedFries, setSelectedFries] = useState("");
  const [extraPatty, setExtraPatty] = useState(false);
  const [portionSize, setPortionSize] = useState("6pcs");
  const [selectedLoadedChickFlavour, setSelectedLoadedChickFlavour] = useState("Plain");
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
    const isLoadedChick = item.name === "Loaded Chick";

    if (isBurger || isChicken || isWings || isLoadedChick) {
      setCurrentItem(item);
      setSelectedFries("");
      setExtraPatty(false);
      setPortionSize("6pcs");
      setSelectedLoadedChickFlavour("Plain");
      setShowPopup(true);
    } else {
      onAddToCart(item);
    }
  };

  const handleConfirmAddToCart = () => {
    if (currentItem) {
      let finalName = currentItem.name;
      const basePrice = parseFloat(currentItem.price.replace(/[^0-9.-]+/g, ""));
      let additionalCost = 0;

      const isBurgerItem = burgerItems.some(b => b.name === currentItem.name);
      const isWingsItem = chickenWingsItems.some(w => w.name === currentItem.name);
      const isLoadedChickItem = currentItem.name === "Loaded Chick";
      // Could also check for generic chicken item if needed for specific pricing

      if (isBurgerItem) {
        if (extraPatty) {
          finalName += " with Extra Patty";
          additionalCost += 2.0;
        }
        // For burgers, House Fries are included (no extra cost), Cajun Fries add cost
        if (selectedFries === "Cajun Fries") {
          finalName += " with Cajun Fries";
          additionalCost += 0.50; // Burger specific Cajun Fries cost
        } else if (selectedFries === "House Fries") {
          finalName += " with House Fries";
          // No additional cost for House Fries with burger
        }
      } else if (isWingsItem) {
        finalName += ` (${portionSize})`;
        if (portionSize === "10pcs") {
          additionalCost += 3.0;
        }
        if (selectedFries === "House Fries") {
          finalName += ` with House Fries`;
          additionalCost += 1.95; // Wings specific House Fries cost
        } else if (selectedFries === "Cajun Fries") {
          finalName += ` with Cajun Fries`;
          additionalCost += 2.95; // Wings specific Cajun Fries cost
        }
      } else if (isLoadedChickItem) {
        finalName += ` (${selectedLoadedChickFlavour})`;
        // No additional cost for flavour itself for Loaded Chick based on current setup
      } else { // Fallback for other customizable items (e.g., generic chicken burgers)
        // Assuming generic chicken burgers follow similar fries pricing to standalone burgers
        if (selectedFries === "Cajun Fries") {
          finalName += " with Cajun Fries";
          additionalCost += 0.50;
        } else if (selectedFries === "House Fries") {
          finalName += " with House Fries";
          // No additional cost for House Fries
        }
      }

      const updatedItem = {
        ...currentItem,
        name: finalName,
        price: `£${(basePrice + additionalCost).toFixed(2)}`,
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
            {(() => {
              if (["Flam'in Smash", "FULL HOUSE", "The STACKED"].includes(currentItem.name)) {
                return (
                  <BurgerPopup
                    item={currentItem}
                    extraPatty={extraPatty}
                    setExtraPatty={setExtraPatty}
                    selectedFries={selectedFries}
                    setSelectedFries={setSelectedFries}
                    onCancel={() => setShowPopup(false)}
                    onConfirm={handleConfirmAddToCart}
                  />
                );
              }
              if (chickenWingsItems.some(wing => wing.name === currentItem.name)) {
                return (
                  <ChickenWingsPopup
                    item={currentItem}
                    portionSize={portionSize}
                    setPortionSize={setPortionSize}
                    selectedFries={selectedFries}
                    setSelectedFries={setSelectedFries}
                    onCancel={() => setShowPopup(false)}
                    onConfirm={handleConfirmAddToCart}
                  />
                );
              }
              if (currentItem.name === "Loaded Chick") {
                return (
                  <LoadedChickPopup
                    item={currentItem}
                    selectedFlavour={selectedLoadedChickFlavour}
                    setSelectedFlavour={setSelectedLoadedChickFlavour}
                    onCancel={() => setShowPopup(false)}
                    onConfirm={handleConfirmAddToCart}
                  />
                );
              }
              // fallback for chicken burgers
              return (
                <motion.div
                  className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-lg w-96"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
                >
                  <h2 className="text-2xl font-bold mb-2">{currentItem.name}</h2>
                  <p className="text-sm text-gray-500 mb-4">Please select your fries option to continue.</p>
                  <img src={currentItem.image} alt={currentItem.name} className="w-full h-40 object-cover rounded mb-4" />
                  <p className="text-sm text-gray-500 mb-4">{currentItem.description}</p>
                  <h3 className="text-lg font-semibold mb-2">Choose Your Fries:</h3>
                  <div className="flex flex-col gap-2 mb-4">
                    <label className="flex items-center gap-2">
                      <input type="radio" name="fries" value="House Fries" checked={selectedFries === "House Fries"} onChange={() => setSelectedFries("House Fries")} />
                      House Fries (Included)
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="radio" name="fries" value="Cajun Fries" checked={selectedFries === "Cajun Fries"} onChange={() => setSelectedFries("Cajun Fries")} />
                      Cajun Fries (+£0.50)
                    </label>
                  </div>
                  <div className="flex justify-between items-center font-semibold text-lg mb-4">
                    <span>Total:</span>
                    <span>
                      £{(
                        parseFloat(currentItem.price.replace(/[^0-9.-]+/g, "")) +
                        (selectedFries === "Cajun Fries" ? 0.5 : 0)
                      ).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-end gap-2">
                    <button className="bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-2 rounded hover:bg-gray-400 dark:hover:bg-gray-600" onClick={() => setShowPopup(false)}>Cancel</button>
                    <button className={`bg-primary text-primary-foreground px-4 py-2 rounded transition ${!selectedFries ? "opacity-50 cursor-not-allowed" : "hover:bg-primary/90"}`} onClick={handleConfirmAddToCart} disabled={!selectedFries}>Add to Cart</button>
                  </div>
                </motion.div>
              );
            })()}
          </motion.div>
        )}
      </AnimatePresence>
      <div className="flex flex-wrap justify-center gap-2 bg-neutral-100 dark:bg-neutral-900 rounded-lg p-2 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded font-medium transition-colors text-sm whitespace-nowrap ${
              activeTab === tab
                ? "bg-primary text-primary-foreground shadow"
                : "bg-transparent text-foreground hover:bg-neutral-200 dark:hover:bg-neutral-800"
            }`}
            onClick={() => setActiveTab(tab)}
            aria-controls={`panel-${tab}`}
            id={`tab-${tab}`}
            role="tab"
            aria-selected={activeTab === tab}
          >
            {tab}
          </button>
        ))}
      </div>
      <div role="tabpanel" id={`panel-${activeTab}`} aria-labelledby={`tab-${activeTab}`} className="w-full flex justify-center">
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
          {loadedFriesItems.map((item) => {
            const quantity = loadedFriesQuantities[item.name] || 0;
            const isCustomizable = item.name === "Loaded Chick"; // Or any other logic to determine customizability

            return (
              <div key={item.name} className="bg-white dark:bg-neutral-900 rounded-lg shadow p-4 flex flex-col items-center h-full">
                <img
                  src={item.image}
                  alt={item.name}
                  className="rounded mb-4 object-cover w-full h-48"
                />
                <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                <p className="text-base text-center mb-2">{item.description}</p>
                <span className="font-bold text-lg mb-4">{item.price}</span>
                <div className="mt-auto w-full flex justify-center">
                  {isCustomizable ? (
                    <button
                      className="bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-primary/90 transition flex items-center gap-2 w-full justify-center"
                      onClick={() => handleAddToCart(item)} // This will open the popup
                    >
                      <Settings2 size={16} />
                      {item.button.text}
                    </button>
                  ) : quantity === 0 ? (
                    <button
                      className="bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-primary/90 transition flex items-center gap-2 w-full justify-center"
                      onClick={() => {
                        onAddToCart(item);
                        setLoadedFriesQuantities(prev => ({ ...prev, [item.name]: (prev[item.name] || 0) + 1 }));
                      }}
                    >
                      {item.button.text}
                    </button>
                  ) : (
                    <div className="flex items-center justify-center gap-3 w-full">
                      <button
                        className="bg-gray-200 dark:bg-gray-700 text-foreground p-2 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                        onClick={() => {
                          const newQuantity = Math.max(0, quantity - 1);
                          setLoadedFriesQuantities(prev => ({ ...prev, [item.name]: newQuantity }));
                          if (newQuantity < quantity && onRemoveItemByName) {
                            onRemoveItemByName(item.name);
                          }
                        }}
                        aria-label={`Decrease quantity of ${item.name}`}
                      >
                        <Minus size={16} />
                      </button>
                      <span className="text-lg font-medium w-8 text-center">{quantity}</span>
                      <button
                        className="bg-gray-200 dark:bg-gray-700 text-foreground p-2 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                        onClick={() => {
                          onAddToCart(item);
                          setLoadedFriesQuantities(prev => ({ ...prev, [item.name]: quantity + 1 }));
                        }}
                        aria-label={`Increase quantity of ${item.name}`}
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
        {activeTab === "Fries" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
          {friesItems.map((item) => {
            const quantity = friesQuantities[item.name] || 0;
            return (
              <div key={item.name} className="bg-white dark:bg-neutral-900 rounded-lg shadow p-4 flex flex-col items-center h-full">
                <img
                  src={item.image}
                  alt={item.name}
                  className="rounded mb-4 object-cover w-full h-48"
                />
                <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                <p className="text-base text-center mb-2">{item.description}</p>
                <span className="font-bold text-lg mb-4">{item.price}</span>
                <div className="mt-auto w-full flex justify-center">
                  {quantity === 0 ? (
                    <button
                      className="bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-primary/90 transition flex items-center gap-2 w-full justify-center"
                      onClick={() => {
                        onAddToCart(item);
                        setFriesQuantities(prev => ({ ...prev, [item.name]: (prev[item.name] || 0) + 1 }));
                      }}
                    >
                      {item.button.text}
                    </button>
                  ) : (
                    <div className="flex items-center justify-center gap-3 w-full">
                      <button
                        className="bg-gray-200 dark:bg-gray-700 text-foreground p-2 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                        onClick={() => {
                          const newQuantity = Math.max(0, quantity - 1);
                          setFriesQuantities(prev => ({ ...prev, [item.name]: newQuantity }));
                          if (newQuantity < quantity && onRemoveItemByName) {
                            onRemoveItemByName(item.name);
                          }
                        }}
                        aria-label={`Decrease quantity of ${item.name}`}
                      >
                        <Minus size={16} />
                      </button>
                      <span className="text-lg font-medium w-8 text-center">{quantity}</span>
                      <button
                        className="bg-gray-200 dark:bg-gray-700 text-foreground p-2 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                        onClick={() => {
                          onAddToCart(item);
                          setFriesQuantities(prev => ({ ...prev, [item.name]: quantity + 1 }));
                        }}
                        aria-label={`Increase quantity of ${item.name}`}
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
        {activeTab === "Drinks" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
          {drinksItems.map((item) => {
            const quantity = drinkQuantities[item.name] || 0;
            return (
              <div key={item.name} className="bg-white dark:bg-neutral-900 rounded-lg shadow p-4 flex flex-col items-center h-full">
                <img
                  src={item.image}
                  alt={item.name}
                  className="rounded mb-4 object-cover w-full h-48"
                />
                <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                <p className="text-base text-center mb-2">{item.description}</p>
                <span className="font-bold text-lg mb-4">{item.price}</span>
                <div className="mt-auto w-full flex justify-center">
                  {quantity === 0 ? (
                    <button
                      className="bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-primary/90 transition flex items-center gap-2 w-full justify-center"
                      onClick={() => {
                        onAddToCart(item); // Use the prop directly for non-customizable items
                        setDrinkQuantities(prev => ({ ...prev, [item.name]: (prev[item.name] || 0) + 1 }));
                      }}
                    >
                      {item.button.text}
                    </button>
                  ) : (
                    <div className="flex items-center justify-center gap-3 w-full">
                      <button
                        className="bg-gray-200 dark:bg-gray-700 text-foreground p-2 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                        onClick={() => {
                          const newQuantity = Math.max(0, quantity - 1);
                          setDrinkQuantities(prev => ({ ...prev, [item.name]: newQuantity }));
                          if (newQuantity < quantity && onRemoveItemByName) {
                            onRemoveItemByName(item.name);
                          }
                        }}
                        aria-label={`Decrease quantity of ${item.name}`}
                      >
                        <Minus size={16} />
                      </button>
                      <span className="text-lg font-medium w-8 text-center">{quantity}</span>
                      <button
                        className="bg-gray-200 dark:bg-gray-700 text-foreground p-2 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                        onClick={() => {
                          onAddToCart(item); // Use the prop directly
                          setDrinkQuantities(prev => ({ ...prev, [item.name]: quantity + 1 }));
                        }}
                        aria-label={`Increase quantity of ${item.name}`}
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
        {activeTab === "Sauces" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
          {saucesItems.map((item) => {
            const quantity = sauceQuantities[item.name] || 0;
            return (
              <div key={item.name} className="bg-white dark:bg-neutral-900 rounded-lg shadow p-4 flex flex-col items-center h-full">
                <img
                  src={item.image}
                  alt={item.name}
                  className="rounded mb-4 object-cover w-full h-48"
                />
                <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                <p className="text-base text-center mb-2">{item.description}</p>
                <span className="font-bold text-lg mb-4">{item.price}</span>
                <div className="mt-auto w-full flex justify-center">
                  {quantity === 0 ? (
                    <button
                      className="bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-primary/90 transition flex items-center gap-2 w-full justify-center"
                      onClick={() => {
                        onAddToCart(item);
                        setSauceQuantities(prev => ({ ...prev, [item.name]: (prev[item.name] || 0) + 1 }));
                      }}
                    >
                      Add to Cart
                    </button>
                  ) : (
                    <div className="flex items-center justify-center gap-3 w-full">
                      <button
                        className="bg-gray-200 dark:bg-gray-700 text-foreground p-2 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                        onClick={() => {
                          const newQuantity = Math.max(0, quantity - 1);
                          setSauceQuantities(prev => ({ ...prev, [item.name]: newQuantity }));
                          if (newQuantity < quantity && onRemoveItemByName) {
                            onRemoveItemByName(item.name);
                          }
                        }}
                        aria-label={`Decrease quantity of ${item.name}`}
                      >
                        <Minus size={16} />
                      </button>
                      <span className="text-lg font-medium w-8 text-center">{quantity}</span>
                      <button
                        className="bg-gray-200 dark:bg-gray-700 text-foreground p-2 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                        onClick={() => {
                          onAddToCart(item);
                          setSauceQuantities(prev => ({ ...prev, [item.name]: quantity + 1 }));
                        }}
                        aria-label={`Increase quantity of ${item.name}`}
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
      </div>
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
