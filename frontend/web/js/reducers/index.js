import { combineReducers } from 'redux';
import chatsReducer from './chatsReducer';
import messageReducer from './messageReducer';
import usersReducer from './usersReducer';



export default combineReducers({
    messageReducer,
    chatsReducer,
    usersReducer,
});