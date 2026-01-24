import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";

const Signup = () => {
  const router = useRouter();
  const [inputData, setInputData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleSubmit = async () => {
    try {
      Alert.alert("Success", "Signup successful!");
      router.replace("/(tabs)");
    } catch (error) {
      console.error("Signup failed:", error);
    }
  }
  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 justify-center px-6 py-10">
        {/* Title */}
        <Text className="text-3xl font-bold text-center text-gray-800 mb-2">
          Create Account on DueMart
        </Text>
        <Text className="text-center text-gray-500 mb-8">
          Sign up to get started
        </Text>

        {/* Full Name */}
        <View className="mb-4">
          <Text className="text-gray-600 mb-1">Full Name</Text>
          <TextInput
            placeholder="Enter your full name"
            className="border border-gray-300 rounded-xl px-4 py-3 text-gray-800"
            value={inputData.fullName}
            onChangeText={(text) =>
              setInputData((prev) => ({ ...prev, fullName: text }))
            }
          />
        </View>

        {/* Email */}
        <View className="mb-4">
          <Text className="text-gray-600 mb-1">Email</Text>
          <TextInput
            placeholder="Enter your email"
            keyboardType="email-address"
            className="border border-gray-300 rounded-xl px-4 py-3 text-gray-800"
            value={inputData.email}
            onChangeText={(text) =>
              setInputData((prev) => ({ ...prev, email: text }))
            }
          />
        </View>

        {/* Password */}
        <View className="mb-4">
          <Text className="text-gray-600 mb-1">Password</Text>
          <TextInput
            placeholder="Create a password"
            secureTextEntry
            className="border border-gray-300 rounded-xl px-4 py-3 text-gray-800"
            value={inputData.password}
            onChangeText={(text) =>
              setInputData((prev) => ({ ...prev, password: text }))
            }
          />
        </View>

        {/* Confirm Password */}
        <View className="mb-6">
          <Text className="text-gray-600 mb-1">Confirm Password</Text>
          <TextInput
            placeholder="Confirm your password"
            secureTextEntry
            className="border border-gray-300 rounded-xl px-4 py-3 text-gray-800"
            value={inputData.confirmPassword}
            onChangeText={(text) =>
              setInputData((prev) => ({ ...prev, confirmPassword: text }))
            }
          />
        </View>

        {/* Sign Up Button */}
        <TouchableOpacity className="bg-green-600 py-4 rounded-xl mb-4" onPress={handleSubmit}>
          <Text className="text-white text-center font-semibold text-lg">
            Sign Up
          </Text>
        </TouchableOpacity>

        {/* Footer */}
        <View className="flex-row justify-center">
          <Text className="text-gray-500" onPress={() => router.push("/login")}>
            Already have an account?{" "}
          </Text>
          <Text
            className="text-blue-600 font-semibold"
            onPress={() => router.push("/login")}
          >
            Login
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default Signup;
