// #region imports
    // #region external
    import {
        DeveloperConfiguration,
    } from '#server/data/interfaces';
    // #endregion external
// #endregion imports



// #region module
const build = (
    files: string[],
    configuration: any,
) => {
    // read the files
    // handle the configuration
    // emit the result
}


const handleDeveloper = async (
    command: string,
    directory: string,
    configuration: DeveloperConfiguration,
) => {
    const commandData = configuration.commands[command];

    const {
        input,
    } = commandData;


    if (Array.isArray(input)) {
        for (const inputItem of input) {
        }

        return;
    }

    if (typeof input === 'string') {

        return;
    }


    return;
}
// #endregion module



// #region exports
export {
    handleDeveloper,
};
// #endregion exports
