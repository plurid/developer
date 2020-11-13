// #region imports
    // #region external
    import {
        verifyConnections,
    } from '#services/logic/connections';

    import {
        readConfiguration,
    } from '#services/utilities/configuration';

    import {
        getWorkerByID,
    } from '#services/utilities/worker';
    // #endregion external
// #endregion imports



// #region module
const checkExecutionContext = async (
    server?: string,
    identonym?: string,
) => {
    await verifyConnections();

    const configurationData = await readConfiguration();

    const {
        connections,
    } = configurationData;

    if (Object.values(connections).length === 0) {
        return;
    }

    if (server && identonym) {
        for (const connection of Object.values(connections)) {
            const worker = await getWorkerByID(connection.worker);

            if (!worker) {
                continue;
            }

            if (
                server === worker.server
                && identonym === worker.identonym
            ) {
                return true;
            }
        }
    }

    return true;
}
// #endregion module



// #region exports
export {
    checkExecutionContext,
};
// #endregion exports
