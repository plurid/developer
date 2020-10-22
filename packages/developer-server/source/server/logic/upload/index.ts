// #region imports
    // #region libraries
    import {
        Request,
        Response,
    } from 'express';
    // #endregion libraries


    // #region external
    import {
        FileUpload,
    } from '#server/data/interfaces';
    // #endregion external
// #endregion imports



// #region module
const handleUploadArchive = async (
    request: Request,
    response: Response,
) => {
    const file: FileUpload = request.file;

    const data = {
        uploadID: file.filename,
    };

    response.json(data);
}
// #endregion module



// #region exports
export {
    handleUploadArchive,
};
// #endregion exports
