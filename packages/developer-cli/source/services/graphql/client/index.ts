// #region imports
    // #region libraries
    import fetch from 'cross-fetch';

    import {
        ApolloClient,
        HttpLink,
        ApolloLink,
        InMemoryCache,
        from,
    } from '@apollo/client/core';
    // #endregion libraries


    // #region external
    import {
        DEVELOPER_COOKIE,
    } from '#data/constants';

    import {
        updateWorker,
    } from '#services/utilities/worker';
     // #endregion external
// #endregion imports



// #region module
const client = (
    uri: string,
    cookie?: string,
) => {
    const httpLink = new HttpLink({
        uri,
        credentials: 'include',
        fetch,
        headers: {
            Cookie: cookie,
        },
    });

    const afterwareLink = new ApolloLink(
        (
            operation,
            forward,
        ) => forward(operation).map((response) => {
            const context = operation.getContext();

            const {
                response: {
                    url,
                    headers,
                },
            } = context;

            if (!headers) {
                return response;
            }

            const cookie = headers.get('set-cookie');
            if (!cookie) {
                return response;
            }

            const {
                variables,
            } = operation;

            const identonym = variables.input.identonym;

            const split = cookie.split(';');
            const privateToken = split[0];
            if (!privateToken) {
                return response;
            }

            const privateTokenValue = privateToken.replace(DEVELOPER_COOKIE + '=', '');
            if (!privateTokenValue) {
                return response;
            }

            const data = {
                token: privateTokenValue,
                server: url,
                identonym,
            };

            updateWorker(
                url,
                identonym,
                data,
            );

            return response;
        })
    );

    return new ApolloClient({
        link: from([
            afterwareLink,
            httpLink,
        ]),
        cache: new InMemoryCache(),
    });
};
// #endregion module



// #region exports
export default client;
// #endregion exports
