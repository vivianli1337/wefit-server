import "dotenv/config";
import mongoose from "mongoose";
import axios from "axios";
import ExerciseModel from "./Exercises/model.js";

// MongoDB Connection
const MONGO_URI = process.env.MONGO_CONNECTION_STRING + "WeFit";

mongoose.connect(MONGO_URI);
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB: WeFit");
});

mongoose.connection.on("error", (err) => {
  console.error("Error connecting to MongoDB:", err.message);
});

// Function to Fetch Data and Import into MongoDB
const importExercises = async () => {
  const apiUrl = "https://exercisedb.p.rapidapi.com/exercises";
  const headers = {
    "x-rapidapi-host": "exercisedb.p.rapidapi.com",
    "x-rapidapi-key": process.env.RAPIDAPI_KEY, 
  };

  try {
    console.log("Fetching data from ExerciseDB API...");
    const response = await axios.get(apiUrl, { headers });

    const exercises = response.data;
    console.log(`Fetched ${exercises.length} exercises.`);

    // Clear existing data
    await ExerciseModel.deleteMany({});
    console.log("Cleared existing exercises.");

    // Insert new data
    await ExerciseModel.insertMany(
      exercises.map((exercise) => ({
        exerciseId: exercise.id,
        name: exercise.name,
        target: exercise.target,
        equipment: exercise.equipment,
        gifUrl: exercise.gifUrl,
      }))
    );

    console.log("Imported exercises into MongoDB.");
  } catch (error) {
    console.error("Error importing exercises:", error.message);
  } finally {
    mongoose.connection.close();
    console.log("MongoDB connection closed.");
  }
};

// Execute the Import Function
importExercises();
