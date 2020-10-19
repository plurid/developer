// #region imports
    import {
        promises as fs,
    } from 'fs';

    // #region external
    import {
        getSpaceData,
        packageSpace,
        uploadArchive,
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

        // get upload link from the developer server
        await uploadArchive(
            archive,
            'http://localhost:56765/upload',
        );
    } catch (error) {
        console.log('Something went wrong.', error);
        return;
    }
}
// #endregion module



// #region exports
export default build;
// #endregion exports
