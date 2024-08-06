import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const NavBar = ({ setCurrentScreen }) => {
  return (
    <View style={styles.navbar}>
      <TouchableOpacity onPress={() => setCurrentScreen('QRScanner')}>
        <Text>Scan</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setCurrentScreen('Menu')}>
        <Text>Menu</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setCurrentScreen('Cart')}>
        <Text>Cart</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 50,
  },
});

export default NavBar;
