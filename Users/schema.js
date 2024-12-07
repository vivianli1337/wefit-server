import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    bio: String,
    role: {
      type: String,
      enum: ["TRAINER", "TRAINEE"],
      required: true,
    },
    certifications: {
      type: [String], // Array of strings for Trainer certifications
      required: function () {
        return this.role === "TRAINER";
      },
    },
    fitnessGoals: {
      type: [String], // Array of strings for Trainee goals
      required: function () {
        return this.role === "TRAINEE";
      },
    },
  },
  { collection: "users", timestamps: true }
);

export default mongoose.model("User", userSchema);
