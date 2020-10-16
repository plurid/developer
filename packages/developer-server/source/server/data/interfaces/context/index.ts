// #region imports
    // #region libraries
    import {
        Request,
        Response,
        Application,
    } from 'express';
    // #endregion libraries


    // #region external
    import {
        Project,
    } from '../general';

    import {
        ClientNotifier,
    } from '../notifier';

    import {
        Logger,
        LogLevels,
    } from '../logger';
    // #endregion external
// #endregion imports



// #region module
export interface Context {
    request: DeveloperRequest;
    response: Response;

    instance: Application;

    projects: Project[];
    // notifiers: ClientNotifier[];
    notifiers: any[];

    customLogicUsage: boolean;

    privateUsage: boolean;
    privateOwnerIdentonym: string | undefined;

    logger: Logger;
    logLevel: number;
    logLevels: LogLevels;
}


export type DeveloperRequest = Request & {
    developerLogic: any;
    rawBody: string | undefined;
}
// #endregion module
