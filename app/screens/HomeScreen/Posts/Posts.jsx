import React, { useEffect, useState } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import {
  FlatList,
  View,
  Text,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import axiosInstance from "../../../service/axios";
import CardPost from "../../../components/CardPost";

const Posts = (props) => {
  const [threadList, setThreadList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const getPostData = async (page = 1) => {
    if (!hasMore && page !== 1) return;

    try {
      if (page === 1) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }

      const response = await axiosInstance.get("/post", {
        params: {
          page: page,
          size: 10,
          by: props?.id ? "tag" : null,
          tagId: props?.id,
        },
      });

      const newPosts = response.data.data;
      const paging = response.data.paging;

      setThreadList((prevPosts) =>
        page === 1 ? newPosts : [...prevPosts, ...newPosts],
      );

      setHasMore(paging.hasNext);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setHasMore(false);
      } else {
        console.log(error);
      }
    } finally {
      setLoading(false);
      setLoadingMore(false);
      setRefreshing(false);
    }
  };

  const loadMorePosts = () => {
    if (!loadingMore && hasMore) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    setCurrentPage(1);
    getPostData(1);
  };

  useEffect(() => {
    getPostData(currentPage);
  }, [currentPage]);

  if (loading && currentPage === 1) {
    return <ActivityIndicator size="large" color="white" />;
  }

  return (
    <View className="bg-black h-full flex-1">
      <FlatList
        data={threadList}
        renderItem={({ item }) => (
          <CardPost item={item} setThreadList={setThreadList} />
        )}
        keyExtractor={(item) => item.id}
        onEndReached={loadMorePosts}
        onEndReachedThreshold={0.5}
        ListFooterComponent={() => (
          <>
            {loadingMore ? (
              <ActivityIndicator size="large" color="white" />
            ) : null}
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
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["white"]}
          />
        }
      />
    </View>
  );
};

export default Posts;
