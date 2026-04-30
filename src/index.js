import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import projectRoutes from "./routes/projects.js";
import messageRoutes from "./routes/messages.js";

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:8080",
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/messages", messageRoutes);

app.get("/api/health", (_req, res) => res.json({ status: "ok" }));

app.get("/api/health", (_req, res) => res.json({ status: "ok" }));

app.use((err, _req, res, _next) => {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({ message: err.message || "Internal server error" });
});

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`)),
  )
  .catch((err) => {
    console.error("DB connection failed:", err.message);
    process.exit(1);
  });
