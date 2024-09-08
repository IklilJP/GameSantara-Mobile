import { Tab, TabView } from "@rneui/themed";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Posts from "../../HomeScreen/Posts/Posts";
import PostsByUser from "../../HomeScreen/Posts/PostByUser";
import PostsByUserVote from "../../HomeScreen/Posts/PostByUserVote";

const TabProfile = ({ userId }) => {
  const [index, setIndex] = useState(0);

  const getTitleStyle = (tabIndex) => ({
    color: "white",
    fontWeight: index === tabIndex ? "bold" : "300",
  });

  return (
    <View className="flex-1">
      <Tab
        value={index}
        onChange={(e) => setIndex(e)}
        indicatorStyle={{ backgroundColor: "#dc2626", height: 3 }}
        style={{ backgroundColor: "#1d232a" }}>
        <Tab.Item title="Thread" titleStyle={getTitleStyle(0)} />
        <Tab.Item title="Disukai" titleStyle={getTitleStyle(1)} />
      </Tab>
      <TabView value={index} onChange={setIndex} animationType="spring">
        <TabView.Item style={{ width: "100%" }}>
          <PostsByUser userId={userId} />
        </TabView.Item>
        <TabView.Item style={{ width: "100%" }}>
          <PostsByUserVote userId={userId} />
        </TabView.Item>
      </TabView>
    </View>
  );
};

const styles = StyleSheet.create({});

export default TabProfile;

