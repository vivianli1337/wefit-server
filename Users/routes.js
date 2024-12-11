// import * as dao from "./dao.js";
// import * as enrollmentsDao from "../Enrollments/dao.js";
// import { query } from "express";

// export default function UserRoutes(app) {
//   const createUser = async (req, res) => {
//     const user = await dao.createUser(req.body);
//     res.json(user);
//   };

//   // Get all users
//   const getAllUsers = async () => {
//     const { role, query } = req.query;
//     if (role) {
//       const users = await dao.getUsersByRole(role);
//       res.json(users);
//       return;
//     }
//     if (query) {
//       const users = await dao.searchUsersByPartialNameOrEmail(query);
//       res.json(users);
//       return;
//     }
//     const users = await dao.getAllUsers();
//     console.log(users)
//     res.json(users);
//   };

//   // Get a user by ID
//   const getUserById = async (req, res) => {
//     const user = await dao.getUserById(req.params.userId);
//     res.json(user);
//   };


//   // Update user data
//   const updateUser = async (req, res) => {
//     const userId = req.params.userId;
//     const userUpdates = req.body;
//     await dao.updateUser(userId, userUpdates);
//     const currentUser =
//       // await dao.findUserById(userId);
//       // req.session["currentUser"] = currentUser;
//       req.session["currentUser"];
//     if (currentUser && currentUser._id === userId) {
//       req.session["currentUser"] = { ...currentUser, ...userUpdates };
//     }
//     res.json(currentUser);
//   };

//   // Delete a user
//   const deleteUser = async (req, res) => {
//     const status = await dao.deleteUser(req.params.userId);
//     res.json(status);
//   };

//   // sign up 
//   const signup = async (req, res) => {
//     const user = await dao.findUserByUsername(req.body.username);
//     if (user) {
//       res.status(400).json(
//         { message: "Username already in use" });
//       return;
//     }
//     const currentUser = await dao.createUser(req.body);
//     req.session["currentUser"] = currentUser;
//     res.json(currentUser);
//   };

//   // login
//   const login = async (req, res) => {
//     const { username, password } = req.body;
//     const currentUser = await dao.findUserByCredentials(username, password);
//     if (currentUser) {
//       req.session["currentUser"] = currentUser;
//       res.json(currentUser);
//     } else {
//       res.status(401).json({ message: "Unable to login. Try again later." });
//     }
//   };

//   // Fetch the current user's profile using the decoded token
//   const getProfile = async (req, res) => {
//     const currentUser = req.session["currentUser"];
//     if (!currentUser) {
//       res.sendStatus(401);
//       return;
//     }
//     res.json(currentUser);
//   };

//   // Invalidate a session or clear user-related state
//   const logoutUser = async (req, res) => {
//     req.session.destroy();
//     res.sendStatus(200);
//   };

//   app.post("/api/users", createUser);
//   app.get("/api/users", getAllUsers);
//   app.get("/api/users/:userId", getUserById);
//   app.put("/api/users/:userId", updateUser);
//   app.delete("/api/users/:userId", deleteUser);
//   app.post("/api/users", signup);
//   app.post("/api/users/signin", login);
//   app.post("/api/users/signout", logoutUser);
//   app.post("/api/users/profile", getProfile);
// }

import * as dao from "./dao.js";

export default function UserRoutes(app) {
  // Create a new user
  const createUser = async (req, res) => {
    try {
      const user = await dao.createUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  // Get all users
  const getAllUsers = async (req, res) => {
    try {
      const { role, query } = req.query;
      if (role) {
        const users = await dao.findUsersByRole(role);
        return res.json(users);
      }
      if (query) {
        const users = await dao.findUsersByPartialNameOrEmail(query);
        return res.json(users);
      }
      const users = await dao.findAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  // Get a user by ID
  const getUserById = async (req, res) => {
    try {
      const user = await dao.findUserById(req.params.userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  // Update user data
  const updateUser = async (req, res) => {
    try {
      const userId = req.params.userId;
      const userUpdates = req.body;
      await dao.updateUser(userId, userUpdates);
      const currentUser = req.session["currentUser"];
      if (currentUser && currentUser._id === userId) {
        req.session["currentUser"] = { ...currentUser, ...userUpdates };
      }
      res.json(currentUser);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  // Delete a user
  const deleteUser = async (req, res) => {
    try {
      const status = await dao.deleteUser(req.params.userId);
      res.json(status);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  // Sign up a user
  const signup = async (req, res) => {
    try {
      const existingUser = await dao.findUserByUsername(req.body.username);
      if (existingUser) {
        return res.status(400).json({ message: "Username already in use" });
      }
      const currentUser = await dao.createUser(req.body);
      req.session["currentUser"] = currentUser;
      res.json(currentUser);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  // Log in a user
  const login = async (req, res) => {
    try {
      const { username, password } = req.body;
      const currentUser = await dao.findUserByCredentials(username, password);
      if (!currentUser) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      req.session["currentUser"] = currentUser;
      res.json(currentUser);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  // Get the current user's profile
  const getProfile = (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      return res.sendStatus(401);
    }
    res.json(currentUser);
  };

  // Log out a user
  const logoutUser = (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  };

  // Routes
  app.post("/api/users", createUser);
  app.get("/api/users", getAllUsers);
  app.get("/api/users/:userId", getUserById);
  app.put("/api/users/:userId", updateUser);
  app.delete("/api/users/:userId", deleteUser);
  app.post("/api/users/signup", signup);
  app.post("/api/users/login", login);
  app.get("/api/users/profile", getProfile);
  app.post("/api/users/logout", logoutUser);
}
