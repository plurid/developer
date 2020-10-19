// #region imports
    // #region external
    import {
        getSpaceData,
        packageSpace,
        uploadArchive,
    } from '#services/logic/space';

    import {
        getServerURL,
    } from '#services/utilities';
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

        const serverURL = getServerURL(spaceData.worker.server);

        const uploadURL = serverURL + '/upload';

        // get upload link from the developer server
        await uploadArchive(
            archive,
            uploadURL,
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
