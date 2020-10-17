// #region imports
    // #region internal
    import Server from '#objects/Server';
    // #endregion internal
// #endregion imports



// #region module
const main = () => {
    const server = new Server();

    const port = server.start();

    console.log(port);
}


main();
// #endregion module
