export const CHANGE_FIRST_NAME = '@@user/CHANGE_FIRST_NAME';

export const firstNameEdit = (name) => ({
    type: CHANGE_FIRST_NAME,
    name,
});

export const CHANGE_LAST_NAME = '@@user/CHANGE_LAST_NAME';

export const lastNameEdit = (name) => ({
    type: CHANGE_LAST_NAME,
    name,
});