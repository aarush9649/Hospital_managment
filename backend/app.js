import express from "express";
import { dbConnection } from "./database/dbConnection.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import fileUpload from "express-fileupload";
import { errorMiddleware } from "./middlewares/error.js"; // ✅ Ye line sahi hai
import messageRouter from "./router/messageRouter.js";
import userRouter from "./router/userRouter.js";
import appointmentRouter from "./router/appointmentRouter.js";

const app = express();
config({ path: "./config.env" });

app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:5174", 
    "http://localhost:3000"
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"]
}));

app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: "/tmp/",
  limits: { fileSize: 5 * 1024 * 1024 },
}));

app.use("/api/v1/message", messageRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/appointment", appointmentRouter);

app.get("/api/v1/health", (req, res) => {
  res.json({ 
    success: true, 
    message: "Server is running healthy! ✅",
    timestamp: new Date().toISOString()
  });
});

dbConnection();
app.use(errorMiddleware); // ✅ Ye bhi sahi hai

export default app;