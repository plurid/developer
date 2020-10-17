// #region imports
    // #region external
    import {
        getSpaceData,
    } from '#services/logic/space';
    // #endregion external
// #endregion imports



// #region module
const lint = async (
    name?: string,
) => {
    try {
        const spaceData = await getSpaceData(
            name,
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
export default lint;
// #endregion exports
