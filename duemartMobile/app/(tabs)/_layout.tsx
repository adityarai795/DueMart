import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'

const _layout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          tabBarLabel: "Home",
        }}
      />{" "}
      <Tabs.Screen
        name="order"
        options={{
          headerShown: false,
          tabBarLabel: "Order",
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          tabBarLabel: "Profile",
        }}
      />
    </Tabs>
  );
}

export default _layout

