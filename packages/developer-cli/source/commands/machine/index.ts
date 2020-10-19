// #region imports
    // #region external
    import {
        updateConfiguration,
    } from '#services/utilities';
    // #endregion external
// #endregion imports



// #region module
const machine = async (
    name: string,
) => {
    try {
        await updateConfiguration(
            {
                machine: name,
            },
        );
    } catch (error) {
        console.log('Something went wrong.');
        return;
    }
}
// #endregion module



// #region exports
export default machine;
// #endregion exports
