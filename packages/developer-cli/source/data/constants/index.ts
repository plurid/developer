// #region imports
    // #region libraries
    import os from 'os';
    import path from 'path';
    // #endregion libraries


    // #region external
    import {
        Configuration,
    } from '../interfaces';
    // #endregion external
// #endregion imports



// #region module
const homeDirectory = os.homedir();

const DEVELOPER_CONFIGURATION_FILE = '.developer.config.deon';
const developerConfigurationPath = path.join(
    homeDirectory,
    DEVELOPER_CONFIGURATION_FILE
);


const defaultConfiguration: Configuration = {
    identonym: '',
    key: '',
    server: '',
    token: '',
    isDefault: false,
    projects: [],
};


const DEVELOPER_COOKIE = 'PVTTKN';
// #endregion module



// #region exports
export {
    developerConfigurationPath,
    defaultConfiguration,

    DEVELOPER_COOKIE,
};
// #endregion exports
