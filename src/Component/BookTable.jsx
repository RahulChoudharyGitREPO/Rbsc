import React from 'react';
import bookService from '../services/bookService';
import authService from '../services/authService';

const BookTable = ({ books, onDelete, onEdit }) => {
    const currentUser = authService.getCurrentUser();

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this book?')) {
            bookService.deleteBook(id)
                .then(() => onDelete())
                .catch(error => console.error('Error deleting book:', error));
        }
    };

    const handleEdit = (id) => {
        const title = prompt('Enter new title:');
        const author = prompt('Enter new author:');
        if (title && author) {
            bookService.updateBook(id, title, author)
                .then(() => onEdit())
                .catch(error => console.error('Error editing book:', error));
        }
    };

    return (
        <table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Created By</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {books.map(book => (
                    <tr key={book._id}>
                        <td>{book.title}</td>
                        <td>{book.author}</td>
                        <td>{book.createdBy.name}</td>
                        <td>
                            {currentUser.roles.includes('CREATOR') && (
                                <>
                                    <button onClick={() => handleEdit(book._id)}>Edit</button>
                                    <button onClick={() => handleDelete(book._id)}>Delete</button>
                                </>
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default BookTable;
