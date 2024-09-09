import { useEffect, useState } from "react";
import { View, Text, TextInput, ActivityIndicator } from "react-native";
import axiosInstance from "../service/axios";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { TouchableOpacity } from "react-native-gesture-handler";

const SearchBody = ({ navigation }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const goToDetailPost = (id) => {
    navigation.navigate("Details", { postId: id });
  };

  const searchPosts = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/post?q=${searchQuery}`);
      console.log(response.data.data);
      setSearchResults(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery.trim()) {
        searchPosts();
      } else {
        setSearchResults([]);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  return (
    <SafeAreaView>
      <View className="bg-black min-h-screen">
        <View className="flex-row items-center py-2  px-2 ">
          <TouchableOpacity className="" onPress={() => navigation.goBack()}>
            <AntDesign name="arrowleft" size={24} color="white" />
          </TouchableOpacity>
          <View className="flex-row flex-1 items-center ml-5">
            <EvilIcons name="search" size={24} color="white" />
            <TextInput
              className=" flex-1 mx-2 text-[#fff]"
              placeholderTextColor={"#6b7280"}
              placeholder="Tulis judul, tag atau deskripsi"
              value={searchQuery}
              onChangeText={(text) => setSearchQuery(text)}
            />
          </View>
        </View>
        {loading && <ActivityIndicator size="large" color="#ffffff" />}
        {searchResults.map((item) => (
          <TouchableOpacity
            onPress={() => goToDetailPost(item.id)}
            className="block py-2 px-2 text-white border-y border-colorBorder"
            key={item.id}>
            <Text className="text-[#fff] font-bold">{item.title}</Text>
            <Text className="text-white">{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default SearchBody;
