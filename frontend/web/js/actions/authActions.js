import {CALL_API, getJSON} from 'redux-api-middleware';

export const START_LOGIN_UPLOADING = '@@auth/START_LOGIN_UPLOADING';
export const SUCCESS_LOGIN_UPLOADING = '@@auth/SUCCESS_LOGIN_UPLOADING';
export const ERROR_LOGIN_UPLOADING = '@@auth/ERROR_LOGIN_UPLOADING';

export const login = (data) => ({
    [CALL_API]: {
        credentials: 'include',
        endpoint: 'http://react-git:7888/api/v1/users/login',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        types: [
            {
                type: START_LOGIN_UPLOADING,
            },
            {
                type: SUCCESS_LOGIN_UPLOADING,
                payload: (action, state, res) => getJSON(res).then(
                    json => json
                ),
            },
            ERROR_LOGIN_UPLOADING,
        ],
    },
});

export const START_VALIDATE_TOKEN_UPLOADING = '@@auth/START_VALIDATE_TOKEN_UPLOADING';
export const SUCCESS_VALIDATE_TOKEN_UPLOADING = '@@auth/SUCCESS_VALIDATE_TOKEN_UPLOADING';
export const ERROR_VALIDATE_TOKEN_UPLOADING = '@@auth/ERROR_VALIDATE_TOKEN_UPLOADING';

export const validateToken = (token) => ({
    [CALL_API]: {
        credentials: 'include',
        endpoint: 'http://react-git:7888/api/v1/users/validate-token',
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        types: [
            {
                type: START_VALIDATE_TOKEN_UPLOADING,
            },
            {
                type: SUCCESS_VALIDATE_TOKEN_UPLOADING,
                payload: (action, state, res) => getJSON(res).then(
                    json => json
                ),
            },
            ERROR_VALIDATE_TOKEN_UPLOADING,
        ],
    },
});