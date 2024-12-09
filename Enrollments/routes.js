import express from "express";
import {
  createEnrollment,
  getAllEnrollments,
  getEnrollmentsByUser,
  getEnrollmentsByProgram,
  updateEnrollmentStatus,
  deleteEnrollment,
  markExerciseAsCompleted,
  getMostRecentCompletedExercise,
} from "./controller.js";

const router = express.Router();

// Define routes
router.post("/", createEnrollment); // Create a new enrollment
router.get("/", getAllEnrollments); // Get all enrollments
router.get("/user/:userId", getEnrollmentsByUser); // Get enrollments by user
router.get("/program/:programId", getEnrollmentsByProgram); // Get enrollments by program
router.put("/:enrollmentId", updateEnrollmentStatus); // Update an enrollment status
router.delete("/:enrollmentId", deleteEnrollment); // Delete an enrollment
router.put("/:enrollmentId/exercises/completed", markExerciseAsCompleted);
router.get("/:enrollmentId/exercises/most-recent", getMostRecentCompletedExercise);


export default router;
