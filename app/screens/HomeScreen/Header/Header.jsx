import React, { useState } from "react";
import {
  StyleSheet,
  Image,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Button,
  Dimensions,
  TouchableWithoutFeedback,
  TextInput,
  ImageBackground,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import "react-native-gesture-handler";
import { Card } from "@rneui/themed";

const Header = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalLoginVisible, setModalLoginVisible] = useState(false);
  const [modalRegisterVisible, setModalRegisterVisible] = useState(false);
  const { height } = Dimensions.get("window");

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

  return (
    <View
      className="w-full h-[7%] justify-center"
      style={{ backgroundColor: "#1d232a" }}
    >
      <View className="flex-row items-center pl-2">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
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
        onRequestClose={closeModal}
      >
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.modalBackdrop}>
            <View style={[styles.modalContainer, { height: height / 3 }]}>
              <Text style={styles.modalTitle}>Pilihan Menu</Text>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={openModalLogin}
              >
                <View className="flex-row items-center">
                  <Ionicons name="log-in" size={24} color="white" />
                  <Text className="pl-5" style={styles.menuText}>
                    Daftar atau Login
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => alert("Option 2")}
              >
                <Text style={styles.menuText}>Option 2</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalLoginVisible}
        onRequestClose={closeModalLogin}
      >
        <ImageBackground
          className="flex-1 justify-center"
          source={{
            uri: "https://img.freepik.com/premium-photo/cyberpunk-gaming-controller-gamepad-joystick-illustration_691560-5812.jpg",
          }}
        >
          <View
            className="flex-1 mx-8 my-20"
            style={{ backgroundColor: "#1d232a" }}
          >
            <View className="flex-row p-5">
              <TouchableOpacity onPress={closeModalLogin}>
                <Ionicons name="close" size={30} color="grey" />
              </TouchableOpacity>
            </View>
            <View className="items-center">
              <Image
                source={{
                  uri: "https://res.cloudinary.com/dtmtphyux/image/upload/v1724742013/gamesantara-logo.png",
                }}
                width={350}
                height={150}
              />
            </View>
            <View
              className="flex-1 items-center p-10"
              style={{
                backgroundColor: "#1d232a",
              }}
            >
              <Text className="font-extrabold text-red-600 mb-5 text-3xl">
                Log in
              </Text>
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
              />
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
              />
              <TouchableOpacity
                className="my-2 p-4 w-[100%] text-lg items-center"
                style={{
                  backgroundColor: "#dc2626",
                  borderRadius: 5,
                }}
              >
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
                    }}
                  >
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
        onRequestClose={closeModalRegister}
      >
        <ImageBackground
          className="flex-1 justify-center"
          source={{
            uri: "https://img.freepik.com/premium-photo/cyberpunk-gaming-controller-gamepad-joystick-illustration_691560-5800.jpg",
          }}
        >
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
                }}
              >
                <Text className="font-extrabold text-red-600 mb-5 text-3xl">
                  Daftar
                </Text>
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
                />
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
                />
                <TextInput
                  className="bg-black my-2 p-3 w-[100%] text-lg text-white"
                  style={{
                    borderWidth: 1,
                    borderColor: "#ddd",
                    borderRadius: 5,
                  }}
                  placeholder="Email"
                  placeholderTextColor="#888"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                <TextInput
                  className="bg-black my-2 p-3 w-[100%] text-lg text-white"
                  style={{
                    borderWidth: 1,
                    borderColor: "#ddd",
                    borderRadius: 5,
                  }}
                  placeholder="Kata Sandi"
                  placeholderTextColor="#888"
                  secureTextEntry
                />
                <TextInput
                  className="bg-black my-2 p-3 w-[100%] text-lg text-white"
                  style={{
                    borderWidth: 1,
                    borderColor: "#ddd",
                    borderRadius: 5,
                  }}
                  placeholder="Konfirmasi Kata Sandi"
                  placeholderTextColor="#888"
                  secureTextEntry
                />
                <TouchableOpacity
                  className="my-2 p-4 w-[100%] text-lg items-center"
                  style={{
                    backgroundColor: "#dc2626",
                    borderRadius: 5,
                  }}
                >
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
                      }}
                    >
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
    alignItems: "center",
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
