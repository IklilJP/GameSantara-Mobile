import { Avatar, Card } from "@rneui/themed";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import axiosInstance from "../../../service/axios";
import CardPost from "../../../components/CardPost";

const PostByUser = ({ userId }) => {
  const [threadListLatest, setThreadListLatest] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [refreshing, setRefreshing] = useState(false); // Added state for refreshing

  const getPostData = async (page = 1) => {
    if (!hasMore) return;
    try {
      if (page === 1) {
        setLoading(true);
        setRefreshing(false);
      } else {
        setLoadingMore(true);
      }

      const response = await axiosInstance.get("/post", {
        params: {
          page: page,
          size: 10,
          by: "user-target",
          userId: userId,
        },
      });

      console.log("Fetched data:", response.data);

      const newPosts = response.data.data;
      const paging = response.data.paging;
      console.log(paging);
      console.log(newPosts);

      setThreadListLatest((prevPosts) =>
        page === 1 ? newPosts : [...prevPosts, ...newPosts],
      );

      setHasMore(paging.hasNext);
    } catch (error) {
      if (error.response.status === 404) {
        setHasMore(false);
      } else {
        console.log(error);
      }
    } finally {
      setLoading(false);
    }
  };

  const loadMorePosts = () => {
    if (!loadingMore && hasMore) {
      console.log("Loading more posts...");
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setCurrentPage(1); // Reset to page 1 to fetch latest data
  };

  useEffect(() => {
    getPostData(currentPage);
  }, [currentPage]);

  useEffect(() => {
    if (!refreshing) return;
    getPostData(currentPage);
  }, [refreshing]);

  if (loading && currentPage === 1) {
    return <ActivityIndicator size="large" color="white" />;
  }

  return (
    <View className="bg-black h-full flex-1">
      <View className="flex-1">
        <FlatList
          data={threadListLatest}
          renderItem={({ item }) => (
            <CardPost item={item} setThreadList={setThreadListLatest} />
          )}
          keyExtractor={(item) => item.id}
          onEndReached={loadMorePosts}
          onEndReachedThreshold={0.5}
          refreshing={refreshing}
          onRefresh={handleRefresh}
          ListFooterComponent={() => (
            <>
              {loadingMore && (
                <ActivityIndicator size="large" color="#ffffff" />
              )}
              {!hasMore && (
                <View style={{ alignItems: "center", marginTop: 20 }}>
                  <MaterialIcons name="scuba-diving" size={24} color="red" />
                  <Text className="text-center text-white">
                    Kamu menyelam terlalu dalam. Sudah tidak ada thread lagi
                  </Text>
                </View>
              )}
            </>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default PostByUser;
