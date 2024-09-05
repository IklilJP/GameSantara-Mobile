import React, { useState } from "react";
import { Image, ImageBackground, StyleSheet, View } from "react-native";
import Header from "./Header/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import Posts from "./Posts/Posts";
import { Tab, TabView } from "@rneui/themed";
import { Text } from "react-native";
import PostsTrends from "./Posts/PostsTrends";
import PostsLatests from "./Posts/PostsLatests";

const GeneralPageScreen = ({ route }) => {
  const [index, setIndex] = useState(0);
  const { img, title, id } = route.params || {};

  const getTitleStyle = (tabIndex) => ({
    color: "white",
    fontWeight: index === tabIndex ? "bold" : "300",
  });
  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 bg-black">
        <Header />
        <View className="pb-1 h-2/6">
          <ImageBackground
            className="flex-1 justify-end"
            source={{ uri: img }}
            resizeMode="stretch"
          >
            <View
              key={id}
              className="flex-row gap-5 pb-5 pl-5 items-center"
              style={{ backgroundColor: "#1d232a" }}
            >
              <Image source={{ uri: img }} width={25} height={25} />
              <Text className="text-white uppercase">{title}</Text>
            </View>
          </ImageBackground>
        </View>
        <Tab
          value={index}
          onChange={(e) => setIndex(e)}
          indicatorStyle={{ backgroundColor: "#dc2626", height: 3 }}
          style={{ backgroundColor: "#1d232a" }}
        >
          <Tab.Item title="Beranda" titleStyle={getTitleStyle(0)} />
          <Tab.Item title="Trending" titleStyle={getTitleStyle(1)} />
          <Tab.Item title="Terbaru" titleStyle={getTitleStyle(2)} />
        </Tab>
        <TabView value={index} onChange={setIndex} animationType="spring">
          <TabView.Item style={{ width: "100%" }}>
            <Posts tags={title} />
          </TabView.Item>
          <TabView.Item style={{ width: "100%" }}>
            <PostsTrends tags={title} />
          </TabView.Item>
          <TabView.Item style={{ width: "100%" }}>
            <PostsLatests tags={title} />
          </TabView.Item>
        </TabView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default GeneralPageScreen;
