// #region imports
    // #region external
    import {
        readConfiguration,
        updateConfiguration,
    } from '#services/utilities';
    // #endregion external
// #endregion imports



// #region module
const saveConnection = async (
    pid: number,
    port: number,
) => {
    const configuration = await readConfiguration();

    const connections = {
        ...configuration.connections,
    };
    connections[port] = {
        pid,
        worker: '',
    };

    await updateConfiguration({
        connections,
    });
}
// #endregion module



// #region exports
export {
    saveConnection,
};
// #endregion exports
