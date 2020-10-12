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
        Configuration,
    } from '../../../data/interfaces';

    import {
        developerConfigurationPath,
    } from '../../../data/constants';

    import {
        fileExists,
    } from '../general';
    // #endregion external
// #endregion imports



// #region module
const writeConfiguration = async (
    data: any,
) => {
    const deon = new Deon();
    const dataString = deon.stringify(data);

    await fs.writeFile(
        developerConfigurationPath,
        dataString,
    );
}


const updateConfiguration = async (
    data: Partial<Configuration>,
) => {
    try {
        return true;
    } catch (error) {
        return false;
    }
}


const readConfiguration = async () => {
    try {
        const exists = await fileExists(developerConfigurationPath);

        if (!exists) {
            await fs.writeFile(
                developerConfigurationPath,
                '',
            );
            return;
        }

        const data = await fs.readFile(
            developerConfigurationPath,
            'utf-8',
        );

        const deon = new Deon();
        const configurationData: Configuration = typer(await deon.parse(data));

        return configurationData;
    } catch (error) {
        return;
    }
}


const getConfiguration = async () => {
    return;
}


const removeConfiguration = async () => {
    return;
}
// #endregion module



// #region exports
export {
    readConfiguration,
    updateConfiguration,
    getConfiguration,
    removeConfiguration,
};
// #endregion exports
