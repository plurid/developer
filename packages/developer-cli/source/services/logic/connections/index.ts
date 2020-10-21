// #region imports
    // #region external
    import {
        DeveloperWorker,
        DeveloperConnection,
    } from '#data/interfaces';

    import {
        readConfiguration,
        updateConfiguration,
        getWorker,
    } from '#services/utilities';
    // #endregion external
// #endregion imports



// #region module
const saveConnection = async (
    pid: number,
    port: number,
    worker: DeveloperWorker,
) => {
    const configuration = await readConfiguration();

    const connections = {
        ...configuration.connections,
    };
    connections[port] = {
        port,
        pid,
        worker: worker.id,
    };

    await updateConfiguration({
        connections,
    });
}


const getConnection = async (
    server?: string,
    identonym?: string,
    port?: string,
) => {
    const configuration = await readConfiguration();

    const {
        connections,
    } = configuration;

    if (port) {
        const connection: DeveloperConnection | undefined = connections[port];

        return connection;
    }

    if (
        server
        && identonym
    ) {
        for (const [_, connection] of Object.entries(connections)) {
            const worker = await getWorker(connection.worker);

            if (!worker) {
                continue;
            }

            if (
                worker.server === server
                && worker.identonym === identonym
            ) {
                return connection;
            }
        }
    }

    return Object.values(connections)[0];
}


const removeConnection = async (
    server?: string,
    identonym?: string,
    port?: string,
) => {
    const configuration = await readConfiguration();

    const {
        connections,
    } = configuration;

    if (port) {
        const updatedConnections = {
            ...connections,
        };

        delete updatedConnections[port];

        await updateConfiguration({
            connections: {
                ...updatedConnections,
            },
        });

        return;
    }

    if (
        server
        && identonym
    ) {
        let port;

        for (const [key, connection] of Object.entries(connections)) {
            const worker = await getWorker(connection.worker);

            if (!worker) {
                continue;
            }

            if (
                worker.server === server
                && worker.identonym === identonym
            ) {
                port = key;
                break;
            }
        }

        const updatedConnections = {
            ...connections,
        };

        if (port) {
            delete updatedConnections[port];
        }

        await updateConfiguration({
            connections: {
                ...updatedConnections,
            },
        });

        return;
    }


    const connection = Object.values(connections)[0];

    if (!connection) {
        return;
    }

    const updatedConnections = {
        ...connections,
    };

    delete updatedConnections[connection.port];

    await updateConfiguration({
        connections: {
            ...updatedConnections,
        },
    });

    return;
}
// #endregion module



// #region exports
export {
    saveConnection,
    getConnection,
    removeConnection,
};
// #endregion exports
