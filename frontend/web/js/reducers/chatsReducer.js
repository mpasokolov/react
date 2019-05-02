import update from 'react-addons-update';
import {
    SUCCESS_CHATS_LOADING,
    SUCCESS_CHAT_UPLOADING,
    SUCCESS_MESSAGE_UPLOADING,
    LITE_ON_CHAT,
    LITE_OFF_CHAT,
    ADD_MESSAGE
} from '../actions/chatsActions';


const initialStore = {
    defaultChat: undefined,
    chatsList: {},
    emptyChatList: true,
    isLoading: true,
    isLiteChat: '',
};

export default function chatsReducer(store = initialStore, action) {
    switch (action.type) {
    case SUCCESS_CHATS_LOADING: {
        let emptyChatList = !!action.payload.entities.chats;
        return update(store, {
            defaultChat: { $set: action.payload.result.chats[1] },
            chatsList: { $set: emptyChatList ? action.payload.entities.chats : {} },
            isLoading: { $set: false },
            emptyChatList: {$set: !emptyChatList}
        });
    }
    case SUCCESS_CHAT_UPLOADING: {
        const newChat = action.payload;
        newChat.messages = [];
        const newChatsList = {...store.chatsList, [action.payload.id]: newChat};
        return update(store, {
            chatsList: { $set: newChatsList},
            emptyChatList: { $set: false},
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
                    author_login: action.payload.author_login,
                    chat: action.payload.chatId
                }]
            } } },
        });
    }
    case ADD_MESSAGE: {
        const chatId = action.data.chat;
        return update(store, {
            chatsList: { $merge: { [chatId]: {
                id: store.chatsList[chatId].id,
                admin: store.chatsList[chatId].admin,
                name: store.chatsList[chatId].name,
                messages: [...store.chatsList[chatId].messages, {
                    text: action.data.text,
                    author: action.data.author,
                    author_login: action.data.author_login,
                    chat: action.data.chat
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