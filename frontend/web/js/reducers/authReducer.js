import update from 'react-addons-update';
import {
    SUCCESS_LOGIN_UPLOADING,
    START_VALIDATE_TOKEN_UPLOADING,
    SUCCESS_VALIDATE_TOKEN_UPLOADING,
    ERROR_VALIDATE_TOKEN_UPLOADING,
} from '../actions/authActions';

const initialStore = {
    isTokenInValidate: false,
    isAuthorized: false,
    token: undefined
};

export default function usersReducer(store = initialStore, action) {
    switch (action.type) {
    case SUCCESS_LOGIN_UPLOADING: {
        return update(store, {
            isAuthorized: {$set: true},
            token: {$set: action.payload.token},
        });
    }
    case START_VALIDATE_TOKEN_UPLOADING: {
        return update(store, {
            isTokenInValidate: {$set: true},
        });
    }
    case SUCCESS_VALIDATE_TOKEN_UPLOADING: {
        return update(store, {
            isTokenInValidate: {$set: false},
            isAuthorized: {$set: true},
            token: {$set: action.payload.token},
        });
    }
    case ERROR_VALIDATE_TOKEN_UPLOADING: {
        document.cookie = '';
        return update(store, {
            isAuthorized: {$set: false},
            token: {$set: undefined},
        });
    }
    default:
        return store;
    }
}