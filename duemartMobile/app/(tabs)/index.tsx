import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { router } from "expo-router";

const API_URL = "http://192.168.1.35:4000/products";

const DuemartHomePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const [products, setProducts] = useState([]); // BACKEND PRODUCTS
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const categories = [
    { id: "all", name: "All" },
    { id: "electronics", name: "Electronics" },
    { id: "clothing", name: "Clothing" },
    { id: "books", name: "Books" },
    { id: "home & kitchen", name: "Home & Kitchen" },
    { id: "sports", name: "Sports" },
    { id: "accessories", name: "Accessories" },
    { id: "other", name: "Other" },
  ];

  // 🔥 FETCH FROM BACKEND
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await response.json();
      console.log("Backend Data:", data);

      // Backend returns { message, count, products }
      setProducts(data.products || []);
      setError("");
    } catch (err) {
      console.error("Fetch Error:", err);
      setError("Unable to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 🔎 SEARCH + CATEGORY FILTER
  const filteredProducts = products.filter((product:any) => {
    const matchesSearch = product.product_name
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesCategory =
      activeCategory === "all" ||
      product.category?.toLowerCase() === activeCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  return (
    <ScrollView className="flex-1 bg-gray-50">
      {/* HEADER */}
      <View className="bg-blue-600 rounded-b-3xl px-6 pt-8 pb-10 shadow-lg">
        <View className="flex-row justify-between items-center mb-6">
          <View>
            <Text className="text-3xl font-bold text-white">
              Due<Text className="text-black/50">Mart</Text>
            </Text>
            <Text className="text-blue-100 text-sm mt-1">
              Your Shopping Paradise
            </Text>
          </View>
        </View>

        {/* SEARCH */}
        <View className="bg-white rounded-2xl px-4 py-3 shadow-md">
          <TextInput
            placeholder="Search products..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            className="text-gray-800"
          />
        </View>
      </View>

      {/* CATEGORIES */}
      <View className="px-6 py-6">
        <Text className="text-xl font-bold text-gray-800 mb-4">Categories</Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row gap-3">
            {categories.map((category) => (
              <Pressable
                key={category.id}
                onPress={() => setActiveCategory(category.id)}
                className={`px-5 py-3 rounded-2xl ${
                  activeCategory === category.id ? "bg-blue-600" : "bg-white"
                }`}
              >
                <Text
                  className={`text-sm font-semibold ${
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

      {/* PRODUCTS */}
      <View className="px-6 py-4 pb-10">
        <Text className="text-xl font-bold text-gray-800 mb-4">
          All Products
        </Text>

        {/* LOADING */}
        {loading && <ActivityIndicator size="large" color="#2563EB" />}

        {/* ERROR */}
        {error !== "" && (
          <Text className="text-red-500 text-center mt-4">{error}</Text>
        )}

        {/* PRODUCTS GRID */}
        <View className="flex-row flex-wrap justify-between">
          {filteredProducts.map((product:any) => {
            const inStock = product.product_quantity > 0;
            const lowStock =
              product.product_quantity > 0 && product.product_quantity < 5;

            return (
              <Pressable
                key={product._id}
                className="bg-white rounded-3xl shadow-lg mb-5 w-[48%] overflow-hidden"
                onPress={() => router.push(`/product/${product._id}`)}
              >
                {/* IMAGE PLACEHOLDER */}
                <View className="relative">
                  <Text className="text-center text-7xl py-6 bg-gray-100">
                    🖼️
                  </Text>

                  {/* CATEGORY BADGE */}
                  <View className="absolute top-2 left-2 bg-blue-600 px-3 py-1 rounded-full">
                    <Text className="text-white text-xs font-bold">
                      {product.category}
                    </Text>
                  </View>

                  {/* STOCK BADGE */}
                  {lowStock && (
                    <View className="absolute top-2 right-2 bg-red-500 px-3 py-1 rounded-full">
                      <Text className="text-white text-xs font-bold">
                        Low Stock
                      </Text>
                    </View>
                  )}

                  {!inStock && (
                    <View className="absolute top-2 right-2 bg-gray-700 px-3 py-1 rounded-full">
                      <Text className="text-white text-xs font-bold">
                        Out of Stock
                      </Text>
                    </View>
                  )}
                </View>

                {/* CONTENT */}
                <View className="p-4">
                  {/* NAME */}
                  <Text
                    className="font-bold text-gray-800 text-sm mb-1"
                    numberOfLines={2}
                  >
                    {product.product_name}
                  </Text>

                  {/* DESCRIPTION */}
                  <Text
                    className="text-gray-500 text-xs mb-2"
                    numberOfLines={2}
                  >
                    {product.product_description || "No description available"}
                  </Text>

                  {/* RATING */}
                  <View className="flex-row items-center mb-2">
                    <Text className="text-yellow-500 text-xs">
                      ⭐ {product.rating || 0}
                    </Text>
                    <Text className="text-gray-400 text-xs ml-1">
                      ({product.reviews || 0})
                    </Text>
                  </View>

                  {/* PRICE + BUTTON */}
                  <View className="flex-row justify-between items-center">
                    <Text className="text-blue-600 font-bold text-base">
                      ₹{product.product_price}
                    </Text>

                    <Pressable
                      disabled={!inStock}
                      className={`px-3 py-2 rounded-xl ${
                        inStock ? "bg-blue-600" : "bg-gray-400"
                      }`}
                    >
                      <Text className="text-white text-xs font-bold">
                        {inStock ? "Add" : "N/A"}
                      </Text>
                    </Pressable>
                  </View>
                </View>
              </Pressable>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
};

export default DuemartHomePage;
