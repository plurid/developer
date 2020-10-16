// #region imports
    // #region external
    import {
        resolveProject,
        readProjectConfiguration,
    } from '../../services/logic/project';
    // #endregion external
// #endregion imports



// #region module
const build = async (
    name: string,
) => {
    const project = await resolveProject(
        name,
    );

    if (!project) {
        console.log(`Could not resolve project.`);
        return;
    }

    const configurationData = await readProjectConfiguration(
        project,
    );

    console.log('configurationData', configurationData);
}
// #endregion module



// #region exports
export default build;
// #endregion exports
