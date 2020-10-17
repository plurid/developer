// #region imports
    // #region libraries
    import path from 'path';
    // #endregion libraries
// #endregion imports



// #region module
const resolvePathToAbsolute = (
    filepath: string,
) => {
    const resolvedFilepath = path.isAbsolute(filepath)
        ? filepath
        : path.join(
            process.cwd(),
            filepath,
        );

    return resolvedFilepath;
}
// #endregion module



// #region exports
export {
    resolvePathToAbsolute,
};
// #endregion exports
