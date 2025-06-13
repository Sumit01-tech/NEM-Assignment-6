const validateTask = (req, res, next) => {
    const { title, description, priority } = req.body;

    if (!title || !description || !priority) {
        return res.status(400).json({ error: "Incomplete Data Received" });
    }

    const allowedPriorities = ["low", "medium", "high"];
    if (!allowedPriorities.includes(priority)) {
        return res.status(400).json({ error: "Invalid priority value" });
    }

    next();
};

module.exports = { validateTask };
