// #region imports
    // #region libraries
    import {
        promises as fs,
    } from 'fs';

    import url from 'url';
    // #endregion libraries
// #endregion imports



// #region module
const fileExists = async (
    path: string,
) => !!(await fs.stat(path).catch(e => false));


const extractServerName = (
    server: string,
) => {
    return server.replace(/https?:\/\//, '');
}


const getServerURL = (
    endpoint: string,
) => {
    const urlData = url.parse(endpoint);

    const {
        protocol,
        host,
    } = urlData;

    const serverURL = protocol + '//' + host;

    return serverURL;
}
// #endregion module



// #region exports
export {
    fileExists,
    extractServerName,
    getServerURL,
};
// #endregion exports
