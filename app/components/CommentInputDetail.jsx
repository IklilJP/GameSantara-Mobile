import { View, Text, TouchableOpacity, TextInput } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React, { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { sendComment } from "../service/commentService";

const CommentInputDetail = ({
  threadDetail,
  isComment,
  setIsComment,
  setComments,
}) => {
  const [contentComment, setContentComment] = useState("");
  const textInputRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const userLogin = useSelector(
    (state) => state.loggedInUser.loggedInUser.data,
  );

  const handleSendComment = () => {
    if (!contentComment.trim()) {
      console.log("Tolong isi komen");
      return;
    }

    sendComment(threadDetail.id, contentComment, null, setComments, userLogin);

    setContentComment("");
    setIsComment(false);
  };

  useEffect(() => {
    textInputRef.current?.focus();
  }, [isComment]);

  return (
    <View className="px-4">
      {!isComment ? (
        <TouchableOpacity
          className="flex-row justify-center items-center border border-colorBorder rounded-3xl py-2"
          onPress={() => setIsComment(true)}>
          <MaterialIcons name="add" size={24} color="#a6adbb" />
          <Text className="text-white font-bold">Tambah Komentar</Text>
        </TouchableOpacity>
      ) : (
        <View
          className={`p-2 rounded-xl border ${isFocused ? "border-[#fff]" : "border-colorBorder"}`}>
          <TextInput
            multiline={true}
            numberOfLines={10}
            onChangeText={(e) => setContentComment(e.trim())}
            value={contentComment}
            ref={textInputRef}
            className="text-[#fff]"
            style={{ height: 100, textAlignVertical: "top" }}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          <View className="flex-row justify-end mt-3 gap-2">
            <TouchableOpacity
              className="py-1 px-2 rounded-lg bg-red-600"
              onPress={() => setIsComment(false)}>
              <Text className="text-[#fff]">Batal</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-blue-600 py-1 px-2 rounded-lg"
              onPress={handleSendComment}>
              <Text className="text-[#fff]">Kirim</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default CommentInputDetail;
