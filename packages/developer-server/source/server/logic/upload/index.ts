// #region imports
    // #region libraries
    import path from 'path';

    import fsSync, {
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
const getConfiguration = (
    request: Request,
) => {
    try {
        const configuration: DeveloperConfiguration = JSON.parse(
            request.body.data,
        );

        return configuration;
    } catch (error) {
        return;
    }
}


const handleUploadArchive = async (
    request: Request,
    response: Response,
) => {
    const command = request.body.command;
    const configuration = getConfiguration(request);

    const errorResponse = {
        status: false,
    };

    if (
        !command
        || !configuration
    ) {
        response.json(errorResponse);
        return;
    }

    if (!configuration.commands[command]) {
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
        command,
        unarchivePath,
        configuration,
    );

    await fs.unlink(file.path);
    await fs.rmdir(unarchivePath, {recursive: true});
}


const handleDownloadArchive = async (
    request: Request,
    response: Response,
) => {
    const id = request.params.id;

    const filepath = path.join(
        process.cwd(),
        `./data/archives/${id}`,
    );

    const readStream = fsSync.createReadStream(filepath);

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
    handleUploadArchive,
    handleDownloadArchive,
};
// #endregion exports
