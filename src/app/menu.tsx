import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  TextInput,
  useWindowDimensions,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import { MenuItem } from "../components/MenuItem";
import type { MenuItemType } from "../types/menuItemTypes";
import { useCart } from "../contexts/CartContext";
import { useRouter } from "expo-router";
import { fetchMenuItems } from "../lib/menu";

export default function MenuScreen() {
  const [menuItems, setMenuItems] = useState([] as MenuItemType[]);
  const [searchQuery, setSearchQuery] = useState("");

  const { totalItemQuantity } = useCart();

  const { height, width } = useWindowDimensions();

  const router = useRouter();

  useEffect(() => {
    fetchMenuItems().then((data) => setMenuItems(data));
  }, []);

  // Filter menu items based on search query
  const filteredItems = menuItems.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flex: 1,
          backgroundColor: "#fff",
          width: width,
          height: height,
        }}
      >
        <TextInput
          placeholder="Search menu..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={{
            backgroundColor: "#f2f2f2",
            padding: 15,
            margin: 10,
            borderRadius: 45,
          }}
        />
        {filteredItems.length === 0 && (
          <Text style={{ textAlign: "center", marginTop: 20 }}>
            No items found
          </Text>
        )}
        <FlatList
          data={filteredItems}
          renderItem={({ item }) => <MenuItem item={item} />}
          keyExtractor={(item) => item.id.toString()}
        />
        {
          // only show the "View Cart" button if there are items in the cart
          totalItemQuantity > 0 && (
            <TouchableOpacity
              style={styles.goToCart}
              onPress={() => router.navigate("/cart")}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 16,
                  fontWeight: "bold",
                }}
              >
                View Cart ({totalItemQuantity})
              </Text>
            </TouchableOpacity>
          )
        }
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  goToCart: {
    justifyContent: "center",
    alignContent: "center",
    marginHorizontal: 16,
    backgroundColor: "#FF9F0D",
    color: "white",
    height: 50,
    borderRadius: 5,
    alignItems: "center",
  },
});
