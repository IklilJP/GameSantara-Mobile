import React, { useState } from "react";
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
import * as ImagePicker from "expo-image-picker";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Button } from "react-native";
import axiosInstance from "../../service/axios";
import { Controller, useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";

const EditProfileScreen = () => {
  const navigation = useNavigation();
  const [imageUri, setImageUri] = useState(null);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const selectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setImageUri(uri);
      //   uploadImage(uri);
    }
  };

  const handleCancelImage = () => {
    setImageUri(null);
  };

  const uploadImage = async (uri) => {
    const formData = new FormData();
    formData.append("photo", {
      uri,
      type: "image/jpeg",
      name: "photo.jpg",
    });

    try {
      const response = await axiosInstance.post(
        "https://your-server.com/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Upload successful", response.data);
    } catch (error) {
      console.error("Upload failed", error);
    }
  };
  return (
    <SafeAreaView className="flex-1 bg-black">
      <ScrollView
        className="flex-1 bg-black"
        showsVerticalScrollIndicator={false}
      >
        <View className="px-5 pt-4" style={{ backgroundColor: "#1d232a" }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={28} color="white" />
          </TouchableOpacity>
        </View>
        <View
          className=" justify-center items-center"
          style={{ backgroundColor: "#1d232a" }}
        >
          <View className="flex-row items-center justify-center gap-2">
            <Ionicons name="build-outline" size={24} color="white" />
            <Text className="text-white text-lg font-bold">Edit Profil</Text>
          </View>
          <View className="bg-slate-600 my-2 w-11/12" style={{ height: 1 }} />
        </View>
        <View
          className="flex-1 pt-6 pl-6"
          style={{ backgroundColor: "#1d232a" }}
        >
          <Text className="text-white font-bold pb-3">Foto Profil</Text>
          <View
            className="p-2"
            style={{
              borderColor: "#374151",
              borderWidth: 4,
              borderStyle: "dotted",
              borderRadius: 10,
              alignSelf: "flex-start",
            }}
          >
            <TouchableOpacity
              style={styles.imageContainer}
              onPress={selectImage}
            >
              {imageUri !== null ? (
                <View style={styles.imageWrapper}>
                  <Image source={{ uri: imageUri }} style={styles.image} />
                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={handleCancelImage}
                  >
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <Ionicons name="cloud-upload-outline" size={44} color="grey" />
              )}
            </TouchableOpacity>
          </View>
          <View className="py-3">
            <TouchableOpacity
              className="px-4 py-1"
              style={{
                borderColor: "#dc2626",
                borderWidth: 1,
                borderRadius: 20,
                alignSelf: "flex-start",
              }}
            >
              <Text className="text-red-600 font-bold">Ganti</Text>
            </TouchableOpacity>
          </View>

          <View className="bg-slate-600 my-2 w-11/12" style={{ height: 1 }} />
          <View>
            <Text className="text-white font-bold pb-3">Username</Text>
            <Controller
              control={control}
              name="username"
              rules={{
                required: "Username tidak boleh kosong",
                minLength: {
                  value: 4,
                  message: "Username minimal 4 karakter",
                },
                maxLength: {
                  value: 20,
                  message: "Username maksimal 20 karakter",
                },
                validate: (value) => {
                  if (value.startsWith(" ")) {
                    return "Username tidak boleh diawali dengan spasi";
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
                    placeholder="Username"
                    placeholderTextColor="#888"
                    keyboardType="default"
                    autoCapitalize="words"
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                  />
                  {errors.username && (
                    <Text className="text-red-500 justify-start">
                      {errors.username.message}
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
              >
                <Text className="text-red-600 font-bold">Ganti</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View className="bg-slate-600 my-2 w-11/12" style={{ height: 1 }} />
          <View>
            <Text className="text-white font-bold pb-3">Fullname</Text>
            <Controller
              control={control}
              name="fullName"
              rules={{
                required: "FullName tidak boleh kosong",
                minLength: {
                  value: 4,
                  message: "FullName minimal 4 karakter",
                },
                maxLength: {
                  value: 35,
                  message: "FullName maksimal 35 karakter",
                },
                validate: (value) => {
                  if (value.startsWith(" ")) {
                    return "FullName tidak boleh diawali dengan spasi";
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
                    placeholder="Nama Lengkap"
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
              >
                <Text className="text-red-600 font-bold">Ganti</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View className="bg-slate-600 my-2 w-11/12" style={{ height: 1 }} />
          <View>
            <Text className="text-white font-bold pb-3">Bio</Text>
            <Controller
              control={control}
              name="bio"
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
                    placeholder="Bio..."
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
              >
                <Text className="text-red-600 font-bold">Ganti</Text>
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
    position: "relative",
    width: "100%",
    height: "100%",
  },
  placeholder: {
    color: "#888",
    fontSize: 16,
  },
  cancelButton: {
    position: "absolute",
    bottom: 10,
    left: 10,
    backgroundColor: "gray",
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  cancelButtonText: {
    color: "white",
    fontSize: 14,
  },
});

export default EditProfileScreen;
