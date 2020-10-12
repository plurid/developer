// #region imports
    // #region libraries
    import path from 'path';
    // #endregion libraries


    // #region external
    import {
        CodeProviderData,
    } from '#server/data/interfaces';
    // #endregion external
// #endregion imports



// #region module
export const COOKIE_PRIVATE_TOKEN = 'PVTTKN';

export const HEALTH_CHECK_ENDPOINT = '/service-check/health';


export const BASE_PATH = process.env.DELOG_BASE_PATH || process.cwd();
export const BASE_PATH_PROJECTS = '/data/projects/';


export const projectsPath = path.join(BASE_PATH, BASE_PATH_PROJECTS);
// #endregion module
