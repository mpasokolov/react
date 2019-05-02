import { combineReducers } from 'redux';
import chatsReducer from './chatsReducer';
import usersReducer from './usersReducer';
import authReducer from './authReducer';

export default combineReducers({
    chatsReducer,
    usersReducer,
    authReducer
});