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
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const Posts = (props) => {
  const [threadList, setThreadList] = useState([]);

  const getPostData = async () => {
    try {
      setThreadList([]);
      const response = await axiosInstance.get("/post", {
        page: 1,
        size: 10,
        q: props?.tags,
      });
      console.log(props.tags);
      setThreadList(response.data.data);
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

  const handleUpVote = async (thread) => {
    try {
      const response = await axiosInstance.post(`/vote-posts/${thread.id}/up-vote`);
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
  }

  const handleDownVote = async (thread) => {
    try {
      const response = await axiosInstance.post(`/vote-posts/${thread.id}/down-vote`);
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
  }

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
        <View className="flex-row items-center bg-gray-800 rounded-xl border border-gray-600">
          <TouchableOpacity className="flex-row p-2 items-center border-r border-gray-600" onPress={()=>handleUpVote(item)}>
            <MaterialCommunityIcons
              name={item.isUpVoted ? "arrow-up-bold" : 'arrow-up-bold-outline'}
              size={24}
              color={item.isUpVoted ? "tomato" : 'white'}
            />
          <Text className={item.isUpVoted ? "text-red-600 pl-2" : 'text-white pl-2'}>{item.upVotesCount}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> handleDownVote(item)} className="flex-row p-2 items-center border-l border-gray-600">
            <MaterialCommunityIcons
              name={item.isDownVoted ? "arrow-down-bold" : 'arrow-down-bold-outline'}
              size={24}
              color={item.isDownVoted ? "tomato" : 'white'}
            />
          <Text className={item.isDownVoted ? "text-red-600 pl-2" : 'text-white pl-2'}>{item.downVotesCount}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity className="p-1 pl-5">
          <Ionicons name="chatbox-outline" size={22} color="white" />
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
          data={threadList}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Posts;
