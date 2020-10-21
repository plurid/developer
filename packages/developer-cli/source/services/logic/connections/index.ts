// #region imports
    // #region external
    import {
        DeveloperWorker,
        DeveloperConnection,
    } from '#data/interfaces';

    import {
        readConfiguration,
        updateConfiguration,
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
        worker,
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
        !server
        && !identonym
    ) {
        for (const [_, connection] of Object.entries(connections)) {
            if (
                connection.worker.server === server
                && connection.worker.identonym === identonym
            ) {
                return connection;
            }
        }
    }

    return;
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
    }

    if (
        !server
        && !identonym
    ) {
        let port;

        for (const [key, connection] of Object.entries(connections)) {
            if (
                connection.worker.server === server
                && connection.worker.identonym === identonym
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
    }

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
