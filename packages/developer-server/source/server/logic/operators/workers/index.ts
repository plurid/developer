// #region imports
    // #region libraries
    import {
        promises as fs,
    } from 'fs';
    import path from 'path';

    import {
        uuid,
    } from '@plurid/plurid-functions';
    // #endregion libraries


    // #region external
    import {
        Worker,
    } from '~server/data/interfaces';

    import {
        workersPath,
    } from '~server/data/constants';

    // import database from '~server/services/database';

    import docker from '~server/logic/engine';

    import {
        packageJson,
    } from '~server/logic/templates';
    // #endregion external
// #endregion imports



// #region module
const generateWorkerFiles = async (
    namespace: string,
    id: string,
    dependencies: Record<string, string>,
    command: string,
) => {
    const workerPath = path.join(
        workersPath,
        `${namespace}/${id}`,
    );
    await fs.mkdir(workerPath);

    // create package.json
    const workerID = uuid.generate();
    const dependenciesText = Object
        .entries(dependencies)
        .map(([name, version]) => {
            return `"${name}": "${version}"`;
        })
        .join(',\n');

    const packageJsonText = packageJson(
        workerID,
        dependenciesText,
        command,
    );

    // store package.json
    const packageJsonPath = path.join(
        workerPath,
        `package.json`,
    );
    await fs.writeFile(
        packageJsonPath,
        packageJsonText,
    );


    return {
        workerPath,
        files: [
            packageJsonPath,
        ],
    };
}


const generateImageneForWorker = async (
    namespace: string,
    dependencies: Record<string, string>,
    command: string,
) => {
    const dockerfilePath = '';

    const id = uuid.generate();
    const {
        workerPath,
        files,
    } = await generateWorkerFiles(
        namespace,
        id,
        dependencies,
        command,
    );

    const tag = `developer-imagene-${id}`;

    await docker.buildImage(
        {
            context: workerPath,
            src: files,
        },
        {
            dockerfile: dockerfilePath,
            t: tag,
        },
    );

    return tag;
}


const registerWorker = async (
    name: string,
    ownedBy: string,
    dependencies: Record<string, string>,
    command: string,
    script: string,
) => {
    const id = uuid.generate();

    const imagene = await generateImageneForWorker(
        ownedBy,
        dependencies,
        command,
    );

    const worker: Worker = {
        id,
        name,
        ownedBy,

        dependencies,
        script,
        command,
        imagene,
    };

    // await database.store(
    //     'workers',
    //     id,
    //     worker,
    // );

    return worker;
}


const deregisterWorker = async (
    id: string,
) => {
    try {
        // await database.obliterate(
        //     'workers',
        //     {
        //         id,
        //     },
        // );
    } catch (error) {
        return;
    }
}
// #endregion module



// #region exports
export {
    registerWorker,
    deregisterWorker,
};
// #endregion exports
