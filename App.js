import { SafeAreaView } from 'react-native';
import { MenuScreen } from './screens/MenuScreen';
import { CartScreen } from './screens/CartScreen';
import { PaymentScreen } from './screens/PaymentScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CartProvider } from './contexts/CartContext';
import CartButton from './components/CartButton';
import MenuItemDetailsScreen from './screens/MenuItemDetailsScreen';
import CloseIcon from './assets/CloseIcon';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <CartProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShadowVisible: false,
            }}
            initialRouteName="Menu"
          >
            <Stack.Group>
              <Stack.Screen
                name="Menu"
                component={MenuScreen}
                options={({ navigation }) => ({
                  title: 'Menu',
                  headerRight: () => (
                    <CartButton onPress={() => navigation.navigate('Cart')} />
                  ),
                })}
              />
              <Stack.Screen name="Cart" component={CartScreen} />
              <Stack.Screen name="Payment" component={PaymentScreen} />
            </Stack.Group>
            <Stack.Group screenOptions={{ presentation: 'modal' }}>
              <Stack.Screen
                name="MenuItemDetails"
                component={MenuItemDetailsScreen}
                options={({ route }) => ({
                  title: route.params.item.name,
                  headerShown: false,
                  headerRight: () => (
                    <CloseIcon
                      onPress={() => navigation.goBack()}
                      style={{ padding: 10 }}
                    />
                  ),
                })}
              />
            </Stack.Group>
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </CartProvider>
  );
}
