import { Avatar, Card, Image } from "@rneui/themed";
import React, { useState } from "react";
import { Text, ToastAndroid, TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { formatTime } from "../service/formatTime";
import { useNavigation } from "@react-navigation/native";
import { handleDownVote, handleUpVote } from "../service/servicePosts";
import Entypo from "@expo/vector-icons/Entypo";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import axiosInstance from "../service/axios";
import { useSelector } from "react-redux";

const CardPost = ({ item, setThreadList }) => {
  const navigation = useNavigation();
  const [modalDeleteThread, setModalDeleteThread] = useState(false);
  const userLogin = useSelector(
    (state) => state.loggedInUser.loggedInUser.data,
  );

  const goToDetailPost = () => {
    navigation.navigate("Details", { postId: item.id });
  };

  const handleDeletePost = async (id) => {
    try {
      const response = await axiosInstance.delete(`/post/${id}`);
      if (response.data.status === 200) {
        setThreadList((prevPosts) =>
          prevPosts.filter((post) => post.id !== id),
        );
        setModalDeleteThread(false);
        ToastAndroid.showWithGravityAndOffset(
          "Thread berhasil dihapus",
          ToastAndroid.LONG,
          ToastAndroid.TOP,
          25,
          50,
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TouchableOpacity onPress={goToDetailPost}>
      <Card
        containerStyle={{
          width: "100%",
          marginHorizontal: 0,
          backgroundColor: "#1d232a",
        }}>
        <View className="flex-row items-center">
          <View className="flex-1 flex-row">
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
          {item.userId === userLogin.id && (
            <View className="relative">
              <TouchableOpacity
                className="w-10 justify-end items-end "
                onPress={() => setModalDeleteThread(!modalDeleteThread)}>
                <Entypo name="dots-three-horizontal" size={24} color="white" />
              </TouchableOpacity>
              {modalDeleteThread && (
                <TouchableOpacity
                  className="absolute flex-1 w-32 right-0 -bottom-10 topbg-soft Black rounded-lg flex-row py-2 px-2 drop-shadow border border-colorBorder z-10"
                  onPress={() => handleDeletePost(item.id)}>
                  <EvilIcons name="trash" size={24} color="white" />
                  <Text className="text-white">Hapus Thread</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>
        <View className="mt-2">
          <Text className="text-lg font-bold text-gray-300 leading-6 mb-2">
            {item.title}
          </Text>
          <Text className="text-gray-300">{item.body}</Text>
        </View>

        <View className="flex-row flex-wrap gap-2 my-5">
          {item.pictures.map((image, index) => (
            <View
              key={index}
              className={`relative shadow-xl bg-black rounded-lg w-[48%] h-40`}>
              <Image
                source={{ uri: image.imageUrl }}
                style={{ width: "100%", height: "100%", borderRadius: 8 }}
                resizeMode="cover"
              />
              {index >= 3 && (
                <View className="absolute w-full h-full inset-0 bg-black/40 justify-center items-center rounded-md">
                  <Text className="text-white text-lg font-bold">
                    + {item.pictures.length - 3}
                  </Text>
                </View>
              )}
            </View>
          ))}
        </View>
        <View className="flex-row pt-2 items-center">
          <View className="flex-row items-center bg-gray-800 rounded-xl border border-gray-600">
            <TouchableOpacity
              className="flex-row py-1 px-3 items-center border-r border-gray-600"
              onPress={() => handleUpVote(item, setThreadList)}>
              <MaterialCommunityIcons
                name={
                  item.isUpVoted ? "arrow-up-bold" : "arrow-up-bold-outline"
                }
                size={18}
                color={item.isUpVoted ? "#16a34a" : "#a6adbb"}
              />
              <Text
                className={
                  item.isUpVoted
                    ? "text-green-600 pl-2 font-bold"
                    : "text-white pl-2 font-bold"
                }>
                {item.upVotesCount}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleDownVote(item, setThreadList)}
              className="flex-row py-1 px-3 items-center border-l border-gray-600">
              <MaterialCommunityIcons
                name={
                  item.isDownVoted
                    ? "arrow-down-bold"
                    : "arrow-down-bold-outline"
                }
                size={18}
                color={item.isDownVoted ? "#dc2626" : "#a6adbb"}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            className="p-1 pl-5 items-center flex-row"
            onPress={goToDetailPost}>
            <Ionicons name="chatbox-outline" size={22} color="#a6adbb" />
            <Text className="text-white p-1 ml-1 font-bold">
              {item.commentsCount}
            </Text>
          </TouchableOpacity>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

export default CardPost;
