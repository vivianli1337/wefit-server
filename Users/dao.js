import UserModel from "./model.js";

// Create a new user
export const createUser = (user) => {
  delete user._id;
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
export const findUserByCredentials = async (username, password) => {
  const user = await UserModel.findOne({ username });
  if (!user) return null;

  // Validate password (assuming passwords are hashed)
  const isValid = await bcrypt.compare(password, user.password);
  return isValid ? user : null;
};

// Find users by role
export const findUsersByRole = (role) => UserModel.find({ role });

// Search users by partial name or email
export const findUsersByPartialNameOrEmail = (partialName) => {
  const regex = new RegExp(partialName, "i"); // Case-insensitive regex
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
