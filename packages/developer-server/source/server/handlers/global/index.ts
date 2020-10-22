// #region imports
    // #region libraries
    import {
        Express,
    } from 'express';

    import multer from 'multer';
    // #endregion libraries


    // #region external
    import {
        FileUpload,
    } from '#server/data/interfaces';

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
            async (
                request,
                response,
            ) => {
                const file: FileUpload = request.file;

                const data = {
                    uploadID: file.filename,
                };

                response.json(data);
            },
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
