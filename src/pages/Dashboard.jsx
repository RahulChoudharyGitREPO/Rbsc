import React from 'react';
import BookList from '../Component/BookList';
import BookForm from '../Component/BookForm';
import authService from '../services/authService';

const Dashboard = () => {
    const currentUser = authService.getCurrentUser();

    return (
        <div>
            <h1>Dashboard</h1>
            {currentUser.roles.includes('CREATOR') && <BookForm onAdd={() => window.location.reload()} />}
            <BookList />
        </div>
    );
};

export default Dashboard;
