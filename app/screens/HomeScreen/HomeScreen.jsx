import React from "react";
import { StyleSheet, View } from "react-native";
import Header from "./Header/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import Posts from "./Posts/Posts";

const HomeScreen = () => {
  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1">
        <Header />
        <Posts/>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default HomeScreen;
