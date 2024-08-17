import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface QuantityProps {
  quantity: number;
  increaseQuantity: () => void;
  decreaseQuantity: () => void;
}

const Quantity = ({
  quantity,
  increaseQuantity,
  decreaseQuantity,
}: QuantityProps) => {
  return (
    <View style={styles.quantityContainer}>
      <TouchableOpacity
        onPress={decreaseQuantity}
        style={styles.quantityButton}
      >
        <Text style={styles.quantityButtonText}>-</Text>
      </TouchableOpacity>
      <Text style={styles.quantity}>{quantity}</Text>
      <TouchableOpacity
        onPress={increaseQuantity}
        style={styles.quantityButton}
      >
        <Text style={styles.quantityButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  quantityButton: {
    backgroundColor: "#FF9F0D",
    // fully rounded corners
    borderRadius: 50,
    // define height and width to make the button a circle
    height: 32,
    width: 32,
    // center the text
    justifyContent: "center",
    alignItems: "center",
    // make the text bold
    fontWeight: "900",
  },
  quantityButtonText: {
    color: "white",
    fontSize: 16,
  },
  quantity: {
    fontSize: 16,
    marginHorizontal: 16,
  },
});

export default Quantity;
