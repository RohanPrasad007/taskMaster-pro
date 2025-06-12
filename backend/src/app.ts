import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";
import tasksRouter from "./routes/tasks";

const PORT = process.env.PORT || 5000;

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Task Manager API");
});

app.use("/api/v1/tasks", tasksRouter);

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
export default app;
