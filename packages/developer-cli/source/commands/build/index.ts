// #region imports
    // #region external
    import {
        getSpaceData,
        packageSpace,
        uploadArchive,
    } from '#services/logic/space';

    import {
        getConnection,
    } from '#services/logic/connections';

    import {
        pollServer,
    } from '#services/logic/poll';

    import {
        readConfiguration,
    } from '#services/utilities/configuration';
    // #endregion external
// #endregion imports



// #region module
const build = async (
    name?: string,
) => {
    try {
        const configurationData = await readConfiguration();

        if (Object.values(configurationData.connections).length === 0) {
            console.log('\n\tcould not build, no developer connection\n');
            return;
        }


        const spaceData = await getSpaceData(
            name,
        );

        if (!spaceData) {
            console.log('\n\tcould not build, no space data\n');
            return;
        }


        const connection = await getConnection(
            spaceData.worker.server,
            spaceData.worker.identonym,
        );

        if (!connection) {
            console.log('\n\tcould not build, no developer connection\n');
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

        if (!upload.status) {
            return;
        }

        const id = upload.data;

        pollServer(
            id,
            spaceData.worker.id,
            connection,
        );
    } catch (error) {
        console.log('\n\tsomething went wrong', error);
        return;
    }
}
// #endregion module



// #region exports
export default build;
// #endregion exports
