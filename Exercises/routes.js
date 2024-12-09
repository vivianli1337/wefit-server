import express from "express";
import { getExercises, fetchAndStoreExercises } from "./controller.js";

const router = express.Router();

router.get("/", getExercises); // Get all exercises
router.post("/sync", fetchAndStoreExercises); // Sync with ExerciseDB API

export default router;
