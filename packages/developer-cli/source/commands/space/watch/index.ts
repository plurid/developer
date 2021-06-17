// #region imports
    // #region external
    import {
        readEnvironment,
    } from '~services/logic/environment';

    import {
        checkExecutionContext,
    } from '~services/logic/execution';

    import {
        getConnection,
    } from '~services/logic/connections';

    import {
        getSpaceData,
    } from '~services/logic/space';
    // #endregion external
// #endregion imports



// #region module
const watch = async (
    name: string,
    server: string | undefined,
    identonym: string | undefined,
    environment: string | undefined,
) => {
    try {
        const environmentData = await readEnvironment(environment);

        if (environment && !environmentData) {
            console.log(`\n\tcould not read environment file\n`);

            return;
        }

        const execute = await checkExecutionContext(
            server,
            identonym,
        );

        if (!execute) {
            console.log(`\n\tcould not watch, no developer connection\n`);
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
            console.log('\n\tcould not watch, no developer connection\n');
            return;
        }
    } catch (error) {
        console.log('Something went wrong.');
        return;
    }
}
// #endregion module



// #region exports
export default watch;
// #endregion exports
