import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CartItemType, SelectedOptions } from "../types/cartItemTypes";
import { MenuItemType } from "../types/menuItemTypes";

type CartContextType = {
  items: CartItemType[];
  total: number;
  totalItemQuantity: number;
  addItem: (
    item: MenuItemType,
    quantity: number,
    selectedOptions: SelectedOptions
  ) => void;
  updateItemQuantity: (
    itemId: string,
    quantity: number,
    selectedOptions: SelectedOptions
  ) => void;
  removeItem: (itemId: string, selectedOptions: SelectedOptions) => void;
};

// Create a context for the cart
const CartContext = createContext<CartContextType>({
  items: [],
  total: 0,
  totalItemQuantity: 0,
  addItem: () => {},
  updateItemQuantity: () => {},
  removeItem: () => {},
});

// Custom hook to use the CartContext
export const useCart = (): CartContextType => {
  return useContext(CartContext);
};

// Define the CartProvider component props
interface CartProviderProps {
  children: ReactNode;
}

// Define the CartProvider component
export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [items, setItems] = useState<CartItemType[]>([]);
  const [total, setTotal] = useState<number>(0);

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
      const savedCart = await AsyncStorage.getItem("cart");
      if (savedCart) {
        setItems(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error("Failed to load cart:", error);
    }
  };

  const saveCart = async () => {
    try {
      await AsyncStorage.setItem("cart", JSON.stringify(items));
    } catch (error) {
      console.error("Failed to save cart:", error);
    }
  };

  // Function to add an item to the cart
  const addItem = (
    item: MenuItemType,
    quantity: number,
    selectedOptions: SelectedOptions
  ) => {
    // Calculate the additional options cost
    const additionalCost = selectedOptions.additional.reduce(
      (total, option) => {
        const optionDetail = item.options?.additionalIngredients?.find(
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
      const newItem: CartItemType = {
        ...item,
        quantity,
        selectedOptions,
        price: totalItemPrice,
      };
      setItems((currentItems) => [...currentItems, newItem]);
    }
  };

  // Function to update the item quantity in the cart
  const updateItemQuantity = (
    itemId: string,
    newQuantity: number,
    selectedOptions: SelectedOptions
  ) => {
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
  const removeItem = (itemId: string, selectedOptions: SelectedOptions) => {
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
  const value: CartContextType = {
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
