import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // References the User schema
      required: true,
    },
    likes: {
      type: [mongoose.Schema.Types.ObjectId], // Array of User IDs who liked the post
      default: [],
    },
    dislikes: {
      type: [mongoose.Schema.Types.ObjectId], // Array of User IDs who disliked the post
      default: [],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: "posts", timestamps: true }
);

export default mongoose.model("Post", postSchema);
