import React from "react";
import { View, FlatList, Button, Text } from "react-native";
import { useCart } from "@/contexts/CartContext";
import { CartItem } from "@/components/CartItem";
import { useNavigation } from "expo-router";

export default function Cart() {
  const { items, total, removeItem, updateItemQuantity } = useCart();

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
            "-"
          )}-${item.selectedOptions.removable.join("-")}`
        }
      />
      <Text>Total: ${total.toFixed(2)}</Text>
      {/* <Button
        title="Proceed to Payment"
        onPress={() => navigation.navigate("index", { screen: "index" })}
      />
      <Button title="Back to Menu" onPress={() => useNavigation("index")} /> */}
    </View>
  );
}
