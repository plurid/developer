// #region imports
    // #region libraries
    import fetch from 'cross-fetch';

    import {
        ApolloClient,
        HttpLink,
        InMemoryCache,
    } from '@apollo/client';
    // #endregion libraries
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

    return new ApolloClient({
        link: httpLink,
        cache: new InMemoryCache(),
    });
};
// #endregion module



// #region exports
export default client;
// #endregion exports
