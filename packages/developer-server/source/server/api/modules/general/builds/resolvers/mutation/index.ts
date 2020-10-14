// #region imports
    // #region external
    import {
        Context,
        InputOf,
        InputValueString,
    } from '#server/data/interfaces';

    import {
        Builds,
    } from '#server/api/models';
    // #endregion external
// #endregion imports



// #region exports
export default {
    handleBuild: (
        _: any,
        { input }: InputOf<InputValueString>,
        context: Context,
    ) => Builds.Mutation.handleBuild(
        input,
        context,
    ),
};
// #endregion exports
