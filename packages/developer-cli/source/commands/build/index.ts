// #region imports
    import {
        promises as fs,
    } from 'fs';

    // #region external
    import {
        getSpaceData,
        packageSpace,
    } from '#services/logic/space';
    // #endregion external
// #endregion imports



// #region module
const build = async (
    name?: string,
) => {
    try {
        const spaceData = await getSpaceData(
            name,
        );

        if (!spaceData) {
            return;
        }

        const archive = await packageSpace(spaceData);

        fs.writeFile('archive.zip', archive);
    } catch (error) {
        console.log('Something went wrong.', error);
        return;
    }
}
// #endregion module



// #region exports
export default build;
// #endregion exports
