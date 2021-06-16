// #region imports
    // #region external
    import {
        Context,
    } from '~server/data/interfaces';

    import {
        generateMethodLogs,
    } from '~server/utilities';
    // #endregion external
// #endregion imports



// #region module
export const getWorkersLogs = generateMethodLogs('getWorkers');

const getWorkers = async (
    context: Context,
) => {
    // #region context unpack
    const {
        projects,
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
        getWorkersLogs.infoStart,
        logLevels.info,
    );
    // #endregion log start


    try {
        // #region private usage
        // if (privateUsage) {
        //     logger.log(
        //         getWorkersLogs.infoHandlePrivateUsage,
        //         logLevels.trace,
        //     );

        //     if (!privateOwnerIdentonym) {
        //         logger.log(
        //             getWorkersLogs.infoEndPrivateUsage,
        //             logLevels.info,
        //         );

        //         return {
        //             status: false,
        //         };
        //     }

        //     logger.log(
        //         getWorkersLogs.infoSuccessPrivateUsage,
        //         logLevels.info,
        //     );

        //     return {
        //         status: true,
        //         data: [
        //             ...projects,
        //         ],
        //     };
        // }
        // #endregion private usage


        // #region public usage
        logger.log(
            getWorkersLogs.infoSuccessCustomLogicUsage,
            logLevels.info,
        );

        return {
            status: true,
            data: [
                ...projects,
            ],
        };
        // #endregion public usage
    } catch (error) {
        // #region error handle
        logger.log(
            getWorkersLogs.errorEnd,
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
export default getWorkers;
// #endregion exports
