import React from 'react';
import { View, FlatList, Button, Text } from 'react-native';
import { useCart } from '../contexts/CartContext';
import { CartItem } from '../components/CartItem';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types';

interface CartScreenProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Cart'>;
}

export function CartScreen({ navigation }: CartScreenProps) {
  const { items, total, removeItem, updateItemQuantity } = useCart();

  //console.log(items);

  return (
    <View>
      <FlatList
        data={items}
        renderItem={({ item }) => (
          <CartItem
            item={item}
            onRemove={() => removeItem(item.id, item.selectedOptions)}
            onUpdateQuantity={(newQuantity) =>
              updateItemQuantity(item.id, newQuantity, item.selectedOptions)
            }
          />
        )}
        // Add a key extractor to prevent the "Each child in a list should have a unique 'key' prop" warning, use the item id and the selected options to create a hash to use as the key
        keyExtractor={(item) =>
          `${item.id}-${item.selectedOptions.additional.join(
            '-'
          )}-${item.selectedOptions.removable.join('-')}`
        }
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
