import React, { useEffect, useState, useRef } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ActivityIndicator,
} from "react-native";
import { Avatar, Card } from "@rneui/themed";
import Ionicons from "@expo/vector-icons/Ionicons";
import axiosInstance from "../../../service/axios";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const PostsByUser = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isClamped, setIsClamped] = useState(false);
  const bodyRef = useRef(null);

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get("/post", {
        params: {
          page: 1,
          size: 10,
          by: "user",
        },
      });
      setPosts(response.data.data);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    const element = bodyRef.current;
    if (element) {
      const originalHeight = element.scrollHeight;
      const clampedHeight = element.clientHeight;
      setIsClamped(clampedHeight < originalHeight);
    }
  }, [posts]);

  const formatTimeAgo = (timestamp) => {
    const now = Date.now();
    const postDate = new Date(parseInt(timestamp)).getTime();
    const secondsAgo = Math.floor((now - postDate) / 1000);

    if (secondsAgo < 60) {
      return `${secondsAgo} detik yang lalu`;
    } else if (secondsAgo < 3600) {
      return `${Math.floor(secondsAgo / 60)} menit yang lalu`;
    } else if (secondsAgo < 86400) {
      return `${Math.floor(secondsAgo / 3600)} jam yang lalu`;
    } else {
      return `${Math.floor(secondsAgo / 86400)} hari yang lalu`;
    }
  };

  const handleUpVote = async (post) => {
    try {
      const response = await axiosInstance.post(
        `/vote-posts/${post.id}/up-vote`,
      );
      if (response.status === 200) {
        setPosts((prevPosts) =>
          prevPosts.map((p) =>
            p.id === post.id
              ? {
                  ...p,
                  upVotesCount: post.isUpVoted
                    ? p.upVotesCount - 1
                    : p.upVotesCount + 1,
                  isUpVoted: !post.isUpVoted,
                  downVotesCount: post.isDownVoted
                    ? p.downVotesCount - 1
                    : p.downVotesCount,
                  isDownVoted: false,
                }
              : p,
          ),
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDownVote = async (post) => {
    try {
      const response = await axiosInstance.post(
        `/vote-posts/${post.id}/down-vote`,
      );
      if (response.status === 200) {
        setPosts((prevPosts) =>
          prevPosts.map((p) =>
            p.id === post.id
              ? {
                  ...p,
                  downVotesCount: post.isDownVoted
                    ? p.downVotesCount - 1
                    : p.downVotesCount + 1,
                  isDownVoted: !post.isDownVoted,
                  upVotesCount: post.isUpVoted
                    ? p.upVotesCount - 1
                    : p.upVotesCount,
                  isUpVoted: false,
                }
              : p,
          ),
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.content}>
          {posts.length === 0 ? (
            <Text style={styles.noPostsText}>Anda belum membuat post</Text>
          ) : (
            posts.map((post) => (
              <Card key={post.id} containerStyle={styles.cardContainer}>
                <View style={styles.header}>
                  <Avatar
                    size={32}
                    rounded
                    source={{
                      uri:
                        post.profilePictureUrl ||
                        "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg",
                    }}
                  />
                  <View
                    style={styles.headerText}
                    className="justify-center pl-2">
                    <View style={styles.headerInfo}>
                      <Text style={styles.username}>{post.user}</Text>
                      <Text style={styles.dot}>•</Text>
                      <Text style={styles.category}>{post.tagName}</Text>
                    </View>
                    <Text style={styles.timeAgo}>
                      {formatTimeAgo(post.createAt)}
                    </Text>
                  </View>
                </View>
                <View style={styles.body}>
                  <Text style={styles.title}>{post.title}</Text>
                  <View style={styles.descriptionContainer}>
                    <Text
                      ref={bodyRef}
                      style={styles.description}
                      numberOfLines={3}>
                      {post.body}
                    </Text>
                    {isClamped && (
                      <Text style={styles.readMore}>Lihat selengkapnya...</Text>
                    )}
                  </View>
                  <View style={styles.imagesContainer}>
                    {post.pictures?.map((image, index) => (
                      <Image
                        key={index}
                        source={{ uri: image.imageUrl }}
                        style={styles.image}
                      />
                    ))}
                  </View>
                </View>
                <View style={styles.footer}>
                  <TouchableOpacity
                    style={styles.iconButton}
                    onPress={() => handleUpVote(post)}>
                    <MaterialCommunityIcons
                      name={
                        post.isUpVoted
                          ? "arrow-up-bold"
                          : "arrow-up-bold-outline"
                      }
                      size={24}
                      color={post.isUpVoted ? "tomato" : "white"}
                    />
                    <Text
                      style={
                        post.isUpVoted
                          ? styles.voteCountActive
                          : styles.voteCount
                      }>
                      {post.upVotesCount}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.iconButton}
                    onPress={() => handleDownVote(post)}>
                    <MaterialCommunityIcons
                      name={
                        post.isDownVoted
                          ? "arrow-down-bold"
                          : "arrow-down-bold-outline"
                      }
                      size={24}
                      color={post.isDownVoted ? "tomato" : "white"}
                    />
                    <Text
                      style={
                        post.isDownVoted
                          ? styles.voteCountActive
                          : styles.voteCount
                      }>
                      {post.downVotesCount}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.iconButton}>
                    <Ionicons name="chatbox-outline" size={22} color="white" />
                    <Text style={styles.commentCount}>
                      {post.commentsCount}
                    </Text>
                  </TouchableOpacity>
                </View>
              </Card>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex: 1,
  },
  content: {
    flex: 1,
  },
  cardContainer: {
    width: "100%",
    marginHorizontal: 0,
    backgroundColor: "#1d232a",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerText: {
    flexDirection: "col",
    flex: 1,
    paddingLeft: 10,
  },
  headerInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  username: {
    color: "white",
    fontWeight: "bold",
  },
  dot: {
    color: "white",
    fontWeight: "bold",
    paddingHorizontal: 5,
  },
  category: {
    color: "red",
    fontWeight: "bold",
  },
  timeAgo: {
    color: "white",
    fontSize: 12,
  },
  body: {
    paddingTop: 10,
  },
  title: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  descriptionContainer: {
    position: "relative",
  },
  description: {
    color: "white",
    fontSize: 14,
    fontWeight: "300",
  },
  readMore: {
    position: "absolute",
    bottom: 0,
    right: 0,
    color: "blue",
    backgroundColor: "#1d232a",
  },
  imagesContainer: {
    marginTop: 10,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 10,
  },
  iconButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
  },
  voteCount: {
    color: "white",
    paddingHorizontal: 5,
  },
  voteCountActive: {
    color: "red",
    paddingHorizontal: 5,
  },
  commentCount: {
    color: "white",
    paddingHorizontal: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  noPostsText: {
    color: "white",
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
  },
});

export default PostsByUser;
