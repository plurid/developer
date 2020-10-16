// #region imports
    // #region libraries
    import {
        promises as fs,
    } from 'fs';

    import path from 'path';

    import Deon, {
        typer,
    } from '@plurid/deon';
    // #endregion libraries
// #endregion imports




// #region module
const resolveConfigurationPath = (
    configurationPath: string,
) => {
    const filePath = path.isAbsolute(configurationPath)
        ? configurationPath
        : path.join(
            process.cwd(),
            configurationPath,
        );

    return filePath;
}


const readConfiguration = async (
    configurationPath: string,
) => {
    const filePath = resolveConfigurationPath(
        configurationPath,
    );

    const data = await fs.readFile(
        filePath,
        'utf-8',
    );

    const deon = new Deon();
    const parsedData = typer(await deon.parse(data));

    return {
        filePath,
        data: parsedData,
    };
}
// #endregion module



// #region exports
export {
    resolveConfigurationPath,
    readConfiguration,
}
// #endregion exports
