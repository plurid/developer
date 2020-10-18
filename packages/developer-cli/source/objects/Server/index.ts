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

    public start() {
        this.handleApplication();

        const server = this.application.listen();

        if (server) {
            return (server.address() as AddressInfo).port;
        }

        return;
    }

    private handleApplication() {
        // start a daemon process which tunnels through to the developer server

        // get the port of the daemon process

        this.application.get('/', (request, response) => {
            response.send('body');
        });
    }
}
// #endregion module



// #region exports
export default Server;
// #endregion exports
