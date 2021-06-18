// #region imports
    // #region external
    import {
        InputOf,
        Context,
        InputGetUploadToken,
    } from '~server/data/interfaces';

    import {
        Develops,
    } from '~server/api/models';
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
    getUploadToken: (
        _: any,
        { input }: InputOf<InputGetUploadToken>,
        context: Context,
    ) => Develops.Query.getUploadToken(
        input,
        context,
    ),
};
// #endregion exports
