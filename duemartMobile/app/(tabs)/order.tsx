import React, { useState } from "react";
import { View, Text, ScrollView, Pressable, Alert, ActivityIndicator } from "react-native";
import { useAppSelector, useAppDispatch } from "@/src/redux/hooks";
import RazorpayCheckout from "react-native-razorpay";

// ==========================================
// CONFIGURATION
// ==========================================
const SERVER_URL = "http://192.168.1.35:5000/orders";
const RAZORPAY_KEY = "rzp_test_RcmZXeO1j9z5PP";

// ==========================================
// MAIN COMPONENT
// ==========================================
const Orders = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  // 📦 GET CART FROM REDUX
  const cartItems = useAppSelector((state) => state.cart.items);
  const userId = "69689f92a68cacba087d7e97"; // TODO: Get from auth context

  // 💰 CALCULATE TOTAL
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // ==========================================
  // STEP 1: CHECKOUT (Create Order)
  // ==========================================
  const handleCheckout = async () => {
    console.log("\n🔄 STEP 1: CHECKOUT - Creating order...");

    try {
      setLoading(true);

      // IF: Cart is empty
      if (cartItems.length === 0) {
        Alert.alert("❌ Cart Empty", "Please add items to cart first");
        setLoading(false);
        return;
      }

      console.log(`✅ Cart has ${cartItems.length} items`);

      // CALL: Backend to create order
      const response = await fetch(`${SERVER_URL}/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer_id: userId,
          delivery_address: "Lucknow, UP, India",
        }),
      });

      const data = await response.json();
      console.log("📨 Backend response:", data);

      // IF: Order creation failed
      if (!data.success || !data.razorpayOrder) {
        Alert.alert("❌ Error", data.message || "Failed to create order");
        setLoading(false);
        return;
      }

      console.log(`✅ Order created: ${data.orderId}`);
      console.log(`✅ Razorpay Order ID: ${data.razorpayOrder.id}`);

      // GO TO: STEP 2 - Open Payment
      handlePayment(data.razorpayOrder, data.orderId);

    } catch (error) {
      console.error("❌ Checkout error:", error);
      Alert.alert("❌ Error", "Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  // ==========================================
  // STEP 2: PAYMENT (Open Razorpay)
  // ==========================================
  const handlePayment = async (razorpayOrder:any, orderId:any) => {
    console.log("\n💳 STEP 2: PAYMENT - Opening Razorpay...");

    try {
      const options = {
        description: "DueMart Order Payment",
        image: "https://yourlogo.com/logo.png",
        currency: "INR",
        key: RAZORPAY_KEY,
        amount: razorpayOrder.amount, // Already in paise
        name: "DueMart",
        order_id: razorpayOrder.id,
        prefill: {
          email: "customer@email.com",
          contact: "9999999999",
          name: "Customer",
        },
        theme: { color: "#2563EB" },
      };

      console.log("💳 Opening Razorpay with order:", razorpayOrder.id);

      // CALL: Razorpay payment gateway
      const paymentData = await RazorpayCheckout.open(options);

      console.log("✅ Payment successful from Razorpay");
      console.log("📦 Payment data:", paymentData);

      // GO TO: STEP 3 - Verify Payment
      handleVerifyPayment(paymentData, orderId);

    } catch (error:any) {
      console.error("❌ Payment error:", error);

      // IF: User cancelled payment
      if (error.code === "PAYMENT_CANCELLED") {
        Alert.alert("❌ Cancelled", "You cancelled the payment");
      } else {
        Alert.alert("❌ Payment Failed", "Transaction failed. Please try again.");
      }

      setLoading(false);
    }
  };

  // ==========================================
  // STEP 3: VERIFY PAYMENT (Confirm on Backend)
  // ==========================================
  const handleVerifyPayment = async (paymentData:any, orderId:any) => {
    console.log("\n✔️ STEP 3: VERIFY - Verifying payment on backend...");

    try {
      // CALL: Backend to verify payment
      const response = await fetch(`${SERVER_URL}/verify-payment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(paymentData),
      });

      const result = await response.json();
      console.log("📨 Backend verification response:", result);

      // IF: Verification failed
      if (!result.success) {
        Alert.alert("❌ Verification Failed", result.message || "Payment verification failed");
        setLoading(false);
        return;
      }

      console.log("✅ Payment verified successfully");

      // GO TO: STEP 4 - Success
      handleOrderSuccess(result.order);

    } catch (error) {
      console.error("❌ Verification error:", error);
      Alert.alert("❌ Error", "Error verifying payment. Please contact support.");
      setLoading(false);
    }
  };

  // ==========================================
  // STEP 4: SUCCESS (Order Confirmed)
  // ==========================================
  const handleOrderSuccess = (order:any) => {
    console.log("\n✅ STEP 4: SUCCESS - Order confirmed!");
    console.log("Order details:", order);

    setLoading(false);

    // SHOW: Success message
    Alert.alert(
      "🎉 Success!",
      `Your order has been placed successfully!\n\nOrder ID: ${order._id}\nStatus: ${order.status}`,
      [
        {
          text: "View Orders",
          onPress: () => {
            // TODO: Navigate to orders screen
            console.log("Navigate to orders screen");
          },
        },
        {
          text: "OK",
          onPress: () => console.log("OK Pressed"),
        },
      ]
    );
  };

  // ==========================================
  // UI: RENDER
  // ==========================================
  return (
    <ScrollView className="flex-1 bg-gray-100">
      {/* HEADER */}
      <View className="bg-blue-600 rounded-b-3xl px-6 pt-10 pb-12 shadow-lg">
        <Text className="text-2xl font-bold text-white text-center">
          🛒 My Cart
        </Text>
        <Text className="text-blue-100 text-center mt-1">
          Review your items before checkout
        </Text>
      </View>

      {/* CART ITEMS */}
      <View className="px-6 -mt-8 pb-10">
        {cartItems.length === 0 ? (
          <View className="bg-white rounded-2xl shadow-md p-6 mt-6">
            <Text className="text-center text-gray-500 text-lg">
              Your cart is empty 🛒
            </Text>
          </View>
        ) : (
          cartItems.map((item) => (
            <View
              key={item.id}
              className="bg-white rounded-2xl shadow-md p-5 mb-5"
            >
              {/* Product Info */}
              <View className="flex-row justify-between items-center mb-3">
                <View>
                  <Text className="text-gray-500 text-xs">Product</Text>
                  <Text className="text-gray-800 font-bold">{item.name}</Text>
                </View>
                <View className="px-3 py-1 rounded-full bg-green-100">
                  <Text className="text-xs font-semibold text-green-700">
                    ✓ In Cart
                  </Text>
                </View>
              </View>

              {/* Price & Quantity */}
              <View className="flex-row justify-between mb-3">
                <Text className="text-gray-600">
                  ₹{item.price.toFixed(2)}
                </Text>
                <Text className="text-gray-800 font-bold">
                  Qty: {item.quantity}
                </Text>
              </View>

              {/* Item Total */}
              <Text className="text-blue-600 font-bold text-lg">
                Total: ₹{(item.price * item.quantity).toFixed(2)}
              </Text>
            </View>
          ))
        )}

        {/* FOOTER: TOTAL & CHECKOUT */}
        {cartItems.length > 0 && (
          <View className="bg-white rounded-2xl shadow-md p-5 mb-10">
            {/* Total Price */}
            <View className="flex-row justify-between mb-6 pb-6 border-b border-gray-200">
              <Text className="text-xl font-bold text-gray-800">Grand Total</Text>
              <Text className="text-xl font-bold text-blue-600">
                ₹{totalPrice.toFixed(2)}
              </Text>
            </View>

            {/* Checkout Button */}
            <Pressable
              onPress={handleCheckout}
              disabled={loading}
              className={`py-4 rounded-2xl ${
                loading ? "bg-blue-400" : "bg-blue-600"
              }`}
            >
              {loading ? (
                <View className="flex-row justify-center items-center gap-2">
                  <ActivityIndicator color="white" size="small" />
                  <Text className="text-white text-center font-bold">
                    Processing...
                  </Text>
                </View>
              ) : (
                <Text className="text-white text-center font-bold text-lg">
                  💳 Checkout & Pay
                </Text>
              )}
            </Pressable>

            {/* Info Message */}
            <Text className="text-gray-500 text-xs text-center mt-4">
              You will be redirected to Razorpay to complete payment
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default Orders;
