import { LOGIN_SUCCESS, LOGIN_FAILURE, SIGNUP_SUCCESS, SIGNUP_FAILURE, LOGOUT_SUCCESS, UPDATE_USER } from '../Actions/auth';

const initialState = {
    token: null,
    user: null,
    error: null,
    isAuthenticated: false
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_USER : 
            return  {
                ...state,
                token: action.payload.token,
                user: action.payload.data,
                isAuthenticated: true,
                error: null,
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                token: action.payload.token,
                user: action.payload.data,
                isAuthenticated: true,
                error: null,
            };
        case SIGNUP_SUCCESS:
            return {
                ...state,
                token: action.payload.token,
                user: action.payload.data,
                isAuthenticated: true,
                error: null,
            };

        case LOGIN_FAILURE:
            return {
                ...state,
                token: null,
                user: null,
                error: action.payload
            };
        case SIGNUP_FAILURE:
            return {
                ...state,
                token: null,
                user: null,
                error: action.payload,
            };
        case LOGOUT_SUCCESS:
            return {
                ...state,
                token: null,
                user: null,
                isAuthenticated: false,
                error: null,
            };
        default:
            return state;
    }
};

export default authReducer;