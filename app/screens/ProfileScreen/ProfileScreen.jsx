import React, { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../HomeScreen/Header/Header";
import Profile from "./Profile/Profile";
import TabProfile from "./Tab/TabProfile";
import Collapsible from "react-native-collapsible";

const { height } = Dimensions.get("window");

const ProfileScreen = ({ route }) => {
  const { userId } = route.params;

  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="flex-1 bg-black">
        <Header />
        <Profile userId={userId} />
        <TabProfile userId={userId} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 60,
    backgroundColor: "#6200ee",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
  headerText: {
    color: "#fff",
    fontSize: 18,
  },
  scrollViewContent: {
    paddingTop: 60, // Same as header height
  },
  content: {
    padding: 20,
    backgroundColor: "#f0f0f0",
    flex: 1,
  },
});

export default ProfileScreen;
