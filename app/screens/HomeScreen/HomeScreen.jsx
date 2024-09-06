import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Header from "./Header/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import Posts from "./Posts/Posts";
import { Tab, TabView } from "@rneui/themed";
import PostsTrends from "./Posts/PostsTrends";
import PostsLatests from "./Posts/PostsLatests";

const HomeScreen = () => {
  const [index, setIndex] = useState(0);

  const getTitleStyle = (tabIndex) => ({
    color: "white",
    fontWeight: index === tabIndex ? "bold" : "300",
  });

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 bg-black">
        <Header />
        <Tab
          value={index}
          onChange={(e) => setIndex(e)}
          indicatorStyle={{ backgroundColor: "#dc2626", height: 3 }}
          style={{ backgroundColor: "#1d232a" }}>
          <Tab.Item title="Beranda" titleStyle={getTitleStyle(0)} />
          <Tab.Item title="Trending" titleStyle={getTitleStyle(1)} />
          <Tab.Item title="Terbaru" titleStyle={getTitleStyle(2)} />
        </Tab>
        <TabView value={index} onChange={setIndex} animationType="spring">
          <TabView.Item style={{ width: "100%" }}>
            <Posts />
          </TabView.Item>
          <TabView.Item style={{ width: "100%" }}>
            <PostsTrends />
          </TabView.Item>
          <TabView.Item style={{ width: "100%" }}>
            <PostsLatests />
          </TabView.Item>
        </TabView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default HomeScreen;
