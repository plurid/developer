// #region imports
    // #region libraries
    import {
        promises as fs,
    } from 'fs';

    import Deon, {
        typer,
    } from '@plurid/deon';
    // #endregion libraries


    // #region external
    import {
        resolvePathToAbsolute,
    } from '~services/utilities';
    // #endregion external
// #endregion imports



// #region module
const readConfiguration = async (
    configurationPath: string,
) => {
    const filePath = resolvePathToAbsolute(
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
    readConfiguration,
};
// #endregion exports
