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
        name="calificaciones"
        options={{
          title: "Calificaciones",
          tabBarIcon: ({ color, focused }) => (
            <TabBarItem
              title="Calificaciones"
              iconName={focused ? "bookmark" : "bookmark-outline"}
              focused={focused}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="apuntes"
        options={{
          title: "Apuntes",
          tabBarIcon: ({ color, focused }) => (
            <TabBarItem
              title="Apuntes"
              iconName={focused ? "document-text" : "document-text-outline"}
              focused={focused}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
