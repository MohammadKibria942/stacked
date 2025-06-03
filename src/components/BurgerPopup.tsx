import { motion } from "framer-motion";

export interface PopupItem {
  name: string;
  description: string;
  price: string;
  image: string;
}

export interface BurgerPopupProps {
  item: PopupItem;
  extraPatty: boolean;
  setExtraPatty: (v: boolean) => void;
  selectedFries: string;
  setSelectedFries: (v: string) => void;
  onCancel: () => void;
  onConfirm: () => void;
}

export function BurgerPopup({ item, extraPatty, setExtraPatty, selectedFries, setSelectedFries, onCancel, onConfirm }: BurgerPopupProps) {
  return (
    <motion.div
      className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-lg w-96"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
    >
      <h2 className="text-2xl font-bold mb-2">{item.name}</h2>
      <p className="text-sm text-gray-500 mb-4">
        Customize your burger. Please select your fries option to continue.
      </p>
      <img src={item.image} alt={item.name} className="w-full h-40 object-cover rounded mb-4" />
      <p className="text-sm text-gray-500 mb-4">{item.description}</p>
      <h3 className="text-lg font-semibold mb-2">Choose Your Fries:</h3>
      <div className="flex flex-col gap-2 mb-4">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="fries"
            value="House Fries"
            checked={selectedFries === "House Fries"}
            onChange={() => setSelectedFries("House Fries")}
          />
          House Fries (Included)
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="fries"
            value="Cajun Fries"
            checked={selectedFries === "Cajun Fries"}
            onChange={() => setSelectedFries("Cajun Fries")}
          />
          Cajun Fries (+£0.50)
        </label>
      </div>
      <h4 className="text-lg font-semibold mb-1">Protein</h4>
      <div className="mb-4">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={extraPatty}
            onChange={e => setExtraPatty(e.target.checked)}
          />
          <span>Add Extra Patty (+£2.00)</span>
        </label>
      </div>
      <div className="flex justify-between items-center font-semibold text-lg mb-4">
        <span>Total:</span>
        <span>
          £{(
            parseFloat(item.price.replace(/[^0-9.-]+/g, "")) +
            (extraPatty ? 2.0 : 0) +
            (selectedFries === "Cajun Fries" ? 0.5 : 0)
          ).toFixed(2)}
        </span>
      </div>
      <div className="flex justify-end gap-2">
        <button className="bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-2 rounded hover:bg-gray-400 dark:hover:bg-gray-600" onClick={onCancel}>Cancel</button>
        <button className={`bg-primary text-primary-foreground px-4 py-2 rounded transition ${!selectedFries ? "opacity-50 cursor-not-allowed" : "hover:bg-primary/90"}`} onClick={onConfirm} disabled={!selectedFries}>Add to Cart</button>
      </div>
    </motion.div>
  );
}
