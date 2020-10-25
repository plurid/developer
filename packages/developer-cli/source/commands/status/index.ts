// #region imports
    // #region external
    import {
        verifyConnections,
    } from '#services/logic/connections';

    import {
        readConfiguration,
        getWorkerByID,
    } from '#services/utilities';
    // #endregion external
// #endregion imports



// #region module
const status = async () => {
    try {
        await verifyConnections();

        const configuration = await readConfiguration();

        const {
            machine,
            workers,
            connections,
        } = configuration;


        if (machine) {
            console.log(`\n\t'${machine}' developer machine`);
        }


        if (workers.length === 0) {
            console.log(`\n\tno developer configurations`);
        } else {
            console.log(`\n\tdeveloper configurations:`);

            for (const worker of workers) {
                const {
                    identonym,
                    server,
                    isDefault,
                    spaces,
                } = worker;

                const defaultString = isDefault ? ' [default]': '';

                console.log(`\t  - server '${server}' with identonym '${identonym}'${defaultString}`);

                if (spaces.length === 0) {
                    console.log(`\t  no spaces registered`);
                    continue;
                }

                console.log(`\t      spaces registered:`);

                for (const space of spaces) {
                    console.log(`\t        - ${space.identifier}`);
                }
            }
        }


        if (Object.values(connections).length === 0) {
            console.log(`\n\tno developer connections`);
        } else {
            console.log(`\n\tdeveloper connections:`);

            for (const connection of Object.values(connections)) {
                const {
                    port,
                    pid,
                    worker: workerID,
                } = connection;

                const worker = await getWorkerByID(workerID);

                if (!worker) {
                    continue;
                }

                console.log(`\t  - 'http://localhost:${port}' with pid '${pid}' for the server '${worker.server}' with identonym '${worker.identonym}'`);
            }
        }
    } catch (error) {
        console.log('Something went wrong.', error);
        return;
    }
}
// #endregion module



// #region exports
export default status;
// #endregion exports
