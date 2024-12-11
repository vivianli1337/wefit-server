
# WeFit Server

This is the backend server for the **WeFit** fitness application, built with Node.js, Express, and MongoDB. The server manages users, programs, enrollments, exercises, and posts. It also integrates with the ExerciseDB API to fetch exercise data.

---

## **Getting Started**

### **1. Prerequisites**
- Node.js v20+
- MongoDB installed locally or accessible remotely
- Git installed on your machine

---

### **2. Installation**
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/wefit-server.git
   cd wefit-server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following content:
   ```env
   MONGO_CONNECTION_STRING=mongodb://127.0.0.1:27017/your-db-name
   RAPIDAPI_KEY=your-rapidapi-key
   SESSION_SECRET=your-secret-key
   NETLIFY_URL=http://localhost:3000
   ```

4. Ensure MongoDB is running locally or remotely and accessible via the connection string.

---

### **3. Running the Server**
Start the server in development mode:
```bash
node index.js
```

Server will be available at `http://localhost:4000`.

---

## **Database Setup**

### **Manual JSON Import**
1. Export the JSON files for collections (`users.json`, `programs.json`, `enrollments.json`, `posts.json`, `exercises.json`) from the primary MongoDB database.
2. Share the JSON files in a `seed-data` folder within the repository.

#### **Steps to Import JSON into MongoDB**
- Use MongoDB Compass:
  1. Open Compass and connect to your local MongoDB instance.
  2. Select the `WeFit` database (or create it if it doesn’t exist).
  3. For each collection (`users`, `programs`, etc.):
     - Click "Add Data" → "Import File".
     - Choose the corresponding JSON file.
     - Click "Import".

- Verify that all collections (`users`, `programs`, `enrollments`, `posts`, `exercises`) are populated in MongoDB.

---

## **Features**

### **Endpoints**
Here are some key API endpoints:

#### **Users**
- `POST /api/users`: Create a new user.
- `POST /api/users/login`: Authenticate and generate a token.
- `GET /api/users/:userId`: Get user profile details.

#### **Programs**
- `GET /api/programs`: Get all programs.
- `PUT /api/programs/:programId/exercises`: Add an exercise to a program.

#### **Enrollments**
- `POST /api/enrollments`: Create a new enrollment.
- `PUT /api/enrollments/:enrollmentId/exercises/completed`: Mark an exercise as completed.
- `GET /api/enrollments/:enrollmentId/exercises/most-recent`: Get the most recently completed exercise.

#### **Posts**
- `POST /api/posts`: Create a new post.
- `PUT /api/posts/:postId/like`: Like a post.
- `PUT /api/posts/:postId/dislike`: Dislike a post.

### **Exercise Integration**
- The `importExercises.js` script fetches exercises from the ExerciseDB API and populates the `exercises` collection.

Run it with:
```bash
node importExercises.js
```

---

## **Front-End Integration**
- Ensure the front-end uses the same backend URL (`http://localhost:4000`).
- Share your `RAPIDAPI_KEY` securely for exercise-related API calls.

---

## **Contributing**
1. Clone the repository.
2. Create a new branch for your feature:
   ```bash
   git checkout -b feature/your-feature
   ```
3. Commit and push your changes:
   ```bash
   git add .
   git commit -m "Add your feature"
   git push origin feature/your-feature
   ```
4. Create a pull request.

---

## **Troubleshooting**

### Common Issues
1. **`Cannot connect to MongoDB`**:
   - Ensure MongoDB is running and accessible via the `MONGO_CONNECTION_STRING` in `.env`.

2. **`OverwriteModelError`**:
   - Ensure models are defined using `mongoose.models`.

3. **ExerciseDB API not working**:
   - Verify your `RAPIDAPI_KEY` in the `.env` file.

4. **Missing Collections**:
   - Ensure the JSON files are correctly imported into MongoDB.