import * as UserService from "./service.js";

export const createUser = async (req, res) => {
  try {
    const user = await UserService.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await UserService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserById = async (req, res) => {
  console.log("Fetching user with ID:", req.params.id); // Log the ID being fetched
  try {
    const user = await UserService.getUserById(req.params.id);
    if (!user) {
      console.log("User not found with ID:", req.params.id); // Log when no user is found
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error in getUserById:", error.message); // Log any errors
    res.status(500).json({ error: error.message });
  }
};


export const searchUsersByPartialNameOrEmail = async (req, res) => {
  try {
    const users = await UserService.searchUsersByPartialNameOrEmail(
      req.params.query
    );
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const updatedUser = await UserService.updateUser(req.params.id, req.body);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    await UserService.deleteUser(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login
export const login = async (req, res) => {
    try {
      const { username, password } = req.body;
      const token = await UserService.authenticateUser(username, password);
      res.status(200).json({ token, message: "Login successful" });
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  };

  //Get profile (hide password field)
  export const getProfile = async (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Authorization token missing or malformed" });
      }
  
      const token = authHeader.split(" ")[1];
      const decoded = UserService.verifyToken(token);
  
      const user = await UserService.getUserById(decoded.userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      // Exclude sensitive fields like password
      const { password, ...userWithoutPassword } = user.toObject();
      res.status(200).json(userWithoutPassword);
    } catch (error) {
      console.error("Error in getProfile:", error.message);
      res.status(401).json({ error: "Invalid or expired token" });
    }
  };

// Logout
export const logout = async (req, res) => {
  try {
    console.log("Logout initiated");
    await new Promise((resolve, reject) =>
      req.session.destroy((err) => {
        if (err) {
          console.error("Failed to destroy session:", err);
          reject(err);
        } else {
          resolve();
        }
      })
    );

    console.log("Session destroyed");
    res.clearCookie("connect.sid");
    console.log("Cookie cleared");
    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Error during logout:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};