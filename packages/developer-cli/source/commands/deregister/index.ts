// #region imports
    // #region external
    import {
        DeveloperWorker,
        Space,
    } from '~data/interfaces';

    import {
        resolveSpaceConfigurationPath,
    } from '~services/logic/space';

    import {
        getWorker,
        updateWorker,
    } from '~services/utilities';
    // #endregion external
// #endregion imports



// #region module
const deregisterAction = async (
    worker: DeveloperWorker,
    deregisteredSpace: Space,
) => {
    const {
        identifier,
        spacePath,
        configurationPath,
    } = deregisteredSpace;

    const spaces = worker.spaces.filter(
        space => space.configurationPath !== configurationPath,
    );

    const updatedWorker = {
        ...worker,
        spaces,
    };

    await updateWorker(
        worker.api,
        worker.identonym,
        updatedWorker,
    );

    console.log(`\n\tDeregistered space\n\t'${identifier}'\n\tin '${spacePath}'\n`);
}


const deregister = async (
    configurationPath?: string,
    server?: string,
    identonym?: string,
) => {
    try {
        const worker = await getWorker(
            server,
            identonym,
        );

        if (!worker) {
            console.log(`Could not read worker configuration.`);
            return;
        }

        const spaceConfigurationPath = await resolveSpaceConfigurationPath(
            configurationPath,
        );

        if (!spaceConfigurationPath) {
            // Check if identifier match.
            const deregisteredSpace = worker.spaces.find(
                space => space.identifier === configurationPath,
            );

            if (deregisteredSpace) {
                await deregisterAction(
                    worker,
                    deregisteredSpace,
                );
                return;
            }

            console.log(`Could not read project configuration.`);
            return;
        }

        const deregisteredSpace = worker.spaces.find(
            space => space.configurationPath === spaceConfigurationPath,
        );

        if (!deregisteredSpace) {
            console.log(`\n\tCould not find space to deregister.`);
            return;
        }

        deregisterAction(
            worker,
            deregisteredSpace,
        );
    } catch (error) {
        console.log(error);
        console.log('Something went wrong.');
        return;
    }
}
// #endregion module



// #region exports
export default deregister;
// #endregion exports
