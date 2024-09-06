import axiosInstance from "./axios";

export const getComment = async (postId, setComments) => {
  try {
    const response = await axiosInstance.get(
      `/comment?postId=${postId}&size=100`,
    );

    setComments(response.data.data || []);
  } catch (error) {
    console.log(error);
  }
};
