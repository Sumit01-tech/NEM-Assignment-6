const express = require("express");
const connectDB = require("./config/db");
const taskRoutes = require("./routes/task.routes");
require("dotenv").config();

const app = express();
app.use(express.json());

app.use("/tasks", taskRoutes);

connectDB();
app.listen(8008, () => {
    console.log("Server Started");
});
