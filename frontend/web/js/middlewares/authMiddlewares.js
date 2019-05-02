import { SUCCESS_LOGIN_UPLOADING, SUCCESS_VALIDATE_TOKEN_UPLOADING, ERROR_VALIDATE_TOKEN_UPLOADING,  } from '../actions/authActions';
import { getDataFromJWTToken } from '../actions/usersActions';
import { setCookie, deleteCookie, getCookie } from '../components/Cockie';
import jwt_decode from 'jwt-decode';

export default store => next => (action) => {
    switch (action.type) {
    case SUCCESS_LOGIN_UPLOADING: {
        const decodedToken = jwt_decode(action.payload.token);
        const tokenExpire = decodedToken.exp - Math.floor(Date.now() / 1000);
        setCookie('jwt_token', action.payload.token, {
            expires: tokenExpire,
        });
        store.dispatch(getDataFromJWTToken(decodedToken));
        break;
    }
    case ERROR_VALIDATE_TOKEN_UPLOADING:
        deleteCookie('jwt_token');
        break;
    case SUCCESS_VALIDATE_TOKEN_UPLOADING:
        store.dispatch(getDataFromJWTToken(jwt_decode(getCookie('jwt_token'))));
    }
    return next(action);
};