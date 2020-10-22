// #region imports
    // #region libraries
    import {
        Express,
    } from 'express';

    import multer from 'multer';
    // #endregion libraries


    // #region external
    import {
        handleUploadArchive,
    } from '#server/logic/upload';

    import {
        handleDownloadArchive,
    } from '#server/logic/download';

    // import database from '#server/services/database';
    // #endregion external
// #endregion imports



// #region module
const setup = async (
    instance: Express,
) => {
    try {
        const upload = multer({
            dest: './data/uploads/',
        });

        instance.post(
            '/upload',
            upload.single('archive'),
            handleUploadArchive,
        );

        instance.get(
            '/download/:id',
            handleDownloadArchive,
        );

        // await database.initialize();
    } catch (error) {
        return;
    }
}
// #endregion module



// #region exports
export default setup;
// #endregion exports
