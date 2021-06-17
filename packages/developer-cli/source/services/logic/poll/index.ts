// #region imports
    // #region libraries
    import fetch from 'cross-fetch';
    // #endregion libraries


    // #region external
    import {
        DeveloperConnection,
    } from '~data/interfaces';
    // #endregion external
// #endregion imports



// #region module
const pollServer = async (
    id: string,
    worker: string,
    space: string,
    connection: DeveloperConnection,
) => {
    const url = `http://localhost:${connection.port}/poll`;

    await fetch(
        url,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id,
                worker,
                space,
            }),
        },
    );
}
// #endregion module



// #region exports
export {
    pollServer,
};
// #endregion exports
