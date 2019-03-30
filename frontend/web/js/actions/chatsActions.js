export const CREATE_CHAT = '@@chats/CREATE_CHAT';

export const createChat = (text) => ({
    type: CREATE_CHAT,
    text,
});