import React from "react";
import { useSelector } from "react-redux";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "../screens/HomeScreen/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen/ProfileScreen";
import AddThreadScreen from "../screens/AddThreadScreen/AddThreadScreen";

const Tab = createBottomTabNavigator();

function TabNavigator() {
  const user = useSelector((state) => state.loggedInUser.loggedInUser.data);
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#1d232a",
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Homes") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          } else if (route.name === "AddThread") {
            iconName = focused ? "add-circle" : "add-circle-outline";
          }

          return (
            <Ionicons
              name={iconName}
              size={size}
              color={focused ? "tomato" : "white"}
            />
          );
        },
      })}>
      <Tab.Screen name="Homes" component={HomeScreen} />
      {user && <Tab.Screen name="AddThread" component={AddThreadScreen} />}
      {user && <Tab.Screen name="Profile" component={ProfileScreen} />}
    </Tab.Navigator>
  );
}

export default TabNavigator;

