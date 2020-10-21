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
    console.log('pid', pid);

    const port: string = await new Promise((resolve, _) => {
        if (!spawnedChild.stdout) {
            resolve();
            return;
        }

        spawnedChild.stdout.on('data', (data: any) => {
            resolve(data.toString());
        });
    });
    console.log('port', port);

    spawnedChild.unref();

    return port;
}
// #endregion module



// #region exports
export {
    serverStart,
};
// #endregion exports
