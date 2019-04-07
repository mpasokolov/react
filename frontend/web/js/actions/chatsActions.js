import { CALL_API, getJSON } from 'redux-api-middleware';
import { chats } from '../utils/shema';
import { normalize } from 'normalizr';

export const START_CHATS_LOADING = '@@chats/START_CHATS_LOADING';
export const SUCCESS_CHATS_LOADING = '@@chats/SUCCESS_CHATS_LOADING';
export const ERROR_CHATS_LOADING = '@@chats/ERROR_CHATS_LOADING';

export const loadChats = () => ({
    [CALL_API]: {
        credentials: 'include',
        endpoint: 'api/v1/chats?fields=id,admin,name&expand=messages',
        method: 'GET',
        types: [
            START_CHATS_LOADING,
            {
                type: SUCCESS_CHATS_LOADING,
                payload: (action, state, res) => getJSON(res).then(
                    json => normalize(json, [chats])
                ),
            },
            ERROR_CHATS_LOADING,
        ],
    },
});

export const START_CHAT_UPLOADING = '@@chats/START_CHAT_UPLOADING';
export const SUCCESS_CHAT_UPLOADING = '@@chats/SUCCESS_CHAT_UPLOADING';
export const ERROR_CHAT_UPLOADING = '@@chats/ERROR_CHAT_UPLOADING';

export const createChat = (data) => ({
    [CALL_API]: {
        credentials: 'include',
        endpoint: 'http://react-git:7888/api/v1/chats',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        types: [
            {
                type: START_CHAT_UPLOADING,
                payload: () => data
            },
            {
                type: SUCCESS_CHAT_UPLOADING,
                payload: (action, state, res) => getJSON(res).then(
                    json => json
                ),
            },
            ERROR_CHAT_UPLOADING,
        ],
    },
});

export const START_MESSAGE_UPLOADING = '@@chats/START_MESSAGE_UPLOADING';
export const SUCCESS_MESSAGE_UPLOADING = '@@chats/SUCCESS_MESSAGE_UPLOADING';
export const ERROR_MESSAGE_UPLOADING = '@@chats/ERROR_MESSAGE_UPLOADING';

export const createMessage = (data) => ({
    [CALL_API]: {
        credentials: 'include',
        endpoint: 'http://react-git:7888/api/v1/messages',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        types: [
            {
                type: START_MESSAGE_UPLOADING,
                payload: () => data
            },
            {
                type: SUCCESS_MESSAGE_UPLOADING,
                payload: (action, state, res) => getJSON(res).then(
                    json => json
                ),
            },
            ERROR_MESSAGE_UPLOADING,
        ],
    },
});

export const LITE_ON_CHAT = '@@message/LITE_ON_CHAT';

export const liteOnChat = (chatId) => ({
    type: LITE_ON_CHAT,
    chatId
});

export const LITE_OFF_CHAT = '@@message/LITE_OFF_CHAT';

export const liteOffChat = (chatId) => ({
    type: LITE_OFF_CHAT,
    chatId
});