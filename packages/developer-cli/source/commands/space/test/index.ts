// #region imports
    // #region external
    import {
        checkExecutionContext,
    } from '#services/logic/execution';

    import {
        getConnection,
    } from '#services/logic/connections';

    import {
        getSpaceData,
    } from '#services/logic/space';
    // #endregion external
// #endregion imports



// #region module
const test = async (
    name: string,
    server: string | undefined,
    identonym: string | undefined,
    path: string | undefined,
    environment: string | undefined,
) => {
    try {
        const execute = await checkExecutionContext(
            server,
            identonym,
        );

        if (!execute) {
            console.log(`\n\tcould not test, no developer connection\n`);
            return;
        }


        const spaceData = await getSpaceData(
            name,
            server,
            identonym,
        );

        if (!spaceData) {
            console.log(`\n\tcould not build, no registered space '${name}'\n`);
            return;
        }


        const connection = await getConnection(
            spaceData.worker.server,
            spaceData.worker.identonym,
        );

        if (!connection) {
            console.log('\n\tcould not test, no developer connection\n');
            return;
        }
    } catch (error) {
        console.log('Something went wrong.');
        return;
    }
}
// #endregion module



// #region exports
export default test;
// #endregion exports
