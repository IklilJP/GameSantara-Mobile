import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Image,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Dimensions,
  TouchableWithoutFeedback,
  TextInput,
  ImageBackground,
  ScrollView,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import "react-native-gesture-handler";
import { useForm, Controller } from "react-hook-form";
import axiosInstance from "../../../service/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalLoginVisible, setModalLoginVisible] = useState(false);
  const [modalRegisterVisible, setModalRegisterVisible] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.loggedInUser);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { height } = Dimensions.get("window");

  const checkLoginUser = async () => {
    try {
      const loggedInUser = await AsyncStorage.getItem("loggedInUser");
      const responseUserDetail = await axiosInstance.get("/user");
      if (loggedInUser) {
        dispatch({
          type: "LOGIN",
          payload: responseUserDetail.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkLoginUser();
  }, []);

  const openModal = () => {
    setModalVisible(true);
  };

  const openModalLogin = () => {
    setModalVisible(false);
    setModalRegisterVisible(false);
    setTimeout(() => {
      setModalLoginVisible(true);
    }, 150);
  };

  const openModalRegister = () => {
    setModalLoginVisible(false);
    setTimeout(() => {
      setModalRegisterVisible(true);
    }, 150);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const closeModalLogin = () => {
    setModalLoginVisible(false);
  };

  const closeModalRegister = () => {
    setModalRegisterVisible(false);
  };

  const handleSubmitLogin = async (data) => {
    try {
      const response = await axiosInstance.post("/auth/login", {
        email: data.email,
        password: data.password,
      });
      await AsyncStorage.setItem("loggedInUser", JSON.stringify(response.data));

      const responseUserDetail = await axiosInstance.get("/user");
      console.log("response User Detail", responseUserDetail.data);

      dispatch({
        type: "LOGIN",
        payload: responseUserDetail.data,
      });
      setModalLoginVisible(false);
    } catch (error) {
      Toast.show({
        type: "error",
        position: "top",
        text1: "Kredensial Salah",
        text2: "Email/Password salah",
        visibilityTime: 4000,
        autoHide: true,
        topOffset: 50,
        bottomOffset: 40,
      });
    }
  };

  const handleLogOut = async () => {
    dispatch({
      type: "LOGOUT",
    });
    await AsyncStorage.removeItem("loggedInUser");
    checkLoginUser();
    setModalVisible(false);
    setModalLoginVisible(true);
  };

  const handleSubmitRegister = async (data) => {
    try {
      const response = await axiosInstance.post("/auth/register/user", {
        username: data.username,
        password: data.password,
        fullName: data.fullName,
        email: data.email,
      });
    } catch (error) {}
  };

  return (
    <View
      className="w-full h-[7%] justify-center"
      style={{ backgroundColor: "#1d232a" }}>
      <View className="flex-row items-center pl-2">
        <View className="flex-row items-center">
          <TouchableOpacity
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
            <Ionicons name="menu" size={26} color="white" />
          </TouchableOpacity>
          <Image
            source={{
              uri: "https://res.cloudinary.com/dtmtphyux/image/upload/v1724742013/gamesantara-logo.png",
            }}
            style={{ width: 140, height: 80 }}
          />
        </View>
        <View className="flex-row w-[55%] justify-end items-end gap-2">
          <Ionicons name="search" size={26} color="white" />
          <TouchableOpacity onPress={openModal}>
            <Ionicons name="person-circle" size={26} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}>
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.modalBackdrop}>
            <View style={[styles.modalContainer, { height: height / 4 }]}>
              <Text style={styles.modalTitle}>Pilihan Menu</Text>
              <View
                className="w-full bg-slate-600 my-2"
                style={{ height: 1 }}
              />
              {!user.loggedInUser.data ? (
                <TouchableOpacity className="p-2" onPress={openModalLogin}>
                  <View className="flex-row items-center">
                    <Ionicons
                      name="lock-open-outline"
                      size={24}
                      color="#57b9ff"
                    />
                    <Text className="pl-5" style={{ color: "#57b9ff" }}>
                      Login
                    </Text>
                  </View>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity className="p-2" onPress={handleLogOut}>
                  <View className="flex-row items-center">
                    <Ionicons
                      name="log-out-outline"
                      size={24}
                      color="#dc2626"
                    />
                    <Text className="pl-5" style={{ color: "#dc2626" }}>
                      Logout
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
              <View
                className="w-full bg-slate-600 my-2"
                style={{ height: 1 }}
              />
              <TouchableOpacity
                className="p-2"
                onPress={() => alert("Option 2")}>
                <View className="flex-row items-center">
                  <Ionicons name="settings-outline" size={24} color="white" />
                  <Text className="pl-5 text-white">Pengaturan</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalLoginVisible}
        onRequestClose={closeModalLogin}>
        <ImageBackground
          className="flex-1 justify-center"
          source={{
            uri: "https://img.freepik.com/premium-photo/cyberpunk-gaming-controller-gamepad-joystick-illustration_691560-5812.jpg",
          }}>
          <View
            className="flex-1 mx-8 my-20"
            style={{ backgroundColor: "#1d232a" }}>
            <View className="flex-row p-5">
              <TouchableOpacity onPress={closeModalLogin}>
                <Ionicons name="close" size={30} color="grey" />
              </TouchableOpacity>
            </View>
            <View className="items-center"></View>
            <View
              className="flex-1 items-center p-10 justify-center"
              style={{
                backgroundColor: "#1d232a",
              }}>
              <Text className="font-extrabold text-red-600 mb-5 text-3xl">
                Log in
              </Text>
              <Controller
                control={control}
                name="email"
                rules={{
                  required: "Email harus terisi",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Format email tidak valid",
                  },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <View className="w-full">
                    <TextInput
                      className="bg-black my-2 p-4 w-[100%] text-lg text-white"
                      style={{
                        borderWidth: 1,
                        borderColor: "#ddd",
                        borderRadius: 5,
                      }}
                      placeholder="Email"
                      placeholderTextColor="#888"
                      keyboardType="email-address"
                      autoCapitalize="none"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                    {errors.email && (
                      <Text className="text-red-500 justify-start">
                        {errors.email.message}
                      </Text>
                    )}
                  </View>
                )}
              />
              <Controller
                control={control}
                name="password"
                rules={{
                  required: "Password harus terisi",
                  minLength: {
                    value: 8,
                    message: "Password minimal 8 karakter",
                  },
                  maxLength: {
                    value: 20,
                    message: "Password maksimal 20 karakter",
                  },
                  validate: (value) => {
                    if (value.startsWith(" ")) {
                      return "Password tidak boleh diawali dengan spasi";
                    }
                    return true;
                  },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <View className="w-full">
                    <TextInput
                      className="bg-black my-2 p-4 w-[100%] text-lg text-white"
                      style={{
                        borderWidth: 1,
                        borderColor: "#ddd",
                        borderRadius: 5,
                      }}
                      placeholder="Kata Sandi"
                      placeholderTextColor="#888"
                      secureTextEntry
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                    {errors.password && (
                      <Text className="text-red-500 justify-start">
                        {errors.password.message}
                      </Text>
                    )}
                  </View>
                )}
              />
              <TouchableOpacity
                className="my-2 p-4 w-[100%] text-lg items-center"
                style={{
                  backgroundColor: "#dc2626",
                  borderRadius: 5,
                }}
                onPress={handleSubmit(handleSubmitLogin)}>
                <Text className="text-white text-lg font-bold">Login</Text>
              </TouchableOpacity>
              <View className="mt-5 items-center">
                <Text className="text-base text-slate-500">
                  Belum punya akun?
                </Text>
                <TouchableOpacity onPress={openModalRegister}>
                  <Text
                    className="text-base font-bold mt-1"
                    style={{
                      color: "#dc2626",
                    }}>
                    Daftar
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ImageBackground>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalRegisterVisible}
        onRequestClose={closeModalRegister}>
        <ImageBackground
          className="flex-1 justify-center"
          source={{
            uri: "https://img.freepik.com/premium-photo/cyberpunk-gaming-controller-gamepad-joystick-illustration_691560-5800.jpg",
          }}>
          <ScrollView className="flex-1 mx-8 my-20">
            <View className="flex-1" style={{ backgroundColor: "#1d232a" }}>
              <View className="flex-row p-5">
                <TouchableOpacity onPress={closeModalRegister}>
                  <Ionicons name="close" size={30} color="grey" />
                </TouchableOpacity>
              </View>
              <View
                className="flex-1 items-center px-10"
                style={{
                  backgroundColor: "#1d232a",
                }}>
                <Text className="font-extrabold text-red-600 mb-5 text-3xl">
                  Daftar
                </Text>
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
                        className="bg-black my-2 p-3 w-[100%] text-lg text-white"
                        style={{
                          borderWidth: 1,
                          borderColor: "#ddd",
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
                        className="bg-black my-2 p-3 w-[100%] text-lg text-white"
                        style={{
                          borderWidth: 1,
                          borderColor: "#ddd",
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
                <Controller
                  control={control}
                  name="email"
                  rules={{
                    required: "Email harus terisi",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Format email tidak valid",
                    },
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <View className="w-full">
                      <TextInput
                        className="bg-black my-2 p-4 w-[100%] text-lg text-white"
                        style={{
                          borderWidth: 1,
                          borderColor: "#ddd",
                          borderRadius: 5,
                        }}
                        placeholder="Email"
                        placeholderTextColor="#888"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                      {errors.email && (
                        <Text className="text-red-500 justify-start">
                          {errors.email.message}
                        </Text>
                      )}
                    </View>
                  )}
                />
                <Controller
                  control={control}
                  name="password"
                  rules={{
                    required: "Password harus terisi",
                    minLength: {
                      value: 8,
                      message: "Password minimal 8 karakter",
                    },
                    maxLength: {
                      value: 20,
                      message: "Password maksimal 20 karakter",
                    },
                    validate: (value) => {
                      if (value.startsWith(" ")) {
                        return "Password tidak boleh diawali dengan spasi";
                      }
                      return true;
                    },
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <View className="w-full">
                      <TextInput
                        className="bg-black my-2 p-4 w-[100%] text-lg text-white"
                        style={{
                          borderWidth: 1,
                          borderColor: "#ddd",
                          borderRadius: 5,
                        }}
                        placeholder="Kata Sandi"
                        placeholderTextColor="#888"
                        secureTextEntry
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                      {errors.password && (
                        <Text className="text-red-500 justify-start">
                          {errors.password.message}
                        </Text>
                      )}
                    </View>
                  )}
                />
                <Controller
                  control={control}
                  name="confirmedPassword"
                  rules={{
                    required: "Konfirmasi kata sandi harus terisi",
                    validate: (value, allValues) => {
                      if (value.startsWith(" ")) {
                        return "Konfirmasi kata sandi tidak boleh diawali dengan spasi";
                      }
                      if (value !== allValues.password) {
                        return "Konfirmasi kata sandi tidak cocok";
                      }
                      return true;
                    },
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <View className="w-full">
                      <TextInput
                        className="bg-black my-2 p-4 w-[100%] text-lg text-white"
                        style={{
                          borderWidth: 1,
                          borderColor: "#ddd",
                          borderRadius: 5,
                        }}
                        placeholder="Kata Sandi"
                        placeholderTextColor="#888"
                        secureTextEntry
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                      {errors.confirmedPassword && (
                        <Text className="text-red-500 justify-start">
                          {errors.confirmedPassword.message}
                        </Text>
                      )}
                    </View>
                  )}
                />
                <TouchableOpacity
                  className="my-2 p-4 w-[100%] text-lg items-center"
                  style={{
                    backgroundColor: "#dc2626",
                    borderRadius: 5,
                  }}
                  onPress={handleSubmit(handleSubmitRegister)}>
                  <Text className="text-white text-lg font-bold">Daftar</Text>
                </TouchableOpacity>
                <View className="mt-1 mb-5 items-center">
                  <Text className="text-base text-slate-500">
                    Sudah punya akun?
                  </Text>
                  <TouchableOpacity onPress={openModalLogin}>
                    <Text
                      className="text-base font-bold mt-1"
                      style={{
                        color: "#dc2626",
                      }}>
                      Login
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
        </ImageBackground>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  profileButton: {
    marginBottom: 20,
  },
  modalBackdrop: {
    flex: 1,
    justifyContent: "flex-end", // Align modal container to the bottom
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark overlay
  },
  modalContainer: {
    width: "100%",
    backgroundColor: "#1d232a",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: "white",
  },
  menuItem: {
    paddingVertical: 15,
    width: "100%",
    alignItems: "center",
  },
  menuText: {
    fontSize: 22,
    color: "white",
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "tomato",
    borderRadius: 5,
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default Header;
