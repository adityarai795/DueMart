import { Redirect } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"
import { StatusBar, ActivityIndicator, View } from "react-native"
import React, { useEffect, useState } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"

export default function Index() {
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const tokenFromStorage = await AsyncStorage.getItem("token");
        setToken(tokenFromStorage)
      } catch (err) {
        console.log("Error reading token:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchToken()
  }, [])

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" />
      </View>
    )
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      {!token ? (
        <Redirect href="/(auth)/login" />
      ) : (
        <Redirect href="/(tabs)" />
      )}
    </SafeAreaView>
  )
}
