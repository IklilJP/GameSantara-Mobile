import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from "@expo/vector-icons/Feather";
import { Avatar } from "@rneui/themed";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import axiosInstance from "../../service/axios";
import { formatTime } from "../../service/formatTime";
import { useNavigation } from "@react-navigation/native";

const DetailsScreen = ({ route }) => {
  const { postId } = route.params;
  const [threadDetail, setThreadDetail] = useState({});
  const navigation = useNavigation();
  const [isComment, setIsComment] = useState(false);

  const fetchDetailPost = async () => {
    try {
      const response = await axiosInstance.get(`/post/${postId}`);
      console.log(response.data.data);
      setThreadDetail(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpVote = async () => {
    try {
      const response = await axiosInstance.post(
        `/vote-posts/${threadDetail.id}/up-vote`,
      );
      if (response.status === 200) {
        setThreadDetail((prevDetail) => ({
          ...prevDetail,
          upVotesCount: prevDetail.isUpVoted
            ? prevDetail.upVotesCount - 1
            : prevDetail.upVotesCount + 1,
          isUpVoted: !prevDetail.isUpVoted,
          downVotesCount: prevDetail.isDownVoted
            ? prevDetail.downVotesCount - 1
            : prevDetail.downVotesCount,
          isDownVoted: false,
        }));
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDownVote = async () => {
    try {
      const response = await axiosInstance.post(
        `/vote-posts/${threadDetail.id}/down-vote`,
      );
      if (response.status === 200) {
        setThreadDetail((prevDetail) => ({
          ...prevDetail,
          downVotesCount: prevDetail.isDownVoted
            ? prevDetail.downVotesCount - 1
            : prevDetail.downVotesCount + 1,
          isDownVoted: !prevDetail.isDownVoted,
          upVotesCount: prevDetail.isUpVoted
            ? prevDetail.upVotesCount - 1
            : prevDetail.upVotesCount,
          isUpVoted: false,
        }));
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchDetailPost();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View className="flex-row gap-2 items-center py-4 px-2 border-b border-b-black bg-[#1d232a]">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color="#d1d5db" />
        </TouchableOpacity>
        <Text className="text-gray-300 font-bold text-lg">Thread</Text>
      </View>
      <ScrollView
        className="bg-[#1d232a] min-h-screen"
        contentContainerStyle={{ paddingBottom: 100 }}>
        <View className="px-2">
          <View className="flex-row items-center my-2" style={{ gap: 10 }}>
            <Avatar
              size={38}
              rounded
              source={{
                uri:
                  threadDetail.profilePictureUrl ||
                  "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg",
              }}
            />

            <View>
              <View className="flex-row items-center" style={{ gap: 7 }}>
                <Text className="text-gray-300 font-bold">
                  {threadDetail.user}
                </Text>
                <Text className="text-gray-300 text-xl">&bull;</Text>
                <Text className="text-red-600 font-bold">
                  {threadDetail.tagName}
                </Text>
              </View>
              <Text className="text-gray-300">
                {formatTime(threadDetail.createAt)}
              </Text>
            </View>
          </View>

          <View className="mt-2">
            <Text
              className="text-gray-300 font-bold mb-1"
              style={{ fontSize: 18 }}>
              {threadDetail.title}
            </Text>

            <Text className="text-gray-300 leading-5">{threadDetail.body}</Text>
          </View>

          <View className="flex-row flex-wrap gap-5 my-1">
            {threadDetail.pictures?.map((image, index) => (
              <View
                key={index}
                className={`shadow-xl bg-black rounded-lg w-[100%]`}
                style={{ aspectRatio: 1 }}>
                <Image
                  source={{ uri: image.imageUrl }}
                  style={{ width: "100%", height: "100%", borderRadius: 8 }}
                  resizeMode="contain"
                />
              </View>
            ))}
          </View>

          <View className="flex-row items-center my-5">
            <View className="flex-row items-center bg-gray-800 rounded-xl border border-gray-600">
              <TouchableOpacity
                className="flex-row py-1 px-3 items-center border-r border-gray-600"
                onPress={() => handleUpVote()}>
                <MaterialCommunityIcons
                  name={
                    threadDetail.isUpVoted
                      ? "arrow-up-bold"
                      : "arrow-up-bold-outline"
                  }
                  size={20}
                  color={threadDetail.isUpVoted ? "#16a34a" : "white"}
                />
                <Text className={"text-white pl-2"}>
                  {threadDetail.upVotesCount}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleDownVote()}
                className="flex-row py-1 px-3 items-center border-l border-gray-600">
                <MaterialCommunityIcons
                  name={
                    threadDetail.isDownVoted
                      ? "arrow-down-bold"
                      : "arrow-down-bold-outline"
                  }
                  size={20}
                  color={threadDetail.isDownVoted ? "#dc2626" : "white"}
                />
                <Text className={"text-white pl-2"}>
                  {threadDetail.downVotesCount}
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity className="p-1 pl-5">
              <Ionicons name="chatbox-outline" size={22} color="white" />
            </TouchableOpacity>
            <Text className="text-white p-1">{threadDetail.commentsCount}</Text>
          </View>
        </View>

        <View className="px-4">
          {!isComment ? (
            <TouchableOpacity
              className="flex-row justify-center items-center border border-colorBorder rounded-3xl py-2"
              onPress={() => setIsComment(true)}>
              <Ionicons name="add" size={24} color="white" />
              <Text className="text-white">Tambah Komentar</Text>
            </TouchableOpacity>
          ) : (
            <View className="p-2 border border-colorBorder rounded-xl">
              <TextInput
                multiline={true}
                numberOfLines={10}
                style={{ height: 100, textAlignVertical: "top" }}
              />
              <View className="flex-row gap-2 justify-end">
                <TouchableOpacity
                  className="bg-red-600 text-white px-3 py-1 rounded-lg"
                  onPress={() => setIsComment(false)}>
                  <Text className="text-[#fff]">Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="bg-blue-700 text-white px-3 py-1 rounded-lg"
                  onPress={() => setIsComment(false)}>
                  <Text className="text-[#fff]">Kirim</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default DetailsScreen;
