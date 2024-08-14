import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

interface MenuItemOptionProps {
  ingredient: { name: string; price: number };
  toggleOption: (type: 'removable' | 'additional', option: string) => void;
}

const MenuItemOption = ({ ingredient, toggleOption }: MenuItemOptionProps) => {
  const [checkboxState, setCheckboxState] = useState(false);

  const handlePress = () => {
    toggleOption('additional', ingredient.name);
    setCheckboxState((prevState) => !prevState);
  };

  return (
    <Pressable
      key={ingredient.name.trim()}
      style={styles.optionContainer}
      onPress={handlePress}
    >
      <View>
        <Text style={styles.optionText}>Add {ingredient.name}</Text>
        {ingredient.price > 0 && (
          <Text style={styles.optionPrice}>
            +${ingredient.price.toFixed(2)}
          </Text>
        )}
      </View>
      <View>
        <BouncyCheckbox
          disableText
          size={20}
          fillColor="#FF9F0D"
          iconStyle={{
            borderRadius: 0,
            borderColor: '#FF9F0D',
            borderWidth: 1.5,
          }}
          isChecked={checkboxState}
          innerIconStyle={{
            borderRadius: 0, // to make it a little round increase the value accordingly
          }}
          onPress={handlePress}
        />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  optionContainer: {
    borderBottomColor: '#f2f2f2',
    borderBottomWidth: 1,
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 4,
  },
  optionText: {
    fontSize: 14,
    fontWeight: '500',
  },
  optionPrice: {
    fontSize: 12,
    color: '#3d3d3d',
  },
});

export default MenuItemOption;
