import express from "express";

import mongoose from "mongoose";
import "dotenv/config";

import cors from "cors";

// Import routes
import exerciseRoutes from "./Exercises/routes.js";
import programRoutes from "./Programs/routes.js";
import userRoutes from "./Users/routes.js";
import postRoutes from "./Posts/routes.js";
import enrollmentRoutes from "./Enrollments/routes.js";

import session from "express-session";


// MongoDB Connection
const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017/wefit"
mongoose.connect(CONNECTION_STRING);

const app = express();
app.use(cors({
    credentials: true,
    origin: process.env.NETLIFY_URL || "http://localhost:3000",
})
);

// Session configuration
const sessionOptions = {
    secret: process.env.SESSION_SECRET || "kanbas",
    resave: false,
    saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true; // Enable if using a proxy (e.g., Heroku)
    sessionOptions.cookie = {
        sameSite: "none",
        secure: true,
        domain: process.env.NODE_SERVER_DOMAIN,
    };
}

app.use(session(sessionOptions));
app.use(express.json());

userRoutes(app);
exerciseRoutes(app);
programRoutes(app);
postRoutes(app);
enrollmentRoutes(app);

app.listen(process.env.PORT || 4000)
