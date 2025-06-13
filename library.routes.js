const express = require("express");
const {
    addBook,
    borrowBook,
    returnBook,
    getBooks,
    deleteBook
} = require("../controllers/library.controller");

const {
    validateBookData,
    checkBorrowLimit,
    ensureNotBorrowed
} = require("../middleware/library.middleware");

const router = express.Router();

router.post("/books", validateBookData, addBook);
router.patch("/borrow/:id", checkBorrowLimit, borrowBook);
router.patch("/return/:id", returnBook);
router.get("/books", getBooks);
router.delete("/books/:id", ensureNotBorrowed, deleteBook);

module.exports = router;
