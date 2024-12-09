import ExerciseModel from "./model.js";

export const findAllExercises = async () => {
  return await ExerciseModel.find();
};

export const findExerciseById = async (exerciseId) => {
  return await ExerciseModel.findOne({ exerciseId });
};

export const addExercise = async (exerciseData) => {
  const newExercise = new ExerciseModel(exerciseData);
  return await newExercise.save();
};
