import React from "react";
import { View, Text, ScrollView, Pressable } from "react-native";

const Profile = () => {
  const user = {
    name: "John Doe",
    email: "john@example.com",
    phone: "+91 98765 43210",
  };

  const menuItems = [
    { id: 1, title: "My Orders", icon: "📦" },
    { id: 2, title: "Wishlist", icon: "❤️" },
    { id: 3, title: "Addresses", icon: "🏠" },
    { id: 4, title: "Payment Methods", icon: "💳" },
    { id: 5, title: "Settings", icon: "⚙️" },
    { id: 6, title: "Help & Support", icon: "❓" },
  ];

  return (
    <ScrollView className="flex-1 bg-gray-100">
      {/* Header */}
      <View className="bg-blue-600 rounded-b-3xl px-6 pt-10 pb-12 shadow-lg">
        <View className="items-center">
          {/* Avatar */}
          <View className="w-24 h-24 rounded-full bg-white items-center justify-center mb-4">
            <Text className="text-4xl">👤</Text>
          </View>

          <Text className="text-xl font-bold text-white">{user.name}</Text>
          <Text className="text-blue-100 mt-1">{user.email}</Text>
        </View>
      </View>

      {/* Info Card */}
      <View className="px-6 -mt-8">
        <View className="bg-white rounded-2xl shadow-md p-5 mb-6">
          <Text className="text-gray-800 font-bold mb-4">Account Info</Text>

          <View className="flex-row justify-between mb-3">
            <Text className="text-gray-500">Name</Text>
            <Text className="text-gray-800 font-medium">{user.name}</Text>
          </View>

          <View className="flex-row justify-between mb-3">
            <Text className="text-gray-500">Email</Text>
            <Text className="text-gray-800 font-medium">{user.email}</Text>
          </View>

          <View className="flex-row justify-between">
            <Text className="text-gray-500">Phone</Text>
            <Text className="text-gray-800 font-medium">{user.phone}</Text>
          </View>
        </View>
      </View>

      {/* Menu Section */}
      <View className="px-6 pb-10">
        {menuItems.map((item) => (
          <Pressable
            key={item.id}
            className="bg-white rounded-xl shadow-sm p-4 mb-3 flex-row justify-between items-center"
          >
            <View className="flex-row items-center gap-3">
              <Text className="text-xl">{item.icon}</Text>
              <Text className="text-gray-800 font-medium">{item.title}</Text>
            </View>
            <Text className="text-gray-400 text-lg">›</Text>
          </Pressable>
        ))}

        {/* Logout Button */}
        <Pressable className="bg-red-500 py-4 rounded-xl mt-4">
          <Text className="text-white text-center font-semibold text-lg">
            Logout
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default Profile;
