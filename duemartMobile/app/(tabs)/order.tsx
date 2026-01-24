import React from "react";
import { View, Text, ScrollView, Pressable } from "react-native";

const Orders = () => {
  const orders = [
    {
      id: "ORD12345",
      date: "24 Jan 2026",
      status: "Delivered",
      total: 129.99,
      items: [
        { name: "Wireless Earbuds Pro", qty: 1, icon: "🎧" },
        { name: "Phone Case", qty: 2, icon: "📱" },
      ],
    },
    {
      id: "ORD12346",
      date: "22 Jan 2026",
      status: "Shipped",
      total: 299.99,
      items: [{ name: "Smart Watch Ultra", qty: 1, icon: "⌚" }],
    },
    {
      id: "ORD12347",
      date: "20 Jan 2026",
      status: "Processing",
      total: 49.99,
      items: [{ name: "Laptop Stand", qty: 1, icon: "💻" }],
    },
  ];

  const getStatusStyle = (status:any) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-700";
      case "Shipped":
        return "bg-blue-100 text-blue-700";
      case "Processing":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <ScrollView className="flex-1 bg-gray-100">
      {/* Header */}
      <View className="bg-blue-600 rounded-b-3xl px-6 pt-10 pb-12 shadow-lg">
        <Text className="text-2xl font-bold text-white text-center">
          My Orders
        </Text>
        <Text className="text-blue-100 text-center mt-1">
          Track your recent purchases
        </Text>
      </View>

      {/* Orders List */}
      <View className="px-6 -mt-8 pb-10">
        {orders.map((order) => (
          <View
            key={order.id}
            className="bg-white rounded-2xl shadow-md p-5 mb-5"
          >
            {/* Top Row */}
            <View className="flex-row justify-between items-center mb-3">
              <View>
                <Text className="text-gray-500 text-xs">Order ID</Text>
                <Text className="text-gray-800 font-bold">{order.id}</Text>
              </View>

              <View
                className={`px-3 py-1 rounded-full ${getStatusStyle(
                  order.status,
                )}`}
              >
                <Text className="text-xs font-semibold">{order.status}</Text>
              </View>
            </View>

            {/* Date & Total */}
            <View className="flex-row justify-between mb-3">
              <Text className="text-gray-500">Date: {order.date}</Text>
              <Text className="text-gray-800 font-bold">${order.total}</Text>
            </View>

            {/* Items */}
            {order.items.map((item, index) => (
              <View
                key={index}
                className="flex-row items-center justify-between mb-2"
              >
                <View className="flex-row items-center gap-2">
                  <Text className="text-lg">{item.icon}</Text>
                  <Text className="text-gray-700 text-sm">{item.name}</Text>
                </View>
                <Text className="text-gray-500 text-sm">x{item.qty}</Text>
              </View>
            ))}

            {/* Actions */}
            <View className="flex-row justify-between mt-4">
              <Pressable className="border border-blue-600 px-4 py-2 rounded-lg">
                <Text className="text-blue-600 font-medium">View Details</Text>
              </Pressable>

              {order.status !== "Delivered" && (
                <Pressable className="bg-blue-600 px-4 py-2 rounded-lg">
                  <Text className="text-white font-medium">Track Order</Text>
                </Pressable>
              )}
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default Orders;
