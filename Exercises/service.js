import axios from "axios";
import * as ExerciseDAO from "./dao.js";

const EXTERNAL_API_URL = "https://exercisedb-api.vercel.app/exercises";

export const getAllExercises = async () => {
  return await ExerciseDAO.findAllExercises();
};

export const findExerciseById = async (exerciseId) => {
  return await ExerciseDAO.findExerciseById(exerciseId);
};

export const findExercisesByBodyPart = async (bodyPart) => {
  return await ExerciseDAO.findExercisesByBodyPart(bodyPart);
};

export const syncExercises = async () => {
  const response = await axios.get(EXTERNAL_API_URL);
  const exercises = response.data;

  for (const exercise of exercises) {
    const existingExercise = await ExerciseDAO.findExerciseById(exercise.id);
    if (!existingExercise) {
      await ExerciseDAO.addExercise({
        exerciseId: exercise.id,
        name: exercise.name,
        target: exercise.target,
        equipment: exercise.equipment,
        gifUrl: exercise.gifUrl,
      });
    }
  }
};
