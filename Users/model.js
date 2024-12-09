import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
    },
    role: {
      type: String,
      enum: ["TRAINER", "TRAINEE"],
      required: true,
    },
    bio: {
      type: String,
      default: "",
    },
    createdPrograms: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Program" },
    ],
    enrolledPrograms: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Program" },
    ],
  },
  {
    collection: "users",
    timestamps: true,
  }
);

const UserModel = mongoose.model("User", userSchema);
export default UserModel;
