import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  quantityButton: {
    backgroundColor: '#FF9F0D',
    padding: 8,
    borderRadius: 5,
  },
  quantityButtonText: {
    color: 'white',
    fontSize: 16,
  },
  quantity: {
    fontSize: 16,
    marginHorizontal: 16,
  },
});

export default Quantity;
