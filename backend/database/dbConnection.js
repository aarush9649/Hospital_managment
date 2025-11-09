import mongoose from "mongoose";

export const dbConnection = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Timeout fix
    })
    .then(() => {
      console.log("✅ MongoDB Atlas Connected Successfully!");
    })
    .catch((err) => {
      console.error("❌ MongoDB Connection Failed:", err.message);
      process.exit(1); // stop server if not connected
    });
};
