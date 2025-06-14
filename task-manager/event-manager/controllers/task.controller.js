const Task = require("../models/task.model");

// Create Task
const createTask = async (req, res) => {
    try {
        const task = new Task(req.body);
        await task.save();
        res.status(201).send(task);
    } catch (err) {
        res.status(400).send(err.message);
    }
};

// Get All Tasks
const getTasks = async (req, res) => {
    const filter = {};
    if (req.query.priority) filter.priority = req.query.priority;
    if (req.query.status === "completed") filter.isCompleted = true;
    else if (req.query.status === "pending") filter.isCompleted = false;

    try {
        const tasks = await Task.find(filter);
        res.send(tasks);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// Update Task
const updateTask = async (req, res) => {
    try {
        const updates = req.body;

        if (updates.isCompleted === true) {
            updates.completionDate = new Date();
        }

        const task = await Task.findByIdAndUpdate(req.params.id, updates, {
            new: true,
        });

        if (!task) return res.status(404).send("Task not found");
        res.send(task);
    } catch (err) {
        res.status(400).send(err.message);
    }
};

// Bulk Delete Tasks by Priority
const deleteTasks = async (req, res) => {
    try {
        const { priority } = req.query;
        if (!priority) return res.status(400).send("Priority is required for deletion");

        const result = await Task.deleteMany({ priority });
        res.send({ message: `${result.deletedCount} task(s) deleted` });
    } catch (err) {
        res.status(500).send(err.message);
    }
};

module.exports = {
    createTask,
    getTasks,
    updateTask,
    deleteTasks,
};
