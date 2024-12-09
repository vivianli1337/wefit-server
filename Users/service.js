import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as UserDAO from "./dao.js";

const SALT_ROUNDS = 10;

// Secret key for JWT (move this to .env in a production environment)
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
  return await UserDAO.findUserById(userId);
};

// Authenticate a user
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
      { expiresIn: "1h" }
    );
  
    // Exclude the password from the user object
    const { password: _, ...userWithoutPassword } = user.toObject();
  
    return { token, user: userWithoutPassword };
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
  return await UserDAO.updateUser(userId, userData);
};

// Delete a user
export const deleteUser = async (userId) => {
  return await UserDAO.deleteUser(userId);
};
