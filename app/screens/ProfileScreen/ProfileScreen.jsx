import React, { useRef, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../HomeScreen/Header/Header";
import Profile from "./Profile/Profile";
import TabProfile from "./Tab/TabProfile";

const ProfileScreen = ({ route }) => {
  const { userId } = route.params;

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 bg-black">
        <Header />
        <Profile userId={userId} />
        <TabProfile userId={userId} />
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
