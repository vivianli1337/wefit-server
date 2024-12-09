import * as PostService from "./service.js";
import jwt from "jsonwebtoken";


// Create a new post
export const createPost = async (req, res) => {
  try {
    // Extract user info from token (in controller-based approach)
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) throw new Error("Unauthorized: No token provided");

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your_jwt_secret");
    const post = await PostService.createPost({ ...req.body, author: decoded.userId });

    res.status(201).json(post);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

// Get all posts
export const getAllPosts = async (req, res) => {
  try {
    const posts = await PostService.getAllPosts();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single post by ID
export const getPostById = async (req, res) => {
  try {
    const post = await PostService.getPostById(req.params.postId);
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ error: "Post not found" });
  }
};

// Like a post
export const likePost = async (req, res) => {
  try {
    // Extract user info from token
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) throw new Error("Unauthorized: No token provided");

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your_jwt_secret");
    const updatedPost = await PostService.likePost(req.params.postId, decoded.userId);

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

// Dislike a post
export const dislikePost = async (req, res) => {
  try {
    // Extract user info from token
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) throw new Error("Unauthorized: No token provided");

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your_jwt_secret");
    const updatedPost = await PostService.dislikePost(req.params.postId, decoded.userId);

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

export const deletePost = async (req, res) => {
    try {
      // Extract and verify the JWT token
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) throw new Error("Unauthorized: No token provided");
  
      const decoded = jwt.verify(token, process.env.JWT_SECRET || "your_jwt_secret");
      console.log("Decoded User ID:", decoded.userId); // Debug log
  
      // Fetch the post
      const post = await PostService.getPostById(req.params.postId);
      if (!post) throw new Error("Post not found");
  
      console.log("Post Author ID:", post.author._id.toString()); // Debug log
  
      // Check if the requesting user is the author
      if (post.author._id.toString() !== decoded.userId) {
        throw new Error("Unauthorized: You can only delete your own posts");
      }
  
      // Proceed with deletion
      await PostService.deletePost(req.params.postId);
      res.status(204).send();
    } catch (error) {
      console.error(error.message); // Log error
      res.status(401).json({ error: error.message });
    }
  };
  
  
  
