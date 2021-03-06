import { SUCCESS_LOGIN_UPLOADING, SUCCESS_VALIDATE_TOKEN_UPLOADING, ERROR_VALIDATE_TOKEN_UPLOADING, getDataFromJWTToken } from '../actions/usersActions';
import { setCookie, deleteCookie, getCookie } from '../components/Cockie';
import jwt_decode from 'jwt-decode';

export default store => next => (action) => {
    switch (action.type) {
    case SUCCESS_LOGIN_UPLOADING:
        setCookie('jwt_token', action.payload.token, {
            expires: jwt_decode(action.payload.token).exp - Math.floor(Date.now() / 1000),
        });
        store.dispatch(getDataFromJWTToken(jwt_decode(action.payload.token)));
        break;
    case ERROR_VALIDATE_TOKEN_UPLOADING:
        deleteCookie('jwt_token');
        break;
    case SUCCESS_VALIDATE_TOKEN_UPLOADING:
        store.dispatch(getDataFromJWTToken(jwt_decode(getCookie('jwt_token'))));
    }
    return next(action);
};

