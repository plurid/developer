// #region imports
    // #region external
    import Server from '../../objects/Server';
    // #endregion external
// #endregion imports



// #region module
const start = async (
    server?: string,
    identonym?: string,
) => {
    try {
        const server = new Server();

        const port = server.start();

        // write port to the configuration file

        console.log('developer start');
    } catch (error) {
        console.log('Something went wrong.');
        return;
    }
}
// #endregion module



// #region exports
export default start;
// #endregion exports
