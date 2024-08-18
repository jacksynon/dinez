import { Stack, Link } from "expo-router";
import { Pressable } from "react-native";
import CartButton from "@/components/CartButton";
import { CartProvider } from "@/contexts/CartContext";

export default function RootLayout() {
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
