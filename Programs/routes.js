
// import * as dao from "./dao.js";

// export default function ProgramRoutes(app) {
//   // Create a new program
//   app.post("/api/programs", async (req, res) => {
//     try {
//       const program = await ProgramDAO.createProgram(req.body);
//       res.status(201).json(program);
//     } catch (error) {
//       res.status(400).json({ error: "Failed to create program", message: error.message });
//     }
//   });

//   // Get all programs
//   app.get("/api/programs", async (req, res) => {
//     try {
//       const programs = await ProgramDAO.getPrograms();
//       res.status(200).json(programs);
//     } catch (error) {
//       res.status(500).json({ error: "Failed to fetch programs", message: error.message });
//     }
//   });

//   // Get a program by ID
//   app.get("/api/programs/:id", async (req, res) => {
//     try {
//       const { id } = req.params;
//       const program = await ProgramDAO.getProgramById(id);
//       if (!program) {
//         return res.status(404).json({ error: "Program not found" });
//       }
//       res.status(200).json(program);
//     } catch (error) {
//       res.status(404).json({ error: "Failed to fetch program", message: error.message });
//     }
//   });

//   // Update a program
//   app.put("/api/programs/:id", async (req, res) => {
//     try {
//       const { id } = req.params;
//       const updatedProgram = await ProgramDAO.updateProgram(id, req.body);
//       if (!updatedProgram) {
//         return res.status(400).json({ error: "Failed to update program" });
//       }
//       res.status(200).json(updatedProgram);
//     } catch (error) {
//       res.status(400).json({ error: "Failed to update program", message: error.message });
//     }
//   });

//   // Delete a program
//   app.delete("/api/programs/:id", async (req, res) => {
//     try {
//       const { id } = req.params;
//       const deletedProgram = await ProgramDAO.deleteProgram(id);
//       if (!deletedProgram) {
//         return res.status(404).json({ error: "Program not found" });
//       }
//       res.status(204).send();
//     } catch (error) {
//       res.status(500).json({ error: "Failed to delete program", message: error.message });
//     }
//   });

//   // Add an exercise to a program
//   app.put("/api/programs/:programId/exercises", async (req, res) => {
//     const { programId } = req.params;
//     const exercise = req.body; // The new exercise object

//     try {
//       const program = await ProgramModel.findByIdAndUpdate(
//         programId,
//         { $push: { exercises: exercise } },
//         { new: true } // Return the updated program
//       );

//       if (!program) {
//         return res.status(404).json({ error: "Program not found" });
//       }

//       res.status(200).json(program);
//     } catch (error) {
//       res.status(500).json({ error: "Failed to add exercise to program", message: error.message });
//     }
//   });
// }


import * as dao from "./dao.js";

export default function ProgramRoutes(app) {
  // Create a new program
  app.post("/api/programs", async (req, res) => {
    try {
      const program = await dao.createProgram(req.body);
      res.status(201).json(program);
    } catch (error) {
      res.status(400).json({ error: "Failed to create program", message: error.message });
    }
  });

  // Get all programs
  app.get("/api/programs", async (req, res) => {
    try {
      const programs = await dao.getPrograms();
      res.status(200).json(programs);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch programs", message: error.message });
    }
  });

  // Get a program by ID
  app.get("/api/programs/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const program = await dao.getProgramById(id);
      if (!program) {
        return res.status(404).json({ error: "Program not found" });
      }
      res.status(200).json(program);
    } catch (error) {
      res.status(404).json({ error: "Failed to fetch program", message: error.message });
    }
  });

  // Update a program
  app.put("/api/programs/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const updatedProgram = await dao.updateProgram(id, req.body);
      if (!updatedProgram) {
        return res.status(400).json({ error: "Failed to update program" });
      }
      res.status(200).json(updatedProgram);
    } catch (error) {
      res.status(400).json({ error: "Failed to update program", message: error.message });
    }
  });

  // Delete a program
  app.delete("/api/programs/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deletedProgram = await dao.deleteProgram(id);
      if (!deletedProgram) {
        return res.status(404).json({ error: "Program not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete program", message: error.message });
    }
  });

  // Add an exercise to a program
  app.put("/api/programs/:programId/exercises", async (req, res) => {
    try {
      const { programId } = req.params;
      const exercise = req.body; // The new exercise object
      const updatedProgram = await dao.addExerciseToProgram(programId, exercise);
      if (!updatedProgram) {
        return res.status(404).json({ error: "Program not found" });
      }
      res.status(200).json(updatedProgram);
    } catch (error) {
      res.status(500).json({ error: "Failed to add exercise to program", message: error.message });
    }
  });
}
