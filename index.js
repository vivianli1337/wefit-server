import "dotenv/config";
import express from "express";
import cors from "cors";
import session from "express-session";

// Initialize Express app
const app = express();

// Middleware
app.use(
    cors({
        credentials: true,
        origin: process.env.NETLIFY_URL || "http://localhost:3000",
    })
);
app.use(express.json()); // Parse JSON payloads

// Session configuration
const sessionOptions = {
    secret: process.env.SESSION_SECRET || "kanbas",
    resave: false,
    saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
        sameSite: "none",
        secure: true,
        domain: process.env.NODE_SERVER_DOMAIN,
    };
}
app.use(session(sessionOptions));

// Routes
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
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
