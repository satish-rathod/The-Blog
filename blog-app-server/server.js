// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import userRoutes from "./routes/userRoutes.js";
import blogPostRoutes from "./routes/blogPostRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import userProfileRoutes from "./routes/userProfileRoutes.js";
import featuredTrendingRoutes from "./routes/featuredTrendingRoutes.js";

dotenv.config();

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/posts", blogPostRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/profiles", userProfileRoutes);
app.use("/api/featured-trending", featuredTrendingRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
