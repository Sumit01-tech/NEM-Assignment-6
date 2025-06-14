const express = require("express");
const connectDB = require("./config/db");
const taskRoutes = require("./routes/task.routes");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use("/tasks", taskRoutes);

// DB + Server
connectDB();
app.listen(PORT, () => {
    console.log("Server Started");
});
