const Event = require("../models/event.model");

// POST: Create new event
const createEvent = async (req, res) => {
    try {
        const { title, description, date } = req.body;

        const newEvent = new Event({
            title,
            description,
            date,
            maxCapacity: 300,
            eventCapacity: 0,
            isFull: false
        });

        await newEvent.save();
        res.status(201).json(newEvent);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// GET: Retrieve all or filter by title
const getEvents = async (req, res) => {
    const filter = {};
    if (req.query.title) {
        filter.title = new RegExp(req.query.title, "i");
    }

    try {
        const events = await Event.find(filter);
        res.json(events);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// PATCH: Update general fields (not date or maxCapacity)
const updateEvent = async (req, res) => {
    const { id } = req.params;
    const { title, description, date, maxCapacity } = req.body;

    if (date || maxCapacity) {
        return res.status(400).send("Cannot update date or maxCapacity");
    }

    try {
        const updated = await Event.findByIdAndUpdate(
            id,
            { title, description },
            { new: true }
        );
        if (!updated) return res.status(404).send("Event not found");
        res.json(updated);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// PATCH: Increment event capacity
const updateCapacity = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).send("Event not found");

        event.eventCapacity += 1;
        if (event.eventCapacity >= event.maxCapacity) {
            event.isFull = true;
        }
        await event.save();
        res.json(event);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// DELETE: Delete event if date not passed
const deleteEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).send("Event not found");

        const currentDate = new Date();
        if (new Date(event.date) < currentDate) {
            return res.status(400).send("Cannot delete past events");
        }

        await Event.findByIdAndDelete(req.params.id);
        res.json({ message: "Event deleted" });
    } catch (err) {
        res.status(500).send(err.message);
    }
};

module.exports = {
    createEvent,
    getEvents,
    updateEvent,
    updateCapacity,
    deleteEvent
};
