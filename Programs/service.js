import * as ProgramDAO from "./dao.js";

export const createProgram = async (programData) => {
  return await ProgramDAO.createProgram(programData);
};

export const getPrograms = async () => {
  return await ProgramDAO.getPrograms();
};

export const getProgramById = async (id) => {
  const program = await ProgramDAO.getProgramById(id);
  if (!program) {
    throw new Error("Program not found");
  }
  return program;
};

export const updateProgram = async (id, programData) => {
  const updatedProgram = await ProgramDAO.updateProgram(id, programData);
  if (!updatedProgram) {
    throw new Error("Failed to update program");
  }
  return updatedProgram;
};

export const deleteProgram = async (id) => {
  const deletedProgram = await ProgramDAO.deleteProgram(id);
  if (!deletedProgram) {
    throw new Error("Failed to delete program");
  }
  return deletedProgram;
};
