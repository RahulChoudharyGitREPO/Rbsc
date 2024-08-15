import React from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard';
import Login from './Component/Login';
import Register from './Component/Register';
import PrivateRoute from './Component/PrivateRoute';

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<PrivateRoute roles={['CREATOR']}><Dashboard /></PrivateRoute>} />
      </Routes>
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
      <Link to="/dashboard">Dashboard</Link>

    </div>
  );
};

export default App;
