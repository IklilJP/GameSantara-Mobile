import { createDrawerNavigator } from "@react-navigation/drawer";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import CustomDrawerContent from "./CustomDrawerContent";
import GeneralPageScreen from "../screens/HomeScreen/GeneralPageScreen";
import StackNavigator from "./StackNavigator";
import axiosInstance from "../service/axios";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const [topicList, setTopicList] = useState([]);
  const getTopic = async () => {
    try {
      const response = await axiosInstance.get("/tags");
      setTopicList(response.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getTopic();
  }, []);
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: { backgroundColor: "#1d232a", width: "70%" },
        drawerItemStyle: { backgroundColor: "#dc2626" },
      }}>
      <Drawer.Screen name="Home" component={StackNavigator} />
      {topicList.map((topic, index) => (
        <Drawer.Screen
          key={index}
          name={topic.id}
          component={GeneralPageScreen}
          initialParams={{ img: topic.imgUrl, title: topic.name, id: topic.id }}
        />
      ))}
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({});

export default DrawerNavigator;
