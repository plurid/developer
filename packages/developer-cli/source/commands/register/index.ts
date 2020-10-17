// #region imports
    // #region external
    import {
        Configuration,
    } from '../../data/interfaces';

    import {
        readConfiguration,
    } from '../../services/logic/configurations';

    import {
        resolveProjectConfigurationPath,
    } from '../../services/logic/project';

    import {
        getConfiguration,
        updateConfiguration,
    } from '../../services/utilities';
    // #endregion external
// #endregion imports



// #region module
const register = async (
    configurationPath?: string,
) => {
    try {
        const configuration = await getConfiguration();

        if (!configuration) {
            console.log(`Could not read configuration file.`);
            return;
        }

        const projectConfigurationPath = await resolveProjectConfigurationPath(
            configurationPath,
        );

        if (!projectConfigurationPath) {
            console.log(`Could not read project configuration.`);
            return;
        }

        const {
            filePath,
            data,
        } = await readConfiguration(
            projectConfigurationPath,
        );

        const name = data.project + '//' + data.space;

        const project = {
            name,
            space: data.space,
            path: filePath,
        };

        const projects = [
            ...configuration.projects,
            {
                ...project,
            },
        ];

        const updatedConfiguration: Configuration = {
            ...configuration,
            projects: [
                ...projects,
            ],
        };

        await updateConfiguration(
            configuration.server,
            configuration.identonym,
            updatedConfiguration,
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
