import React, { useState } from 'react';
import bookService from '../services/bookService';

const BookForm = ({ onAdd }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        bookService.createBook(title, author)
            .then(() => {
                setTitle('');
                setAuthor('');
                onAdd();
            })
            .catch(error => console.error('Error adding book:', error));
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Title:</label>
                <input type="text" value={title} onChange={e => setTitle(e.target.value)} required />
            </div>
            <div>
                <label>Author:</label>
                <input type="text" value={author} onChange={e => setAuthor(e.target.value)} required />
            </div>
            <button type="submit">Add Book</button>
        </form>
    );
};

export default BookForm;
