// #region imports
    // #region libraries
    import {
        Monitor,
    } from 'forever-monitor';
    // #endregion libraries
// #endregion imports



// #region module
const serverStart = async () => {
    const server = new Monitor('server.js', {
        max: 3,
        silent: true,
        args: []
    });

    server.start();

    const port = await new Promise((resolve, reject) => {
        server.on('port', (error, data) => {
            if (error) {
                reject();
            }

            resolve(data);
        });
    });

    return port;
}
// #endregion module



// #region exports
export {
    serverStart,
};
// #endregion exports
