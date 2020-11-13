// #region imports
    // #region libraries
    import path from 'path';
    // #endregion libraries


    // #region external
    import {
        DeveloperConfiguration,
    } from '#server/data/interfaces';

    import {
        transpileTypescript,
    } from '#server/logic/typescript';

    import {
        archiveBuild,
    } from '#server/logic/archive';

    import {
        registerDevelop,
    } from '#server/logic/operators/develops';
    // #endregion external
// #endregion imports



// #region module
const build = (
    files: string[],
    configuration: any,
) => {
    // read the files
    // handle the configuration
    // emit the result
}


const handleDeveloper = async (
    id: string,
    command: string,
    directory: string,
    configuration: DeveloperConfiguration,
) => {
    const commandData = configuration.commands[command];

    const {
        input,
    } = commandData;


    if (Array.isArray(input)) {
        // for (const inputItem of input) {
        // }

        return;
    }

    if (typeof input === 'string') {

        return;
    }


    const entrypoint = path.join(
        process.cwd(),
        directory,
        input.entrypoint,
    );

    const transpiled = await transpileTypescript(
        id,
        entrypoint,
    );

    if (!transpiled) {
        return;
    }

    await archiveBuild(
        id,
    );

    await registerDevelop(
        'a',
        'b',
        configuration,
    );
}
// #endregion module



// #region exports
export {
    handleDeveloper,
};
// #endregion exports
