require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRouter = require("./routes/userRoutes");

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// MongoDB Connection
const connectionString = "mongodb://127.0.0.1:27017/user-auth";
mongoose.connect(process.env.MONGO_URI || connectionString).then(() => {
  console.log("MongoDB Connected Successfully");
});

// Route
app.use("/api/auth", userRouter);

// Global Error Handler
app.use(async (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server Running on Port", PORT);
});
