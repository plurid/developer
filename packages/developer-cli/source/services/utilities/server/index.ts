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
        sourceDir: './distribution/',
    });

    server.start();

    const port: number = await new Promise((resolve, _) => {
        server.on('stdout', (data) => {
            resolve(data.toString());
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
