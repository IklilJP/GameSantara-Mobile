import React from "react";
import { View } from "react-native";

const LeftBorder = ({ level }) => {
  return (
    <View
      style={{
        width: 20,
        marginLeft: level * 10, // Indent based on the level of nesting
        borderLeftWidth: 2,
        borderColor: "#4B5563",
        alignItems: "center",
        paddingVertical: 10,
      }}>
      <View
        style={{
          height: 10, // Distance between each nested comment
          width: 2,
          backgroundColor: "#4B5563",
        }}
      />
    </View>
  );
};

export default LeftBorder;
