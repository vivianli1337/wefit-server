import ProgramModel from "./model.js";

export const createProgram = async (programData) => {
  return await ProgramModel.create(programData);
};

export const getPrograms = async () => {
  return await ProgramModel.find().populate("trainer exercises");
};

export const getProgramById = async (id) => {
  return await ProgramModel.findById(id).populate("trainer exercises");
};

export const updateProgram = async (id, programData) => {
  return await ProgramModel.findByIdAndUpdate(id, programData, { new: true });
};

export const deleteProgram = async (id) => {
  return await ProgramModel.findByIdAndDelete(id);
};
