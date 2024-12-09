import mongoose from "mongoose";
import UserModel from "./Users/model.js";
import ProgramModel from "./Programs/model.js";
import EnrollmentModel from "./Enrollments/model.js";
import PostModel from "./Posts/model.js";

const seedData = async () => {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_CONNECTION_STRING + "WeFit");

    console.log("Clearing existing data...");
    await UserModel.deleteMany({});
    await ProgramModel.deleteMany({});
    await EnrollmentModel.deleteMany({});
    await PostModel.deleteMany({});

    console.log("Inserting sample users...");
    const users = await UserModel.insertMany([
      {
        username: "trainer1",
        password: "$2b$10$hashedpassword123",
        firstName: "John",
        lastName: "Doe",
        email: "trainer1@example.com",
        gender: "Male",
        role: "TRAINER",
        bio: "Experienced fitness trainer.",
      },
      {
        username: "trainee1",
        password: "$2b$10$hashedpassword456",
        firstName: "Jane",
        lastName: "Smith",
        email: "trainee1@example.com",
        gender: "Female",
        role: "TRAINEE",
        bio: "Fitness enthusiast.",
      },
    ]);

    console.log("Inserting sample programs...");
    const programs = await ProgramModel.insertMany([
      {
        title: "Beginner Core Strength",
        description: "A core-focused program designed for beginners.",
        trainer: users[0]._id,
        exercises: [
          {
            exerciseId: "0001",
            name: "3/4 sit-up",
            target: "abs",
            equipment: "body weight",
            gifUrl: "https://v2.exercisedb.io/image/mWx7rjVnmC5dCw",
            sets: 3,
            reps: 12,
          },
        ],
        duration: 30,
        difficulty: "Beginner",
      },
    ]);

    console.log("Inserting sample enrollments...");
    const enrollments = await EnrollmentModel.insertMany([
      {
        program: programs[0]._id,
        user: users[1]._id,
        status: "ENROLLED",
        progress: 0,
        completedExercises: [],
        enrollmentDate: new Date(),
      },
    ]);

    console.log("Inserting sample posts...");
    const posts = await PostModel.insertMany([
      {
        author: users[0]._id,
        title: "Welcome to the fitness forum!",
        content: "Share your progress and connect with others!",
        likes: [],
        dislikes: [],
      },
    ]);

    console.log("Database seeded successfully!");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding database:", error);
    mongoose.connection.close();
  }
};

seedData();
