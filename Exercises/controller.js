import * as ExerciseService from "./service.js";

export const getExercises = async (req, res) => {
  try {
    const exercises = await ExerciseService.getAllExercises();
    res.json(exercises);
  } catch (error) {
    console.error("Error fetching exercises:", error.message);
    res.status(500).json({ error: "Failed to fetch exercises" });
  }
};

export const getExerciseById = async (req, res) => {
  try {
    const exercise = await ExerciseService.findExerciseById(req.params.id);
    if (!exercise) {
      return res.status(404).json({ error: "Exercise not found" });
    }
    res.json(exercise);
  } catch (error) {
    console.error("Error fetching exercise by ID:", error.message);
    res.status(500).json({ error: "Failed to fetch exercise" });
  }
};

export const getExercisesByBodyPart = async (req, res) => {
  try {
    const exercises = await ExerciseService.findExercisesByBodyPart(req.params.bodyPart);
    if (!exercises.length) {
      return res.status(404).json({ error: "No exercises found for the given body part" });
    }
    res.json(exercises);
  } catch (error) {
    console.error("Error fetching exercises by body part:", error.message);
    res.status(500).json({ error: "Failed to fetch exercises by body part" });
  }
};

export const fetchAndStoreExercises = async (req, res) => {
  try {
    await ExerciseService.syncExercises();
    res.status(200).json({ message: "Exercises synchronized successfully" });
  } catch (error) {
    console.error("Error synchronizing exercises:", error.message);
    res.status(500).json({ error: "Failed to synchronize exercises" });
  }
};
