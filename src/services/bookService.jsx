import axios from 'axios';
import authHeader from './authHeaders';

const API_URL = '/api/books/';

const getBooks = (filter = '') => {
    return axios.get(API_URL + filter, { headers: authHeader() });
};

const createBook = (title, author) => {
    return axios.post(API_URL, { title, author }, { headers: authHeader() });
};

const updateBook = (id, title, author) => {
    return axios.put(API_URL + id, { title, author }, { headers: authHeader() });
};

const deleteBook = (id) => {
    return axios.delete(API_URL + id, { headers: authHeader() });
};

export default {
    getBooks,
    createBook,
    updateBook,
    deleteBook,
};
