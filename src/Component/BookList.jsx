import React, { useEffect, useState } from 'react';
import bookService from '../services/bookService';
import BookTable from './BookTable';

const BookList = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        loadBooks();
    }, []);

    const loadBooks = () => {
        bookService.getBooks()
            .then(response => {
                setBooks(response.data);
            })
            .catch(error => {
                console.error('Error fetching books:', error);
            });
    };

    return (
        <div>
            <h2>Books List</h2>
            <BookTable books={books} onDelete={loadBooks} onEdit={loadBooks} />
        </div>
    );
};

export default BookList;
