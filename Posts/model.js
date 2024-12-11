import mongoose from "mongoose";
import schema from "./schema.js";

const PostModel = mongoose.model("Post", schema);
export default PostModel;
