// #region imports
    // #region libraries
    import {
        promises as fs,
    } from 'fs';

    import path from 'path';

    import Zip from 'adm-zip';

    import Deon, {
        typer,
    } from '@plurid/deon';
    // #endregion libraries


    // #region external
    import {
        Space,
    } from '#data/interfaces';

    import {
        getWorker,
        fileExists,
        resolvePathToAbsolute,
    } from '#services/utilities';
    // #endregion external
// #endregion imports



// #region module
const resolveSpaceConfigurationPath = async (
    configurationPath?: string,
) => {
    const defaultLocations = [
        'developer.deon',
        './configurations/developer.deon',
    ];

    if (!configurationPath) {
        for (const defaultLocation of defaultLocations) {
            const locationPath = path.join(
                process.cwd(),
                defaultLocation,
            );

            const exists = await fileExists(locationPath);

            if (exists) {
                return locationPath;
            }
        }

        return;
    }

    const resolvedPath = resolvePathToAbsolute(
        configurationPath,
    );

    return resolvedPath;
}


const resolveSpace = async (
    name?: string,
) => {
    const configuration = await getWorker();

    if (!configuration) {
        return;
    }

    for (const space of configuration.spaces) {
        if (
            space.identifier === name
            || space.name === name
        ) {
            return space;
        }
    }

    return;
}


const readSpaceConfiguration = async (
    project: Space,
) => {
    const {
        path,
    } = project;

    const data = await fs.readFile(
        path,
        'utf-8',
    );

    const deon = new Deon();
    const projectData = typer(await deon.parse(data));

    return projectData;
}


const getSpaceData = async (
    name?: string,
) => {
    const space = await resolveSpace(
        name,
    );

    if (!space) {
        console.log(`Could not resolve space.`);
        return;
    }

    const data = await readSpaceConfiguration(
        space,
    );

    return {
        space,
        data,
    };
}


const resolveRoot = (
    configuration: any,
) => {
    const {
        space,
        data,
    } = configuration;

    const root = path.join(
        path.dirname(space.path),
        data.root,
    );

    return root;
}


const packageSpace = async (
    configuration: any,
) => {
    const root = resolveRoot(configuration);

    const zip = new Zip();

    const files = await fs.readdir(root);

    for (const file of files) {
        const filepath = path.join(
            root,
            file,
        );

        const stat = await fs.stat(filepath);

        if (stat.isDirectory()) {
            zip.addLocalFolder(filepath, file);
        } else {
            zip.addLocalFile(filepath);
        }
    }

    const archive = zip.toBuffer();

    return archive;
}
// #endregion module



// #region exports
export {
    resolveSpaceConfigurationPath,
    resolveSpace,
    readSpaceConfiguration,
    getSpaceData,
    packageSpace,
};
// #endregion exports
