// #region imports
    // #region external
    import {
        DEVELOPER_COOKIE,
    } from '#data/constants';

    import {
        client,
    } from '#services/graphql';

    import {
        getWorker,
    } from '#services/utilities/worker';
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
    const worker = await getWorker(
        server,
        identonym,
    );

    if (!worker) {
        return {
            developer: undefined,
            worker: undefined,
        };
    }

    const {
        token,
    } = worker;

    if (!token || !worker.server) {
        return {
            developer: undefined,
            worker: undefined,
        };
    }

    const cookie = developerCookieFromToken(token);

    const developer = client(
        worker.server,
        cookie,
    );

    return {
        developer,
        worker,
    };
}
// #endregion module



// #region exports
export {
    developerCookieFromToken,
    getDeveloper,
};
// #endregion exports
