import React, { useEffect, useState } from "react";
import { ToastAndroid, TouchableOpacity } from "react-native";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Controller, useForm } from "react-hook-form";
import { TextInput } from "react-native";
import * as ImagePicker from "expo-image-picker";
import RNPickerSelect from "react-native-picker-select";
import { Image } from "react-native";
import * as FileSystem from "expo-file-system";
import axiosInstance from "../../service/axios";
import { useSelector } from "react-redux";

const AddThreadScreen = () => {
  const navigation = useNavigation();
  const [imageList, setImageList] = useState([]);
  const [open, setOpen] = useState(false);
  const [tagItems, setTagItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const userLogin = useSelector(
    (state) => state.loggedInUser.loggedInUser.data,
  );
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const getTagItems = async () => {
    try {
      const response = await axiosInstance.get("/tags");
      const responseTag = response.data.data;
      const newArrayTag = [];
      responseTag.map((tag, index) => {
        const newTagItems = { label: tag.name, value: tag.id };
        newArrayTag.push(newTagItems);
      });
      setTagItems(newArrayTag);
    } catch (error) {
      console.log(error.message);
    }
  };

  const selectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageList([...imageList, result.assets[0]]);
      console.log(result.assets[0]);
    }
  };

  const handleCancelImage = (id) => {
    setImageList(imageList.filter((image, index) => index !== id));
  };

  const handleCreateThread = async (data) => {
    setIsLoading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        transformRequest: (data, headers) => {
          return formData; // this is doing the trick
        },
      };

      const formData = new FormData();

      const postCreateRequest = JSON.stringify({
        title: data.title,
        body: data.description,
        tagId: data.tag,
      });

      const fileUri = FileSystem.documentDirectory + "postCreateRequest.json";
      await FileSystem.writeAsStringAsync(fileUri, postCreateRequest);
      formData.append("postCreateRequest", {
        uri: fileUri,
        type: "application/json",
        name: "postCreateRequest.json",
      });
      imageList.forEach((image) => {
        const newImage = {
          uri: image.uri,
          type: "image/jpeg",
          name: image.fileName,
        };
        formData.append("pictures", newImage);
      });
      // formData.append("pictures", imageList);
      const response = await axiosInstance.post("/post", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      ToastAndroid.showWithGravityAndOffset(
        response.data.data.message,
        ToastAndroid.LONG,
        ToastAndroid.TOP,
        25,
        50,
      );

      navigation.navigate("Homes");
      setImageList([]);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Terjadi kesalahan, coba lagi";
      ToastAndroid.showWithGravityAndOffset(
        errorMessage,
        ToastAndroid.LONG,
        ToastAndroid.TOP,
        25,
        50,
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTagItems();
  }, []);

  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="flex-grow bg-[#1d232a]">
        <View
          className=" justify-center items-center pt-5"
          style={{ backgroundColor: "#1d232a" }}>
          <View className="flex-row items-center justify-center gap-2">
            <Ionicons name="document-text-outline" size={24} color="white" />
            <Text className="text-white text-lg font-bold">Buat Thread</Text>
          </View>
          <View className="bg-slate-600 my-2 w-11/12" style={{ height: 1 }} />
        </View>
        <View
          className="flex-1 pt-6 pl-6"
          style={{ backgroundColor: "#1d232a" }}>
          <Text className="text-white font-bold pb-3">Gambar</Text>
          <View
            className="p-2"
            style={{
              borderColor: "#374151",
              borderWidth: 4,
              borderStyle: "dotted",
              borderRadius: 10,
              alignSelf: "flex-start",
            }}>
            <TouchableOpacity
              style={styles.imageContainer}
              onPress={selectImage}>
              <Ionicons name="cloud-upload-outline" size={44} color="grey" />
            </TouchableOpacity>
          </View>
          <View className="flex-row flex-wrap pt-2 pr-10 gap-2 h-auto">
            {imageList.length > 0
              ? imageList.map((image, index) => (
                  <View key={index} style={styles.imageWrapper}>
                    <Image source={{ uri: image.uri }} style={styles.image} />
                    <TouchableOpacity
                      style={styles.cancelButton}
                      onPress={() => handleCancelImage(index)}>
                      <Text style={styles.cancelButtonText}>x</Text>
                    </TouchableOpacity>
                  </View>
                ))
              : ""}
          </View>
          <View>
            <Text className="text-white font-bold pt-2 pb-3">Judul</Text>
            <Controller
              control={control}
              name="title"
              rules={{
                required: "Judul tidak boleh kosong",
                minLength: {
                  value: 4,
                  message: "Judul minimal 4 karakter",
                },
                maxLength: {
                  value: 100,
                  message: "Judul maksimal 100 karakter",
                },
                validate: (value) => {
                  if (value.startsWith(" ")) {
                    return "Judul tidak boleh diawali dengan spasi";
                  }
                  return true;
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <View className="w-full">
                  <TextInput
                    className="bg-gray-700 my-2 p-3 w-5/6 text-lg text-white"
                    style={{
                      borderWidth: 1,
                      borderColor: "black",
                      borderRadius: 5,
                    }}
                    placeholder="Judul"
                    placeholderTextColor="#888"
                    keyboardType="default"
                    autoCapitalize="words"
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                  />
                  {errors.title && (
                    <Text className="text-red-500 justify-start">
                      {errors.title.message}
                    </Text>
                  )}
                </View>
              )}
            />
          </View>
          <View className="pb-3">
            <Text className="text-white font-bold pb-3">Tag</Text>
            <Controller
              name="tag"
              control={control}
              defaultValue={null}
              rules={{ required: "Tolong pilih salah satu" }}
              render={({ field: { onChange, onBlur, value } }) => (
                <RNPickerSelect
                  onValueChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  items={tagItems}
                  style={pickerSelectStyles}
                  placeholder={{ label: "Pilih Tag", value: null }}
                />
              )}
            />
            {errors.tag && (
              <Text style={styles.errorText}>{errors.tag.message}</Text>
            )}
          </View>
          <View>
            <Text className="text-white font-bold pb-3">Deskripsi</Text>
            <Controller
              control={control}
              name="description"
              rules={{}}
              render={({ field: { onChange, onBlur, value } }) => (
                <View className="w-full">
                  <TextInput
                    className="bg-gray-700 my-2 p-3 w-5/6 text-lg text-white"
                    style={{
                      borderWidth: 1,
                      borderColor: "black",
                      borderRadius: 5,
                      textAlignVertical: "top",
                    }}
                    placeholder="Deskripsi..."
                    multiline={true}
                    numberOfLines={5}
                    placeholderTextColor="#888"
                    keyboardType="default"
                    autoCapitalize="words"
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                  />
                  {errors.fullName && (
                    <Text className="text-red-500 justify-start">
                      {errors.fullName.message}
                    </Text>
                  )}
                </View>
              )}
            />
            <View className="py-3">
              <TouchableOpacity
                className="px-4 py-1"
                style={{
                  borderColor: "#dc2626",
                  borderWidth: 1,
                  borderRadius: 20,
                  alignSelf: "flex-start",
                }}
                onPress={handleSubmit(handleCreateThread)}>
                <Text className="text-red-600 font-bold">
                  {isLoading ? "Loading..." : "Buat"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  dropdownContainer: {
    marginBottom: 20,
  },
  dropdown: {
    height: 40,
    width: "83%",
    marginBottom: 20,
  },
  dropdownBase: {
    backgroundColor: "#374151",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 5,
  },
  dropdownMenu: {
    backgroundColor: "#374151",
  },
  dropdownDropDownContainer: {
    backgroundColor: "#374151",
  },
  imageContainer: {
    width: 200,
    height: 200,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#374151",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  imageWrapper: {
    marginTop: 10,
    position: "relative",
    width: 100,
    height: 100,
  },
  placeholder: {
    color: "#888",
    fontSize: 16,
  },
  cancelButton: {
    position: "absolute",
    top: 1,
    right: 1,
    backgroundColor: "rgba(52, 52, 52, 0.8)",
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  cancelButtonText: {
    color: "white",
    fontSize: 10,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    backgroundColor: "#374151",
    width: "83%",
    padding: 16,
    borderRadius: 5,
    color: "white",
  },
  inputAndroid: {
    backgroundColor: "#374151",
    width: "83%",
    padding: 16,
    borderRadius: 5,
    color: "white",
  },
  placeholder: {
    color: "#888",
  },
});

export default AddThreadScreen;
