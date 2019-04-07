import { apiMiddleware } from 'redux-api-middleware';
import chatsMiddlewares from './chatsMiddlewares';

export default [
    apiMiddleware,
    chatsMiddlewares,
];