// #region imports
    // #region external
    import {
        readConfigurations,
    } from '../../services/utilities';
    // #endregion external
// #endregion imports



// #region module
const status = async () => {
    const configurations = await readConfigurations();

    if (configurations.length === 0) {
        console.log(`No current configuration.`);
        return;
    }

    console.log(`\n\tDeveloper configuration`);

    for (const configuration of configurations) {
        const {
            identonym,
            server,
            isDefault,
            projects,
        } = configuration;

        console.log(`\n\t${server} - ${identonym}${isDefault ? ' [default]' : ''}`);

        if (projects.length === 0) {
            console.log(`\t\tno projects`);
            continue;
        }

        for (const project of projects) {
            console.log(`\t\t${project.name}`);
        }
    }
}
// #endregion module



// #region exports
export default status;
// #endregion exports
