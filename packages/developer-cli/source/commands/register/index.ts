// #region imports
    // #region external
    import {
        DeveloperWorker,
        Space,
    } from '#data/interfaces';

    import {
        readConfiguration,
    } from '#services/logic/configurations';

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
const register = async (
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
            console.log(`Could not read project space.`);
            return;
        }

        const {
            filePath,
            data,
        } = await readConfiguration(
            spaceConfigurationPath,
        );

        const identifier = data.project + '//' + data.space;

        const space: Space = {
            identifier,
            project: data.project,
            name: data.space,
            path: filePath,
        };

        const spaces: Space[] = [
            ...worker.spaces,
            {
                ...space,
            },
        ];

        const updatedWorker: DeveloperWorker = {
            ...worker,
            spaces: [
                ...spaces,
            ],
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
export default register;
// #endregion exports
