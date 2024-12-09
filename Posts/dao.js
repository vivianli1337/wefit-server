import PostModel from "./model.js";

// Create a new post
export const createPost = async (postData) => {
  return await PostModel.create(postData);
};

// Get all posts
export const getAllPosts = async () => {
  return await PostModel.find().populate("author", "username");
};

// Get a post by ID
export const getPostById = async (postId) => {
  return await PostModel.findById(postId).populate("author", "username");
};

// Update likes
export const likePost = async (postId, userId) => {
  return await PostModel.findByIdAndUpdate(
    postId,
    {
      $addToSet: { likes: userId }, // Ensure no duplicates in the likes array
      $pull: { dislikes: userId }, // Remove user from dislikes if they previously disliked
    },
    { new: true }
  );
};

// Update dislikes
export const dislikePost = async (postId, userId) => {
  return await PostModel.findByIdAndUpdate(
    postId,
    {
      $addToSet: { dislikes: userId },
      $pull: { likes: userId },
    },
    { new: true }
  );
};

// Delete a post
export const deletePost = async (postId) => {
  return await PostModel.findByIdAndDelete(postId);
};
