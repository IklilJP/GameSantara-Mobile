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

export const sendComment = async (
  postId,
  content,
  parentCommentId,
  setComments,
  userLogin,
) => {
  try {
    const response = await axiosInstance.post("/comment", {
      postId: postId,
      content: content,
      parentCommentId: parentCommentId,
    });

    console.log(response.data.status === 201);

    if (response.data.status === 201) {
      const newComment = {
        id: response.data.data.id,
        content: content,
        postId: postId,
        parentCommentId: parentCommentId,
        createdAt: new Date().toISOString(),
        username: userLogin.username,
        profileImageUrl: userLogin.profilePicture.image || null,
        upVotesCount: 0,
        downVotesCount: 0,
        isUpVoted: false,
        isDownVoted: false,
      };

      setComments((prevComments) => {
        console.log("Updated Comments: ", [newComment, ...prevComments]);
        return [newComment, ...prevComments];
      });
    } else {
      console.log(response.data);
    }
  } catch (error) {
    console.log(error);
  }
};
