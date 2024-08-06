import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from 'react';

// Create a context for the cart
const CartContext = createContext({
  items: [],
  total: 0,
  totalItemQuantity: 0,
  addItem: (item, quantity) => {},
  updateItemQuantity: (itemId, quantity) => {},
  removeItem: (itemId) => {},
});

// Custom hook to use the CartContext
export const useCart = () => {
  return useContext(CartContext);
};

// Define the CartProvider component
export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    calculateTotal();
  }, [items]);

  // Function to add an item to the cart
  const addItem = (item, quantity) => {
    // Check if the item is already in the cart
    const existingItem = items.find((i) => i.id === item.id);
    if (existingItem) {
      // If it is, update the quantity
      updateItemQuantity(item.id, existingItem.quantity + quantity);
    } else {
      // If not, add it to the cart
      item = { ...item, quantity };
      setItems((currentItems) => [...currentItems, item]);
    }
  };

  // Function to update the quantity of an item in the cart
  const updateItemQuantity = (itemId, newQuantity) => {
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Function to remove an item from the cart
  const removeItem = (itemId) => {
    setItems((currentItems) =>
      currentItems.filter((item) => item.id !== itemId)
    );
  };

  const calculateTotal = () => {
    const newTotal = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotal(newTotal);
  };

  // Compute total item quantity
  const totalItemQuantity = useMemo(() => {
    return items.reduce((total, item) => total + item.quantity, 0);
  }, [items]);

  // Value to be provided to context consumers
  const value = {
    items,
    total,
    addItem,
    updateItemQuantity,
    removeItem,
    totalItemQuantity,
  };

  // Render the CartContext provider with the current value
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
