// #region imports
    // #region external
    import {
        getProjectData,
    } from '../../services/logic/project';
    // #endregion external
// #endregion imports



// #region module
const preview = async (
    name?: string,
) => {
    const configurationData = await getProjectData(
        name,
    );

    if (!configurationData) {
        return;
    }
}
// #endregion module



// #region exports
export default preview;
// #endregion exports
