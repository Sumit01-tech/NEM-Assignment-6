const Library = require("../models/library.model");

// Validation Middleware
const validateBookData = (req, res, next) => {
    const { title, author } = req.body;
    if (!title || !author) {
        return res.status(400).json({ error: "Incomplete Data" });
    }
    next();
};

// Borrowing Limit Middleware
const checkBorrowLimit = async (req, res, next) => {
    const { borrowerName } = req.body;
    const borrowedCount = await Library.countDocuments({
        borrowerName,
        status: "borrowed"
    });

    if (borrowedCount >= 3) {
        return res.status(409).json({ error: "Borrow limit exceeded (max 3 books)" });
    }

    next();
};

// Prevent deletion of borrowed books
const ensureNotBorrowed = async (req, res, next) => {
    const book = await Library.findById(req.params.id);
    if (!book) return res.status(404).json({ error: "Book not found" });

    if (book.status === "borrowed") {
        return res.status(409).json({ error: "Cannot delete a borrowed book" });
    }

    next();
};

module.exports = {
    validateBookData,
    checkBorrowLimit,
    ensureNotBorrowed
};
