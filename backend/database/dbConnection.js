import mongoose from "mongoose";

export const dbConnection = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("✅ Connected to MongoDB Atlas database!");
    })
    .catch((err) => {
      console.error("❌ Database connection error:", err);
    });
};
