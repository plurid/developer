// #region imports
    // #region libraries
    import {
        Application,
    } from 'express';

    import {
        ApolloServer,
    } from 'apollo-server-express';
    // #endregion libraries


    // #region external
    import {
        Context,
    } from '#server/data/interfaces';

    import {
        GRAPHQL_FAVICON,
        GRAPHQL_TITLE,
        GRAPHQL_ENDPOINT,

        logLevel,
        logLevels,
    } from '#server/data/constants';

    import {
        resolvers,
        schemas,
    } from '#server/api';

    import loadData from '#server/logic/loader';

    import defaultLogger from '#server/services/logger';

    import {
        getPrivateOwner,
    } from '#server/logic/privateUsage';
    // #endregion external
// #endregion imports



// #region module
const setupGraphQLServer = async (
    instance: Application,
) => {
    const playground = {
        faviconUrl: GRAPHQL_FAVICON,
        title: GRAPHQL_TITLE,
    };

    const logger = defaultLogger;

    const graphQLServer = new ApolloServer({
        typeDefs: schemas,
        resolvers,
        playground,
        context: async ({
            req,
            res,
        }: any) => {
            const privateOwnerIdentonym = await getPrivateOwner(req);

            const {
                projects,
                notifiers,
            } = await loadData(
                privateOwnerIdentonym,
            );

            const context: Context = {
                request: req,
                response: res,

                instance,

                projects,
                notifiers,

                privateOwnerIdentonym,

                logger,
                logLevel,
                logLevels,
            };

            return context;
        },
    });

    graphQLServer.applyMiddleware({
        app: instance,
        path: GRAPHQL_ENDPOINT,
    });
}
// #endregion module



// #region exports
export default setupGraphQLServer;
// #endregion exports
