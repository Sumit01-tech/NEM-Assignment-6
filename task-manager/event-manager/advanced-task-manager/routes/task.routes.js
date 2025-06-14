const express = require("express");
const {
    createTask,
    getTasks,
    updateTask,
    deleteTasks,
} = require("../controllers/task.controller");
const { validateTask } = require("../middleware/task.middleware");

const router = express.Router();

router.post("/", validateTask, createTask);
router.get("/", getTasks);
router.patch("/:id", validateTask, updateTask);
router.delete("/", deleteTasks);

module.exports = router;
