import axios from "axios";
import * as ExerciseDAO from "./dao.js";

const EXERCISE_API_URL = "https://exercisedb-api.vercel.app/exercises";

export const syncExercises = async () => {
  try {
    const response = await axios.get(EXERCISE_API_URL);
    const exercises = response.data;

    for (const exercise of exercises) {
      const existing = await ExerciseDAO.findExerciseById(exercise.id);
      if (!existing) {
        await ExerciseDAO.addExercise({
          exerciseId: exercise.id,
          name: exercise.name,
          target: exercise.target,
          equipment: exercise.equipment,
          gifUrl: exercise.gifUrl,
        });
      }
    }
  } catch (error) {
    throw new Error("Failed to fetch exercises from API");
  }
};

export const getAllExercises = async () => {
  return await ExerciseDAO.findAllExercises();
};
