// #region imports
    // #region libraries
    import openBrowser from 'open';
    // #endregion libraries


    // #region external
    import {
        DeveloperConnection,
    } from '#data/interfaces';

    import {
        readConfiguration,
    } from '#services/utilities';
    // #endregion external
// #endregion imports



// #region module
const openConnection = (
    connection: DeveloperConnection,
) => {
    const url = 'http://localhost:' + connection.port;

    console.log(`Opened connection ${url}`);

    openBrowser(url);
}


const checkNotFound = (
    found: boolean,
    value?: string,
) => {
    if (!found) {
        if (value) {
            console.log(`Connection '${value}' not found.`);
        } else {
            console.log(`Connection not found.`);
        }
    }
}


const open = async (
    value?: string,
) => {
    try {
        const configuration = await readConfiguration();

        const {
            connections,
        } = configuration;


        // Open the first connection.
        if (!value) {
            let count = 0;
            let found = false;

            for (const connection of Object.values(connections)) {
                if (count === 0) {
                    found = true;
                    openConnection(connection);

                    break;
                }
            }

            checkNotFound(
                found,
                value,
            );

            return;
        }


        // Open the connection by number.
        if (value.startsWith('%')) {
            const index = parseInt(value.slice(1));

            if (typeof index === 'number') {
                let count = 0;
                let found = false;

                for (const connection of Object.values(connections)) {
                    if (count === index) {
                        found = true;
                        openConnection(connection);

                        break;
                    }

                    count += 1;
                }

                checkNotFound(
                    found,
                    value,
                );
            }

            return;
        }


        // Open the connection by name.
        let found = false;

        for (const connection of Object.values(connections)) {
            const url = 'http://localhost:' + connection.port;

            if (value === url) {
                found = true;
                openConnection(connection);

                break;
            }
        }

        checkNotFound(
            found,
            value,
        );
    } catch (error) {
        console.log('Something went wrong.');
        return;
    }
}
// #endregion module



// #region exports
export default open;
// #endregion exports
