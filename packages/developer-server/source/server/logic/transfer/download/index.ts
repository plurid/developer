// #region imports
    // #region libraries
    import path from 'path';

    import fsSync from 'fs';

    import {
        Request,
        Response,
    } from 'express';
    // #endregion libraries


    // #region external
    import {
        fileExists,
    } from '~server/utilities';
    // #endregion external
// #endregion imports



// #region module
const handleDownloadArchive = async (
    request: Request,
    response: Response,
) => {
    const id = request.params.id;

    const filepath = path.join(
        process.cwd(),
        `./data/archives/${id}`,
    );

    const exists = await fileExists(filepath);

    if (!exists) {
        response.end();
        return;
    }

    const readStream = fsSync.createReadStream(filepath);

    response.contentType('application/zip');

    readStream.on('open', () => {
        readStream.pipe(response);
    });

    readStream.on('error', (error) => {
        response.end(error);
    });
}
// #endregion module



// #region exports
export {
    handleDownloadArchive,
};
// #endregion exports
