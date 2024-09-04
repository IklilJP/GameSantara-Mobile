import { Avatar } from "@rneui/themed";
import React, { useState } from "react";
import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
const Profile = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const { height } = Dimensions.get("window");
  const openModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };
  const handleEditPage = () => {
    setModalVisible(false);
    navigation.navigate("EditProfile");
  };
  return (
    <View className="bg-black">
      <View
        className="p-5"
        style={{ backgroundColor: "#1d232a", marginVertical: 1 }}
      >
        <View>
          <View className="flex-row">
            <View className="mr-10">
              <Avatar
                size={110}
                rounded
                source={{
                  uri: "https://randomuser.me/api/portraits/men/36.jpg",
                }}
              />
            </View>
            <View className="flex-row gap-5 w-3/6">
              <View className="items-center justify-center">
                <Text className="text-white font-bold text-lg">212</Text>
                <Text className="text-white">pos</Text>
              </View>
              <View className="items-center justify-center">
                <Text className="text-white font-bold text-lg">111</Text>
                <Text className="text-white">reputasi</Text>
              </View>
              <View className="items-center justify-center">
                <Text className="text-white font-bold text-lg">99</Text>
                <Text className="text-white">award</Text>
              </View>
            </View>
            <View className="flex-1 items-end">
              <TouchableOpacity onPress={openModal}>
                <Ionicons name="ellipsis-horizontal" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </View>
          <View className="pt-2">
            <Text className="text-white font-bold text-lg">
              Donquixote Setotose
            </Text>
            <Text className="text-white">@setoyws</Text>
          </View>
          <View className="pt-5">
            <Text className="text-white">Tidak ada Bio</Text>
          </View>
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
            <View style={[styles.modalContainer, { height: height / 4 }]}>
              <Text style={styles.modalTitle}>Pilihan Menu</Text>
              <View
                className="w-full bg-slate-600 my-2"
                style={{ height: 1 }}
              />
              <TouchableOpacity className="p-2" onPress={handleEditPage}>
                <View className="flex-row items-center">
                  <Ionicons name="pencil-outline" size={24} color="white" />
                  <Text className="pl-5 text-white">Edit Profile</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
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

export default Profile;
