import express from "express";
import {
  createUser,
  getAllUsers,
  getUserById,
  searchUsersByPartialNameOrEmail,
  updateUser,
  deleteUser,
  login,
  getProfile,
  logout,
} from "./controller.js";

const router = express.Router();

router.post("/", createUser); // Create a new user
router.post("/signup", createUser); // Sign up a new user (Alias for createUser)
router.get("/", getAllUsers); // Get all users
router.get("/profile", getProfile); // Get user profile
router.get("/:id", getUserById); // Get a user by ID
router.get("/search/:query", searchUsersByPartialNameOrEmail); // Search users
router.put("/:id", updateUser); // Update a user
router.delete("/:id", deleteUser); // Delete a user
router.post("/login", login); // User login route
router.post("/logout", logout); // User logout route


export default router;
