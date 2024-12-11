// import * as enrollmentsDao from "./dao.js";

// export default function EnrollmentRoutes(app) {
//   app.post("/api/enrollments", async (req, res) => {
//     try {
//       const enrollment = enrollmentsDao.create(req.body);
//       res.status(201).json(enrollment);
//     } catch (error) {
//       res.status(400).json({ error: error.message });
//     }
//   });

//   // Get all enrollments
//   app.get("/api/enrollments", async (req, res) => {
//     try {
//       const allEnrollments = enrollmentsDao.findAll();
//       res.status(200).json(allEnrollments);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   });

//   // Get enrollments by user
//   app.get("/api/enrollments/user/:userId", async (req, res) => {
//     try {
//       const userEnrollments = enrollmentsDao.findByUserId(req.params.userId);
//       res.status(200).json(userEnrollments);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   });

//   // Get enrollments by program
//   app.get("/api/enrollments/program/:programId", async (req, res) => {
//     try {
//       const programEnrollments = enrollmentsDao.findByProgramId(req.params.programId);
//       res.status(200).json(programEnrollments);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   });

//   // Update enrollment status
//   app.put("/api/enrollments/:enrollmentId", async (req, res) => {
//     try {
//       const updatedEnrollment = enrollmentsDao.updateStatus(req.params.enrollmentId, req.body.status);
//       if (updatedEnrollment) {
//         res.status(200).json(updatedEnrollment);
//       } else {
//         res.status(404).json({ error: "Enrollment not found" });
//       }
//     } catch (error) {
//       res.status(400).json({ error: error.message });
//     }
//   });

//   // Delete an enrollment
//   app.delete("/api/enrollments/:enrollmentId", async (req, res) => {
//     try {
//       enrollmentsDao.delete(req.params.enrollmentId);
//       res.status(204).send();
//     } catch (error) {
//       res.status(400).json({ error: error.message });
//     }
//   });

//   // Mark an exercise as completed
//   app.put("/api/enrollments/:enrollmentId/exercises/completed", async (req, res) => {
//     try {
//       const updatedEnrollment = enrollmentsDao.completeExercise(req.params.enrollmentId, req.body.exerciseId);
//       if (updatedEnrollment) {
//         res.status(200).json(updatedEnrollment);
//       } else {
//         res.status(404).json({ error: "Enrollment not found" });
//       }
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   });

//   // Get the most recent completed exercise
//   app.get("/api/enrollments/:enrollmentId/exercises/most-recent", async (req, res) => {
//     try {
//       const mostRecent = enrollmentsDao.getMostRecentExercise(req.params.enrollmentId);
//       if (mostRecent) {
//         res.status(200).json(mostRecent);
//       } else {
//         res.status(404).json({ error: "No exercises completed or enrollment not found" });
//       }
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   });
// }

import * as enrollmentsDao from "./dao.js";

export default function EnrollmentRoutes(app) {
  app.post("/api/enrollments", async (req, res) => {
    try {
      const enrollment = await enrollmentsDao.createEnrollment(req.body);
      res.status(201).json(enrollment);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  app.get("/api/enrollments", async (req, res) => {
    try {
      const allEnrollments = await enrollmentsDao.getAllEnrollments();
      res.status(200).json(allEnrollments);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/enrollments/user/:userId", async (req, res) => {
    try {
      const userEnrollments = await enrollmentsDao.getEnrollmentsByUser(req.params.userId);
      res.status(200).json(userEnrollments);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/enrollments/program/:programId", async (req, res) => {
    try {
      const programEnrollments = await enrollmentsDao.getEnrollmentsByProgram(req.params.programId);
      res.status(200).json(programEnrollments);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.put("/api/enrollments/:enrollmentId", async (req, res) => {
    try {
      const validStatuses = ["ENROLLED", "COMPLETED", "CANCELLED"];
      if (!validStatuses.includes(req.body.status)) {
        return res.status(400).json({ error: "Invalid status value" });
      }

      const updatedEnrollment = await enrollmentsDao.updateEnrollmentStatus(
        req.params.enrollmentId,
        req.body.status
      );

      if (updatedEnrollment) {
        res.status(200).json(updatedEnrollment);
      } else {
        res.status(404).json({ error: "Enrollment not found" });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  app.delete("/api/enrollments/:enrollmentId", async (req, res) => {
    try {
      await enrollmentsDao.deleteEnrollment(req.params.enrollmentId);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  app.put("/api/enrollments/:enrollmentId/exercises/completed", async (req, res) => {
    try {
      const updatedEnrollment = await enrollmentsDao.completeExercise(
        req.params.enrollmentId,
        req.body.exerciseId
      );

      if (updatedEnrollment) {
        res.status(200).json(updatedEnrollment);
      } else {
        res.status(404).json({ error: "Enrollment not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/enrollments/:enrollmentId/exercises/most-recent", async (req, res) => {
    try {
      const mostRecent = await enrollmentsDao.getMostRecentExercise(req.params.enrollmentId);
      if (mostRecent) {
        res.status(200).json(mostRecent);
      } else {
        res.status(404).json({ error: "No exercises completed or enrollment not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
}
