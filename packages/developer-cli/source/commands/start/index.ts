// #region imports
    // #region external
    import {
        serverStart,
    } from '#services/logic/server';

    import {
        saveConnection,
    } from '#services/logic/connections';
    // #endregion external
// #endregion imports



// #region module
const start = async (
    server?: string,
    identonym?: string,
) => {
    try {
        const data = await serverStart();

        if (!data) {
            return;
        }

        const {
            pid,
            port,
        } = data;

        await saveConnection(
            pid,
            port,
        );

        console.log('developer start');
    } catch (error) {
        console.log('Something went wrong.', error);
        return;
    }
}
// #endregion module



// #region exports
export default start;
// #endregion exports
