import * as PostDAO from "./dao.js";

// Create a new post
export const createPost = async (postData) => {
  return await PostDAO.createPost(postData);
};

// Get all posts
export const getAllPosts = async () => {
  return await PostDAO.getAllPosts();
};

// Get a post by ID
export const getPostById = async (postId) => {
  const post = await PostDAO.getPostById(postId);
  if (!post) {
    throw new Error("Post not found");
  }
  return post;
};

// Like a post
export const likePost = async (postId, userId) => {
  return await PostDAO.likePost(postId, userId);
};

// Dislike a post
export const dislikePost = async (postId, userId) => {
    return await PostDAO.dislikePost(postId, userId);
  };

  // Delete a post
export const deletePost = async (postId) => {
    return await PostDAO.deletePost(postId);
};