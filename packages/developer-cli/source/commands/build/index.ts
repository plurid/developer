// #region imports
    // #region external
    import {
        getProjectData,
    } from '../../services/logic/project';
    // #endregion external
// #endregion imports



// #region module
const build = async (
    name?: string,
) => {
    const configurationData = await getProjectData(
        name,
    );

    if (!configurationData) {
        return;
    }

    console.log('configurationData', configurationData);
}
// #endregion module



// #region exports
export default build;
// #endregion exports
