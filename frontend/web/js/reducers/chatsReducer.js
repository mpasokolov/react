import update from 'react-addons-update';
import { CREATE_CHAT } from '../actions/chatsActions';

const initialStore = {
    chatsList: {
        1: {name: 'Chat #1'},
        2: {name: 'Chat #2'},
        3: {name: 'Chat #3'},
    },
    chatCount: 3
};

export default function chatsReducer(store = initialStore, action) {
    switch (action.type) {
    case CREATE_CHAT: {
        store.chatCount = store.chatCount + 1;
        const newChatsList = {...store.chatsList, [store.chatCount]: {name: action.text}};
        return update(store, {
            chatsList: { $set: newChatsList },
        });
    }
    default:
        return store;
    }
}