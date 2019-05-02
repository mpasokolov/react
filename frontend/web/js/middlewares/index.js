import { apiMiddleware } from 'redux-api-middleware';
import chatsMiddlewares from './chatsMiddlewares';
import userMiddlewares from './usersMiddlewares';
import authMiddlewares from './authMiddlewares';

export default [
    apiMiddleware,
    authMiddlewares,
    chatsMiddlewares,
    //userMiddlewares
];