// #region imports
    // #region external
    import {
        Context,
    } from '#server/data/interfaces';

    import {
        Builds,
    } from '#server/api/models';
    // #endregion external
// #endregion imports



// #region exports
export default {
    getBuilds: (
        _: any,
        __: any,
        context: Context,
    ) => Builds.Query.getBuilds(
        context,
    ),
};
// #endregion exports
