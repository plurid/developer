// #region imports
    // #region external
    import {
        verifyConnections,
    } from '#services/logic/connections';

    import {
        readConfiguration,
    } from '#services/utilities/configuration';
    // #endregion external
// #endregion imports



// #region module
const checkExecutionContext = async () => {
    await verifyConnections();

    const configurationData = await readConfiguration();

    if (Object.values(configurationData.connections).length === 0) {
        return;
    }

    return true;
}
// #endregion module



// #region exports
export {
    checkExecutionContext,
};
// #endregion exports
