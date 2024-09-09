import React from "react";
import { TouchableOpacity, Share } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const ShareButton = ({ contentToShare }) => {
  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: contentToShare,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log("Shared with activity type:", result.activityType);
        } else {
          console.log("Content shared successfully");
        }
      } else if (result.action === Share.dismissedAction) {
        console.log("Share dismissed");
      }
    } catch (error) {
      console.error("Error sharing content:", error);
    }
  };

  return (
    <TouchableOpacity
      className="p-1 items-center flex-row"
      onPress={handleShare}>
      <MaterialCommunityIcons
        name="share-outline"
        size={24}
        color={"#a6adbb"}
      />
    </TouchableOpacity>
  );
};

export default ShareButton;
