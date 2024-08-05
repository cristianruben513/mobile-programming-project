import { Tabs } from "expo-router";
import React from "react";

import { TabBarItem } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "react-native";

import UserButton from "@/components/UserButton";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        tabBarShowLabel: false,
        headerStyle: {
          backgroundColor: Colors[colorScheme ?? "light"].header,
        },
        tabBarStyle: {
          backgroundColor: Colors[colorScheme ?? "light"].tabBar,
          height: 100,
        },
        headerRight: () => <UserButton />,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Asignaturas",
          tabBarIcon: ({ color, focused }) => (
            <TabBarItem
              title="Asignaturas"
              iconName={focused ? "albums" : "albums-outline"}
              focused={focused}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="unirme"
        options={{
          title: "Unirme a nueva clase",
          tabBarIcon: ({ color, focused }) => (
            <TabBarItem
              title="Unirme"
              iconName={focused ? "add-circle" : "add-circle-outline"}
              focused={focused}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
