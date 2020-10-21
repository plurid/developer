// #region imports
    // #region libraries
    import {
        execSync,
    } from 'child_process';
    // #endregion libraries


    // #region external
    import {
        getConnection,
        removeConnection,
    } from '#services/logic/connections';
    // #endregion external
// #endregion imports



// #region module
const stop = async (
    server?: string,
    identonym?: string,
    port?: string,
) => {
    try {
        const connection = await getConnection(
            server,
            identonym,
            port,
        );

        if (!connection) {
            return;
        }

        console.log('connection', connection);

        const command = `kill -9 ${connection.pid}`;

        execSync(command);

        await removeConnection(
            server,
            identonym,
            port,
        );

        console.log('\n\tdeveloper stopped\n');
    } catch (error) {
        console.log('Something went wrong.');
        return;
    }
}
// #endregion module



// #region exports
export default stop;
// #endregion exports
