// #region imports
    // #region external
    import {
        readEnvironment,
    } from '~services/logic/environment';

    import {
        checkExecutionContext,
    } from '~services/logic/execution';

    import {
        getConnection,
    } from '~services/logic/connections';

    import {
        pollServer,
    } from '~services/logic/poll';

    import {
        getSpaceData,
        packageSpace,
        uploadArchive,
        getUploadToken,
    } from '~services/logic/space';
    // #endregion external
// #endregion imports



// #region module
const build = async (
    name: string,
    server: string | undefined,
    identonym: string | undefined,
    production: boolean,
    environment: string | undefined,
) => {
    try {
        const environmentData = await readEnvironment(environment);
        if (environment && !environmentData) {
            console.log(`\n\tcould not read environment file\n`);

            return;
        }

        const execute = await checkExecutionContext(
            server,
            identonym,
        );
        if (!execute) {
            console.log(`\n\tcould not build, no developer connection\n`);
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
            console.log('\n\tcould not build, no developer connection\n');
            return;
        }

        const token = await getUploadToken(
            spaceData.worker,
            spaceData.space,
        );
        if (!token) {
            console.log('\n\tcould not build, no upload token\n');
            return;
        }

        const archive = await packageSpace(spaceData);
        const uploadURL = spaceData.worker.server + '/upload';
        const configuration = JSON.stringify({
            ...spaceData.data,
            production,
        });
        const command = 'build';
        const upload = await uploadArchive(
            archive,
            uploadURL,
            configuration,
            command,
            token,
        );

        if (!upload.status) {
            return;
        }

        const id = upload.data;

        await pollServer(
            id,
            spaceData.worker.id,
            spaceData.space.identifier,
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
