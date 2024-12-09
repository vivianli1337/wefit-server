import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema(
  {
    program: { type: mongoose.Schema.Types.ObjectId, ref: "Program", required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    status: {
      type: String,
      enum: ["ENROLLED", "COMPLETED", "CANCELLED"],
      default: "ENROLLED",
    },
    progress: { type: Number, default: 0 },
    completedExercises: [
      {
        exerciseId: String,
        completedAt: { type: Date, default: Date.now },
      },
    ],
    enrollmentDate: { type: Date, default: Date.now },
  },
  { collection: "enrollments", timestamps: true }
);

const EnrollmentModel = mongoose.model("Enrollment", enrollmentSchema);
export default EnrollmentModel;
