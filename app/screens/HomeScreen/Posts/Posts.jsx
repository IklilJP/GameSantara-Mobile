import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import axiosInstance from "../../../service/axios";
import CardPost from "../../../components/CardPost";

const Posts = (props) => {
  const [threadList, setThreadList] = useState([]);

  const getPostData = async () => {
    try {
      const response = await axiosInstance.get("/post", {
        page: 1,
        size: 10,
        q: props?.tags,
      });

      setThreadList(response.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getPostData();
  }, []);

  return (
    <View className="bg-black h-full flex-1">
      <View className="flex-1">
        <FlatList
          data={threadList}
          renderItem={({ item }) => (
            <CardPost item={item} setThreadList={setThreadList} />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Posts;
