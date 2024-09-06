import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { getComment } from "../service/commentService";
import { formatTime } from "../service/formatTime";
import { Avatar } from "@rneui/themed";

const CardComment = ({ postId, comments = [], setComments }) => {
  const [isComment, setIsComment] = useState({});
  const [contentComment, setContentComment] = useState("");
  const [openComment, setOpenComment] = useState({});

  useEffect(() => {
    getComment(postId, setComments);
  }, [postId, setComments]);

  const handleUpvote = async (commentId, isUpVoted, isDownVoted) => {
    try {
      await upvoteComment(
        setComments,
        commentId,
        isUpVoted,
        isDownVoted,
        userLogin,
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleDownvote = async (commentId, isUpVoted, isDownVoted) => {
    try {
      await downvoteComment(
        setComments,
        commentId,
        isUpVoted,
        isDownVoted,
        userLogin,
      );
    } catch (err) {
      console.log(err);
    }
  };

  const getChildComments = (parentId) => {
    return comments.filter((comment) => comment.parentCommentId === parentId);
  };

  const renderComments = (commentsList, level = 1) => {
    return commentsList.map((comment) => (
      <View
        key={comment.id}
        style={{ marginLeft: level * 20 }}
        className="border-l border-l-colorBorder rounded-xl mt-5">
        <View className="flex-row">
          <Avatar
            source={{
              uri:
                comment.profileImageUrl ||
                "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg",
            }}
            rounded
            style={styles.profileImage}
          />
          <View className="flex-row gap-2">
            <Text className="font-bold text-white">{comment.username}</Text>
            <Text className="font-bold text-white">&bull;</Text>
            <Text className="text-white">
              {formatTime(new Date(comment?.createdAt))}
            </Text>
          </View>
        </View>

        <View className="ml-3">
          <Text className="text-[#fff] my-3" style={{ fontSize: 16 }}>
            {comment.content}
          </Text>

          <View className="flex-row gap-2 items-center">
            <TouchableOpacity
              className="flex-row"
              onPress={() =>
                handleUpvote(comment.id, comment.isUpVoted, comment.isDownVoted)
              }>
              <MaterialCommunityIcons
                name={
                  comment.isUpVoted ? "arrow-up-bold" : "arrow-up-bold-outline"
                }
                size={20}
                color={comment.isUpVoted ? "#16a34a" : "#a6adbb"}
              />
              <Text style={styles.voteCount}>{comment.upVotesCount}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="flex-row"
              onPress={() =>
                handleDownvote(
                  comment.id,
                  comment.isUpVoted,
                  comment.isDownVoted,
                )
              }>
              <MaterialCommunityIcons
                name={
                  comment.isDownVoted
                    ? "arrow-down-bold"
                    : "arrow-down-bold-outline"
                }
                size={20}
                color={comment.isDownVoted ? "#dc2626" : "#a6adbb"}
              />
            </TouchableOpacity>

            <TouchableOpacity
              className="flex-row gap-1 items-center"
              onPress={() =>
                setIsComment((prevState) => ({
                  ...prevState,
                  [comment.id]: !prevState[comment.id],
                }))
              }>
              <Icon name="chatbox-outline" size={20} color="#a6adbb" />
              <Text className="text-[#a6adbb]">Reply</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                setOpenComment((prevState) => ({
                  ...prevState,
                  [comment.id]: !prevState[comment.id],
                }))
              }>
              <Icon
                name={openComment[comment.id] ? "chevron-up" : "chevron-down"}
                size={20}
                color="#a6adbb"
              />
            </TouchableOpacity>
          </View>
        </View>

        {isComment[comment.id] && (
          <View style={styles.replyContainer}>
            <TextInput
              value={contentComment}
              onChangeText={setContentComment}
              placeholder="Type your reply"
              style={styles.textInput}
              placeholderTextColor="gray"
            />
            <View style={styles.replyButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() =>
                  setIsComment((prevState) => ({
                    ...prevState,
                    [comment.id]: false,
                  }))
                }>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.sendButton}
                onPress={() => {
                  sendCommentChild(
                    postId,
                    comment.id,
                    contentComment,
                    setComments,
                    userLogin,
                  );
                  setIsComment((prevState) => ({
                    ...prevState,
                    [comment.id]: false,
                  }));
                }}>
                <Text style={styles.buttonText}>Send</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {openComment[comment.id] &&
          renderComments(getChildComments(comment.id), level + 1)}
      </View>
    ));
  };

  const parentComments = comments.filter((comment) => !comment.parentCommentId);

  return <View>{renderComments(parentComments)}</View>;
};

const styles = StyleSheet.create({
  commentContainer: {
    borderLeftWidth: 1,
    borderRadius: 20,
    borderColor: "gray",
    paddingLeft: 10,
    paddingBottom: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  timestamp: {
    fontSize: 12,
    color: "gray",
  },
  commentText: {
    color: "white",
    marginTop: 5,
  },
  commentActions: {
    flexDirection: "row",
    marginTop: 5,
    alignItems: "center",
  },
  voteCount: {
    color: "white",
    marginLeft: 5,
  },
  replyText: {
    color: "white",
    marginLeft: 5,
  },
  replyContainer: {
    marginTop: 10,
    backgroundColor: "#333",
    padding: 10,
    borderRadius: 5,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 5,
    color: "white",
  },
  replyButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
  },
  cancelButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  sendButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
  },
});

export default CardComment;
