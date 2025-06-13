const express = require("express");
const connectDB = require("./config/db");
const eventRoutes = require("./routes/event.routes");
require("dotenv").config();

const app = express();
app.use(express.json());

app.use("/events", eventRoutes);

connectDB();
app.listen(8007, () => {
    console.log("Server Started");
});
