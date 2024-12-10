import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as UserDAO from "./dao.js";

const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

// Create a new user
export const createUser = async (userData) => {
  const hashedPassword = await bcrypt.hash(userData.password, SALT_ROUNDS); // Hash password
  return await UserDAO.createUser({ ...userData, password: hashedPassword });
};

// Get all users
export const getAllUsers = async () => {
  return await UserDAO.findAllUsers();
};

// Get a user by ID
export const getUserById = async (userId) => {
  const user = await UserDAO.findUserById(userId);
  if (!user) {
    throw new Error("User not found");
  }
  return user;
};

// Authenticate a user and generate a JWT
export const authenticateUser = async (username, password) => {
  const user = await UserDAO.findUserByUsername(username);
  if (!user) {
    throw new Error("Invalid username or password");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid username or password");
  }

  const token = jwt.sign(
    {
      userId: user._id,
      username: user.username,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: "15m" }
  );

  const { password: _, ...userWithoutPassword } = user.toObject();
  return { token, user: userWithoutPassword };
};

// Verify a JWT token
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
};

// Get users by role
export const getUsersByRole = async (role) => {
  return await UserDAO.findUsersByRole(role);
};

// Search users by partial name or email
export const searchUsersByPartialNameOrEmail = async (query) => {
  return await UserDAO.findUsersByPartialNameOrEmail(query);
};

// Update user data
export const updateUser = async (userId, userData) => {
  const existingUser = await UserDAO.findUserById(userId);
  if (!existingUser) {
    throw new Error("User not found");
  }

  // Hash the password if it's being updated
  if (userData.password) {
    userData.password = await bcrypt.hash(userData.password, SALT_ROUNDS);
  }

  return await UserDAO.updateUser(userId, userData);
};

// Delete a user
export const deleteUser = async (userId) => {
  const existingUser = await UserDAO.findUserById(userId);
  if (!existingUser) {
    throw new Error("User not found");
  }
  return await UserDAO.deleteUser(userId);
};

// Fetch the current user's profile using the decoded token
export const getProfile = async (decodedToken) => {
  const user = await UserDAO.findUserById(decodedToken.userId);
  if (!user) {
    throw new Error("User not found");
  }
  return user;
};

// Invalidate a session or clear user-related state
export const logoutUser = async () => {
  // Any additional logic for logout can be added here in the future
  return { message: "User logged out successfully" };
};

