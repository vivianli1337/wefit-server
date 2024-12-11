// import ExerciseModel from "./model.js";

// export function findAllExercises() {
//   return ExerciseModel.find();
// };

// export function findExerciseById(exerciseId) {
//   return ExerciseModel.findOne({ exerciseId });
// };

// export function findExercisesByBodyPart(bodyPart) {
//   return ExerciseModel.find({ target: bodyPart });
// };

// export function addExercise(exerciseData) {
//   const newExercise = new ExerciseModel(exerciseData);
//   return newExercise.save();
// };

// export function createExercise(exerciseData) {
//   delete exerciseData._id
//   return model.create(exerciseData);
// };

// export function updateExercise(exerciseId, exerciseUpdates) {
//   return model.updateOne({ _id: exerciseId }, exerciseUpdates)
// };

// export function deleteExercise(exerciseId) {
//   return model.deleteoNE({ _id: exerciseId });
// };

import ExerciseModel from "./model.js";

// Find all exercises
export function findAllExercises() {
  return ExerciseModel.find();
}

// Find exercise by ID
export function findExerciseById(exerciseId) {
  return ExerciseModel.findOne({ exerciseId });
}

// Find exercises by body part
export function findExercisesByBodyPart(bodyPart) {
  return ExerciseModel.find({ target: bodyPart });
}

// Add a new exercise
export function addExercise(exerciseData) {
  const newExercise = new ExerciseModel(exerciseData);
  return newExercise.save();
}

// Create a new exercise
export function createExercise(exerciseData) {
  delete exerciseData._id; // Ensure no `_id` conflicts
  return ExerciseModel.create(exerciseData);
}

// Update an exercise by ID
export function updateExercise(exerciseId, exerciseUpdates) {
  return ExerciseModel.updateOne({ _id: exerciseId }, exerciseUpdates);
}

// Delete an exercise by ID
export function deleteExercise(exerciseId) {
  return ExerciseModel.deleteOne({ _id: exerciseId });
}
