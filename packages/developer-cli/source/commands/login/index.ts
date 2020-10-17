// #region imports
    // #region external
    import {
        DeveloperWorker,
    } from '#data/interfaces';

    import {
        defaultDeveloperWorker,
    } from '#data/constants';

    import client from '#services/graphql/client';
    import {
        LOGIN,
    } from '#services/graphql/mutate';

    import {
        extractServerName,

        updateWorker,
    } from '#services/utilities';
    // #endregion external
// #endregion imports



// #region module
const login = async (
    server: string,
    identonym: string,
    key: string,
) => {
    const developer = client(
        server,
    );

    const serverName = extractServerName(server);

    const data: DeveloperWorker = {
        ...defaultDeveloperWorker,
        server,
        identonym,
        key,
    };

    try {
        const mutation = await developer.mutate({
            mutation: LOGIN,
            variables: {
                input: {
                    identonym,
                    key,
                },
            },
        });

        const response = mutation.data.login;

        if (!response.status) {
            console.log(`Could not log in into the developer server '${serverName}' as '${identonym}'.`);
            return;
        }

        // HACK
        // to allow the token writing inside the apollo afterwareLink
        setTimeout(async () => {
            delete (data as any).token;

            await updateWorker(
                server,
                identonym,
                data,
            );
        }, 2_000);

        console.log(`Logged in the developer server '${serverName}' as '${identonym}'.`);
    } catch (error) {
        console.log(`Could not log in into the developer server '${serverName}' as '${identonym}'.`);
    }
}
// #endregion module



// #region exports
export default login;
// #endregion exports
