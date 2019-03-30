import update from 'react-addons-update';
import { CREATE_CHAT } from '../actions/chatsActions';

const initialStore = {
    chatsList: {
        1: {name: 'Chat #1'},
        2: {name: 'Chat #2'},
        3: {name: 'Chat #3'},
    },
};

export default function chatsReducer(store = initialStore, action) {
    switch (action.type) {
    case CREATE_CHAT: {
        const newChatsList = [...store.chatsList, action.text];
        return update(store, {
            chatsList: { $set: newChatsList },
        });
    }
    default:
        return store;
    }
}