// #region imports
    // #region external
    import {
        getSpaceData,
    } from '#services/logic/space';
    // #endregion external
// #endregion imports



// #region module
const run = async (
    name: string,
    project?: string,
) => {
    try {
        const spaceData = await getSpaceData(
            project,
        );

        if (!spaceData) {
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
