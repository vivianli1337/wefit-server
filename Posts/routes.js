import express from "express";
import {
  createPost,
  getAllPosts,
  getPostById,
  likePost,
  dislikePost,
  deletePost,
} from "./controller.js";

const router = express.Router();

router.post("/", createPost); // Create a new post
router.get("/", getAllPosts); // Get all posts
router.get("/:postId", getPostById); // Get a single post by ID
router.put("/:postId/like", likePost); // Like a post
router.put("/:postId/dislike", dislikePost); // Dislike a post
router.delete("/:postId", deletePost); // Delete a post

export default router;
