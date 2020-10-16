// #region imports
    // #region external
    import {
        readConfiguration,
    } from '../../services/logic/configurations';

    import {
        getConfiguration,
    } from '../../services/utilities';
    // #endregion external
// #endregion imports



// #region module
const register = async (
    configurationPath?: string,
) => {
    const configuration = await getConfiguration();

    if (!configuration) {
        console.log(`Could not read configuration.`);
        return;
    }

    const data = await readConfiguration(
        configurationPath || '',
    );

    console.log('developer register', data);
}
// #endregion module



// #region exports
export default register;
// #endregion exports
