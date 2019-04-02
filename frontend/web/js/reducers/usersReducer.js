import update from 'react-addons-update';
import { CHANGE_FIRST_NAME, CHANGE_LAST_NAME } from '../actions/usersActions';

const initialStore = {
    user: {firstName: 'Андрей', lastName: 'Соколов'},
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
    default:
        return store;
    }
}