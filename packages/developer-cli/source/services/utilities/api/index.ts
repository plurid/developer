// #region imports
    // #region external
    import {
        DEVELOPER_COOKIE,
    } from '../../../data/constants';

    import {
        client,
    } from '../../graphql';

    import {
        getConfiguration,
    } from '../configuration';
    // #endregion external
// #endregion imports



// #region module
const developerCookieFromToken = (
    token: string,
) => {
    return DEVELOPER_COOKIE + '=' + token;
}


const getDeveloper = async (
    server?: string,
    identonym?: string,
) => {
    const configuration = await getConfiguration(
        server,
        identonym,
    );

    if (!configuration) {
        return {
            developer: undefined,
            configuration: undefined,
        };
    }

    const {
        token,
    } = configuration;

    if (!token || !configuration.server) {
        return {
            developer: undefined,
            configuration: undefined,
        };
    }

    const cookie = developerCookieFromToken(token);

    const developer = client(
        configuration.server,
        cookie,
    );

    return {
        developer,
        configuration,
    };
}
// #endregion module



// #region exports
export {
    developerCookieFromToken,
    getDeveloper,
};
// #endregion exports
