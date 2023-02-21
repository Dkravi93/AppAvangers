import React from "react";
import './DropDown.css';
import { useNavigate } from "react-router-dom";

const Dropdown = ({ onSelect }) => {
    const navigate = useNavigate();
    const handleSelect = (event) => {
        onSelect(event.target.value);
    };

    return (
        <div className="dropdowns">
            <div className="dropbtn">
                <div className="d-flex align-items-center gap-2">
                    <div>
                        <img src="src/assets/user-3296.png" alt="user" />
                    </div>
                    <div>My Account</div>
                </div>
            </div>
            <div className="dropdowns-content">
                <button onClick={()=> navigate('/login')} className="w-100 p-1">Login</button>
                <a href="/signup">New to BooksWagon? <br/> Sign Up</a>
            </div>
        </div>
    );
};

export default Dropdown;
