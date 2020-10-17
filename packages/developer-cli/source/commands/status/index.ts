// #region imports
    // #region external
    import {
        readConfiguration,
    } from '#services/utilities';
    // #endregion external
// #endregion imports



// #region module
const status = async () => {
    try {
        const configuration = await readConfiguration();

        if (configuration.workers.length === 0) {
            console.log(`\n\tNo developer configurations.\n`);
            return;
        }

        console.log(`\n\tDeveloper configurations:`);

        for (const worker of configuration.workers) {
            const {
                identonym,
                server,
                isDefault,
                spaces,
            } = worker;

            const defaultString = isDefault ? ' [default]': '';

            console.log(`\n\t${server} - ${identonym}${defaultString}`);

            if (spaces.length === 0) {
                console.log(`\t  no spaces registered`);
                continue;
            }

            for (const space of spaces) {
                console.log(`\t  ${space.identifier}`);
            }
        }
    } catch (error) {
        console.log('Something went wrong.', error);
        return;
    }
}
// #endregion module



// #region exports
export default status;
// #endregion exports
