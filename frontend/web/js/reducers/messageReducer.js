import update from 'react-addons-update';
import { SEND_MESSAGE, REPLY_MESSAGE, INIT_STORE } from '../actions/messageActions';

const initialStore = {
    messages: {},
};

export default function messageReducer(store = initialStore, action) {
    switch (action.type) {
    case SEND_MESSAGE: {
        let newMessages = Object.assign({}, store.messages);
        if(!newMessages.hasOwnProperty(action.chatId)){
            newMessages[action.chatId] = [];
        }
        newMessages[action.chatId] = [...newMessages[action.chatId], {text: action.text, sender: 'me'}];

        return update(store, {
            messages: { $set: newMessages },
        });
    }
    case REPLY_MESSAGE: {
        let newMessages = Object.assign({}, store.messages);
        if(!newMessages.hasOwnProperty(action.chatId)){
            newMessages[action.chatId] = [];
        }
        newMessages[action.chatId] = [...newMessages[action.chatId], {text: 'Отстань, я робот', sender: 'bot'}];
        return update(store, {
            messages: { $set: newMessages },
        });
    }
    case INIT_STORE: {
        let newMessages = Object.assign({}, store.messages);
        if(!newMessages.hasOwnProperty(action.chatId)){
            newMessages[action.chatId] = [];
        }

        return update(store, {
            messages: { $set: newMessages },
        });
    }
    default:
        return store;
    }
}