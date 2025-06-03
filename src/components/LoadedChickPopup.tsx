import { motion } from "framer-motion";

export interface PopupItem {
  name: string;
  description: string;
  price: string;
  image: string;
}

export interface LoadedChickPopupProps {
  item: PopupItem;
  selectedFlavour: string;
  setSelectedFlavour: (v: string) => void;
  onCancel: () => void;
  onConfirm: () => void;
}

export function LoadedChickPopup({ item, selectedFlavour, setSelectedFlavour, onCancel, onConfirm }: LoadedChickPopupProps) {
  const flavours = [
    { label: "Plain", value: "Plain" },
    { label: "Hot Honey (Spicy)", value: "Hot Honey" },
    { label: "BBQ", value: "BBQ" },
    { label: "BUFFALO", value: "BUFFALO" },
    { label: "Garlic Parm", value: "Garlic Parm" },
  ];
  return (
    <motion.div
      className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-lg w-96"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
    >
      <h2 className="text-2xl font-bold mb-2">{item.name}</h2>
      <p className="text-sm text-gray-500 mb-4">Choose your flavour for Loaded Chick.</p>
      <img src={item.image} alt={item.name} className="w-full h-40 object-cover rounded mb-4" />
      <p className="text-sm text-gray-500 mb-4">{item.description}</p>
      <h3 className="text-lg font-semibold mb-2">Choose Your Flavour:</h3>
      <div className="flex flex-col gap-2 mb-4">
        {flavours.map((flavour) => (
          <label key={flavour.value} className="flex items-center gap-2">
            <input
              type="radio"
              name="loadedChickFlavour"
              value={flavour.value}
              checked={selectedFlavour === flavour.value}
              onChange={() => setSelectedFlavour(flavour.value)}
            />
            {flavour.label}
          </label>
        ))}
      </div>
      <div className="flex justify-between items-center font-semibold text-lg mb-4">
        <span>Total:</span>
        <span>{item.price}</span>
      </div>
      <div className="flex justify-end gap-2">
        <button className="bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-2 rounded hover:bg-gray-400 dark:hover:bg-gray-600" onClick={onCancel}>Cancel</button>
        <button className="bg-primary text-primary-foreground px-4 py-2 rounded transition hover:bg-primary/90" onClick={onConfirm}>Add to Cart</button>
      </div>
    </motion.div>
  );
}
