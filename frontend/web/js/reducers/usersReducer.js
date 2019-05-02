import update from 'react-addons-update';
import {
    CHANGE_FIRST_NAME,
    CHANGE_LAST_NAME,
    GET_USER_DATA_FROM_JWT_TOKEN
} from '../actions/usersActions';

const initialStore = {
    user: undefined,
};

export default function usersReducer(store = initialStore, action) {
    switch (action.type) {
    case CHANGE_FIRST_NAME: {
        let newUser = Object.assign({}, store.user);
        newUser.firstName = action.name;
        return update(store, {
            user: {$set: newUser},
        });
    }
    case CHANGE_LAST_NAME: {
        let newUser = Object.assign({}, store.user);
        newUser.lastName = action.name;
        return update(store, {
            user: {$set: newUser},
        });
    }
    case GET_USER_DATA_FROM_JWT_TOKEN: {
        return update(store, {
            user: {$set: action.data.user}
        });
    }
    default:
        return store;
    }
}