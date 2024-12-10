import mongoose from "mongoose";
import "dotenv/config";
import express from "express";
import cors from "cors";



// Import routes
import exerciseRoutes from "./Exercises/routes.js";
import programRoutes from "./Programs/routes.js";
import userRoutes from "./Users/routes.js";
import postRoutes from "./Posts/routes.js";
import enrollmentRoutes from "./Enrollments/routes.js";

import session from "express-session";

// Initialize Express app
const app = express();

// MongoDB Connection
const MONGO_URI = process.env.MONGO_CONNECTION_STRING + "WeFit";

mongoose.connect(MONGO_URI, {
});

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB: WeFit");
});

mongoose.connection.on("error", (err) => {
  console.error("Error connecting to MongoDB:", err.message);
});

mongoose.connection.once("open", () => {
  console.log("MongoDB connection established.");
});

app.use(express.json()); // Parse JSON payloads

// Middleware
app.use(
  cors({
    credentials: true,
    origin: process.env.NETLIFY_URL || "http://localhost:3000",
  })
);


// Session configuration
const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kanbas",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV !== "development", // Secure cookies in non-development mode
    sameSite: process.env.NODE_ENV !== "development" ? "none" : "lax", // Allow cross-site cookies in production
  },
};
if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true; // Enable if using a proxy (e.g., Heroku)
  sessionOptions.cookie.domain = process.env.NODE_SERVER_DOMAIN; // Set the domain if applicable
}
app.use(session(sessionOptions));

// Routes
app.use("/api/exercises", exerciseRoutes);
app.use("/api/programs", programRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/enrollments", enrollmentRoutes);


app.get("/hello", (req, res) => {
  res.send("Life is good!");
});

app.get("/", (req, res) => {
  res.send("Welcome to WeFit!");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Start the server
const PORT = process.env.PORT || 4000;
mongoose.connection.once("open", () => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
