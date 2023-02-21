import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../redux/Actions/auth';
import { isAuthenticated } from '../redux/Actions/auth';
const LoginForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const auth= useSelector(state=> state.auth);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login(email, password));
    };
    useEffect(()=> {
        if(isAuthenticated()) {
            navigate("/");
            return;
        }
        console.log("RRRRRR", auth);
    },[auth]);


    return (
        <div className="signup" style={{ width: "50%", margin: "auto" }}>
            <div style={{color: "red"}}>{auth.error}</div>
            <form onSubmit={handleSubmit}>
                <div className="mb-4 row">
                    <label className="col-sm-2 col-form-label" htmlFor="email">Email:</label>
                    <div className="col-sm-10">
                        <input className="form-control" id="inputNames" type="email" name="email" value={email} onChange={e => setEmail(e.target.value)} />
                    </div>
                </div>
                <div className="mb-4 row">
                    <label className="col-sm-2 col-form-label" htmlFor="password">Password:</label>
                    <div className="col-sm-10">
                        <input className="form-control" id="inputEmails" type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} />
                    </div>
                </div>
                <button type="submit">Log in</button>
            </form>
        </div>
    );
};

export default LoginForm;
