// #region imports
    // #region external
    import {
        Context,
        InputValueString,
    } from '~server/data/interfaces';

    import {
        deregisterWorker,
    } from '~server/logic/operators/workers';

    import {
        generateMethodLogs,
    } from '~server/utilities';
    // #endregion external
// #endregion imports



// #region module
export const obliterateWorkerLogs = generateMethodLogs('obliterateWorker');


const obliterateWorker = async (
    input: InputValueString,
    context: Context,
) => {
    // #region context unpack
    const {
        request,

        // privateUsage,
        privateOwnerIdentonym,

        // customLogicUsage,

        logger,
        logLevels,
    } = context;
    // #endregion context unpack


    // #region log start
    logger.log(
        obliterateWorkerLogs.infoStart,
        logLevels.info,
    );
    // #endregion log start


    try {
        // #region input unpack
        const {
            value,
        } = input;
        // #endregion input unpack


        // #region private usage
        // if (privateUsage) {
        //     logger.log(
        //         obliterateWorkerLogs.infoHandlePrivateUsage,
        //         logLevels.trace,
        //     );

        //     if (!privateOwnerIdentonym) {
        //         logger.log(
        //             obliterateWorkerLogs.infoEndPrivateUsage,
        //             logLevels.info,
        //         );

        //         return {
        //             status: false,
        //         };
        //     }

        //     await deregisterWorker(value);

        //     logger.log(
        //         obliterateWorkerLogs.infoSuccessPrivateUsage,
        //         logLevels.info,
        //     );

        //     return {
        //         status: true,
        //     };
        // }
        // #endregion private usage


        // #region public usage
        await deregisterWorker(value);

        logger.log(
            obliterateWorkerLogs.infoSuccess,
            logLevels.info,
        );

        return {
            status: true,
        };
        // #endregion public usage
    } catch (error) {
        // #region error handle
        logger.log(
            obliterateWorkerLogs.errorEnd,
            logLevels.error,
            error,
        );

        return {
            status: false,
        };
        // #endregion error handle
    }
}
// #endregion module



// #region exports
export default obliterateWorker;
// #endregion exports
