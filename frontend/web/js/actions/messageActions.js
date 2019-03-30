export const SEND_MESSAGE = '@@message/SEND_MESSAGE';

export const sendMessage = (chatId, text) => ({
    type: SEND_MESSAGE,
    chatId,
    text,
});

export const REPLY_MESSAGE = '@@message/REPLY_MESSAGE';

export const replyMessage = (chatId) => ({
    type: REPLY_MESSAGE,
    chatId
});

export const INIT_STORE = '@@message/INIT_STORE';

export const initStore = (chatId) => ({
    type: INIT_STORE,
    chatId
});
