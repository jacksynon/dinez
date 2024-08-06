import React, { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  TextInput,
  useWindowDimensions,
  Button,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import { MenuItem } from '../components/MenuItem';
import type { MenuItemType } from '../interfaces';

export function MenuScreen({ navigation }) {
  const [menuItems, setMenuItems] = useState([] as MenuItemType[]);
  const [searchQuery, setSearchQuery] = useState('');

  const { height, width } = useWindowDimensions();

  useEffect(() => {
    loadMenuItems();
  }, []);

  const loadMenuItems = async () => {
    const fetchMenuItems = async () => {
      // just return some dummy data for now with prices
      return [
        {
          id: 1,
          name: 'Pizza',
          price: 10,
          description: 'Delicious pizza with cheese and tomato sauce',
          image:
            'https://images.pexels.com/photos/2619970/pexels-photo-2619970.jpeg?auto=compress&cs=tinysrgb&w=600',
        },
        {
          id: 2,
          name: 'Pasta',
          price: 8,
          description: 'Spaghetti with tomato sauce and meatballs',
          image:
            'https://hips.hearstapps.com/del.h-cdn.co/assets/17/39/2048x1152/hd-aspect-1506456062-delish-spaghetti-meatballs.jpg?resize=600:*',
        },
        {
          id: 3,
          name: 'Salad',
          price: 6,
          description: 'Fresh salad with lettuce, tomatoes, and cucumbers',
          image:
            'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.VD4n6sjYYQcTw1Zkni8_qAAAAA%26pid%3DApi&f=1&ipt=ac8537be6e1a0a459a56a54bc2ca1d83cdf53d51ba846248f8910fc6c3e3c6cf&ipo=images',
        },
        {
          id: 4,
          name: 'Burger',
          price: 12,
          description: 'Juicy beef burger with cheese, lettuce, and tomato',
          image:
            'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages.pexels.com%2Fphotos%2F1639557%2Fpexels-photo-1639557.jpeg%3Fauto%3Dcompress%26cs%3Dtinysrgb%26dpr%3D2%26h%3D650%26w%3D940&f=1&nofb=1&ipt=0c1c461469789890a4f513060e0f3cd255b5961628532a3fc7d751e9deb40deb&ipo=images',
        },
        {
          id: 5,
          name: 'Fries',
          price: 4,
          description: 'Crispy golden fries with ketchup',
          image:
            'https://st.depositphotos.com/1012885/1413/i/450/depositphotos_14134267-stock-photo-golden-french-fries.jpg',
        },
      ];
    };
    const items = await fetchMenuItems();
    setMenuItems(items);
  };

  // Filter menu items based on search query
  const filteredItems = menuItems.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flex: 1,
          backgroundColor: '#fff',
          width: width,
          height: height,
        }}
      >
        {/* <TextInput
        placeholder="Search menu..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      /> */}
        <FlatList
          data={filteredItems}
          renderItem={({ item }) => <MenuItem item={item} />}
          keyExtractor={(item) => item.id.toString()}
        />
        <Button
          title="Go to Cart"
          onPress={() => navigation.navigate('Cart')}
        />
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
