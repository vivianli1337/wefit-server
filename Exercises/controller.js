import * as ExerciseService from "./service.js";

export const getExercises = async (req, res) => {
  try {
    const exercises = await ExerciseService.getAllExercises();
    res.json(exercises);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch exercises" });
  }
};

export const fetchAndStoreExercises = async (req, res) => {
  try {
    await ExerciseService.syncExercises();
    res.status(200).json({ message: "Exercises synchronized successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to synchronize exercises" });
  }
};
