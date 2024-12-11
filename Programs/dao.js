// import ProgramModel from "./model.js";

// export const createProgram = async (programData) => {
//   return await ProgramModel.create(programData);
// };

// export const getPrograms = async () => {
//   return await ProgramModel.find().populate("trainer exercises");
// };

// export const getProgramById = async (id) => {
//   return await ProgramModel.findById(id).populate("trainer exercises");
// };

// export const updateProgram = async (id, programData) => {
//   return await ProgramModel.findByIdAndUpdate(id, programData, { new: true });
// };

// export const deleteProgram = async (id) => {
//   return await ProgramModel.findByIdAndDelete(id);
// };

import ProgramModel from "./model.js";

// Create a new program
export const createProgram = async (programData) => {
  return await ProgramModel.create(programData);
};

// Get all programs
export const getPrograms = async () => {
  return await ProgramModel.find().populate("trainer exercises");
};

// Get a program by ID
export const getProgramById = async (id) => {
  return await ProgramModel.findById(id).populate("trainer exercises");
};

// Update a program by ID
export const updateProgram = async (id, programData) => {
  return await ProgramModel.findByIdAndUpdate(id, programData, { new: true });
};

// Delete a program by ID
export const deleteProgram = async (id) => {
  return await ProgramModel.findByIdAndDelete(id);
};

// Add an exercise to a program
export const addExerciseToProgram = async (programId, exercise) => {
  return await ProgramModel.findByIdAndUpdate(
    programId,
    { $push: { exercises: exercise } },
    { new: true }
  );
};
