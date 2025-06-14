const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDB Connected to AdvancedEventDB");
    } catch (err) {
        console.error("Connection error:", err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
