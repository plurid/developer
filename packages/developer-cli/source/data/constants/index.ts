// #region imports
    // #region libraries
    import os from 'os';
    import path from 'path';
    // #endregion libraries
// #endregion imports



// #region module
const homeDirectory = os.homedir();

const DEVELOPER_CONFIGURATION_FILE = '.developer.config.deon';
const developerConfigurationPath = path.join(
    homeDirectory,
    DEVELOPER_CONFIGURATION_FILE
);
// #endregion module



// #region exports
export {
    developerConfigurationPath,
};
// #endregion exports
