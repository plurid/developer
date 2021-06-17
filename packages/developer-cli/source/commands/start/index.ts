// #region imports
    // #region external
    import {
        serverStart,
    } from '#services/logic/server';

    import {
        saveConnection,
    } from '#services/logic/connections';

    import {
        getWorker,
    } from '#services/utilities';
    // #endregion external
// #endregion imports



// #region module
const start = async (
    server?: string,
    identonym?: string,
) => {
    try {
        const worker = await getWorker(
            server,
            identonym,
        );
        if (!worker) {
            return;
        }

        const data = await serverStart();
        if (!data) {
            return;
        }

        const {
            pid,
            port,
        } = data;
        if (!pid) {
            return;
        }

        await saveConnection(
            pid,
            port,
            worker,
        );

        console.log('\n\tdeveloper started\n');
    } catch (error) {
        console.log('Something went wrong.', error);
        return;
    }
}
// #endregion module



// #region exports
export default start;
// #endregion exports
