// import UserModel from "./model.js";


// // Create a new user
// export const createUser = (user) => {
//   delete user._id; // Ensure no `_id` conflicts
//   return UserModel.create(user); // Save to MongoDB
// };

// // Find all users
// export const findAllUsers = () => UserModel.find();

// // Find a user by ID
// export const findUserById = (userId) => UserModel.findById(userId);

// // Find a user by username
// export const findUserByUsername = (username) =>
//   UserModel.findOne({ username });

// // Find a user by credentials
// export const findUserByCredentials = (username, password) => model.findOne({ username, password });

// // Find users by role
// export const findUsersByRole = (role) => UserModel.find({ role });

// // Search users by partial name or email
// export const findUsersByPartialNameOrEmail = (partialName) => {
//   const regex = new RegExp(partialName, "i"); // Case-insensitive regex
//   return UserModel.find({
//     $or: [
//       { firstName: { $regex: regex } },
//       { lastName: { $regex: regex } },
//       { email: { $regex: regex } },
//     ],
//   });
// };

// // Update a user's data
// export const updateUser = (userId, user) =>
//   UserModel.updateOne({ _id: userId }, { $set: user });

// // Delete a user
// export const deleteUser = (userId) => UserModel.deleteOne({ _id: userId });

import UserModel from "./model.js";

// Create a new user
export const createUser = (user) => {
  delete user._id; // Ensure no `_id` conflicts
  return UserModel.create(user);
};

// Find all users
export const findAllUsers = () => UserModel.find();

// Find a user by ID
export const findUserById = (userId) => UserModel.findById(userId);

// Find a user by username
export const findUserByUsername = (username) =>
  UserModel.findOne({ username });

// Find a user by credentials
export const findUserByCredentials = (username, password) =>
  UserModel.findOne({ username, password });

// Find users by role
export const findUsersByRole = (role) => UserModel.find({ role });

// Search users by partial name or email
export const findUsersByPartialNameOrEmail = (partialName) => {
  const regex = new RegExp(partialName, "i");
  return UserModel.find({
    $or: [
      { firstName: { $regex: regex } },
      { lastName: { $regex: regex } },
      { email: { $regex: regex } },
    ],
  });
};

// Update a user's data
export const updateUser = (userId, user) =>
  UserModel.updateOne({ _id: userId }, { $set: user });

// Delete a user
export const deleteUser = (userId) => UserModel.deleteOne({ _id: userId });
