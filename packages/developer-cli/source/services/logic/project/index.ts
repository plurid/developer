// #region imports
    // #region libraries
    import {
        promises as fs,
    } from 'fs';

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
    name: string,
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
    name: string,
) => {
    const project = await resolveProject(
        name,
    );

    if (!project) {
        console.log(`Could not resolve project.`);
        return;
    }

    const configurationData = await readProjectConfiguration(
        project,
    );

    return configurationData;
}
// #endregion module



// #region exports
export {
    resolveProject,
    readProjectConfiguration,
    getProjectData,
};
// #endregion exports
