import { SUCCESS_MESSAGE_UPLOADING, LITE_ON_CHAT, liteOnChat, liteOffChat } from '../actions/chatsActions';

export default store => next => (action) => {
    switch (action.type) {
    case SUCCESS_MESSAGE_UPLOADING:
        // setTimeout(() => {
        //     console.log(action.payload);
        //     store.dispatch(liteOnChat(action.payload.chat));
        // }, 2000);
        break;
    case LITE_ON_CHAT:
        setTimeout(() => {
            store.dispatch(liteOffChat(action.chatId));
        }, 200);
    }
    return next(action);
};

