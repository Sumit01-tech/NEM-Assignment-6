const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    location: String,
    date: { type: Date, required: true }
});

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;
