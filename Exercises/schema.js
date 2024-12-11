// import mongoose from "mongoose";

// const schema = new mongoose.Schema(
//     {
//       exerciseId: { type: String, required: true, unique: true },
//       name: { type: String, required: true },
//       target: { type: String, required: true },
//       equipment: { type: String, required: true },
//       gifUrl: { type: String, required: true },
//     },
//     { collection: "exercises", timestamps: true }
//   );
//   export default schema;

import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    exerciseId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    target: { type: String, required: true },
    equipment: { type: String, required: true },
    gifUrl: { type: String, required: true },
  },
  { collection: "exercises", timestamps: true }
);

export default schema;
