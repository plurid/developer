// #region imports
    // #region libraries
    import {
        promises as fs,
    } from 'fs';

    import Zip from 'adm-zip';

    import {
        Request,
        Response,
    } from 'express';
    // #endregion libraries


    // #region external
    import {
        FileUpload,
        DeveloperConfiguration,
    } from '#server/data/interfaces';

    import {
        handleDeveloper,
    } from '#server/logic/build';
    // #endregion external
// #endregion imports



// #region module
const build = async (
    request: Request,
    response: Response,
    configuration: DeveloperConfiguration,
) => {
    const errorResponse = {
        status: false,
    };

    if (!configuration.commands['build']) {
        response.json(errorResponse);
        return;
    }

    const file: FileUpload = request.file;

    const data = {
        status: true,
        data: file.filename,
    };

    response.json(data);

    const unarchivePath = `./data/unpacks/${file.filename}`;

    const zip = new Zip(file.path);
    zip.extractAllTo(unarchivePath);

    await handleDeveloper(
        file.filename,
        'build',
        unarchivePath,
        configuration,
    );

    await fs.unlink(file.path);
    await fs.rmdir(unarchivePath, {recursive: true});
}
// #endregion module



// #region exports
export default build;
// #endregion exports
