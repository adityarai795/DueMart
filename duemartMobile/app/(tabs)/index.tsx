import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Pressable,
  StatusBar,
  Touchable,
  TouchableOpacity,
} from "react-native";

const DuemartHomePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { id: "all", name: "All" },
    { id: "electronics", name: "Electronics" },
    { id: "fashion", name: "Fashion" },
    { id: "home", name: "Home" },
  ];

  const popularProducts = [
    {
      id: 1,
      name: "Wireless Earbuds Pro",
      price: 89.99,
      image: "🎧",
      rating: 4.8,
      sales: 1234,
    },
    {
      id: 2,
      name: "Smart Watch Ultra",
      price: 299.99,
      image: "⌚",
      rating: 4.9,
      sales: 890,
    },
    {
      id: 3,
      name: "Premium Sneakers",
      price: 129.99,
      image: "👟",
      rating: 4.7,
      sales: 2100,
    },
    {
      id: 4,
      name: "Coffee Maker Deluxe",
      price: 149.99,
      image: "☕",
      rating: 4.6,
      sales: 567,
    },
  ];

  const products = [
    {
      id: 5,
      name: "Laptop Stand",
      price: 49.99,
      image: "💻",
      rating: 4.5,
      discount: 15,
    },
    {
      id: 6,
      name: "Yoga Mat Premium",
      price: 39.99,
      image: "🧘",
      rating: 4.7,
      discount: 0,
    },
    {
      id: 7,
      name: "Desk Lamp LED",
      price: 34.99,
      image: "💡",
      rating: 4.4,
      discount: 20,
    },
    {
      id: 8,
      name: "Water Bottle",
      price: 24.99,
      image: "🥤",
      rating: 4.6,
      discount: 0,
    },
    {
      id: 9,
      name: "Backpack Pro",
      price: 79.99,
      image: "🎒",
      rating: 4.8,
      discount: 10,
    },
    {
      id: 10,
      name: "Phone Case",
      price: 19.99,
      image: "📱",
      rating: 4.3,
      discount: 0,
    },
  ];

  return (
    <ScrollView className="flex-1 bg-gray-50 ">
      {/* Header */}
      <View className="bg-blue-600 rounded-b-3xl px-6 pt-8 pb-10 shadow-lg ">
        <View className="flex-row justify-between items-center mb-6">
          <View>
            <Text className="text-3xl font-bold text-white">
              {/* <Text>Due</Text> */}
              Due<Text className="text-black/50">Mart</Text>
            </Text>
            <Text className="text-blue-100 text-sm mt-1">
              Your Shopping Paradise
            </Text>
          </View>

          <View className="flex-row gap-3">
            <Pressable className="relative bg-white/20 p-3 rounded-full">
              <Text className="text-white text-lg">❤️</Text>
              <View className="absolute -top-1 -right-1 bg-red-500 w-5 h-5 rounded-full items-center justify-center">
                <Text className="text-white text-xs">3</Text>
              </View>
            </Pressable>

            <Pressable className="relative bg-white/20 p-3 rounded-full">
              <Text className="text-white text-lg">🛒</Text>
              <View className="absolute -top-1 -right-1 bg-red-500 w-5 h-5 rounded-full items-center justify-center">
                <Text className="text-white text-xs">5</Text>
              </View>
            </Pressable>
          </View>
        </View>

        {/* Search */}
        <View className="bg-white rounded-2xl px-4 py-3 shadow-md">
          <TextInput
            placeholder="Search products..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            className="text-gray-800"
          />
        </View>
      </View>

      {/* Categories */}
      <View className="px-6 py-6">
        <Text className="text-xl font-bold text-gray-800 mb-4">Categories</Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row gap-3">
            {categories.map((category) => (
              <Pressable
                key={category.id}
                onPress={() => setActiveCategory(category.id)}
                className={`px-6 py-4 rounded-2xl ${
                  activeCategory === category.id ? "bg-blue-600" : "bg-white"
                }`}
              >
                <Text
                  className={`text-sm font-medium ${
                    activeCategory === category.id
                      ? "text-white"
                      : "text-gray-700"
                  }`}
                >
                  {category.name}
                </Text>
              </Pressable>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Popular Products */}
      <View className="px-6 py-4">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-xl font-bold text-gray-800">
            Popular Products
          </Text>
          <Text className="text-blue-600 font-medium">See All</Text>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row gap-4">
            {popularProducts.map((product) => (
                <View
                  key={product.id}
                  className="bg-white rounded-2xl shadow-md p-4 w-40"
                >
                  {/* <Text className="text-5xl text-center mb-3">
                  {product.image}
                </Text> */}
                  <Text className="font-semibold text-gray-800 text-sm mb-2">
                    {product.name}
                  </Text>
                  <Text className="text-xs text-gray-600 mb-1">
                    ⭐ {product.rating}
                  </Text>
                  <Text className="text-blue-600 font-bold text-lg">
                    ${product.price}
                  </Text>
                  <Text className="text-xs text-gray-500 mt-1">
                    {product.sales} sold
                  </Text>
                </View>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* All Products */}
      <View className="px-6 py-4 pb-10">
        <Text className="text-xl font-bold text-gray-800 mb-4">
          All Products
        </Text>

        <View className="flex-row flex-wrap justify-between">
          {products.map((product) => (
            <View
              key={product.id}
              className="bg-white rounded-2xl shadow-md p-4 mb-4 w-[48%]"
            >
              {product.discount > 0 && (
                <View className="bg-red-500 self-start px-2 py-1 rounded-lg mb-2">
                  <Text className="text-white text-xs font-bold">
                    -{product.discount}%
                  </Text>
                </View>
              )}
              {/* 
              <Text className="text-5xl text-center mb-3">
                {product.image}
              </Text> */}
              <Text className="font-semibold text-gray-800 text-sm mb-2">
                {product.name}
              </Text>
              <Text className="text-xs text-gray-600 mb-2">
                ⭐ {product.rating}
              </Text>

              <View className="flex-row justify-between items-center">
                <Text className="text-blue-600 font-bold">
                  ${product.price}
                </Text>
                <Pressable className="bg-blue-600 p-2 rounded-lg">
                  <Text className="text-white">🛒</Text>
                </Pressable>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default DuemartHomePage;
