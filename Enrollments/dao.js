import EnrollmentModel from "./model.js";

// Create an enrollment
export const createEnrollment = async (enrollmentData) => {
  return await EnrollmentModel.create(enrollmentData);
};

// Find all enrollments
export const getAllEnrollments = async () => {
  return await EnrollmentModel.find().populate("program user");
};

// Find enrollments by user
export const getEnrollmentsByUser = async (userId) => {
  return await EnrollmentModel.find({ user: userId }).populate("program");
};

// Find enrollments by program
export const getEnrollmentsByProgram = async (programId) => {
  return await EnrollmentModel.find({ program: programId }).populate("user");
};

// Find enrollment by ID
export const getEnrollmentById = async (enrollmentId) => {
  return await EnrollmentModel.findById(enrollmentId).populate("program user");
};

// Update enrollment status
export const updateEnrollmentStatus = async (enrollmentId, status) => {
  return await EnrollmentModel.findByIdAndUpdate(
    enrollmentId,
    { status },
    { new: true }
  );
};

// Delete an enrollment
export const deleteEnrollment = async (enrollmentId) => {
  return await EnrollmentModel.findByIdAndDelete(enrollmentId);
};
