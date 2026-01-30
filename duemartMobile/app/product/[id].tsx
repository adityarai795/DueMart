import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useAppDispatch } from "@/src/redux/hooks";
import { SafeAreaView } from "react-native-safe-area-context";
import { addToCartService } from "@/src/redux/actions/cartAction";

// 🌐 API
const API_BASE = "http://192.168.1.35:4000/products";

// 🖼️ Dummy Image (Online placeholder)
const DUMMY_IMAGE =
  "https://via.placeholder.com/600x600.png?text=No+Image+Available";

// 🔐 Product Interface (Matches Your Mongo Schema)
interface Product {
  _id: string;
  product_name: string;
  product_description?: string;
  product_quantity: number;
  product_price: number;
  category: string;
  image_url?: string;
  rating?: number;
  reviews?: number;
  createdAt?: string;
  updatedAt?: string;
}

// 🔁 API Response Type
interface ProductResponse {
  success?: boolean;
  message?: string;
  product: Product;
}
 interface CartItem {
   id: string; // Mongo _id = string
   name: string;
   price: number;
   quantity: number;
 }
const ProductPage: React.FC = () => {
  const params = useLocalSearchParams<{ id?: string }>();
  const id = params.id;

  const router = useRouter();
  const dispatch = useAppDispatch();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  // 🔥 FETCH PRODUCT BY ID
  const fetchProductById = async (): Promise<void> => {
    try {
      if (!id) return;

      setLoading(true);

      const response = await fetch(`${API_BASE}/${id}`);

      if (!response.ok) {
        throw new Error("Failed to fetch product");
      }

      const data: ProductResponse = await response.json();
      console.log("Product Data:", data);

      setProduct(data.product || (data as unknown as Product));
      setError("");
    } catch (err) {
      console.error("Fetch Error:", err);
      setError("Unable to load product details");
    } finally {
      setLoading(false);
    }
  };
  
  const addcartProductToCart = (product: CartItem) => {
    dispatch(addToCartService(product));
  };

  useEffect(() => {
    fetchProductById();
  }, []);
  // 🌀 LOADING STATE
  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-50">
        <ActivityIndicator size="large" color="#2563EB" />
        <Text className="mt-3 text-gray-500">Loading product...</Text>
      </View>
    );
  }

  // ❌ ERROR STATE
  if (error || !product) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-50 px-6">
        <Text className="text-red-500 text-lg mb-4">
          {error || "Product not found"}
        </Text>
        <Pressable
          className="bg-blue-600 px-6 py-3 rounded-xl"
          onPress={() => router.back()}
        >
          <Text className="text-white font-bold">Go Back</Text>
        </Pressable>
      </View>
    );
  }

  const inStock: boolean = product.product_quantity > 0;
  const lowStock: boolean =
    product.product_quantity > 0 && product.product_quantity < 5;

  const imageSource =
    product.image_url && product.image_url.length > 5
      ? { uri: product.image_url }
      : { uri: DUMMY_IMAGE };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="flex-1 bg-gray-50">
        <ScrollView>
          {/* IMAGE HEADER */}
          <View className="relative bg-gray-100">
            <Image
              source={{
                uri: "https://tse1.mm.bing.net/th/id/OIP.ofZ_PgEGZrkUm0c8d0_4GgAAAA?rs=1&pid=ImgDetMain&o=7&rm=3",
              }}
              className="w-full h-80"
              resizeMode="cover"
            />

            {/* BACK BUTTON */}
            <Pressable
              className="absolute top-10 left-4 bg-white/90 p-3 rounded-full"
              onPress={() => router.back()}
            >
              <Text>⬅️</Text>
            </Pressable>

            {/* CATEGORY BADGE */}
            <View className="absolute bottom-4 left-4 bg-blue-600 px-4 py-2 rounded-full">
              <Text className="text-white text-xs font-bold">
                {product.category}
              </Text>
            </View>

            {/* STOCK BADGE */}
            {lowStock && (
              <View className="absolute bottom-4 right-4 bg-red-500 px-4 py-2 rounded-full">
                <Text className="text-white text-xs font-bold">Low Stock</Text>
              </View>
            )}

            {!inStock && (
              <View className="absolute bottom-4 right-4 bg-gray-700 px-4 py-2 rounded-full">
                <Text className="text-white text-xs font-bold">
                  Out of Stock
                </Text>
              </View>
            )}
          </View>

          {/* CONTENT */}
          <View className="p-6">
            {/* NAME */}
            <Text className="text-2xl font-bold text-gray-800 mb-2">
              {product.product_name}
            </Text>

            {/* RATING */}
            <View className="flex-row items-center mb-3">
              <Text className="text-yellow-500 font-bold">
                ⭐ {product.rating ?? 0}
              </Text>
              <Text className="text-gray-500 ml-2">
                ({product.reviews ?? 0} reviews)
              </Text>
            </View>

            {/* PRICE */}
            <Text className="text-3xl font-bold text-blue-600 mb-4">
              ₹{product.product_price}
            </Text>

            {/* DESCRIPTION */}
            <Text className="text-gray-600 leading-relaxed mb-6">
              {product.product_description ||
                "No description available for this product."}
            </Text>

            {/* STOCK INFO */}
            <View className="bg-white rounded-2xl p-4 shadow mb-6">
              <Text className="font-semibold text-gray-800 mb-1">
                Stock Information
              </Text>
              <Text className="text-gray-600">
                Available Quantity:{" "}
                <Text className="font-bold">{product.product_quantity}</Text>
              </Text>
            </View>
          </View>
        </ScrollView>

        {/* STICKY ADD TO CART */}
        <View className="bg-white p-4 border-t border-gray-200 flex-row justify-between items-center">
          <View>
            <Text className="text-gray-500 text-xs">Total Price</Text>
            <Text className="text-xl font-bold text-blue-600">
              ₹{product.product_price}
            </Text>
          </View>

          <Pressable
            disabled={!inStock}
            onPress={() => {
              Alert.alert("Cart added", "Product added to cart successfully");

              addcartProductToCart({
                id: product._id, // string matches CartItem
                name: product.product_name,
                price: product.product_price,
                quantity: 1,
              });
            }}
            className={`px-6 py-4 rounded-2xl ${
              inStock ? "bg-blue-600" : "bg-gray-400"
            }`}
          >
            <Text className="text-white font-bold">
              {inStock ? "Add to Cart" : "Out of Stock"}
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProductPage;
