const Library = require("../models/library.model");

// Add Book
const addBook = async (req, res) => {
    try {
        const book = new Library({ ...req.body, status: "available" });
        await book.save();
        res.status(201).json({ message: "Book added", book });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Borrow Book
const borrowBook = async (req, res) => {
    try {
        const book = await Library.findById(req.params.id);
        if (!book) return res.status(404).json({ error: "Book not found" });

        if (book.status !== "available") {
            return res.status(409).json({ error: `Book is currently ${book.status}` });
        }

        const borrowDate = new Date();
        const dueDate = new Date(borrowDate);
        dueDate.setDate(dueDate.getDate() + 14);

        book.status = "borrowed";
        book.borrowerName = req.body.borrowerName;
        book.borrowDate = borrowDate;
        book.dueDate = dueDate;

        await book.save();
        res.status(200).json({ message: "Book borrowed", book });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Return Book
const returnBook = async (req, res) => {
    try {
        const book = await Library.findById(req.params.id);
        if (!book || book.status !== "borrowed") {
            return res.status(404).json({ error: "Book not found or not borrowed" });
        }

        const today = new Date();
        let fees = 0;

        if (today > book.dueDate) {
            const diffTime = Math.ceil((today - book.dueDate) / (1000 * 60 * 60 * 24));
            fees = diffTime * 10; // ₹10 per day
        }

        book.status = "available";
        book.returnDate = today;
        book.overdueFees = fees;
        book.borrowerName = null;
        book.borrowDate = null;
        book.dueDate = null;

        await book.save();
        res.status(200).json({ message: "Book returned", book });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get Books
const getBooks = async (req, res) => {
    const filter = {};
    if (req.query.status) filter.status = req.query.status;
    if (req.query.title) filter.title = new RegExp(req.query.title, "i");

    try {
        const books = await Library.find(filter);
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete Book
const deleteBook = async (req, res) => {
    try {
        const deleted = await Library.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ error: "Book not found" });

        res.status(200).json({ message: "Book deleted", deleted });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    addBook,
    borrowBook,
    returnBook,
    getBooks,
    deleteBook
};
