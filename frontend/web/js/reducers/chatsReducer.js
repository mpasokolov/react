import update from 'react-addons-update';
import {SUCCESS_CHATS_LOADING, SUCCESS_CHAT_UPLOADING, SUCCESS_MESSAGE_UPLOADING, LITE_ON_CHAT, LITE_OFF_CHAT} from '../actions/chatsActions';


const initialStore = {
    chatsList: {},
    isLoading: true,
    isLiteChat: '',
};

export default function chatsReducer(store = initialStore, action) {
    switch (action.type) {
    case SUCCESS_CHATS_LOADING: {
        return update(store, {
            chatsList: { $set: action.payload.entities.chats },
            isLoading: { $set: false }
        });
    }
    case SUCCESS_CHAT_UPLOADING: {
        const newChat = action.payload;
        newChat.messages = [];
        const newChatsList = {...store.chatsList, [action.payload.id]: newChat};
        return update(store, {
            chatsList: { $set: newChatsList},
        });
    }
    case SUCCESS_MESSAGE_UPLOADING: {
        const chatId = action.payload.chat;
        return update(store, {
            chatsList: { $merge: { [chatId]: {
                id: store.chatsList[chatId].id,
                admin: store.chatsList[chatId].admin,
                name: store.chatsList[chatId].name,
                messages: [...store.chatsList[chatId].messages, {
                    text: action.payload.text,
                    author: action.payload.author,
                    chat: action.payload.chatId
                }]
            } } },
        });
    }
    case LITE_ON_CHAT: {
        return update(store, {
            isLiteChat: {$set: action.chatId}
        });
    }
    case LITE_OFF_CHAT: {
        return update(store, {
            isLiteChat: {$set: ''}
        });
    }
    default:
        return store;
    }
}