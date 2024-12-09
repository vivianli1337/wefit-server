import * as ProgramService from "./service.js";
import ProgramModel from "./model.js";

export const createProgram = async (req, res) => {
  try {
    const program = await ProgramService.createProgram(req.body);
    res.status(201).json(program);
  } catch (error) {
    res.status(400).json({ error: "Failed to create program", message: error.message });
  }
};

export const getPrograms = async (req, res) => {
  try {
    const programs = await ProgramService.getPrograms();
    res.json(programs);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch programs", message: error.message });
  }
};

export const getProgramById = async (req, res) => {
  try {
    const program = await ProgramService.getProgramById(req.params.id);
    res.json(program);
  } catch (error) {
    res.status(404).json({ error: "Program not found", message: error.message });
  }
};

export const updateProgram = async (req, res) => {
  try {
    const updatedProgram = await ProgramService.updateProgram(req.params.id, req.body);
    res.json(updatedProgram);
  } catch (error) {
    res.status(400).json({ error: "Failed to update program", message: error.message });
  }
};

export const deleteProgram = async (req, res) => {
  try {
    await ProgramService.deleteProgram(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete program", message: error.message });
  }
};
export const addExerciseToProgram = async (req, res) => {
  const { programId } = req.params;
  const exercise = req.body; // The new exercise object

  try {
    const program = await ProgramModel.findByIdAndUpdate(
      programId,
      { $push: { exercises: exercise } },
      { new: true } // Return the updated program
    );

    if (!program) {
      return res.status(404).json({ error: "Program not found" });
    }

    res.status(200).json(program);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
