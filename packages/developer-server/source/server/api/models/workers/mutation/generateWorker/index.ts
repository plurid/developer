// #region imports
    // #region external
    import {
        Context,
    } from '~server/data/interfaces';

    import {
        registerWorker,
    } from '~server/logic/operators/workers';

    import {
        generateMethodLogs,
        jsonParse,
    } from '~server/utilities';
    // #endregion external
// #endregion imports



// #region module
export const generateWorkerLogs = generateMethodLogs('generateWorker');


const generateWorker = async (
    input: any,
    context: Context,
) => {
    // #region context unpack
    const {
        request,

        privateUsage,
        privateOwnerIdentonym,

        // customLogicUsage,

        logger,
        logLevels,
    } = context;
    // #endregion context unpack


    // #region log start
    logger.log(
        generateWorkerLogs.infoStart,
        logLevels.info,
    );
    // #endregion log start


    try {
        // #region input unpack
        const {
            name,
            dependencies,
            script,
            command,
            npmToken,
            npmRegistry,
        } = input;

        const parsedDependencies = jsonParse(dependencies);
        if (!parsedDependencies) {
            return {
                status: false,
            };
        }

        const data = {
            name,
            ownedBy: '',
            dependencies: parsedDependencies,
            script,
            command,
            npmToken,
            npmRegistry,
        };
        // #endregion input unpack


        // #region private usage
        if (privateUsage) {
            logger.log(
                generateWorkerLogs.infoHandlePrivateUsage,
                logLevels.trace,
            );

            if (!privateOwnerIdentonym) {
                logger.log(
                    generateWorkerLogs.infoEndPrivateUsage,
                    logLevels.info,
                );

                return {
                    status: false,
                };
            }

            const worker = await registerWorker(
                {
                    ...data,
                    ownedBy: privateOwnerIdentonym,
                },
            );

            logger.log(
                generateWorkerLogs.infoSuccessPrivateUsage,
                logLevels.info,
            );

            return {
                status: true,
                data: worker,
            };
        }
        // #endregion private usage


        // #region public usage
        const worker = await registerWorker(
            data,
        );

        logger.log(
            generateWorkerLogs.infoSuccess,
            logLevels.info,
        );

        return {
            status: true,
            data: worker,
        };
        // #endregion public usage
    } catch (error) {
        // #region error handle
        logger.log(
            generateWorkerLogs.errorEnd,
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
export default generateWorker;
// #endregion exports
