import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
export const UPDATE_USER = 'UPDATE_USER';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';

export const login = (email, password) => async (dispatch) => {
  try {
   await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password}),
    })
      .then(response => response.json())
      .then(data => {
        if(data.status) {
          dispatch({ type: LOGIN_SUCCESS, payload: data });
          localStorage.setItem('data', JSON.stringify(data));
        }else if(data.message) {
          dispatch({ type: LOGIN_FAILURE, payload: data.message });
        }
      })
      .catch(error => {
        dispatch({ type: LOGIN_FAILURE, payload: error.message });
      })
      .finally(() => {
        console.log('login process finished.');
      });
  } catch (error) {
    dispatch({ type: LOGIN_FAILURE, payload: error.message });
  }
};

export const logout = () => async (dispatch) => {
  try {
    dispatch({ type: LOGOUT_SUCCESS });
  } catch (error) {
    dispatch({ type: LOGOUT_FAILURE, payload: error.message });
  }
};

export const signup = ({ name, email, password, passwordConfirm }) => async (dispatch) => {
  try {
    if (password !== passwordConfirm) {
      dispatch({ type: SIGNUP_FAILURE, payload: 'Passwords does not match' });
      return
    } else if (password.length <= 7) {
      dispatch({ type: SIGNUP_FAILURE, payload: "password length should be greater than 7" });
      return
    }
    await fetch('http://localhost:3000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password, passwordConfirm }),
    })
      .then(response => response.json())
      .then(data => {
        dispatch({ type: SIGNUP_SUCCESS, payload: data });
        localStorage.setItem("data", JSON.stringify(data));
      })
      .catch(error => {
        dispatch({ type: SIGNUP_FAILURE, payload: error.message });
      })
      .finally(() => {
        console.log('Sign up process finished.');
      });
  } catch (error) {
    dispatch({ type: SIGNUP_FAILURE, payload: error.message });
  }
};

export const isAuthenticated = () => {
  const data = JSON.parse(localStorage.getItem('data')) || null;
  if (!data) {
    return false;
  }

  try {
    const decoded = jwt_decode(data.token);

    if (decoded.exp < Date.now() / 1000) {
      return false;
    }
    return true;
  } catch (error) {
    return false;
  }
};