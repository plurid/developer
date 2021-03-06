// #region imports
    // #region libraries
    import fsSynchronous, {
        promises as fs,
    } from 'fs';

    import path from 'path';

    import fetch from 'cross-fetch';

    import FormData from 'form-data';

    import Zip from 'adm-zip';

    import Deon, {
        typer,
    } from '@plurid/deon';
    // #endregion libraries


    // #region external
    import {
        Space,
        DeveloperWorker,
    } from '~data/interfaces';

    import client from '~services/graphql/client';

    import {
        GET_UPLOAD_TOKEN,
    } from '~services/graphql/mutate';

    import {
        getWorker,
        fileExists,
        resolvePathToAbsolute,
    } from '~services/utilities';
    // #endregion external
// #endregion imports



// #region module
const resolveSpaceConfigurationPath = async (
    configurationPath?: string,
) => {
    try {
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

        const isDirectory = fsSynchronous.statSync(configurationPath).isDirectory();

        const absolutePath = resolvePathToAbsolute(
            configurationPath,
        );

        if (isDirectory) {
            for (const defaultLocation of defaultLocations) {
                const locationPath = path.join(
                    absolutePath,
                    defaultLocation,
                );

                const exists = await fileExists(locationPath);

                if (exists) {
                    return locationPath;
                }
            }

            return;
        }

        return absolutePath;
    } catch (error) {
        return;
    }
}


const resolveSpace = async (
    name?: string,
    server?: string,
    identonym?: string,
) => {
    const worker = await getWorker(
        server,
        identonym,
    );

    if (!worker) {
        return;
    }

    for (const space of worker.spaces) {
        if (
            space.identifier === name
            || space.name === name
        ) {
            return {
                worker,
                space,
            };
        }
    }

    return;
}


const readSpaceConfiguration = async (
    space: Space,
) => {
    const {
        configurationPath,
    } = space;

    const data = await fs.readFile(
        configurationPath,
        'utf-8',
    );

    const deon = new Deon();
    const configurationData = typer(await deon.parse(data));

    return configurationData;
}


const getSpaceData = async (
    name?: string,
    server?: string,
    identonym?: string,
) => {
    const spaceResolved = await resolveSpace(
        name,
        server,
        identonym,
    );

    if (!spaceResolved) {
        return;
    }

    const {
        worker,
        space,
    } = spaceResolved;

    const data = await readSpaceConfiguration(
        space,
    );

    return {
        worker,
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
        path.dirname(space.configurationPath),
        data.root,
    );

    return root;
}


const readGitIgnore = async (
    root: string,
) => {
    try {
        const gitignore = await fs.readFile(
            path.join(
                root,
                '.gitignore',
            ),
            'utf-8'
        );
        const gitignoreData = gitignore.split('\n');

        return gitignoreData;
    } catch (error) {
        return [];
    }
}


const packageSpace = async (
    configuration: any,
) => {
    const root = resolveRoot(configuration);

    const zip = new Zip();

    const gitignore = await readGitIgnore(root);

    const files = await fs.readdir(root);

    for (const file of files) {
        if (gitignore.includes(file)) {
            continue;
        }

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


const uploadArchive = async (
    archive: Buffer,
    url: string,
    configuration: string,
    command: string,
    token: string,
) => {
    const form = new FormData();

    form.append(
        'archive',
        archive,
        {
            filename: 'archive',
            contentType: 'application/zip',
        },
    );

    form.append(
        'data',
        configuration,
    );

    form.append(
        'command',
        command,
    );

    const response = await fetch(
        url,
        {
            method: 'POST',
            body: form.getBuffer(),
            headers: form.getHeaders({
                Authorization: `Bearer ${token}`,
            }),
        },
    );

    const data = await response.json();

    return data;
}


const getUploadToken = async (
    worker: DeveloperWorker,
    space: Space,
) => {
    const developer = client(worker.api);

    const query = await developer.query({
        query: GET_UPLOAD_TOKEN,
        variables: {
            input: {
                identifier: space.identifier,
            },
        },
    });

    const response = query.data.getUploadToken;
    if (!response.status) {
        return;
    }

    return response.data.token;
}
// #endregion module



// #region exports
export {
    resolveSpaceConfigurationPath,
    resolveSpace,
    readSpaceConfiguration,
    getSpaceData,
    packageSpace,
    uploadArchive,
    getUploadToken,
};
// #endregion exports
