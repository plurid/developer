// #region imports
    // #region libraries
    import {
        uuid,
    } from '@plurid/plurid-functions';
    // #endregion libraries


    // #region external
    import {
        Worker,
    } from '~server/data/interfaces';

    // import database from '~server/services/database';

    import docker from '~server/logic/engine';
    // #endregion external
// #endregion imports



// #region module
const generateImageneForWorker = async () => {
    const tag = 'developer-imagene-' + uuid.generate();

    const imagene = await docker.buildImage(
        {
            context: '',
            src: [
            ],
        },
        {
            dockerfile: '',
            t: tag,
        },
    );

    return tag;
}


const registerWorker = async (
    name: string,
    ownedBy: string,
    packages: string[],
    script: string,
) => {
    const id = uuid.generate();

    const imagene = await generateImageneForWorker();

    const worker: Worker = {
        id,
        name,
        ownedBy,

        packages,
        script,
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
