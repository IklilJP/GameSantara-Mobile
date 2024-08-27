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
                  uri: "https://randomuser.me/api/portraits/men/36.jpg",
                }}
              />
              <View className="flex-row items-center">
                <Text className="text-white pl-2">setoyws</Text>
                <Text className="text-white pl-1 font-thin text-xs"> - </Text>
                <Text className="text-white pl-1 font-thin text-xs">
                  1 Hari
                </Text>
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
            <View className="flex-row pt-2 gap-2">
              <TouchableOpacity
                className="p-1"
                style={{
                  borderColor: "grey",
                  borderWidth: 1,
                  borderRadius: 10,
                }}
              >
                <Text className="text-white text-sm font-light"># Tag 1</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="p-1"
                style={{
                  borderColor: "grey",
                  borderWidth: 1,
                  borderRadius: 10,
                }}
              >
                <Text className="text-white text-sm font-light"># Tag 2</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="p-1"
                style={{
                  borderColor: "grey",
                  borderWidth: 1,
                  borderRadius: 10,
                }}
              >
                <Text className="text-white text-sm font-light"># Tag 3</Text>
              </TouchableOpacity>
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
                <Text className="text-white pl-2">setoyws</Text>
                <Text className="text-white pl-1 font-thin text-xs"> - </Text>
                <Text className="text-white pl-1 font-thin text-xs">
                  1 Hari
                </Text>
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
            <View className="flex-row pt-2 gap-2">
              <TouchableOpacity
                className="p-1"
                style={{
                  borderColor: "grey",
                  borderWidth: 1,
                  borderRadius: 10,
                }}
              >
                <Text className="text-white text-sm font-light"># Tag 1</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="p-1"
                style={{
                  borderColor: "grey",
                  borderWidth: 1,
                  borderRadius: 10,
                }}
              >
                <Text className="text-white text-sm font-light"># Tag 2</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="p-1"
                style={{
                  borderColor: "grey",
                  borderWidth: 1,
                  borderRadius: 10,
                }}
              >
                <Text className="text-white text-sm font-light"># Tag 3</Text>
              </TouchableOpacity>
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
                <Text className="text-white pl-2">setoyws</Text>
                <Text className="text-white pl-1 font-thin text-xs"> - </Text>
                <Text className="text-white pl-1 font-thin text-xs">
                  1 Hari
                </Text>
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
            <View className="flex-row pt-2 gap-2">
              <TouchableOpacity
                className="p-1"
                style={{
                  borderColor: "grey",
                  borderWidth: 1,
                  borderRadius: 10,
                }}
              >
                <Text className="text-white text-sm font-light"># Tag 1</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="p-1"
                style={{
                  borderColor: "grey",
                  borderWidth: 1,
                  borderRadius: 10,
                }}
              >
                <Text className="text-white text-sm font-light"># Tag 2</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="p-1"
                style={{
                  borderColor: "grey",
                  borderWidth: 1,
                  borderRadius: 10,
                }}
              >
                <Text className="text-white text-sm font-light"># Tag 3</Text>
              </TouchableOpacity>
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
