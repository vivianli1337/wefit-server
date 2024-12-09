import express from "express";
import {
  createProgram,
  getPrograms,
  getProgramById,
  updateProgram,
  deleteProgram,
  addExerciseToProgram,
} from "./controller.js";

const router = express.Router();

router.post("/", createProgram); // Create a new program
router.get("/", getPrograms); // Get all programs
router.get("/:id", getProgramById); // Get a program by ID
router.put("/:id", updateProgram); // Update a program
router.delete("/:id", deleteProgram); // Delete a program
router.put("/:programId/exercises", addExerciseToProgram); // Add an exercise to a program with external API


export default router;
