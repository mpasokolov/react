import { combineReducers } from 'redux';
import chatsReducer from './chatsReducer';
import usersReducer from './usersReducer';

export default combineReducers({
    chatsReducer,
    usersReducer,
});