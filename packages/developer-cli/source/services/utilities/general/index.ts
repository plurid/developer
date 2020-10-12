// #region imports
    // #region libraries
    import {
        promises as fs,
    } from 'fs';
    // #endregion libraries
// #endregion imports



// #region module
const fileExists = async (
    path: string,
) => !!(await fs.stat(path).catch(e => false));
// #endregion module



// #region exports
export {
    fileExists,
};
// #endregion exports
