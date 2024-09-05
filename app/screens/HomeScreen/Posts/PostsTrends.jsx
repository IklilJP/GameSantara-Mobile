import { Avatar, Card } from "@rneui/themed";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import axiosInstance from "../../../service/axios";

const PostsTrends = (props) => {
  const [threadListTrend, setThreadListTrend] = useState([]);

  const getPostData = async () => {
    try {
      const response = await axiosInstance.get("/post", {
        page: 1,
        size: 10,
        q: props?.tags,
        by: 'trend',
      });
      setThreadListTrend(response.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  const getTimeAgo = (timestamp) => {
    const now = Date.now();
    const secondsAgo = Math.floor((now - timestamp) / 1000);

    if (secondsAgo < 60) {
      return `${secondsAgo} detik yang lalu`;
    } else if (secondsAgo < 3600) {
      return `${Math.floor(secondsAgo / 60)} menit yang lalu`;
    } else if (secondsAgo < 86400) {
      return `${Math.floor(secondsAgo / 3600)} jam yang lalu`;
    } else {
      return `${Math.floor(secondsAgo / 86400)} hari yang lalu`;
    }
  };

  const renderItem = ({ item }) => (
    <Card
      containerStyle={{
        width: "100%",
        marginHorizontal: 0,
        backgroundColor: "#1d232a",
      }}
    >
      <View className="flex-row items-center">
        <Avatar
          size={32}
          rounded
          source={{
            uri: "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg",
          }}
        />
        <View className="flex-row items-center">
          <View className="justify-center pl-2">
            <View className="flex-row gap-2 ">
              <Text className="text-white font-bold">{item.user}</Text>
              <Text className="text-white font-bold">•</Text>
              <Text className="text-red-500 font-bold">{item.tagName}</Text>
            </View>
            <Text className="text-white font-extralight text-xs">
              {getTimeAgo(item.createAt)}
            </Text>
          </View>
        </View>
      </View>
      <View className="pt-2">
        <Text className="text-white text-2xl">{item.title}</Text>
        <Text className="text-white text-sm font-light">{item.body}</Text>
      </View>
      <View className="flex-row pt-2 items-center">
        <TouchableOpacity className="p-1">
          <Ionicons name="caret-up" size={24} color="white" />
        </TouchableOpacity>
        <Text className="text-white">
          {item.upVotesCount - item.downVotesCount}
        </Text>
        <TouchableOpacity className="p-1 pl-3">
          <Ionicons name="caret-down" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity className="p-1 pl-5">
          <Ionicons name="chatbox" size={22} color="white" />
        </TouchableOpacity>
        <Text className="text-white p-1">{item.commentsCount}</Text>
      </View>
    </Card>
  );

  useEffect(() => {
    getPostData();
  }, []);

  return (
    <View className="bg-black h-full flex-1">
      <View className="flex-1">
        <FlatList
          data={threadListTrend}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default PostsTrends;
