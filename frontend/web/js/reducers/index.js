import { combineReducers } from 'redux';
import chatsReducer from './chatsReducer';
import messageReducer from './messageReducer';


export default combineReducers({
    messageReducer,
    chatsReducer
});