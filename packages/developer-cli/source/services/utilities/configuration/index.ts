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
        DeveloperConfiguration,
    } from '#data/interfaces';

    import {
        defaultDeveloperConfiguration,
        developerConfigurationPath,
    } from '#data/constants';

    import {
        fileExists,
    } from '#services/utilities/general';
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
    data: Partial<DeveloperConfiguration>,
) => {
    try {
        const configuration = await readConfiguration();

        const dataWorkers = data.workers
            ? [
                ...data.workers,
            ] : [];

        const connections = data.connections
            ? {
                ...data.connections
            } : {
                ...configuration.connections,
            };

        const updatedConfiguration: DeveloperConfiguration = {
            machine: data.machine || configuration.machine,
            workers: [
                ...configuration.workers,
                ...dataWorkers,
            ],
            connections,
        };

        await writeConfiguration(updatedConfiguration);

        return true;
    } catch (error) {
        return false;
    }
}


const readConfiguration = async () => {
    try {
        const exists = await fileExists(developerConfigurationPath);

        if (!exists) {
            await writeConfiguration(defaultDeveloperConfiguration);
            return defaultDeveloperConfiguration;
        }

        const data = await fs.readFile(
            developerConfigurationPath,
            'utf-8',
        );

        const deon = new Deon();
        const configuration: DeveloperConfiguration = typer(await deon.parse(data));

        return configuration;
    } catch (error) {
        return defaultDeveloperConfiguration;
    }
}
// #endregion module



// #region exports
export {
    writeConfiguration,
    readConfiguration,
    updateConfiguration,
};
// #endregion exports
