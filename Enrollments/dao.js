// import EnrollmentModel from "./model.js";

// // Create an enrollment
// export const createEnrollment = async (enrollmentData) => {
//   return await EnrollmentModel.create(enrollmentData);
// };

// // Find all enrollments
// export const getAllEnrollments = async () => {
//   return await EnrollmentModel.find().populate("program user");
// };

// // Find enrollments by user
// export const getEnrollmentsByUser = async (userId) => {
//   return await EnrollmentModel.find({ user: userId }).populate("program");
// };

// // Find enrollments by program
// export const getEnrollmentsByProgram = async (programId) => {
//   return await EnrollmentModel.find({ program: programId }).populate("user");
// };

// // Find enrollment by ID
// export const getEnrollmentById = async (enrollmentId) => {
//   return await EnrollmentModel.findById(enrollmentId).populate("program user");
// };

// // Update enrollment status
// export const updateEnrollmentStatus = async (enrollmentId, status) => {
//   return await EnrollmentModel.findByIdAndUpdate(
//     enrollmentId,
//     { status },
//     { new: true }
//   );
// };

// // Delete an enrollment
// export const deleteEnrollment = async (enrollmentId) => {
//   return await EnrollmentModel.findByIdAndDelete(enrollmentId);
// };

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

// Mark an exercise as completed
export const completeExercise = async (enrollmentId, exerciseId) => {
  const enrollment = await EnrollmentModel.findById(enrollmentId);
  if (!enrollment) throw new Error("Enrollment not found");

  enrollment.completedExercises.push({ exerciseId, completedAt: new Date() });
  enrollment.progress = Math.min(100, enrollment.progress + 10); // Example progress increment
  await enrollment.save();
  return enrollment;
};

// Get the most recent completed exercise
export const getMostRecentExercise = async (enrollmentId) => {
  const enrollment = await EnrollmentModel.findById(enrollmentId);
  if (!enrollment) throw new Error("Enrollment not found");

  const mostRecent = enrollment.completedExercises.sort(
    (a, b) => new Date(b.completedAt) - new Date(a.completedAt)
  )[0];
  return mostRecent || null;
};
