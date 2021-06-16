// #region imports
    // #region libraries
    import merge from 'lodash.merge';
    // #endregion libraries


    // #region internal
    import owner from './owner/resolvers';
    import projects from './projects/resolvers';
    import develops from './develops/resolvers';
    import workers from './workers/resolvers';
    // #endregion internal
// #endregion imports



// #region module
const generateResolvers = (
    ...imports: any[]
) => {
    const resolvers = {};

    merge(
        resolvers,
        ...imports,
    );

    return resolvers;
}

const resolvers = generateResolvers(
    owner,
    projects,
    develops,
    workers,
);
// #endregion module



// #region exports
export default resolvers;
// #endregion exports
