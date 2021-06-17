// #region imports
    // #region libraries
    import {
        gql,
    } from '@apollo/client/core';
    // #endregion libraries
// #endregion imports



// #region module
const LOGIN = gql`
    mutation Login($input: InputLogin!) {
        login(input: $input) {
            status
            error {
                type
                path
                message
            }
            data {
                id
            }
        }
    }
`;


const GET_UPLOAD_TOKEN = gql`
    query GetUploadToken($input: InputGetUploadToken!) {
        getUploadToken(input: $input) {
            status
            error {
                type
                path
                message
            }
            data {
                token
            }
        }
    }
`;
// #endregion module



// #region exports
export {
    LOGIN,
    GET_UPLOAD_TOKEN,
};
// #endregion exports
