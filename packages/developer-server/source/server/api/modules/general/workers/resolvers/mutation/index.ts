// #region imports
    // #region external
    import {
        Context,
        InputOf,
        InputValueString,
    } from '~server/data/interfaces';

    import {
        Workers,
    } from '~server/api/models';
    // #endregion external
// #endregion imports



// #region exports
export default {
    generateWorker: (
        _: any,
        { input }: InputOf<InputValueString>,
        context: Context,
    ) => Workers.Mutation.generateWorker(
        input,
        context,
    ),
    obliterateWorker: (
        _: any,
        { input }: InputOf<InputValueString>,
        context: Context,
    ) => Workers.Mutation.obliterateWorker(
        input,
        context,
    ),
};
// #endregion exports
