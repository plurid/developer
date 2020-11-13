// #region imports
    // #region external
    import {
        Context,
    } from '#server/data/interfaces';

    import {
        Develops,
    } from '#server/api/models';
    // #endregion external
// #endregion imports



// #region exports
export default {
    getDevelops: (
        _: any,
        __: any,
        context: Context,
    ) => Develops.Query.getDevelops(
        context,
    ),
};
// #endregion exports
