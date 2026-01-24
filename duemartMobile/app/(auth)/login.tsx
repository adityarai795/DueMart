import {
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { loginService } from "../../src/services/authService";
import { useState } from "react";

const Login = () => {
  const router = useRouter();

  const [email, setEmail] = useState("john@example.com");
  const [password, setPassword] = useState("password123");
  const handleLogin = async () => {
    try {

      // const res = await loginService(email, password);
      // console.log("Login successful:", res);
      Alert.alert("Success", "Login successful!");
      router.replace("/(tabs)");
    } catch (err) {
      console.log("Login failed:", err);
      Alert.alert("Error", "Login failed. Check console.");
    }
  };

  return (
    <View className="flex-1 bg-white justify-center px-6">
      {/* Title */}
      <Text className="text-3xl font-bold text-center text-gray-800 mb-2">
        Welcome Back on DueMart
      </Text>
      <Text className="text-center text-gray-500 mb-8">
        Login to your account
      </Text>

      {/* Email */}
      <View className="mb-4">
        <Text className="text-gray-600 mb-1">Email</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          autoCapitalize="none"
          className="border border-gray-300 rounded-xl px-4 py-3 text-gray-800"
        />
      </View>

      {/* Password */}
      <View className="mb-6">
        <Text className="text-gray-600 mb-1">Password</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Enter your password"
          secureTextEntry
          className="border border-gray-300 rounded-xl px-4 py-3 text-gray-800"
        />
      </View>

      {/* Login Button */}
      <Pressable
        onPress={handleLogin}
        className="bg-blue-600 py-4 rounded-xl mb-4 active:opacity-70"
      >
        <Text className="text-white text-center font-semibold text-lg">
          Login
        </Text>
      </Pressable>

      {/* Footer */}
      <View className="flex-row justify-center">
        <Text className="text-gray-500">Don't have an account? </Text>
        <Pressable onPress={() => router.push("/(auth)/signup")}>
          <Text className="text-blue-600 font-semibold">Sign Up</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Login;
