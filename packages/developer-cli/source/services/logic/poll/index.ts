// #region imports
    // #region libraries
    import fetch from 'cross-fetch';

    import FormData from 'form-data';
    // #endregion libraries


    // #region external
    import {
        DeveloperConnection,
    } from '#data/interfaces';
    // #endregion external
// #endregion imports



// #region module
const pollServer = (
    id: string,
    worker: string,
    connection: DeveloperConnection,
) => {
    const url = `http://localhost:${connection.port}/poll`;

    const form = new FormData();

    form.append(
        'id',
        id,
    );

    form.append(
        'worker',
        worker,
    );

    fetch(
        url,
        {
            method: 'POST',
            body: form.getBuffer(),
            headers: form.getHeaders(),
        },
    );
}
// #endregion module



// #region exports
export {
    pollServer,
};
// #endregion exports
