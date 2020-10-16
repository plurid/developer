// #region imports
    // #region libraries
    import {
        promises as fs,
    } from 'fs';

    import path from 'path';

    import Zip from 'adm-zip';

    import Deon, {
        typer,
    } from '@plurid/deon';
    // #endregion libraries


    // #region external
    import {
        Project,
    } from '../../../data/interfaces';

    import {
        getConfiguration,
    } from '../../utilities/configuration';
    // #endregion external
// #endregion imports



// #region module
const resolveProject = async (
    name?: string,
) => {
    const configuration = await getConfiguration();

    if (!configuration) {
        return;
    }

    for (const project of configuration.projects) {
        if (project.name === name) {
            return project;
        }

        if (project.space === name) {
            return project;
        }
    }

    return;
}


const readProjectConfiguration = async (
    project: Project,
) => {
    const {
        path,
    } = project;

    const data = await fs.readFile(
        path,
        'utf-8',
    );

    const deon = new Deon();
    const projectData = typer(await deon.parse(data));

    return projectData;
}


const getProjectData = async (
    name?: string,
) => {
    const project = await resolveProject(
        name,
    );

    if (!project) {
        console.log(`Could not resolve project.`);
        return;
    }

    const data = await readProjectConfiguration(
        project,
    );

    return {
        project,
        data,
    };
}


const resolveRoot = (
    configuration: any,
) => {
    const {
        project,
        data,
    } = configuration;

    const root = path.join(
        path.dirname(project.path),
        data.root,
    );

    return root;
}


const packageProject = async (
    configuration: any,
) => {
    const root = resolveRoot(configuration);

    const zip = new Zip();

    const files = await fs.readdir(root);

    for (const file of files) {
        const filepath = path.join(
            root,
            file,
        );

        const stat = await fs.stat(filepath);

        if (stat.isDirectory()) {
            zip.addLocalFolder(filepath, file);
        } else {
            zip.addLocalFile(filepath);
        }
    }

    const archive = zip.toBuffer();

    return archive;
}
// #endregion module



// #region exports
export {
    resolveProject,
    readProjectConfiguration,
    getProjectData,
    packageProject,
};
// #endregion exports
