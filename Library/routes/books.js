const express = require('express');
const auth = require('../middleware/auth');
const roles = require('../middleware/roles');
const Book = require('../models/Book');
const router = express.Router();

router.get('/', auth, async (req, res) => {
    const { old, new: isNew } = req.query;

    try {
        let query = {};
        if (isNew === '1') {
            query.createdAt = { $gte: new Date(Date.now() - 10 * 60 * 1000) };
        } else if (old === '1') {
            query.createdAt = { $lt: new Date(Date.now() - 10 * 60 * 1000) };
        }

        if (req.user.roles.includes('VIEW_ALL')) {
            const books = await Book.find(query).populate('createdBy', 'name');
            res.json(books);
        } else if (req.user.roles.includes('VIEWER')) {
            query.createdBy = req.user._id;
            const books = await Book.find(query).populate('createdBy', 'name');
            res.json(books);
        } else {
            res.status(403).json({ message: 'Access denied' });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/', auth, roles('CREATOR'), async (req, res) => {
    const { title, author } = req.body;

    try {
        const book = new Book({ title, author, createdBy: req.user._id });
        await book.save();
        res.json(book);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
});

router.delete('/:id', auth, roles('CREATOR'), async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        if (book.createdBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        await book.remove();
        res.json({ message: 'Book removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
});

router.put('/:id', auth, roles('CREATOR'), async (req, res) => {
    const { title, author } = req.body;

    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        if (book.createdBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        book.title = title || book.title;
        book.author = author || book.author;

        await book.save();
        res.json(book);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
