// #region imports
    // #region libraries
    import {
        spawn,
    } from 'child_process';
    // #endregion libraries
// #endregion imports



// #region module
const serverStart = async () => {
    const spawnedChild = spawn(
        'node',
        [
            'server.js',
        ],
        {
            cwd: __dirname,
            stdio: 'ignore',
            detached: true,
        },
    );

    const {
        pid,
    } = spawnedChild;

    const port: number = await new Promise((resolve, _) => {
        if (!spawnedChild.stdout) {
            resolve();
            return;
        }

        spawnedChild.stdout.on('data', (data) => {
            resolve(data.toString());
        });
    });

    spawnedChild.unref();

    return port;
}
// #endregion module



// #region exports
export {
    serverStart,
};
// #endregion exports
