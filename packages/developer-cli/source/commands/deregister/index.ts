// #region imports
    // #region external
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
const deregister = async (
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

        const projects = configuration.projects.filter(
            project => project.path !== projectConfigurationPath,
        );

        const updatedConfiguration = {
            ...configuration,
            projects,
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
export default deregister;
// #endregion exports
