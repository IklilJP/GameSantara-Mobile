import { Avatar } from "@rneui/themed";
import React, { useEffect, useState } from "react";
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
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import axiosInstance from "../../../service/axios";
import { useSelector } from "react-redux";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const Profile = ({ userId }) => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [userDetail, setUserDetail] = useState({});
  const { height } = Dimensions.get("window");
  const userLogin = useSelector(
    (state) => state.loggedInUser.loggedInUser.data,
  );

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const handleEditPage = () => {
    setModalVisible(false);
    navigation.navigate("EditProfile");
  };

  const fetchUserData = async () => {
    try {
      const response = await axiosInstance.get(`/user/${userId}`);
      setUserDetail(response.data.data);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchUserData();
    }, [userLogin.id]),
  );

  const defaultProfile = {
    fullName: "user",
    username: "user",
    bio: "Tidak ada Bio",
    profilePicture: {
      image:
        "https://res.cloudinary.com/dpofjmzdu/image/upload/v1724926159/assets/pp-notfound.jpg",
    },
  };

  const profile = {
    fullName: userDetail?.fullName || defaultProfile.fullName,
    username: userDetail?.username || defaultProfile.username,
    bio: userDetail?.bio || defaultProfile.bio,
    profilePicture: userDetail?.profilePicture || defaultProfile.profilePicture,
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <View style={styles.profileInfo}>
          <Avatar
            size={110}
            rounded
            source={{ uri: profile.profilePicture.image }}
          />
          <View className="flex-col items-center justify-center pt-5 gap-4 flex-1">
            <View style={styles.statsContainer}>
              <View style={styles.stat}>
                <Text style={styles.statValue}>{userDetail?.postsCount}</Text>
                <Text style={styles.statLabel}>thread</Text>
              </View>
              <View style={styles.stat}>
                <Text style={styles.statValue}>{userDetail?.upVotesCount}</Text>
                <Text style={styles.statLabel}>upvote</Text>
              </View>
            </View>
            {userId === userDetail.id && (
              <View className="flex-1 w-full justify-center items-center">
                <TouchableOpacity style={styles.menuButton} onPress={openModal}>
                  <FontAwesome name="edit" size={15} color={"white"} />
                  <Text className="text-white text-xs text-center">
                    Edit Profile
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
        <View style={styles.profileDetails}>
          <Text style={styles.profileName}>{profile.fullName}</Text>
          <Text style={styles.profileUsername}>@{profile.username}</Text>
          <Text style={styles.profileBio}>{profile.bio}</Text>
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
              <View style={styles.modalDivider} />
              <TouchableOpacity
                style={styles.modalOption}
                onPress={handleEditPage}>
                <Ionicons name="pencil-outline" size={24} color="white" />
                <Text style={styles.modalOptionText}>Edit Profile</Text>
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
    backgroundColor: "black",
  },
  profileHeader: {
    padding: 20,
    backgroundColor: "#1d232a",
    marginVertical: 1,
  },
  profileInfo: {
    gap: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  stat: {
    flex: 1,
    // alignItems: "center",
  },
  statValue: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  statLabel: {
    textAlign: "center",
    color: "white",
  },
  menuButton: {
    // width: "50%",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "white",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 20,
    gap: 10,
    // flex: 1,
  },
  profileDetails: {
    paddingTop: 10,
  },
  profileName: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  profileUsername: {
    color: "white",
  },
  profileBio: {
    color: "white",
    paddingTop: 10,
  },
  modalBackdrop: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
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
  modalDivider: {
    width: "100%",
    backgroundColor: "#6b7280",
    height: 1,
    marginVertical: 10,
  },
  modalOption: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  modalOptionText: {
    paddingLeft: 10,
    color: "white",
  },
});

export default Profile;
