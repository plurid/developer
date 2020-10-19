// #region imports
    // #region external
    import {
        DeveloperConfiguration,
        DeveloperWorker,
    } from '#data/interfaces';

    import {
        defaultDeveloperWorker,
    } from '#data/constants';

    import {
        readConfiguration,
        writeConfiguration,
    } from '#services/utilities/configuration';
    // #endregion external
// #endregion imports



// #region module
const writeWorkers = async (
    configuration: DeveloperConfiguration,
    workers: DeveloperWorker[],
) => {
    const updatedConfiguration: DeveloperConfiguration = {
        ...configuration,
        workers: [
            ...workers,
        ],
    };

    await writeConfiguration(updatedConfiguration);
}


const getDefaultWorker = async () => {
    const configuration = await readConfiguration();

    const {
        workers,
    } = configuration;

    if (workers.length === 0) {
        return;
    }

    if (workers.length === 1) {
        return workers[0];
    }

    for (const worker of workers) {
        if (worker.isDefault) {
            return worker;
        }
    }

    return workers[0];
}


const getWorker = async (
    server?: string,
    identonym?: string,
) => {
    if (!server || !identonym) {
        return await getDefaultWorker();
    }

    const configurations = await readConfiguration();

    const worker = configurations.workers.find(worker => {
        if (
            worker.server === server
            && worker.identonym === identonym
        ) {
            return true;
        }

        return false;
    });

    return worker;
}


const updateWorker = async (
    api: string,
    identonym: string,
    data: Partial<DeveloperWorker>,
) => {
    try {
        const configuration = await readConfiguration();

        const {
            workers,
        } = configuration;

        let updatedWorker = false;

        const updatedWorkers: DeveloperWorker[] = workers.map(worker => {
            if (
                worker.api === api
                && worker.identonym === identonym
            ) {
                updatedWorker = true;

                return {
                    ...worker,
                    ...data,
                };
            }

            return {
                ...worker,
            };
        });

        if (!updatedWorker) {
            updatedWorkers.push({
                ...defaultDeveloperWorker,
                ...data,
            });
        }

        await writeWorkers(
            configuration,
            updatedWorkers,
        );

        return true;
    } catch (error) {
        return false;
    }
}


const removeWorker = async (
    api?: string,
    identonym?: string,
) => {
    const configuration = await readConfiguration();

    let removedWorker = false;
    let updatedWorkers: DeveloperWorker[] = [];

    updatedWorkers = configuration.workers.filter(worker => {
        if (
            api === worker.api
            && identonym === worker.identonym
        ) {
            removedWorker = true;
            return false;
        }

        if (!api && !identonym && worker.isDefault) {
            removedWorker = true;
            return false;
        }

        return true;
    });

    if (!removedWorker) {
        updatedWorkers = updatedWorkers.slice(1);
    }

    await writeWorkers(
        configuration,
        updatedWorkers,
    );

    return;
}
// #endregion module



// #region exports
export {
    writeWorkers,
    getDefaultWorker,
    getWorker,
    updateWorker,
    removeWorker,
};
// #endregion exports
