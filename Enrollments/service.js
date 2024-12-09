import * as EnrollmentDAO from "./dao.js";
import ProgramModel from "../Programs/model.js";

// Create an enrollment
export const createEnrollment = async (enrollmentData) => {
  return await EnrollmentDAO.createEnrollment(enrollmentData);
};

// Get all enrollments
export const getAllEnrollments = async () => {
  return await EnrollmentDAO.getAllEnrollments();
};

// Get enrollments by user
export const getEnrollmentsByUser = async (userId) => {
  return await EnrollmentDAO.getEnrollmentsByUser(userId);
};

// Get enrollments by program
export const getEnrollmentsByProgram = async (programId) => {
  return await EnrollmentDAO.getEnrollmentsByProgram(programId);
};

// Update enrollment status
export const updateEnrollmentStatus = async (enrollmentId, status) => {
  const validStatuses = ["ENROLLED", "COMPLETED", "CANCELLED"];
  if (!validStatuses.includes(status)) {
    throw new Error("Invalid status value");
  }
  return await EnrollmentDAO.updateEnrollmentStatus(enrollmentId, status);
};

// Delete an enrollment
export const deleteEnrollment = async (enrollmentId) => {
  return await EnrollmentDAO.deleteEnrollment(enrollmentId);
};

// Mark an exercise as completed
export const markExerciseAsCompleted = async (enrollmentId, exerciseId) => {
  const enrollment = await EnrollmentDAO.getEnrollmentById(enrollmentId);

  if (!enrollment) {
    throw new Error("Enrollment not found");
  }

  // Populate the program to calculate progress
  const program = await ProgramModel.findById(enrollment.program).select("exercises");
  if (!program || !program.exercises) {
    throw new Error("Program exercises not defined");
  }

  // Add the completed exercise
  enrollment.completedExercises.push({ exerciseId, completedAt: new Date() });

  // Calculate progress
  const totalExercises = program.exercises.length;
  const completedCount = enrollment.completedExercises.length;
  enrollment.progress = totalExercises > 0 ? Math.round((completedCount / totalExercises) * 100) : 0;

  await enrollment.save();
  return enrollment;
};

// Get the most recent completed exercise
export const getMostRecentCompletedExercise = async (enrollmentId) => {
  const enrollment = await EnrollmentDAO.getEnrollmentById(enrollmentId);

  if (!enrollment) {
    throw new Error("Enrollment not found");
  }

  const mostRecent = enrollment.completedExercises.sort((a, b) => b.completedAt - a.completedAt)[0];
  if (!mostRecent) {
    throw new Error("No exercises completed yet");
  }

  return mostRecent;
};
