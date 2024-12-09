import express from "express";
import {
  createUser,
  getAllUsers,
  getUserById,
  searchUsersByPartialNameOrEmail,
  updateUser,
  deleteUser,
  login,
} from "./controller.js";

const router = express.Router();

router.post("/", createUser); // Create a new user
router.get("/", getAllUsers); // Get all users
router.get("/:id", getUserById); // Get a user by ID
router.get("/search/:query", searchUsersByPartialNameOrEmail); // Search users
router.put("/:id", updateUser); // Update a user
router.delete("/:id", deleteUser); // Delete a user
router.post("/login", login); // User login route

export default router;
