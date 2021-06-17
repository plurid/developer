// #region imports
    // #region libraries
    import gql from 'graphql-tag';
    // #endregion libraries
// #endregion imports



// #region module
export const GENERATE_PROJECT = gql`
    mutation GenerateProject($input: InputValueString!) {
        generateProject(input: $input) {
            status
            error {
                type
                path
                message
            }
            data {
                id
                name
            }
        }
    }
`;


export const OBLITERATE_PROJECT = gql`
    mutation ObliterateProject($input: InputValueString!) {
        obliterateProject(input: $input) {
            status
            error {
                type
                path
                message
            }
        }
    }
`;


export const GENERATE_NOTIFIER = gql`
    mutation GenerateNotifier($input: InputGenerateNotifier!) {
        generateNotifier(input: $input) {
            status
            error {
                type
                path
                message
            }
            data {
                id
                name
                notifyOn
                type
                data
            }
        }
    }
`;


export const OBLITERATE_NOTIFIER = gql`
    mutation ObliterateNotifier($input: InputValueString!) {
        obliterateNotifier(input: $input) {
            status
            error {
                type
                path
                message
            }
        }
    }
`;


export const GENERATE_WORKER = gql`
    mutation GenerateWorker($input: InputGenerateWorker!) {
        generateWorker(input: $input) {
            status
            error {
                type
                path
                message
            }
            data {
                id
                name
            }
        }
    }
`;


export const OBLITERATE_WORKER = gql`
    mutation ObliterateWorker($input: InputValueString!) {
        obliterateWorker(input: $input) {
            status
            error {
                type
                path
                message
            }
        }
    }
`;


export const LOGIN = gql`
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


export const LOGOUT = gql`
    mutation Logout {
        logout {
            status
            error {
                type
                path
                message
            }
        }
    }
`;
// #endregion module
