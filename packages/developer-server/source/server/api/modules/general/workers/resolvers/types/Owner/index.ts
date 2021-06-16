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
    projects: async (
        _: any,
        __: any,
        context: Context,
    ) => {
        const query = await Workers.Query.getWorkers(
            context,
        );

        if (!query.status) {
            return [];
        }

        return query.data;
    },
};
// #endregion exports
