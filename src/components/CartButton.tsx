import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import BagIcon from "@/icons/BagIcon";
import { useCart } from "../contexts/CartContext";

interface CartButtonProps {
  onPress: () => void;
}

const CartButton = ({ onPress }: CartButtonProps) => {
  const { totalItemQuantity: amount } = useCart();

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.icon}>
        <BagIcon />
        {amount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{amount > 9 ? "9+" : amount}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  icon: {
    position: "relative",
    padding: 8,
  },
  badge: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#FF9F0D",
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "white",
    fontSize: 10,
  },
});

export default CartButton;
