import * as React from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import todoIndex from "../Todo/TodoIndex";
import { FontAwesome6, Feather } from "@expo/vector-icons";
import Weather from "../Weather/Weather";

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Home!</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Settings!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

function Tabs() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName='Home'
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#fff",
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: "#1a1a1a", // 배경색 설정
            borderTopColor: "transparent", // 상단 경계
            paddingBottom: 5,
          },
        }}
      >
        <Tab.Screen
          name='Home'
          component={Weather}
          options={{
            tabBarIcon: ({ color }) => (
              <Feather name='sun' size={20} color={color} />
            ),
          }}
        />

        <Tab.Screen
          name='Todo'
          component={todoIndex}
          options={{
            tabBarIcon: ({ color }) => (
              <FontAwesome6 name='list-check' size={20} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default Tabs;
