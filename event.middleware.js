// Data validation middleware
const validateEventData = (req, res, next) => {
    const { title, description, date } = req.body;
    if (!title || !description || !date) {
        return res.status(400).json({ error: "Incomplete Data Received" });
    }
    next();
};

// Event full check middleware for capacity update
const checkEventCapacity = async (req, res, next) => {
    const Event = require("../models/event.model");
    const { id } = req.params;

    try {
        const event = await Event.findById(id);
        if (!event) return res.status(404).send("Event not found");

        if (event.eventCapacity + 1 > event.maxCapacity) {
            return res.status(400).json({ error: "MaxCapacity Reached" });
        }

        next();
    } catch (err) {
        res.status(500).send(err.message);
    }
};

module.exports = { validateEventData, checkEventCapacity };
