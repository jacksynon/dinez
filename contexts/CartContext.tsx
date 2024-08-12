import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create a context for the cart
const CartContext = createContext({
  items: [],
  total: 0,
  totalItemQuantity: 0,
  addItem: (item, quantity, selectedOptions) => {},
  updateItemQuantity: (itemId, quantity, selectedOptions) => {},
  removeItem: (itemId, selectedOptions) => {},
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
    // Load cart from AsyncStorage when the component mounts
    loadCart();
  }, []);

  useEffect(() => {
    // Update total whenever items change
    calculateTotal();
    // Save cart to AsyncStorage whenever it changes
    saveCart();
  }, [items]);

  const loadCart = async () => {
    try {
      const savedCart = await AsyncStorage.getItem('cart');
      if (savedCart) {
        setItems(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error('Failed to load cart:', error);
    }
  };

  const saveCart = async () => {
    try {
      await AsyncStorage.setItem('cart', JSON.stringify(items));
    } catch (error) {
      console.error('Failed to save cart:', error);
    }
  };

  // Function to add an item to the cart
  const addItem = (item, quantity, selectedOptions) => {
    // Calculate the additional options cost
    const additionalCost = selectedOptions.additional.reduce(
      (total, option) => {
        const optionDetail = item.options.additionalIngredients.find(
          (ingredient) => ingredient.name === option
        );
        return total + (optionDetail ? optionDetail.price : 0);
      },
      0
    );

    // Calculate the total item price with options
    const totalItemPrice = item.price + additionalCost;

    // Check if an item with the same options is already in the cart
    const existingItem = items.find(
      (i) =>
        i.id === item.id &&
        JSON.stringify(i.selectedOptions) === JSON.stringify(selectedOptions)
    );

    if (existingItem) {
      // If it is, update the quantity
      updateItemQuantity(
        existingItem.id,
        existingItem.quantity + quantity,
        selectedOptions
      );
    } else {
      // If not, add it to the cart with options and the updated price
      const newItem = {
        ...item,
        quantity,
        selectedOptions,
        price: totalItemPrice,
      };
      setItems((currentItems) => [...currentItems, newItem]);
    }
  };

  // Function to update the item quantity in the cart
  const updateItemQuantity = (itemId, newQuantity, selectedOptions) => {
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === itemId &&
        JSON.stringify(item.selectedOptions) === JSON.stringify(selectedOptions)
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  // Function to remove an item from the cart, checking for options as well
  const removeItem = (itemId, selectedOptions) => {
    setItems((currentItems) =>
      currentItems.filter(
        (item) =>
          item.id !== itemId ||
          JSON.stringify(item.selectedOptions) !==
            JSON.stringify(selectedOptions)
      )
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
