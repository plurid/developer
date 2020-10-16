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
const readConfiguration = async (
    configurationPath: string,
) => {
    const filePath = path.isAbsolute(configurationPath)
        ? configurationPath
        : path.join(
            process.cwd(),
            configurationPath,
        );

    const data = await fs.readFile(
        filePath,
        'utf-8',
    );

    const deon = new Deon();
    const parsedData = typer(await deon.parse(data));

    return parsedData;
}
// #endregion module



// #region exports
export {
    readConfiguration,
}
// #endregion exports
