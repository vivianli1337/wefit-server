// import axios from "axios";
// import * as dao from "./dao.js";

// export default function ExerciseRoutes(app) {
//   const EXTERNAL_API_URL = "https://exercisedb-api.vercel.app/exercises";

//   // Fetch all exercises
//   const getExercises = async (req, res) => {
//     try {
//       const exercises = await dao.findAllExercises();
//       res.json(exercises);
//     } catch (error) {
//       console.error("Error fetching exercises:", error.message);
//       res.status(500).json({ error: "Failed to fetch exercises" });
//     }
//   };

//   // Fetch a specific exercise by ID
//   const getExerciseById = async (req, res) => {
//     try {
//       const exercise = await dao.findExerciseById(req.params.id);
//       if (!exercise) {
//         return res.status(404).json({ error: "Exercise not found" });
//       }
//       res.json(exercise);
//     } catch (error) {
//       console.error("Error fetching exercise by ID:", error.message);
//       res.status(500).json({ error: "Failed to fetch exercise" });
//     }
//   };

//   // Fetch exercises by body part
//   const getExercisesByBodyPart = async (req, res) => {
//     try {
//       const exercises = await dao.findExercisesByBodyPart(req.params.bodyPart);
//       if (!exercises.length) {
//         return res.status(404).json({ error: "No exercises found for the given body part" });
//       }
//       res.json(exercises);
//     } catch (error) {
//       console.error("Error fetching exercises by body part:", error.message);
//       res.status(500).json({ error: "Failed to fetch exercises by body part" });
//     }
//   };

//   // Sync exercises with external API
//   const fetchAndStoreExercises = async (req, res) => {
//     try {
//       const response = await axios.get(EXTERNAL_API_URL);
//       const exercises = response.data;

//       for (const exercise of exercises) {
//         const existingExercise = await dao.findExerciseById(exercise.id);
//         if (!existingExercise) {
//           await dao.addExercise({
//             exerciseId: exercise.id,
//             name: exercise.name,
//             target: exercise.target,
//             equipment: exercise.equipment,
//             gifUrl: exercise.gifUrl,
//           });
//         }
//       }

//       res.status(200).json({ message: "Exercises synchronized successfully" });
//     } catch (error) {
//       console.error("Error synchronizing exercises:", error.message);
//       res.status(500).json({ error: "Failed to synchronize exercises" });
//     }
//   };

//   // Routes
//   app.get("/api/exercises", getExercises); // Fetch all exercises
//   app.get("/api/exercises/:id", getExerciseById); // Fetch exercise by ID
//   app.get("/api/exercises/bodyPart/:bodyPart", getExercisesByBodyPart); // Fetch exercises by body part
//   app.post("/api/exercises/sync", fetchAndStoreExercises); // Sync exercises with ExerciseDB API
// }

import axios from "axios";
import * as dao from "./dao.js";

export default function ExerciseRoutes(app) {
  const EXTERNAL_API_URL = "https://exercisedb-api.vercel.app/exercises";

  // Fetch all exercises
  const getExercises = async (req, res) => {
    try {
      const exercises = await dao.findAllExercises();
      res.json(exercises);
    } catch (error) {
      console.error("Error fetching exercises:", error.message);
      res.status(500).json({ error: "Failed to fetch exercises" });
    }
  };

  // Fetch a specific exercise by ID
  const getExerciseById = async (req, res) => {
    try {
      const exercise = await dao.findExerciseById(req.params.id);
      if (!exercise) {
        return res.status(404).json({ error: "Exercise not found" });
      }
      res.json(exercise);
    } catch (error) {
      console.error("Error fetching exercise by ID:", error.message);
      res.status(500).json({ error: "Failed to fetch exercise" });
    }
  };

  // Fetch exercises by body part
  const getExercisesByBodyPart = async (req, res) => {
    try {
      const exercises = await dao.findExercisesByBodyPart(req.params.bodyPart);
      if (!exercises.length) {
        return res.status(404).json({ error: "No exercises found for the given body part" });
      }
      res.json(exercises);
    } catch (error) {
      console.error("Error fetching exercises by body part:", error.message);
      res.status(500).json({ error: "Failed to fetch exercises by body part" });
    }
  };

  // Sync exercises with external API
  const fetchAndStoreExercises = async (req, res) => {
    try {
      const response = await axios.get(EXTERNAL_API_URL);
      const exercises = response.data;

      for (const exercise of exercises) {
        const existingExercise = await dao.findExerciseById(exercise.id);
        if (!existingExercise) {
          await dao.addExercise({
            exerciseId: exercise.id,
            name: exercise.name,
            target: exercise.target,
            equipment: exercise.equipment,
            gifUrl: exercise.gifUrl,
          });
        }
      }

      res.status(200).json({ message: "Exercises synchronized successfully" });
    } catch (error) {
      console.error("Error synchronizing exercises:", error.message);
      res.status(500).json({ error: "Failed to synchronize exercises" });
    }
  };

  // Routes
  app.get("/api/exercises", getExercises); // Fetch all exercises
  app.get("/api/exercises/:id", getExerciseById); // Fetch exercise by ID
  app.get("/api/exercises/bodyPart/:bodyPart", getExercisesByBodyPart); // Fetch exercises by body part
  app.post("/api/exercises/sync", fetchAndStoreExercises); // Sync exercises with external API
}
