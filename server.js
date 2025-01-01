import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/autRoutes.js";
import candidateRoutes from "./routes/candidateRoutes.js";
import { isAdmin, requireSignIn } from "./middleware/authMiddleware.js";

// config env
dotenv.config();
// config database
connectDB();
// rest obj
const app = express();

// middleware
app.use(express.json());
app.use(morgan("dev"));
// rest api
app.get("/", requireSignIn, isAdmin, (req, res) => {
  res.send("server is connected");
});
// routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/candidate", candidateRoutes);
// port
const PORT = process.env.PORT || 3000;
// run listen
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
