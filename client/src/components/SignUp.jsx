import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signup } from '../redux/Actions/auth';

const SignUp = () => {
    const dispatch = useDispatch();
    const { error, isAuthenticated } = useSelector(state =>state.auth);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        passwordConfirm: '',
    });

    const { name, email, password, passwordConfirm } = formData;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(signup({ name, email, password,passwordConfirm }));
    };
    if(isAuthenticated) {
        navigate("/")
    }

    return (
        <div className="signup" style={{ width: "50%", margin: "auto" }}>
            <p style={{color: "red"}}>{error}</p>
            <form onSubmit={handleSubmit}>
                <div className="mb-4 row">
                    <label className="col-sm-2 col-form-label" htmlFor="name">Name:</label>
                    <div className="col-sm-10">
                        <input className="form-control" type="text" name="name" value={name} onChange={handleChange} />
                    </div>
                </div>
                <div className="mb-4 row">
                    <label className="col-sm-2 col-form-label" htmlFor="email">Email:</label>
                    <div className="col-sm-10">
                        <input className="form-control" type="email" name="email" value={email} onChange={handleChange} />
                    </div>
                </div>
                <div className="mb-4 row">
                    <label className="col-sm-2 col-form-label" htmlFor="password">Password:</label>
                    <div className="col-sm-10">
                        <input className="form-control" id="inputPassword" type="password" name="password" value={password} onChange={handleChange} />
                    </div>
                </div>
                <div className="mb-4 row">
                    <label className="col-sm-2 col-form-label" htmlFor="password">Confirm Password:</label>
                    <div className="col-sm-10">
                        <input className="form-control" id="inputPasswordConfirm" type="password" name="passwordConfirm" value={passwordConfirm} onChange={handleChange} />
                    </div>
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default SignUp;
