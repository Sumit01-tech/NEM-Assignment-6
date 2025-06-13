const express = require("express");
const Task = require("../models/Task.model");
const router = express.Router();

// Create Task
router.post("/", async (req, res) => {
    try {
        const task = new Task(req.body);
        await task.save();
        res.status(201).send(task);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

// Get All Tasks (with optional filter)
router.get("/", async (req, res) => {
    const filter = {};
    if (req.query.status) filter.status = req.query.status;
    if (req.query.dueDate) filter.dueDate = { $lte: new Date(req.query.dueDate) };

    try {
        const tasks = await Task.find(filter);
        res.status(200).send(tasks);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Update Task by ID
router.patch("/:id", async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedTask) return res.status(404).send("Task not found");
        res.send(updatedTask);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

// Delete Task
router.delete("/:id", async (req, res) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id);
        if (!deletedTask) return res.status(404).send("Task not found");
        res.send({ message: "Task deleted successfully" });
    } catch (err) {
        res.status(400).send(err.message);
    }
});

module.exports = router;
