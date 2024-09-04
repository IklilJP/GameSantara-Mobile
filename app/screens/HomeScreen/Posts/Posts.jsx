import { Avatar, Card } from "@rneui/themed";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const Posts = () => {

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

  return (
    <View className="bg-black h-full flex-1">
      <ScrollView>
        <View className="flex-1">
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
                  <Text className="text-white font-bold">setoyws</Text>
                    <Text className="text-white font-bold">•</Text>
                    <Text className="text-red-500 font-bold">Arcade</Text>
                  </View>
                  <Text className="text-white font-extralight text-xs">
                    1 Hari
                  </Text>
                </View>
              </View>
            </View>
            <View className="pt-2">
              <Text className="text-white text-2xl">Ini adalah judul!</Text>
              <Text className="text-white text-sm font-light">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Reiciendis adipisci id deserunt consequuntur tempore doloremque
                dolorem ab, quia veniam modi. Ex corrupti veniam doloremque
                aperiam unde assumenda voluptates fugiat est.
              </Text>
            </View>
            <View className="flex-row pt-2 items-center">
              <TouchableOpacity className="p-1">
                <Ionicons name="caret-up" size={24} color="white" />
              </TouchableOpacity>
              <Text className="text-white">210</Text>
              <TouchableOpacity className="p-1 pl-3">
                <Ionicons name="caret-down" size={24} color="white" />
              </TouchableOpacity>
              <TouchableOpacity className="p-1 pl-5">
                <Ionicons name="chatbox" size={22} color="white" />
              </TouchableOpacity>
              <Text className="text-white p-1">11</Text>
            </View>
          </Card>
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
                  uri: "https://randomuser.me/api/portraits/men/36.jpg",
                }}
              />
              <View className="flex-row items-center">
                <View className="justify-center pl-2">
                  <View className="flex-row gap-2 ">
                  <Text className="text-white font-bold">setoyws</Text>
                    <Text className="text-white font-bold">•</Text>
                    <Text className="text-red-500 font-bold">Arcade</Text>
                  </View>
                  <Text className="text-white font-extralight text-xs">
                    1 Hari
                  </Text>
                </View>
              </View>
            </View>
            <View className="pt-2">
              <Text className="text-white text-2xl">Ini adalah judul!</Text>
              <Text className="text-white text-sm font-light">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Reiciendis adipisci id deserunt consequuntur tempore doloremque
                dolorem ab, quia veniam modi. Ex corrupti veniam doloremque
                aperiam unde assumenda voluptates fugiat est.
              </Text>
            </View>
            <View className="flex-row pt-2 items-center">
              <TouchableOpacity className="p-1">
                <Ionicons name="caret-up" size={24} color="white" />
              </TouchableOpacity>
              <Text className="text-white">210</Text>
              <TouchableOpacity className="p-1 pl-3">
                <Ionicons name="caret-down" size={24} color="white" />
              </TouchableOpacity>
              <TouchableOpacity className="p-1 pl-5">
                <Ionicons name="chatbox" size={22} color="white" />
              </TouchableOpacity>
              <Text className="text-white p-1">11</Text>
            </View>
          </Card>
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
                  uri: "https://randomuser.me/api/portraits/men/36.jpg",
                }}
              />
              <View className="flex-row items-center">
                <View className="justify-center pl-2">
                  <View className="flex-row gap-2 ">
                  <Text className="text-white font-bold">setoyws</Text>
                    <Text className="text-white font-bold">•</Text>
                    <Text className="text-red-500 font-bold">Arcade</Text>
                  </View>
                  <Text className="text-white font-extralight text-xs">
                    1 Hari
                  </Text>
                </View>
              </View>
            </View>
            <View className="pt-2">
              <Text className="text-white text-2xl">Ini adalah judul!</Text>
              <Text className="text-white text-sm font-light">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Reiciendis adipisci id deserunt consequuntur tempore doloremque
                dolorem ab, quia veniam modi. Ex corrupti veniam doloremque
                aperiam unde assumenda voluptates fugiat est.
              </Text>
            </View>
            <View className="flex-row pt-2 items-center">
              <TouchableOpacity className="p-1">
                <Ionicons name="caret-up" size={24} color="white" />
              </TouchableOpacity>
              <Text className="text-white">210</Text>
              <TouchableOpacity className="p-1 pl-3">
                <Ionicons name="caret-down" size={24} color="white" />
              </TouchableOpacity>
              <TouchableOpacity className="p-1 pl-5">
                <Ionicons name="chatbox" size={22} color="white" />
              </TouchableOpacity>
              <Text className="text-white p-1">11</Text>
            </View>
          </Card>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Posts;
