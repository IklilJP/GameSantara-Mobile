import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  ToastAndroid,
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
import ImageViewing from "react-native-image-viewing";
import CommentInputDetail from "../../components/CommentInputDetail";
import CardComment from "../../components/CardComment";
import { downVoteThread, upVoteThread } from "../../service/servicePosts";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSelector } from "react-redux";
import Entypo from "@expo/vector-icons/Entypo";
import EvilIcons from "@expo/vector-icons/EvilIcons";

const DetailsScreen = ({ route }) => {
  const { postId } = route.params;
  const [threadDetail, setThreadDetail] = useState({});
  const navigation = useNavigation();
  const [isComment, setIsComment] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const [comments, setComments] = useState([]);
  const [modalDeleteThread, setModalDeleteThread] = useState(false);
  const userLogin = useSelector(
    (state) => state.loggedInUser.loggedInUser.data,
  );

  const handleDeletePost = async (id) => {
    try {
      const response = await axiosInstance.delete(`/post/${id}`);
      if (response.data.status === 200) {
        setModalDeleteThread(false);
        ToastAndroid.showWithGravityAndOffset(
          "Thread berhasil dihapus",
          ToastAndroid.LONG,
          ToastAndroid.TOP,
          25,
          50,
        );
        navigation.goBack();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDetailPost = async () => {
    try {
      const response = await axiosInstance.get(`/post/${postId}`);
      setThreadDetail(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDetailPost();
  }, []);

  const handleUpVote = () => {
    upVoteThread(threadDetail.id, setThreadDetail);
  };

  const handleDownVote = () => {
    downVoteThread(threadDetail.id, setThreadDetail);
  };

  const images = threadDetail.pictures?.map((image) => ({
    uri: image.imageUrl,
  }));

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View className="flex-row items-center py-4 px-2 border-b border-b-black bg-[#1d232a]">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color="#d1d5db" />
        </TouchableOpacity>
        <Text className="text-gray-300 font-bold text-lg ml-2">Thread</Text>
      </View>

      <KeyboardAwareScrollView
        enableOnAndroid={true}
        contentContainerStyle={{ flexGrow: 1 }}>
        <ScrollView
          className="bg-[#1d232a] flex-1 min-h-screen"
          contentContainerStyle={{ paddingBottom: 100 }}>
          <View className="flex-1 px-2 w-full">
            <View
              className="flex-row items-center justify-between my-2"
              style={{ gap: 10 }}>
              <View className="flex-row items-center">
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

              {threadDetail.userId === userLogin.id && (
                <View className="relative">
                  <TouchableOpacity
                    className="w-10 justify-end items-end "
                    onPress={() => setModalDeleteThread(!modalDeleteThread)}>
                    <Entypo
                      name="dots-three-horizontal"
                      size={24}
                      color="white"
                    />
                  </TouchableOpacity>
                  {modalDeleteThread && (
                    <TouchableOpacity
                      className="absolute flex-1 w-32 right-0 -bottom-10 topbg-soft Black rounded-lg flex-row py-2 px-2 drop-shadow border border-colorBorder z-10"
                      onPress={() => handleDeletePost(threadDetail.id)}>
                      <EvilIcons name="trash" size={24} color="white" />
                      <Text className="text-white">Hapus Thread</Text>
                    </TouchableOpacity>
                  )}
                </View>
              )}
            </View>

            <View className="mt-2">
              <Text
                className="text-gray-300 font-bold mb-1"
                style={{ fontSize: 18 }}>
                {threadDetail.title}
              </Text>

              <Text className="text-gray-300 leading-5">
                {threadDetail.body}
              </Text>
            </View>

            <View className="my-1">
              {threadDetail.pictures?.length === 1 ? (
                <TouchableOpacity
                  onPress={() => {
                    setImageIndex(0);
                    setIsVisible(true);
                  }}
                  className="shadow-xl bg-black rounded-lg w-[100%]"
                  style={{ aspectRatio: 1 }}>
                  <Image
                    source={{ uri: threadDetail.pictures[0].imageUrl }}
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: 8,
                      marginTop: 10,
                    }}
                    resizeMode="cover"
                  />
                </TouchableOpacity>
              ) : (
                <View className="flex-row flex-wrap justify-between">
                  {threadDetail.pictures?.map((image, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        setImageIndex(index);
                        setIsVisible(true);
                      }}
                      className="shadow-xl bg-black rounded-lg"
                      style={{
                        width: "48%",
                        aspectRatio: 1,
                        marginBottom: 10,
                      }}>
                      <Image
                        source={{ uri: image.imageUrl }}
                        style={{
                          width: "100%",
                          height: "100%",
                          borderRadius: 8,
                        }}
                        resizeMode="cover"
                      />
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>

            <View className="flex-row items-center my-5">
              <View className="flex-row items-center bg-gray-800 rounded-xl border border-gray-600">
                <TouchableOpacity
                  className="flex-row py-1 px-3 items-center border-r border-gray-600"
                  onPress={handleUpVote}>
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
                  onPress={handleDownVote}
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
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                className="p-1 pl-5"
                onPress={() => setIsComment(!isComment)}>
                <Ionicons name="chatbox-outline" size={22} color="white" />
              </TouchableOpacity>
              <Text className="text-white p-1">
                {threadDetail.commentsCount}
              </Text>
            </View>
          </View>

          <CommentInputDetail
            threadDetail={threadDetail}
            isComment={isComment}
            setIsComment={setIsComment}
            setComments={setComments}
          />
          <CardComment
            postId={threadDetail.id}
            comments={comments}
            setComments={setComments}
          />
        </ScrollView>
      </KeyboardAwareScrollView>

      <ImageViewing
        images={images}
        imageIndex={imageIndex}
        visible={isVisible}
        onRequestClose={() => setIsVisible(false)}
      />
    </SafeAreaView>
  );
};

export default DetailsScreen;
