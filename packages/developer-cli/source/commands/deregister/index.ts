// #region imports
    // #region external
    import {
        resolveConfigurationPath,
    } from '../../services/logic/configurations';

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
    const configuration = await getConfiguration();

    if (!configuration) {
        console.log(`Could not read configuration.`);
        return;
    }

    const filePath = resolveConfigurationPath(
        configurationPath || '',
    );

    const projects = configuration.projects.filter(
        project => project.path !== filePath,
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
}
// #endregion module



// #region exports
export default deregister;
// #endregion exports
