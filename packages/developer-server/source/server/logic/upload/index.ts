// #region imports
    // #region libraries
    import Zip from 'adm-zip';

    import {
        Request,
        Response,
    } from 'express';
    // #endregion libraries


    // #region external
    import {
        FileUpload,
    } from '#server/data/interfaces';

    import {
        handleDeveloper,
    } from '#server/logic/build';
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

    const unarchivePath = `./data/${file.filename}`;

    const zip = new Zip(file.path);
    zip.extractAllTo(unarchivePath);

    handleDeveloper(
        unarchivePath,
    );
}
// #endregion module



// #region exports
export {
    handleUploadArchive,
};
// #endregion exports
