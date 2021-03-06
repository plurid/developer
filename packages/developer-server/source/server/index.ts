// #region imports
    // #region libraries
    import PluridServer, {
        PluridServerMiddleware,
        PluridServerService,
        PluridServerPartialOptions,
        PluridServerTemplateConfiguration,
    } from '@plurid/plurid-react-server';
    // #endregion libraries


    // #region external
    import helmet from '~kernel-services/helmet';

    import reduxStore from '~kernel-services/state/store';
    import reduxContext from '~kernel-services/state/context';
    import apolloClient from '~kernel-services/graphql/client';

    import {
        shell,
        routes,
    } from '~shared/index';

    import {
        APPLICATION_ROOT,
    } from '~shared/data/constants';
    // #endregion external


    // #region internal
    import preserves from './preserves';

    import setupHandlers from './handlers';
    // #endregion internal
// #endregion imports



// #region module
/** ENVIRONMENT */
const watchMode = process.env.PLURID_WATCH_MODE === 'true';
const isProduction = process.env.ENV_MODE === 'production';
const buildDirectory = process.env.PLURID_BUILD_DIRECTORY || 'build';
const port = process.env.PORT || 63000;



/** CONSTANTS */
const openAtStart = watchMode
    ? false
    : isProduction
        ? false
        : true;

const quiet = false;
// const debug = isProduction
//     ? 'info'
//     : 'error';
const debug = 'info';

const usePTTP = false;



/** Custom styles to be loaded into the template. */
const styles: string[] = [
    //
];


/** Express-like middleware. */
const middleware: PluridServerMiddleware[] = [
    //
];


/** Services to be used in the application. */
const services: PluridServerService[] = [
    /** uncomment to use services */
    {
        name: 'Apollo',
        package: '@apollo/client',
        provider: 'ApolloProvider',
        properties: {
            client: apolloClient,
        },
    },
    {
        name: 'Redux',
        package: 'react-redux',
        provider: 'Provider',
        properties: {
            store: reduxStore({}),
            context: reduxContext,
        },
    },
];


const options: PluridServerPartialOptions = {
    buildDirectory,
    open: openAtStart,
    quiet,
    debug,
    serverName: 'Developer Server',
    ignore: [
        '/developer',
        '/download/*',
    ],
};

const template: PluridServerTemplateConfiguration = {
    root: APPLICATION_ROOT,
};



/** SERVER */
// generate server
const developerServer = new PluridServer({
    helmet,
    shell,
    routes,
    preserves,
    styles,
    middleware,
    services,
    options,
    template,
    usePTTP,
});


const developerSetup = () => {
    setupHandlers(
        developerServer,
    );
}


/**
 * If the file is called directly, as in `node build/index.js`,
 * it will run the server.
 *
 * The check is in place so that the server can also be imported
 * for programmatic usage.
 */
if (require.main === module) {
    developerSetup();

    developerServer.start(port);
}
// #endregion module



// #region exports
export {
    developerSetup,
};

export default developerServer;
// #endregion exports
