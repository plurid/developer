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


    // #region internal
    import indexHTML from './templates/index.html';
    // #endregion internal
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
        this.application.get(
            '/',
            (
                request,
                response,
            ) => {
                response.send(indexHTML);
            },
        );

        this.application.post(
            '/poll',
            (
                request,
                response,
            ) => {
                const {
                    id,
                    worker,
                } = request.params;

                console.log(id, worker);
            },
        );
    }
}
// #endregion module



// #region exports
export default Server;
// #endregion exports
