import mongoose from "mongoose";

const workoutSchema = new mongoose.Schema(
  {
    workoutId: { type: String, required: true, unique: true },
    workoutName: { type: String, required: true },
    muscleGroup: { type: String, required: true },
    intensityLevel: { type: String, required: true },
    equipmentNeeded: { type: String, required: true },
    setsAndReps: { type: String, required: true }, // E.g., "3x10"
    restIntervals: { type: String }, // E.g., "60 seconds"
    exerciseDescription: { type: String },
    videoDemoUrl: { type: String }, // Link to a video demonstration
  },
  { collection: "workouts", timestamps: true }
);

export default mongoose.model("Workout", workoutSchema);
