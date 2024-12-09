import mongoose from "mongoose";

const programSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  trainer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  exercises: [
    {
      exerciseId: String,
      name: String,
      target: String,
      equipment: String,
      gifUrl: String,
      sets: Number,
      reps: Number,
    },
  ],
  duration: Number,
  difficulty: { type: String, enum: ["Beginner", "Intermediate", "Advanced"] },
}, { collection: "programs", timestamps: true });

const ProgramModel = mongoose.models.Program || mongoose.model("Program", programSchema);
export default ProgramModel;
