// #region imports
    import {
        EventEmitter,
    } from 'events';
// #endregion imports



// #region module
class Server extends EventEmitter {
    start() {
        // start a daemon process which tunnels through to the developer server

        // get the port of the daemon process
        const port = 556677;

        // this.emit('port', port);

        return port;
    }
}
// #endregion module



// #region exports
export default Server;
// #endregion exports
