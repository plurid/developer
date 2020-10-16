// #region imports
    // #region external
    import {
        getProjectData,
        packageProject,
    } from '../../services/logic/project';
    // #endregion external
// #endregion imports



// #region module
const build = async (
    name?: string,
) => {
    try {
        const projctData = await getProjectData(
            name,
        );

        if (!projctData) {
            return;
        }

        const archive = await packageProject(projctData);
    } catch (error) {
        console.log('Something went wrong.');
        return;
    }
}
// #endregion module



// #region exports
export default build;
// #endregion exports
