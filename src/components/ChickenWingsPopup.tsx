import { motion } from "framer-motion";

export interface PopupItem {
  name: string;
  description: string;
  price: string;
  image: string;
}

export interface ChickenWingsPopupProps {
  item: PopupItem;
  portionSize: string;
  setPortionSize: (v: string) => void;
  selectedFries: string;
  setSelectedFries: (v: string) => void;
  onCancel: () => void;
  onConfirm: () => void;
}

export function ChickenWingsPopup({ item, portionSize, setPortionSize, selectedFries, setSelectedFries, onCancel, onConfirm }: ChickenWingsPopupProps) {
  return (
    <motion.div
      className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-lg w-96"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
    >
      <h2 className="text-2xl font-bold mb-2">{item.name}</h2>
      <p className="text-sm text-gray-500 mb-4">Customize your wings. Choose your portion size and optional fries.</p>
      <img src={item.image} alt={item.name} className="w-full h-40 object-cover rounded mb-4" />
      <p className="text-sm text-gray-500 mb-4">{item.description}</p>
      <h3 className="text-lg font-semibold mb-2">Choose Your Portion:</h3>
      <div className="flex flex-col gap-2 mb-4">
        <label className="flex items-center gap-2">
          <input type="radio" name="portionSize" value="6pcs" checked={portionSize === "6pcs"} onChange={e => setPortionSize(e.target.value)} />
          6 Pieces (Standard)
        </label>
        <label className="flex items-center gap-2">
          <input type="radio" name="portionSize" value="10pcs" checked={portionSize === "10pcs"} onChange={e => setPortionSize(e.target.value)} />
          10 Pieces (+£3.00)
        </label>
      </div>
      <h3 className="text-lg font-semibold mb-2">Add Fries? (Optional):</h3>
      <div className="flex flex-col gap-2 mb-4">
        <label className="flex items-center gap-2">
          <input type="radio" name="fries" value="House Fries" checked={selectedFries === "House Fries"} onChange={() => setSelectedFries("House Fries")} />
          House Fries (+£1.95)
        </label>
        <label className="flex items-center gap-2">
          <input type="radio" name="fries" value="Cajun Fries" checked={selectedFries === "Cajun Fries"} onChange={() => setSelectedFries("Cajun Fries")} />
          Cajun Fries (+£2.95)
        </label>
        <label className="flex items-center gap-2">
          <input type="radio" name="fries" value="" checked={selectedFries === ""} onChange={() => setSelectedFries("")} />
          No Fries
        </label>
      </div>
      <div className="flex justify-between items-center font-semibold text-lg mb-4">
        <span>Total:</span>
        <span>
          £{(
            parseFloat(item.price.replace(/[^0-9.-]+/g, "")) +
            (portionSize === "10pcs" ? 3.0 : 0) +
            (selectedFries === "House Fries" ? 1.95 : selectedFries === "Cajun Fries" ? 2.95 : 0)
          ).toFixed(2)}
        </span>
      </div>
      <div className="flex justify-end gap-2">
        <button className="bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-2 rounded hover:bg-gray-400 dark:hover:bg-gray-600" onClick={onCancel}>Cancel</button>
        <button className={`bg-primary text-primary-foreground px-4 py-2 rounded transition hover:bg-primary/90`} onClick={onConfirm}>Add to Cart</button>
      </div>
    </motion.div>
  );
}
