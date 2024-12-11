import "dotenv/config";
import mongoose from "mongoose";
import axios from "axios";
import ExerciseModel from "./Exercises/model.js";

// MongoDB Connection
const MONGO_URI = process.env.MONGO_CONNECTION_STRING;


mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB: WeFit");
});

mongoose.connection.on("error", (err) => {
  console.error("Error connecting to MongoDB:", err.message);
});

const importExercises = async () => {
  const apiUrl = "https://exercisedb.p.rapidapi.com/exercises";
  const headers = {
    "x-rapidapi-host": "exercisedb.p.rapidapi.com",
    "x-rapidapi-key": process.env.RAPIDAPI_KEY, // Ensure this is correctly set in .env
  };

  try {
    console.log("Fetching data from ExerciseDB API...");
    const response = await axios.get(apiUrl, {
      headers,
      params: {
        limit: 0, // Fetch all exercises
      },
    });

    const exercises = response.data;
    console.log(`Fetched ${exercises.length} exercises.`);

    // Clear existing data
    await ExerciseModel.deleteMany({});
    console.log("Cleared existing exercises from MongoDB.");

    // Insert new data
    const formattedExercises = exercises.map((exercise) => ({
      exerciseId: exercise.id,
      name: exercise.name,
      target: exercise.target,
      equipment: exercise.equipment,
      gifUrl: exercise.gifUrl,
      bodyPart: exercise.bodyPart,
    }));

    await ExerciseModel.insertMany(formattedExercises);
    console.log(`Imported ${formattedExercises.length} exercises into MongoDB.`);
  } catch (error) {
    console.error("Error importing exercises:", error.message);
  } finally {
    mongoose.connection.close();
    console.log("MongoDB connection closed.");
  }
};

// Execute the Import Function
importExercises();
