// #region imports
    // #region external
    import {
        Configuration,
    } from '../../data/interfaces';

    import {
        readConfiguration,
    } from '../../services/logic/configurations';

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
    const configuration = await getConfiguration();

    if (!configuration) {
        console.log(`Could not read configuration.`);
        return;
    }

    const data = await readConfiguration(
        configurationPath || '',
    );

    const name = data.project + '//' + data.space;

    const project = {
        name,
        space: data.space,
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
}
// #endregion module



// #region exports
export default register;
// #endregion exports
