// #region imports
    // #region external
    import {
        getProjectData,
    } from '../../services/logic/project';
    // #endregion external
// #endregion imports



// #region module
const run = async (
    name: string,
    project?: string,
) => {
    try {
        const configurationData = await getProjectData(
            project,
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
export default run;
// #endregion exports
