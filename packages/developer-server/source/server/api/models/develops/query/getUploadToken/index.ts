// #region imports
    // #region imports
    import {
        uuid,
    } from '@plurid/plurid-functions';
    // #endregion imports


    // #region external
    import {
        InputGetUploadToken,
        Context,
    } from '~server/data/interfaces';

    import {
        generateMethodLogs,
    } from '~server/utilities';
    // #endregion external
// #endregion imports



// #region module
export const getUploadTokenLogs = generateMethodLogs('getUploadToken');


const getUploadToken = async (
    input: InputGetUploadToken,
    context: Context,
) => {
    // #region context unpack
    const {
        request,

        privateUsage,
        privateOwnerIdentonym,

        customLogicUsage,

        logger,
        logLevels,
    } = context;
    // #endregion context unpack


    try {
        const {
            id,
        } = input;

        const token = uuid.generate();

        if (privateUsage) {
            // check space by id
        }

        // assign token to space

        return {
            status: true,
            data: {
                token,
            },
        };
    } catch (error) {
        return {
            status: false,
        };
    }
}
// #endregion module



// #region exports
export default getUploadToken;
// #endregion exports
