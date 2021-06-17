// #region imports
    // #region external
    import {
        checkExecutionContext,
    } from '~services/logic/execution';

    import {
        getConnection,
    } from '~services/logic/connections';

    import {
        getSpaceData,
        packageSpace,
        uploadArchive,
    } from '~services/logic/space';
    // #endregion external
// #endregion imports



// #region module
const lint = async (
    name?: string,
    server?: string,
    identonym?: string,
    path?: string,
) => {
    try {
        const execute = await checkExecutionContext(
            server,
            identonym,
        );

        if (!execute) {
            console.log(`\n\tcould not lint, no developer connection\n`);
            return;
        }


        const spaceData = await getSpaceData(
            name,
            server,
            identonym,
        );

        if (!spaceData) {
            console.log(`\n\tcould not build, no registered space '${name}'\n`);
            return;
        }


        const connection = await getConnection(
            spaceData.worker.server,
            spaceData.worker.identonym,
        );

        if (!connection) {
            console.log('\n\tcould not lint, no developer connection\n');
            return;
        }


        const archive = await packageSpace(spaceData);
        const uploadURL = spaceData.worker.server + '/upload';
        const configuration = JSON.stringify(spaceData.data);
        const command = 'lint';
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

        console.log('lint id', id);
    } catch (error) {
        console.log('Something went wrong.');
        return;
    }
}
// #endregion module



// #region exports
export default lint;
// #endregion exports
