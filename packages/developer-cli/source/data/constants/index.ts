// #region imports
    // #region libraries
    import os from 'os';
    import path from 'path';
    // #endregion libraries


    // #region external
    import {
        DeveloperConfiguration,
        DeveloperWorker,
    } from '../interfaces';
    // #endregion external
// #endregion imports



// #region module
const homeDirectory = os.homedir();

const DEVELOPER_CONFIGURATION_FILE = '.developer.config.deon';
const developerConfigurationPath = path.join(
    homeDirectory,
    DEVELOPER_CONFIGURATION_FILE,
);


const defaultDeveloperWorker: DeveloperWorker = {
    identonym: '',
    key: '',
    server: '',
    api: '',
    token: '',
    isDefault: false,
    spaces: [],
};


const defaultDeveloperConfiguration: DeveloperConfiguration = {
    machine: '',
    workers: [],
    connections: {},
};


const DEVELOPER_COOKIE = 'PVTTKN';
// #endregion module



// #region exports
export {
    developerConfigurationPath,
    defaultDeveloperWorker,
    defaultDeveloperConfiguration,

    DEVELOPER_COOKIE,
};
// #endregion exports
