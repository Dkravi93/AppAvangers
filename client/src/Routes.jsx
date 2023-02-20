import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import LoginForm from './components/LoginForm';
import BookForm from './components/BookForm';
import PrivateComponent from './components/PrivateComponent';
import SignUp from './components/SignUp';
const AllRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/" element={<Dashboard />} />
            <Route element={<PrivateComponent />}>
                <Route path="/form" element={<BookForm />} />
            </Route>
        </Routes>
    );
};

export default AllRoutes;
