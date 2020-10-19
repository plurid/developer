// #region imports
    // #region libraries
    import {
        Express,
    } from 'express';

    import multer from 'multer';
    // #endregion libraries


    // #region external
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

        instance.post('/upload', upload.single('archive'), async (req, res) => {
            const file: any = req.file;
            console.log('file', file);

            res.send('upload');
        });

        // await database.initialize();
    } catch (error) {
        return;
    }
}
// #endregion module



// #region exports
export default setup;
// #endregion exports
