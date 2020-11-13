// #region imports
    // #region external
    import {
        Context,
        InputOf,
        InputValueString,
    } from '#server/data/interfaces';

    import {
        Develops,
    } from '#server/api/models';
    // #endregion external
// #endregion imports



// #region exports
export default {
    handleDevelop: (
        _: any,
        { input }: InputOf<InputValueString>,
        context: Context,
    ) => Develops.Mutation.handleDevelop(
        input,
        context,
    ),
};
// #endregion exports
