// #region imports
    // #region libraries
    import {
        uuid,
    } from '@plurid/plurid-functions';
    // #endregion libraries


    // #region external
    // import {
    //     Develop,
    // } from '#server/data/interfaces';

    import database from '#server/services/database';
    // #endregion external
// #endregion imports



// #region module
const registerDevelop = async (
    name: string,
    ownedBy: string,
    configuration: any,
) => {
    const id = uuid.generate();

    const develop = {
        id,
        name,
        ownedBy,
        configuration,
    };

    await database.store(
        'develops',
        id,
        develop,
    );

    return develop;
}


const deregisterDevelop = async (
    id: string,
) => {
    try {
        await database.obliterate(
            'develops',
            {
                id,
            },
        );
    } catch (error) {
        return;
    }
}
// #endregion module



// #region exports
export {
    registerDevelop,
    deregisterDevelop,
};
// #endregion exports
