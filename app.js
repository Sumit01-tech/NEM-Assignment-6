const express = require("express");
const connectDB = require("./config/db");
const libraryRoutes = require("./routes/library.routes");
require("dotenv").config();

const app = express();
app.use(express.json());

app.use("/library", libraryRoutes);

connectDB();
app.listen(8009, () =>
    console.log("Server Started")
);
