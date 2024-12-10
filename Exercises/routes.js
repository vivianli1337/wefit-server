import express from "express";
import {
  getExercises,
  getExerciseById,
  getExercisesByBodyPart,
  fetchAndStoreExercises,
} from "./controller.js";

const router = express.Router();

// Routes
router.get("/", getExercises); // Fetch all exercises
router.get("/exercise/:id", getExerciseById); // Fetch exercise by ID
router.get("/bodyPart/:bodyPart", getExercisesByBodyPart); // Fetch exercises by body part
router.post("/sync", fetchAndStoreExercises); // Sync with ExerciseDB API

export default router;
