import React, { useState } from "react";
import { StyleSheet, Image, Text, View, TouchableOpacity, Modal } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import 'react-native-gesture-handler'; 

const Header = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View
      className="w-full h-[7%] justify-center"
      style={{ backgroundColor: "#1d232a" }}
    >
      <View className="flex-row items-center pl-2">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={()=>navigation.openDrawer()}>
            <Ionicons name="menu" size={26} color="white" />
          </TouchableOpacity>
          <Image
            source={{
              uri: "https://res.cloudinary.com/dtmtphyux/image/upload/v1724742013/gamesantara-logo.png",
            }}
            style={{ width: 140, height: 80 }}
          />
        </View>
        <View className="flex-row w-[55%] justify-end items-end gap-2">
          <Ionicons name="search" size={26} color="white" />
          <Ionicons name="person-circle" size={26} color="white" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Header;
