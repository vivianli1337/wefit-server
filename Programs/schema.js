import mongoose from "mongoose";

const programSchema = new mongoose.Schema(
  {
    programId: { type: String, required: true, unique: true },
    programName: { type: String, required: true },
    programCreator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // References the Trainer user
      required: true,
    },
    numberOfWeeks: { type: Number, required: true },
    programData: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Workout", // References the Workout schema
      },
    ],
  },
  { collection: "programs", timestamps: true }
);

export default mongoose.model("Program", programSchema);
