// #region imports
    // #region external
    import {
        getProjectData,
    } from '../../services/logic/project';
    // #endregion external
// #endregion imports



// #region module
const lint = async (
    name?: string,
) => {
    try {
        const configurationData = await getProjectData(
            name,
        );

        if (!configurationData) {
            return;
        }
    } catch (error) {
        console.log('Something went wrong.');
        return;
    }
}
// #endregion module



// #region exports
export default lint;
// #endregion exports
