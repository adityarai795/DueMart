import React from "react";
import { View, Text, ScrollView, Pressable, Alert } from "react-native";
import { useAppSelector } from "@/src/redux/hooks";

const Orders = () => {
  // 🛒 Get cart items from Redux
  const cartItems = useAppSelector((state) => state.cart.items);


  // 🧮 Total Price
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const handlePlaceOrder = () => {
    if (cartItems.length === 0) {
      Alert.alert("Cart Empty", "Please add items to cart first");
      return;
    }

    Alert.alert("Order Placed", "Your order has been placed successfully 🎉");

    // clearFullCart();
  };

  return (
    <ScrollView className="flex-1 bg-gray-100">
      {/* Header */}
      <View className="bg-blue-600 rounded-b-3xl px-6 pt-10 pb-12 shadow-lg">
        <Text className="text-2xl font-bold text-white text-center">
          My Cart
        </Text>
        <Text className="text-blue-100 text-center mt-1">
          Review your items before placing order
        </Text>
      </View>

      {/* Cart List */}
      <View className="px-6 -mt-8 pb-10">
        {cartItems.length === 0 ? (
          <View className="bg-white rounded-2xl shadow-md p-6 mt-6">
            <Text className="text-center text-gray-500">
              Your cart is empty 🛒
            </Text>
          </View>
        ) : (
          cartItems.map((item) => (
            <View
              key={item.id}
              className="bg-white rounded-2xl shadow-md p-5 mb-5"
            >
              {/* Top Row */}
              <View className="flex-row justify-between items-center mb-3">
                <View>
                  <Text className="text-gray-500 text-xs">Product</Text>
                  <Text className="text-gray-800 font-bold">{item.name}</Text>
                </View>

                <View className="px-3 py-1 rounded-full bg-blue-100">
                  <Text className="text-xs font-semibold text-blue-700">
                    In Cart
                  </Text>
                </View>
              </View>

              {/* Price & Qty */}
              <View className="flex-row justify-between mb-3">
                <Text className="text-gray-500">Price: ₹{item.price}</Text>
                <Text className="text-gray-800 font-bold">
                  Qty: {item.quantity}
                </Text>
              </View>

              {/* Item Total */}
              <Text className="text-blue-600 font-bold">
                Item Total: ₹{item.price * item.quantity}
              </Text>
            </View>
          ))
        )}

        {/* FOOTER */}
        {cartItems.length > 0 && (
          <View className="bg-white rounded-2xl shadow-md p-5">
            <View className="flex-row justify-between mb-4">
              <Text className="text-lg font-bold">Total</Text>
              <Text className="text-lg font-bold text-blue-600">
                ₹{totalPrice}
              </Text>
            </View>

            <Pressable
              onPress={handlePlaceOrder}
              className="bg-blue-600 py-4 rounded-2xl"
            >
              <Text className="text-white text-center font-bold">
                Place Order
              </Text>
            </Pressable>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default Orders;
