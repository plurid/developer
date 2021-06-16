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
        RegisterWorkerData,
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
const generateWorkerConfigurationsFiles = async (
    directory: string,
) => {
    const configurationsPath = path.join(
        directory,
        '/configurations',
    );
    await fs.mkdir(
        configurationsPath,
        {
            recursive: true,
        },
    );

    const npmrcxPath = path.join(
        configurationsPath,
        '.npmrcx',
    );
    const npmrcx = `//\${NPM_REGISTRY}/:_authToken="\${NPM_TOKEN}"
registry=https://\${NPM_REGISTRY}/
always-auth=true
`;
    await fs.writeFile(
        npmrcxPath,
        npmrcx,
    );


    const dockerfilePath = path.join(
        configurationsPath,
        'Dockerfile',
    );
    const dockerfile = `FROM node:14.17-alpine

ARG NPM_TOKEN
ARG NPM_REGISTRY=registry.npmjs.org

ENV NPM_TOKEN $NPM_TOKEN
ENV NPM_REGISTRY $NPM_REGISTRY

WORKDIR /app

COPY . .

RUN ( echo "cat <<EOF" ; cat ./configurations/.npmrcx ; echo EOF ) | sh > ./.npmrc

RUN yarn install --production false --network-timeout 1000000

CMD [ "yarn", "build"]
`;
    await fs.writeFile(
        dockerfilePath,
        dockerfile,
    );


    return [
        npmrcxPath,
        dockerfilePath,
    ];
}


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
    await fs.mkdir(
        workerPath,
        {
            recursive: true,
        },
    );


    const dependenciesText = Object
        .entries(dependencies)
        .map(([name, version]) => {
            return `"${name}": "${version}"`;
        })
        .join(',\n');

    const packageJsonText = packageJson(
        id,
        dependenciesText,
        command,
    );

    const packageJsonPath = path.join(
        workerPath,
        `package.json`,
    );
    await fs.writeFile(
        packageJsonPath,
        packageJsonText,
    );


    const configurationsFiles = await generateWorkerConfigurationsFiles(
        workerPath,
    );


    return {
        workerPath,
        files: [
            packageJsonPath,
            ...configurationsFiles,
        ],
    };
}


const generateImageneForWorker = async (
    namespace: string,
    dependencies: Record<string, string>,
    command: string,
    environment: {
        NPM_TOKEN: string | undefined;
        NPM_REGISTRY: string | undefined;
    },
) => {
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
    const buildargs: Record<string, string> = {};
    Object.entries(environment)
        .map(([key, value]) => {
            if (value) {
                buildargs[key] = value;
            }
        });

    const src = files.map(file => file.replace(workerPath + '/', ''));
    const dockerfilePath = 'configurations/Dockerfile';

    await docker.buildImage(
        {
            context: workerPath,
            src,
        },
        {
            dockerfile: dockerfilePath,
            t: tag,
            buildargs,
        },
    );

    return tag;
}


const registerWorker = async (
    data: RegisterWorkerData,
) => {
    console.log('data', data);
    const {
        name,
        ownedBy,
        dependencies,
        command,
        script,
        npmRegistry,
        npmToken,
    } = data;

    const id = uuid.generate();

    const imagene = await generateImageneForWorker(
        ownedBy,
        dependencies,
        command,
        {
            NPM_TOKEN: npmToken,
            NPM_REGISTRY: npmRegistry,
        },
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
