const express = require("express");
const Event = require("../models/Event.model");
const router = express.Router();

// Create event
router.post("/", async (req, res) => {
    try {
        const event = new Event(req.body);
        await event.save();
        res.status(201).send(event);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

// Get all events or filter by title
router.get("/", async (req, res) => {
    const filter = {};
    if (req.query.title) filter.title = new RegExp(req.query.title, "i");

    try {
        const events = await Event.find(filter);
        res.status(200).send(events);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Update event by ID
router.patch("/:id", async (req, res) => {
    try {
        const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedEvent) return res.status(404).send("Event not found");
        res.send(updatedEvent);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

// Delete event
router.delete("/:id", async (req, res) => {
    try {
        const deleted = await Event.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).send("Event not found");
        res.send({ message: "Event deleted successfully" });
    } catch (err) {
        res.status(400).send(err.message);
    }
});

module.exports = router;
