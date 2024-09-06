import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from "@expo/vector-icons/Feather";
import { Avatar } from "@rneui/themed";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Ionicons from "@expo/vector-icons/Ionicons";

const DetailsScreen = ({ route }) => {
  const { postId } = route.params;

  return (
    <SafeAreaView>
      <View className="bg-[#1d232a] px-2">
        <View className="flex-row gap-2 items-center py-2 border-b border-b-black">
          <Feather name="arrow-left" size={24} color="#d1d5db" />
          <Text className="text-gray-300 font-bold text-lg">Thread</Text>
        </View>
        <View className="flex-row items-center my-2" style={{ gap: 10 }}>
          <Avatar
            size={38}
            rounded
            source={{
              uri: "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg",
            }}
          />

          <View>
            <View className="flex-row items-center" style={{ gap: 7 }}>
              <Text className="text-gray-300 font-bold">User</Text>
              <Text className="text-gray-300 text-xl">&bull;</Text>
              <Text className="text-red-600 font-bold">Moba</Text>
            </View>
            <Text className="text-gray-300">1 hari yang lalu</Text>
          </View>
        </View>

        <View className="mt-2">
          <Text
            className="text-gray-300 font-bold mb-1"
            style={{ fontSize: 18 }}>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nobis,
            vel.
          </Text>
          <Text className="text-gray-300">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatum
            blanditiis, voluptatem dignissimos quae praesentium aperiam neque
            non deserunt, culpa, libero accusantium magni quisquam quod sed
            doloremque nemo rem perspiciatis vel.
          </Text>
        </View>

        <View className="flex-row pt-2 items-center">
          <View className="flex-row items-center bg-gray-800 rounded-xl border border-gray-600">
            <TouchableOpacity
              className="flex-row py-1 px-3 items-center border-r border-gray-600"
              // onPress={() => handleUpVote(item)}
            >
              <MaterialCommunityIcons
                name={"arrow-up-bold"}
                size={18}
                // color={item.isUpVoted ? "tomato" : "white"}
              />
              <Text className={"text-white pl-2"}>
                {/* {item.upVotesCount} */}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              // onPress={() => handleDownVote(item)}
              className="flex-row py-1 px-3 items-center border-l border-gray-600">
              <MaterialCommunityIcons
                name={"arrow-down-bold-outline"}
                size={18}
                // color={item.isDownVoted ? "tomato" : "white"}
              />
              <Text className={"text-white pl-2"}>
                {/* {item.downVotesCount} */}
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity className="p-1 pl-5">
            <Ionicons name="chatbox-outline" size={22} color="white" />
          </TouchableOpacity>
          <Text className="text-white p-1">{/* {item.commentsCount} */}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default DetailsScreen;
