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
          by:"user",
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
    const now = new Date();
    const postDate = new Date(timestamp * 1000);
    const diffInSeconds = Math.floor((now - postDate) / 1000);

    const intervals = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60,
      second: 1,
    };

    for (const [unit, value] of Object.entries(intervals)) {
      const interval = Math.floor(diffInSeconds / value);
      if (interval >= 1) {
        return `${interval} ${unit}${interval > 1 ? 's' : ''} ago`;
      }
    }
    return "just now";
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
          {posts.map((post) => (
            <Card key={post.id} containerStyle={styles.cardContainer}>
              <View style={styles.header}>
                <Avatar
                  size={32}
                  rounded
                  source={{
                    uri: post.profilePictureUrl || "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg",
                  }}
                />
                <View style={styles.headerText}>
                  <View style={styles.headerInfo}>
                    <Text style={styles.username}>{post.user}</Text>
                    <Text style={styles.dot}>•</Text>
                    <Text style={styles.category}>{post.tagName}</Text>
                  </View>
                  <Text style={styles.timeAgo}>
                    {formatTimeAgo(post.createdAt)}
                  </Text>
                </View>
              </View>
              <View style={styles.body}>
                <Text style={styles.title}>{post.title}</Text>
                <View style={styles.descriptionContainer}>
                  <Text ref={bodyRef} style={styles.description} numberOfLines={3}>
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
                <TouchableOpacity style={styles.iconButton}>
                  <Ionicons name="caret-up" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.voteCount}>{post.upvotes}</Text>
                <TouchableOpacity style={styles.iconButton}>
                  <Ionicons name="caret-down" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton}>
                  <Ionicons name="chatbox" size={22} color="white" />
                </TouchableOpacity>
                <Text style={styles.commentCount}>{post.commentsCount}</Text>
              </View>
            </Card>
          ))}
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
    padding: 5,
  },
  voteCount: {
    color: "white",
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
});

export default PostsByUser;