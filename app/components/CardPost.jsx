import { Avatar, Card } from "@rneui/themed";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import axiosInstance from "../service/axios";
import { formatTime } from "../service/formatTime";

const CardPost = ({ item, setThreadList }) => {
  const handleUpVote = async (thread) => {
    try {
      const response = await axiosInstance.post(
        `/vote-posts/${thread.id}/up-vote`,
      );
      if (response.status === 200) {
        setThreadList((prevPosts) =>
          prevPosts.map((post) =>
            post.id === thread.id
              ? {
                  ...post,
                  upVotesCount: thread.isUpVoted
                    ? post.upVotesCount - 1
                    : post.upVotesCount + 1,
                  isUpVoted: !thread.isUpVoted,
                  downVotesCount: thread.isDownVoted
                    ? post.downVotesCount - 1
                    : post.downVotesCount,
                  isDownVoted: false,
                }
              : post,
          ),
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDownVote = async (thread) => {
    try {
      const response = await axiosInstance.post(
        `/vote-posts/${thread.id}/down-vote`,
      );
      if (response.status === 200) {
        setThreadList((prevPosts) =>
          prevPosts.map((post) =>
            post.id === thread.id
              ? {
                  ...post,
                  downVotesCount: thread.isDownVoted
                    ? post.downVotesCount - 1
                    : post.downVotesCount + 1,
                  isDownVoted: !thread.isDownVoted,
                  upVotesCount: thread.isUpVoted
                    ? post.upVotesCount - 1
                    : post.upVotesCount,
                  isUpVoted: false,
                }
              : post,
          ),
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <Card
      containerStyle={{
        width: "100%",
        marginHorizontal: 0,
        backgroundColor: "#1d232a",
      }}>
      <View className="flex-row items-center">
        <Avatar
          size={32}
          rounded
          source={{
            uri:
              item.profilePictureUrl ||
              "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg",
          }}
        />
        <View className="flex-row items-center">
          <View className="justify-center pl-2">
            <View className="flex-row gap-2 ">
              <Text className="text-white font-bold">{item.user}</Text>
              <Text className="text-white font-bold">•</Text>
              <Text className="text-red-500 font-bold">{item.tagName}</Text>
            </View>
            <Text className="text-xs text-gray-300">
              {formatTime(item.createAt)}
            </Text>
          </View>
        </View>
      </View>
      <View className="mt-2">
        <Text className="text-lg font-bold text-gray-300 leading-6 mb-2">
          {item.title}
        </Text>
        <Text className="text-sm text-gray-300">{item.body}</Text>
      </View>
      <View className="flex-row pt-2 items-center">
        <View className="flex-row items-center bg-gray-800 rounded-xl border border-gray-600">
          <TouchableOpacity
            className="flex-row py-1 px-3 items-center border-r border-gray-600"
            onPress={() => handleUpVote(item)}>
            <MaterialCommunityIcons
              name={item.isUpVoted ? "arrow-up-bold" : "arrow-up-bold-outline"}
              size={18}
              color={item.isUpVoted ? "tomato" : "white"}
            />
            <Text
              className={
                item.isUpVoted ? "text-red-600 pl-2" : "text-white pl-2"
              }>
              {item.upVotesCount}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleDownVote(item)}
            className="flex-row py-1 px-3 items-center border-l border-gray-600">
            <MaterialCommunityIcons
              name={
                item.isDownVoted ? "arrow-down-bold" : "arrow-down-bold-outline"
              }
              size={18}
              color={item.isDownVoted ? "tomato" : "white"}
            />
            <Text
              className={
                item.isDownVoted ? "text-red-600 pl-2" : "text-white pl-2"
              }>
              {item.downVotesCount}
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity className="p-1 pl-5">
          <Ionicons name="chatbox-outline" size={22} color="white" />
        </TouchableOpacity>
        <Text className="text-white p-1">{item.commentsCount}</Text>
      </View>
    </Card>
  );
};

export default CardPost;
