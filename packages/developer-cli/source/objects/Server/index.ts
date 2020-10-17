// #region imports
    // #region libraries
    import {
        AddressInfo,
    } from 'net'

    import {
        EventEmitter,
    } from 'events';

    import express, {
        Express,
    } from 'express';
    // #endregion libraries
// #endregion imports



// #region module
class Server extends EventEmitter {
    private application: Express;

    constructor() {
        super();

        this.application = express();
    }

    start() {
        // start a daemon process which tunnels through to the developer server

        // get the port of the daemon process

        this.application.get('/', (request, response) => {
            response.send('body');
        });

        const server = this.application.listen();

        if (server) {
            return (server.address() as AddressInfo).port;
        }

        return;
    }
}
// #endregion module



// #region exports
export default Server;
// #endregion exports
