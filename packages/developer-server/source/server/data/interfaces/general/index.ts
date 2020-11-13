// #region imports
    // #region external
    import {
        Notifier,
    } from '../notifier';
    // #endregion external
// #endregion imports



// #region module
export interface Project {
    id: string;
    name: string;
    ownedBy: string;

    // generatedBy: string;
    // generatedAt: number;
    // sharedWith: ProjectSharer[];
}

export type ProjectEntityAccess =
    | 'CAN_READ'
    | 'CAN_WRITE';

export interface ProjectSharer {
    id: string;
    access: {
    };
}


export interface DeveloperOwner {
    id: string;
    projects: Project[];
    notifiers: any[];
}


export interface Develop {
    id: string;
    start: number;
    duration: number;
    machine: string;
    project: string;
    space: string;
}


export interface OwnerToken {
    token: string;
}


export interface FileUpload {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    destination: string;
    filename: string;
    path: string;
    size: number;
}
// #endregion module
