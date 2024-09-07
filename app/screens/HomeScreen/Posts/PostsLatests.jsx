import { Avatar, Card } from "@rneui/themed";
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

const PostsLatests = (props) => {
  const [threadListLatest, setThreadListLatest] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const getPostData = async (page = 1) => {
    try {
      if (page === 1) setLoading(true);
      else setLoadingMore(true);

      const response = await axiosInstance.get("/post", {
        params: {
          page: page,
          size: 10,
          q: props?.tags,
          by: "latest",
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
      console.log(error.message);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const loadMorePosts = () => {
    if (!loadingMore && hasMore) {
      console.log("Loading more posts...");
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    getPostData(currentPage);
  }, [currentPage]);

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
          ListFooterComponent={() =>
            loadingMore ? (
              <ActivityIndicator size="large" color="white" />
            ) : null
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default PostsLatests;
