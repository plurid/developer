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

        const {
            identifier,
            spacePath,
        } = deregisteredSpace;

        const spaces = worker.spaces.filter(
            space => space.configurationPath !== spaceConfigurationPath,
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
    } catch (error) {
        console.log('Something went wrong.');
        return;
    }
}
// #endregion module



// #region exports
export default deregister;
// #endregion exports
