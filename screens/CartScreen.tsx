import React from 'react';
import { View, FlatList, Button, Text } from 'react-native';
import { useCart } from '../contexts/CartContext';
import { CartItem } from '../components/CartItem';

export function CartScreen({ navigation }) {
  const { items, total, removeItem, updateItemQuantity } = useCart();

  return (
    <View>
      <FlatList
        data={items}
        renderItem={({ item }) => (
          <CartItem
            item={item}
            onRemove={() => removeItem(item.id)}
            onUpdateQuantity={(newQuantity) =>
              updateItemQuantity(item.id, newQuantity)
            }
          />
        )}
        keyExtractor={(item) => item.id}
      />
      <Text>Total: ${total.toFixed(2)}</Text>
      <Button
        title="Proceed to Payment"
        onPress={() => navigation.navigate('Payment')}
      />
      <Button
        title="Back to Menu"
        onPress={() => navigation.navigate('Menu')}
      />
    </View>
  );
}
