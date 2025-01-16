import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { Stack, Link } from "expo-router";
import { View, Pressable } from "react-native";
import CartButton from "@/components/CartButton";
import { CartProvider } from "@/contexts/CartContext";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Urbanist: require("../../assets/fonts/Urbanist-VariableFont_wght.ttf"),
    "Urbanist-Bold": require("../../assets/fonts/Urbanist-Bold.ttf"),
    "Urbanist-SemiBold": require("../../assets/fonts/Urbanist-SemiBold.ttf"),
    "Urbanist-Regular": require("../../assets/fonts/Urbanist-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <CartProvider>
      <Stack
        screenOptions={{
          headerShadowVisible: false,
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: "Menu",
            headerRight: () => (
              <Link href="/cart" asChild>
                <Pressable>
                  <CartButton />
                </Pressable>
              </Link>
            ),
          }}
        />
        <Stack.Screen
          name="cart"
          options={{
            title: "Cart",
          }}
        />
        <Stack.Screen
          name="payment"
          options={{
            title: "Payment",
          }}
        />
        <Stack.Screen
          name="item/[itemId]"
          options={{
            presentation: "modal",
            headerShown: false,
          }}
        />
      </Stack>
    </CartProvider>
  );
}
