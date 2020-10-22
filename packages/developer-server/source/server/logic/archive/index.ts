// #region imports
    // #region libraries
    import path from 'path';

    import Zip from 'adm-zip';
    // #endregion libraries
// #endregion imports



// #region module
const archiveBuild = (
    id: string,
) => {
    const buildPath = path.join(
        process.cwd(),
        `./data/builds/${id}`,
    );

    const zip = new Zip();

    zip.addLocalFolder(buildPath);

    const archivePath = path.join(
        process.cwd(),
        `./data/archives/${id}`,
    );

    zip.writeZip(archivePath);
}
// #endregion module



// #region exports
export {
    archiveBuild,
};
// #endregion exports
