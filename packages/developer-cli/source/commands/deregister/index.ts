// #region imports
    // #region external
    import {
        resolveSpaceConfigurationPath,
    } from '#services/logic/space';

    import {
        getWorker,
        updateWorker,
    } from '#services/utilities';
    // #endregion external
// #endregion imports



// #region module
const deregister = async (
    configurationPath?: string,
) => {
    try {
        const worker = await getWorker();

        if (!worker) {
            console.log(`Could not read worker file.`);
            return;
        }

        const spaceConfigurationPath = await resolveSpaceConfigurationPath(
            configurationPath,
        );

        if (!spaceConfigurationPath) {
            console.log(`Could not read project configuration.`);
            return;
        }

        const spaces = worker.spaces.filter(
            space => space.path !== spaceConfigurationPath,
        );

        const updatedWorker = {
            ...worker,
            spaces,
        };

        await updateWorker(
            worker.server,
            worker.identonym,
            updatedWorker,
        );
    } catch (error) {
        console.log('Something went wrong.');
        return;
    }
}
// #endregion module



// #region exports
export default deregister;
// #endregion exports
