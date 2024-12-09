import * as EnrollmentService from "./service.js";

// Create an enrollment
export const createEnrollment = async (req, res) => {
  try {
    const enrollment = await EnrollmentService.createEnrollment(req.body);
    res.status(201).json(enrollment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all enrollments
export const getAllEnrollments = async (req, res) => {
  try {
    const enrollments = await EnrollmentService.getAllEnrollments();
    res.status(200).json(enrollments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get enrollments by user
export const getEnrollmentsByUser = async (req, res) => {
  try {
    const enrollments = await EnrollmentService.getEnrollmentsByUser(req.params.userId);
    res.status(200).json(enrollments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get enrollments by program
export const getEnrollmentsByProgram = async (req, res) => {
  try {
    const enrollments = await EnrollmentService.getEnrollmentsByProgram(req.params.programId);
    res.status(200).json(enrollments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update enrollment status
export const updateEnrollmentStatus = async (req, res) => {
  try {
    const enrollment = await EnrollmentService.updateEnrollmentStatus(req.params.enrollmentId, req.body.status);
    res.status(200).json(enrollment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete an enrollment
export const deleteEnrollment = async (req, res) => {
  try {
    await EnrollmentService.deleteEnrollment(req.params.enrollmentId);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


export const markExerciseAsCompleted = async (req, res) => {
  const { enrollmentId } = req.params;
  const { exerciseId } = req.body;

  try {
    const updatedEnrollment = await EnrollmentService.markExerciseAsCompleted(enrollmentId, exerciseId);
    res.status(200).json(updatedEnrollment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getMostRecentCompletedExercise = async (req, res) => {
  const { enrollmentId } = req.params;

  try {
    const mostRecent = await EnrollmentService.getMostRecentCompletedExercise(enrollmentId);
    res.status(200).json(mostRecent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
