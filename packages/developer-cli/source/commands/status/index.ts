// #region imports
    // #region external
    import {
        readConfigurations,
    } from '../../services/utilities';
    // #endregion external
// #endregion imports



// #region module
const status = async () => {
    try {
        const configurations = await readConfigurations();

        if (configurations.length === 0) {
            console.log(`\n\tNo developer configurations.\n`);
            return;
        }

        console.log(`\n\tDeveloper configurations:`);

        for (const configuration of configurations) {
            const {
                identonym,
                server,
                isDefault,
                projects,
            } = configuration;

            const defaultString = isDefault ? ' [default]': '';

            console.log(`\n\t${server} - ${identonym}${defaultString}`);

            if (projects.length === 0) {
                console.log(`\t\tno projects`);
                continue;
            }

            for (const project of projects) {
                console.log(`\t\t${project.name}`);
            }
        }
    } catch (error) {
        console.log('Something went wrong.');
        return;
    }
}
// #endregion module



// #region exports
export default status;
// #endregion exports
