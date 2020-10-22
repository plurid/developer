// #region imports
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

        const uploadURL = spaceData.worker.server + '/upload';

        const configuration = JSON.stringify(spaceData.data);

        const command = 'build';

        const upload = await uploadArchive(
            archive,
            uploadURL,
            configuration,
            command,
        );

        // poll the cli server for the status of uploadID
    } catch (error) {
        console.log('Something went wrong.', error);
        return;
    }
}
// #endregion module



// #region exports
export default build;
// #endregion exports
