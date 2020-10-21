// #region imports
    // #region external
    import {
        readConfiguration,
        getWorkerByID,
    } from '#services/utilities';
    // #endregion external
// #endregion imports



// #region module
const status = async () => {
    try {
        const configuration = await readConfiguration();

        if (configuration.workers.length === 0) {
            console.log(`\n\tNo developer configurations.\n`);
            return;
        }

        const {
            workers,
            connections,
        } = configuration;

        console.log(`\n\tDeveloper configurations:`);

        for (const worker of workers) {
            const {
                identonym,
                server,
                isDefault,
                spaces,
            } = worker;

            const defaultString = isDefault ? ' [default]': '';

            console.log(`\n\t${server} - ${identonym}${defaultString}`);

            if (spaces.length === 0) {
                console.log(`\t  no spaces registered`);
                continue;
            }

            for (const space of spaces) {
                console.log(`\t  ${space.identifier}`);
            }
        }

        console.log(`\n\tDeveloper connections:`);

        if (Object.values(connections).length === 0) {
            console.log(`\t  no connections`);
        }

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

            console.log(`\t  http://localhost:${port} - ${pid} - ${worker.server} - ${worker.identonym}`);
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
