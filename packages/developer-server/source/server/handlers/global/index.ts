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

    // import database from '#server/services/database';
    // #endregion external
// #endregion imports



// #region module
const setup = async (
    instance: Express,
) => {
    try {
        const upload = multer({
            dest: 'uploads/',
        });

        instance.post(
            '/upload',
            upload.single('archive'),
            handleUploadArchive,
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
