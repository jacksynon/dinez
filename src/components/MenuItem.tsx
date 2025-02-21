import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from "react-native";
import { MenuItemType } from "../types/menuItemTypes";
import { Link } from "expo-router";

interface MenuItemProps {
  item: MenuItemType;
}

export const MenuItem = ({ item }: MenuItemProps) => {
  return (
    <Link href={"/item/" + item.id}>
      <View style={styles.container}>
        <View style={styles.details}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.price}>${item.price.toFixed(2)}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
        <Image source={{ uri: item.image }} style={styles.image} />
      </View>
    </Link>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#EAEAEA",
    width: "100%",
  },
  image: {
    width: 100,
    height: 100,
    marginLeft: 10,
    borderRadius: 5,
  },
  details: {
    flex: 1,
    justifyContent: "center",
  },
  name: {
    marginBottom: 1,
    fontFamily: "Urbanist-SemiBold",
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    fontFamily: "Urbanist-Regular",
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },
  price: {
    marginBottom: 2,
    fontFamily: "Urbanist-Regular",
    fontSize: 16,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  quantityButton: {
    backgroundColor: "#eee",
    padding: 5,
    borderRadius: 5,
  },
  quantityButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  quantity: {
    marginHorizontal: 10,
    fontSize: 16,
  },
  addButton: {
    backgroundColor: "#FF9F0D",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
