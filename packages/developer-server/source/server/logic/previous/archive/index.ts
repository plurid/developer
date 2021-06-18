// #region imports
    // #region libraries
    import {
        promises as fs,
    } from 'fs';

    import path from 'path';

    import Zip from 'adm-zip';
    // #endregion libraries
// #endregion imports



// #region module
const archiveBuild = async (
    id: string,
) => {
    const buildPath = path.join(
        process.cwd(),
        `./data/emits/${id}`,
    );

    const zip = new Zip();

    zip.addLocalFolder(buildPath);

    const archivePath = path.join(
        process.cwd(),
        `./data/archives/${id}`,
    );

    zip.writeZip(archivePath);

    await fs.rmdir(
        buildPath,
        {
            recursive: true,
        },
    );
}
// #endregion module



// #region exports
export {
    archiveBuild,
};
// #endregion exports
