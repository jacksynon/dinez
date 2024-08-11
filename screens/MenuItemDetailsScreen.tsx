import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import { useCart } from '../contexts/CartContext';
import Quantity from '../components/Quantity';
import CloseIcon from '../assets/CloseIcon';

const MenuItemDetailsScreen = ({ navigation, route }) => {
  const { item } = route.params;
  const { addItem } = useCart();

  const { height, width } = useWindowDimensions();

  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  return (
    <View style={{ ...styles.container, height: height, width: width }}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          position: 'absolute',
          top: 20,
          right: 20,
          backgroundColor: 'white',
          padding: 8,
          borderRadius: 20,
        }}
      >
        <CloseIcon />
      </TouchableOpacity>
      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{item.name}</Text>
        <Text style={{ fontSize: 16, color: 'gray' }}>{item.description}</Text>
        <Text style={{ fontSize: 20, marginTop: 8 }}>
          ${item.price.toFixed(2)}
        </Text>
        <Quantity
          quantity={quantity}
          increaseQuantity={increaseQuantity}
          decreaseQuantity={decreaseQuantity}
        />
        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={() => {
            addItem(item, quantity);
            navigation.goBack();
          }}
        >
          <Text
            style={{
              color: 'white',
              fontSize: 16,
              fontWeight: 'bold',
            }}
          >
            Add {quantity} to Cart • ${(item.price * quantity).toFixed(2)}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: '30%',
  },
  addToCartButton: {
    backgroundColor: '#FF9F0D',
    color: 'white',
    height: 50,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 16,
  },
});

export default MenuItemDetailsScreen;
