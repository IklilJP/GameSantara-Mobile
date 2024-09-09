import { ToastAndroid } from "react-native";
import axiosInstance from "./axios";

// vote Detail Post
export const upVoteThread = async (threadId, setThreadDetail) => {
  setThreadDetail((prevDetail) => ({
    ...prevDetail,
    upVotesCount: prevDetail.isUpVoted
      ? prevDetail.upVotesCount - 1
      : prevDetail.upVotesCount + 1,
    isUpVoted: !prevDetail.isUpVoted,
    downVotesCount: prevDetail.isDownVoted
      ? prevDetail.downVotesCount - 1
      : prevDetail.downVotesCount,
    isDownVoted: false,
  }));

  try {
    const response = await axiosInstance.post(
      `/vote-posts/${threadId}/up-vote`,
    );
    if (response.status !== 200) {
      setThreadDetail((prevDetail) => ({
        ...prevDetail,
        upVotesCount: prevDetail.isUpVoted
          ? prevDetail.upVotesCount - 1
          : prevDetail.upVotesCount + 1,
        isUpVoted: !prevDetail.isUpVoted,
        downVotesCount: prevDetail.isDownVoted
          ? prevDetail.downVotesCount + 1
          : prevDetail.downVotesCount,
        isDownVoted: false,
      }));
    }
  } catch (error) {
    console.error("Error while upvoting:", error);
    setThreadDetail((prevDetail) => ({
      ...prevDetail,
      upVotesCount: prevDetail.isUpVoted
        ? prevDetail.upVotesCount - 1
        : prevDetail.upVotesCount + 1,
      isUpVoted: !prevDetail.isUpVoted,
      downVotesCount: prevDetail.isDownVoted
        ? prevDetail.downVotesCount + 1
        : prevDetail.downVotesCount,
      isDownVoted: false,
    }));
  }
};

export const downVoteThread = async (threadId, setThreadDetail) => {
  setThreadDetail((prevDetail) => ({
    ...prevDetail,
    downVotesCount: prevDetail.isDownVoted
      ? prevDetail.downVotesCount - 1
      : prevDetail.downVotesCount + 1,
    isDownVoted: !prevDetail.isDownVoted,
    upVotesCount: prevDetail.isUpVoted
      ? prevDetail.upVotesCount - 1
      : prevDetail.upVotesCount,
    isUpVoted: false,
  }));

  try {
    const response = await axiosInstance.post(
      `/vote-posts/${threadId}/down-vote`,
    );
    if (response.status !== 200) {
      setThreadDetail((prevDetail) => ({
        ...prevDetail,
        downVotesCount: prevDetail.isDownVoted
          ? prevDetail.downVotesCount - 1
          : prevDetail.downVotesCount + 1,
        isDownVoted: !prevDetail.isDownVoted,
        upVotesCount: prevDetail.isUpVoted
          ? prevDetail.upVotesCount + 1
          : prevDetail.upVotesCount,
        isUpVoted: false,
      }));
    }
  } catch (error) {
    console.error("Error while downvoting:", error);
    setThreadDetail((prevDetail) => ({
      ...prevDetail,
      downVotesCount: prevDetail.isDownVoted
        ? prevDetail.downVotesCount - 1
        : prevDetail.downVotesCount + 1,
      isDownVoted: !prevDetail.isDownVoted,
      upVotesCount: prevDetail.isUpVoted
        ? prevDetail.upVotesCount + 1
        : prevDetail.upVotesCount,
      isUpVoted: false,
    }));
  }
};

// vote Card Post
export const handleUpVote = async (thread, setThreadList, userLogin) => {
  if (!userLogin) {
    ToastAndroid.showWithGravityAndOffset(
      "Harap Login Terlebih dahulu",
      ToastAndroid.LONG,
      ToastAndroid.TOP,
      25,
      50,
    );
    return;
  }

  setThreadList((prevPosts) =>
    prevPosts.map((post) =>
      post.id === thread.id
        ? {
            ...post,
            upVotesCount: thread.isUpVoted
              ? post.upVotesCount - 1
              : post.upVotesCount + 1,
            isUpVoted: !thread.isUpVoted,
            downVotesCount: thread.isDownVoted
              ? post.downVotesCount - 1
              : post.downVotesCount,
            isDownVoted: false,
          }
        : post,
    ),
  );

  try {
    const response = await axiosInstance.post(
      `/vote-posts/${thread.id}/up-vote`,
    );
    if (response.status !== 200) {
      console.log("error down vote");
    }
  } catch (error) {
    console.error(error.message);
  }
};

export const handleDownVote = async (thread, setThreadList, userLogin) => {
  if (!userLogin) {
    ToastAndroid.showWithGravityAndOffset(
      "Harap Login Terlebih dahulu",
      ToastAndroid.LONG,
      ToastAndroid.TOP,
      25,
      50,
    );
    return;
  }

  setThreadList((prevPosts) =>
    prevPosts.map((post) =>
      post.id === thread.id
        ? {
            ...post,
            downVotesCount: thread.isDownVoted
              ? post.downVotesCount - 1
              : post.downVotesCount + 1,
            isDownVoted: !thread.isDownVoted,
            upVotesCount: thread.isUpVoted
              ? post.upVotesCount - 1
              : post.upVotesCount,
            isUpVoted: false,
          }
        : post,
    ),
  );

  try {
    const response = await axiosInstance.post(
      `/vote-posts/${thread.id}/down-vote`,
    );
    if (response.status !== 200) {
      console.log("error down vote");
    }
  } catch (error) {
    console.error(error.message);
  }
};
