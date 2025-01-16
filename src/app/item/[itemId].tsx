import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Pressable,
  StyleSheet,
} from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { fetchMenuItem } from "@/lib/menu";
import { MenuItemType } from "@/types/menuItemTypes";
import CloseIcon from "@/icons/CloseIcon";
import Quantity from "@/components/Quantity";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import MenuItemOption from "@/components/MenuItemOption";
import { useCart } from "@/contexts/CartContext";

export default function ItemDetails() {
  const { itemId } = useLocalSearchParams();
  const navigation = useNavigation();

  const { addItem } = useCart();

  const [item, setItem] = useState({} as MenuItemType);

  useEffect(() => {
    fetchMenuItem(itemId as string).then((data) => {
      if (data) setItem(data);
    });
  }, []);

  // State to keep track of quantity to add to cart
  const [quantity, setQuantity] = useState(1);

  // State to keep track of selected options
  const [selectedOptions, setSelectedOptions] = useState({
    removable: [] as string[],
    additional: [] as string[],
  });

  // Increase quantity to add to cart by 1
  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  // Decrease quantity to add to cart by 1
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  // Toggle option selection
  const toggleOption = (type: "removable" | "additional", option: string) => {
    setSelectedOptions((prevState) => {
      const options = prevState[type].includes(option)
        ? prevState[type].filter((opt) => opt !== option)
        : [...prevState[type], option];
      return { ...prevState, [type]: options };
    });
  };

  // Calculate total price of item with selected options and quantity
  const calculateTotalPrice = () => {
    const additionalCost = selectedOptions.additional.reduce(
      (total, option) => {
        const itemOption = item.options?.additionalIngredients?.find(
          (ingredient) => ingredient.name === option
        );
        return total + (itemOption ? itemOption.price : 0);
      },
      0
    );
    return (item.price + additionalCost) * quantity;
  };

  return (
    // if no item details are available, show a loading spinner
    !item.id ? (
      <View>
        <Text>Loading...</Text>
      </View>
    ) : (
      <>
        <ScrollView>
          {/* Item Image */}
          {item.image && (
            <Image source={{ uri: item.image }} style={styles.image} />
          )}
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.closeButton}
          >
            <CloseIcon />
          </TouchableOpacity>

          {/* Item Details */}
          <View style={styles.section}>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.price}>${item.price.toFixed(2)}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>

          {/* Options Section */}
          {/* Required Options */}
          {item.options?.requiredOptions && (
            <View style={styles.section}>
              {item.options.requiredOptions.map((option) => (
                <View key={option.name}>
                  <View style={styles.titleContainer}>
                    <Text style={styles.optionTitle}>{option.name}:</Text>
                    <View style={styles.requiredContainer}>
                      <Text style={styles.requiredText}>Required</Text>
                    </View>
                  </View>
                  {option.options.map((subOption) => (
                    <Pressable
                      key={subOption.name}
                      style={styles.optionContainer}
                      onPress={() => toggleOption("additional", subOption.name)}
                    >
                      <View>
                        <Text style={styles.optionText}>{subOption.name}</Text>
                        <Text style={styles.optionPrice}>
                          +${subOption.price.toFixed(2)}
                        </Text>
                      </View>
                      <BouncyCheckbox
                        disableText
                        size={20}
                        fillColor="#FF9F0D"
                        iconStyle={{
                          borderRadius: 0,
                          borderColor: "#FF9F0D",
                          borderWidth: 1.5,
                        }}
                        isChecked={selectedOptions.additional.includes(
                          subOption.name
                        )}
                        innerIconStyle={{
                          borderRadius: 0, // to make it a little round increase the value accordingly
                        }}
                        onPress={() =>
                          toggleOption("additional", subOption.name)
                        }
                      />
                    </Pressable>
                  ))}
                </View>
              ))}
            </View>
          )}

          {/* Additional Ingredients */}
          {item.options?.additionalIngredients && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Additions:</Text>
              {item.options.additionalIngredients.map((ingredient) => (
                <MenuItemOption
                  key={ingredient.name}
                  ingredient={ingredient}
                  toggleOption={toggleOption}
                />
              ))}
            </View>
          )}

          {/* Removable Ingredients */}
          {item.options?.removableIngredients && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Remove:</Text>
              {item.options.removableIngredients.map((ingredient) => (
                <Pressable
                  key={ingredient}
                  style={styles.optionContainer}
                  onPress={() => toggleOption("removable", ingredient)}
                >
                  <Text style={styles.optionText}>No {ingredient}</Text>
                  <BouncyCheckbox
                    disableText
                    size={20}
                    fillColor="#FF9F0D"
                    iconStyle={{
                      borderRadius: 0,
                      borderColor: "#FF9F0D",
                      borderWidth: 1.5,
                    }}
                    isChecked={selectedOptions.removable.includes(ingredient)}
                    innerIconStyle={{
                      borderRadius: 0, // to make it a little round increase the value accordingly
                    }}
                    onPress={() => toggleOption("removable", ingredient)}
                  />
                </Pressable>
              ))}
            </View>
          )}

          {/* Quantity Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Quantity:</Text>
            <Quantity
              quantity={quantity}
              increaseQuantity={increaseQuantity}
              decreaseQuantity={decreaseQuantity}
            />
          </View>
        </ScrollView>

        {/* Add to Cart Button */}
        <View style={styles.addToCartContainer}>
          <TouchableOpacity
            style={styles.addToCartButton}
            onPress={() => {
              addItem(item, quantity, selectedOptions);
              navigation.goBack();
            }}
          >
            <Text style={styles.addToCartText}>
              Add {quantity} to Cart • ${calculateTotalPrice().toFixed(2)}
            </Text>
          </TouchableOpacity>
        </View>
      </>
    )
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  image: {
    width: "100%",
    height: 200,
  },
  closeButton: {
    position: "absolute",
    top: 20,
    right: 20,
    backgroundColor: "white",
    padding: 8,
    borderRadius: 20,
  },
  title: {
    fontFamily: "Urbanist-Bold",
    fontSize: 24,
    fontWeight: "bold",
  },
  description: {
    fontFamily: "Urbanist-Regular",
    fontSize: 16,
    marginTop: 10,
    color: "gray",
  },
  price: {
    fontFamily: "Urbanist-Bold",
    fontSize: 16,
    fontWeight: "500",
    marginTop: 3,
    color: "#3d3d3d",
  },
  section: {
    padding: 16,
    borderBottomColor: "#dfdfdf",
    borderBottomWidth: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  requiredContainer: {
    backgroundColor: "#D4D4D4",
    borderRadius: 5,
  },
  requiredText: {
    paddingHorizontal: 6,
    paddingVertical: 4,
    fontSize: 14,
    color: "#3d3d3d",
    fontFamily: "Urbanist-SemiBold",
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Urbanist-Bold",
  },
  optionContainer: {
    borderBottomColor: "#EAEAEA",
    borderBottomWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 4,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  optionText: {
    fontSize: 14,
    fontFamily: "Urbanist-SemiBold",
    marginBottom: 2,
  },
  optionPrice: {
    fontSize: 12,
    fontFamily: "Urbanist-Regular",
    color: "gray",
  },
  addToCartContainer: {
    borderTopColor: "#dfdfdf",
    borderTopWidth: 2,
    paddingBottom: 24,
  },
  addToCartButton: {
    backgroundColor: "#FF9F0D",
    color: "white",
    height: 50,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    margin: 16,
  },
  addToCartText: {
    fontFamily: "Urbanist-Bold",
    color: "white",
    fontSize: 16,
  },
});
