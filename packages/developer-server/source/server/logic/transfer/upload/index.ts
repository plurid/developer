// #region imports
    // #region libraries
    import {
        Request,
        Response,
    } from 'express';
    // #endregion libraries


    // #region external
    import {
        DeveloperConfiguration,
    } from '~server/data/interfaces';

    import * as commands from '~server/logic/previous/commands';
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
        console.log('developer :: Command or configuration invalid');

        // 400 Bad Request
        response.status(400).json(errorResponse);
        return;
    }

    switch (command) {
        case 'lint':
            commands.lint();
            break;
        case 'test':
            commands.test();
            break;
        case 'preview':
            commands.preview();
            break;
        case 'watch':
            commands.watch();
            break;
        case 'build':
            commands.build(
                request,
                response,
                configuration,
            );
            break;
        case 'run':
            commands.run();
            break;
        default:
            console.log('developer :: Command not found');

            // 405 Method Not Allowed
            response.status(405).json(errorResponse);
            break;
    }
}
// #endregion module



// #region exports
export {
    handleUploadArchive,
};
// #endregion exports
