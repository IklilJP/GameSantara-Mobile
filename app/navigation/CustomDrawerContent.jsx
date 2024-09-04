import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View, Text, Image } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import axiosInstance from "../service/axios";
import { useNavigation, useRoute } from "@react-navigation/native";

const CustomDrawerContent = (props) => {
  const [topicList, setTopicList] = useState([]);
  const { state } = props;
  const navigation = useNavigation();
  const currentRoute = state.routeNames[state.index];

  const navigateToScreen = (screen) => {
    navigation.navigate(screen);
  };

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
    <View className="flex-1 pt-7" style={{ backgroundColor: "#1d232a" }}>
      <View className="p-4">
        <TouchableOpacity
          className="p-3"
          onPress={() => navigateToScreen("Home")}
          style={[currentRoute === "Home" && { backgroundColor: "#dc2626" }]}
        >
          <View className="flex-row gap-5 items-center">
            <Ionicons name="home" size={24} color="white" />
            <Text className="text-white">Home</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View className="w-full bg-slate-600 my-2" style={{ height: 1 }} />
      <View className="flex-row gap-5 items-center pl-7 pb-2">
        <Text className="text-red-600 font-bold text-lg">Tags</Text>
      </View>
      {topicList.map((topic, index) => (
        <View key={index} className="px-4">
          <TouchableOpacity className="px-3 py-2" style={currentRoute === topic.name && {backgroundColor: '#dc2626'}} onPress={() => navigateToScreen(topic.name)}>
            <View className="flex-row gap-5 items-center">
              <Image source={{ uri: topic.imgUrl }} width={25} height={25} />
              <Text className="text-white capitalize">{topic.name}</Text>
            </View>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({});

export default CustomDrawerContent;
