const express = require("express");
const {
    createEvent,
    getEvents,
    updateEvent,
    updateCapacity,
    deleteEvent
} = require("../controllers/event.controller");
const {
    validateEventData,
    checkEventCapacity
} = require("../middleware/event.middleware");

const router = express.Router();

router.post("/", validateEventData, createEvent);
router.get("/", getEvents);
router.patch("/:id", updateEvent);
router.patch("/update/:id", checkEventCapacity, updateCapacity);
router.delete("/:id", deleteEvent);

module.exports = router;
