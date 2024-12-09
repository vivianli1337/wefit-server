import mongoose from "mongoose";

const programSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    trainer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Trainer who created the program
    exercises: [
      {
        exerciseId: String, // Unique ID from the exercises collection
        name: String, // Name of the exercise
        target: String, // Targeted muscle group
        equipment: String, // Equipment required
        gifUrl: String, // URL of the exercise GIF
        sets: Number, // Number of sets
        reps: Number, // Number of repetitions
      }
    ],
    duration: Number, // Program duration in minutes
    difficulty: { type: String, enum: ["Beginner", "Intermediate", "Advanced"], default: "Beginner" },
  },
  { collection: "programs", timestamps: true } // Automatically adds createdAt and updatedAt
);

const ProgramModel = mongoose.model("Program", programSchema);
export default ProgramModel;
