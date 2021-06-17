// #region imports
    // #region libraries
    import path from 'path';
    import {
        promises as fs,
    } from 'fs';

    import Deon from '@plurid/deon';
    // #endregion libraries
// #endregion imports




// #region module
const parseEnvironmentFile = (
    data: string,
) => {
    const lines = data.split('\n');

    const values: any = {};

    for (const line of lines) {
        const split = line.split('=');
        let key = split[0];
        let value = split[1] || '';

        if (!key) {
            continue;
        }

        key = key.trim();
        value = value.trim();

        // Interpolate process.env variables.
        for (const [environmentName, environmentValue] of Object.entries(process.env)) {
            if (environmentValue) {
                const re = new RegExp(`\\$${environmentName}`);
                value = value.replace(re, environmentValue);
            }
        }

        values[key] = value;
    }

    return values;
}


const readDefaultEnvironment = async () => {
    const environmentPath = path.join(
        process.cwd(),
        './configurations/developer.deon',
    );

    const fileData = await fs.readFile(environmentPath, 'utf-8');

    const deon = new Deon();
    const parsedData = await deon.parse(fileData);
    return parsedData;
}


const readEnvironment = async (
    environment: string | undefined,
) => {
    try {
        if (!environment) {
            const defaultEnvironment = await readDefaultEnvironment();

            return defaultEnvironment;
        }

        const environmentPath = path.isAbsolute(environment)
            ? environment
            : path.join(
                process.cwd(),
                environment,
            );

        const fileData = await fs.readFile(environmentPath, 'utf-8');

        const extension = path.extname(environment);

        if (extension === '.deon') {
            const deon = new Deon();
            const parsedData = await deon.parse(fileData);
            return parsedData;
        }

        const parsedData = parseEnvironmentFile(fileData);
        return parsedData;
    } catch (error) {
        return;
    }
}
// #endregion module



// #region exports
export {
    readEnvironment,
};
// #endregion exports
