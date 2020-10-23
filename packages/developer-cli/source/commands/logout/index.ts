// #region imports
    // #region external
    import {
        getWorker,
        removeWorker,
        extractServerName,
    } from '#services/utilities';
    // #endregion external
// #endregion imports



// #region module
const logout = async (
    server?: string,
    identonym?: string,
    obliterate?: boolean,
) => {
    const configuration = await getWorker(
        server,
        identonym,
    );

    if (!configuration) {
        return;
    }

    if (!configuration.server) {
        console.log(`Not logged into a developer server.`);
        return;
    }

    await removeWorker(
        configuration.api,
        configuration.identonym,
        obliterate,
    );

    const serverName = extractServerName(configuration.api);

    console.log(`Logged out identonym '${configuration.identonym}' from the developer server '${serverName}'.`);
}
// #endregion module



// #region exports
export default logout;
// #endregion exports
