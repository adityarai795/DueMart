import { View, Text, Image, Pressable } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useAppDispatch } from "@/src/redux/hooks";
import { addToCart } from "@/src/redux/reducers/cartReducers";

const STATIC_PRODUCTS = [
  {
    _id: "1",
    title: "iPhone 15 Pro",
    price: 129999,
    image:
      "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-1inch-naturaltitanium",
    description: "Apple iPhone 15 Pro with A17 chip and Titanium body",
  },
  {
    _id: "2",
    title: "Samsung Galaxy S24",
    price: 89999,
    image:
      "https://images.samsung.com/is/image/samsung/p6pim/in/sm-s921bzka/galaxy-s24-black-01-600x600.jpg",
    description: "Samsung Galaxy S24 with AI-powered camera",
  },
];

const Product = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const product = STATIC_PRODUCTS.find((p) => p._id === id);

  if (!product) {
    return (
      <View style={{ padding: 20 }}>
        <Text>Product not found</Text>
      </View>
    );
  }

  return (
    <View style={{ padding: 16 }}>
      <Image
        source={{ uri: product.image }}
        style={{ width: "100%", height: 250, borderRadius: 12 }}
      />

      <Text style={{ fontSize: 22, fontWeight: "bold", marginVertical: 8 }}>
        {product.title}
      </Text>

      <Text style={{ fontSize: 18, color: "green" }}>₹{product.price}</Text>

      <Text style={{ marginVertical: 8 }}>{product.description}</Text>

      <Pressable
        onPress={() => {
          dispatch(
            addToCart({
              id: product._id,
              name: product.title,
              price: product.price,
              image: product.image,
            }),
          );
          // router.push("/cart");
        }}
        style={{
          backgroundColor: "black",
          padding: 14,
          borderRadius: 8,
          marginTop: 16,
        }}
      >
        <Text style={{ color: "white", textAlign: "center" }}>Add to Cart</Text>
      </Pressable>
    </View>
  );
};

export default Product;
