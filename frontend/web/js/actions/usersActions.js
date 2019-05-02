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

export const GET_USER_DATA_FROM_JWT_TOKEN = '@@user/GET_USER_DATA_FROM_JWT_TOKEN';

export const getDataFromJWTToken = (data) => ({
    type: GET_USER_DATA_FROM_JWT_TOKEN,
    data,
});