// #region imports
    // #region external
    import {
        Context,
    } from '~server/data/interfaces';

    import {
        Workers,
    } from '~server/api/models';
    // #endregion external
// #endregion imports



// #region exports
export default {
    getWorkers: (
        _: any,
        __: any,
        context: Context,
    ) => Workers.Query.getWorkers(
        context,
    ),
};
// #endregion exports
