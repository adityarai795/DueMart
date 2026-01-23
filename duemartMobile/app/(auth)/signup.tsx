import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";

const Signup = () => {
  const router = useRouter();
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
          />
        </View>

        {/* Email */}
        <View className="mb-4">
          <Text className="text-gray-600 mb-1">Email</Text>
          <TextInput
            placeholder="Enter your email"
            keyboardType="email-address"
            className="border border-gray-300 rounded-xl px-4 py-3 text-gray-800"
          />
        </View>

        {/* Password */}
        <View className="mb-4">
          <Text className="text-gray-600 mb-1">Password</Text>
          <TextInput
            placeholder="Create a password"
            secureTextEntry
            className="border border-gray-300 rounded-xl px-4 py-3 text-gray-800"
          />
        </View>

        {/* Confirm Password */}
        <View className="mb-6">
          <Text className="text-gray-600 mb-1">Confirm Password</Text>
          <TextInput
            placeholder="Confirm your password"
            secureTextEntry
            className="border border-gray-300 rounded-xl px-4 py-3 text-gray-800"
          />
        </View>

        {/* Sign Up Button */}
        <TouchableOpacity className="bg-green-600 py-4 rounded-xl mb-4">
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
