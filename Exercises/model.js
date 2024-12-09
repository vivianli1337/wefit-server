import mongoose from "mongoose";

const exerciseSchema = new mongoose.Schema(
  {
    exerciseId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    target: String,
    equipment: String,
    gifUrl: String,
  },
  { collection: "exercises", timestamps: true }
);

const ExerciseModel = mongoose.model("Exercise", exerciseSchema);
export default ExerciseModel;
